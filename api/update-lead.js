// POST /api/update-lead
// Body: { secret, id, source, field, value }

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY
const CRM_SECRET   = process.env.CRM_SECRET

const TABLES = {
  organic: process.env.TABLE_ORGANIC || 'leads',
  ads:     process.env.TABLE_ADS     || 'ads_leads',
}

// Campos permitidos para atualização
const ALLOWED_FIELDS = new Set([
  'stage', 'starred', 'archived', 'follow_up_done', 'follow_up_at',
  'payment_method', 'payment_value', 'payment_date',
  'full_name', 'email', 'phone', 'notes', 'completed',
])

async function sbPatch(table, id, body) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      headers: {
        apikey:         SUPABASE_KEY,
        Authorization:  `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer':       'return=minimal',
      },
      body: JSON.stringify(body),
    }
  )
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err)
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin',  '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-secret')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' })

  const { secret, id, source, field, value } = req.body || {}

  if ((secret || req.headers['x-secret']) !== CRM_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (!id || !source || !field) {
    return res.status(400).json({ error: 'id, source e field são obrigatórios' })
  }
  if (!ALLOWED_FIELDS.has(field)) {
    return res.status(400).json({ error: `Campo '${field}' não permitido` })
  }

  const table = TABLES[source]
  if (!table) return res.status(400).json({ error: 'source inválido' })

  try {
    await sbPatch(table, id, { [field]: value })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[update-lead]', err.message)
    return res.status(500).json({ error: err.message })
  }
}

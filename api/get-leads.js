// GET /api/get-leads?source=organic|ads
// Header: x-secret: <CRM_SECRET>

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY
const CRM_SECRET   = process.env.CRM_SECRET

// Mapeamento source → tabela Supabase
const TABLES = {
  organic: process.env.TABLE_ORGANIC || 'leads',
  ads:     process.env.TABLE_ADS     || 'ads_leads',
}

async function sbSelect(table) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?order=created_at.desc&select=*`,
    {
      headers: {
        apikey:        SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const data = await res.json()
  if (!res.ok) throw new Error(data?.message || JSON.stringify(data))
  return data
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin',  '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-secret')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET')    return res.status(405).json({ error: 'Method not allowed' })

  if (req.headers['x-secret'] !== CRM_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { source } = req.query
  const table = TABLES[source]
  if (!table) return res.status(400).json({ error: 'source deve ser organic ou ads' })

  try {
    const data = await sbSelect(table)

    // Normaliza nomes de campos legados (telefone → phone, name → full_name)
    const rows = (data || []).map((r) => ({
      ...r,
      phone:     r.phone     || r.telefone || '',
      full_name: r.full_name || r.name     || '',
    }))

    return res.status(200).json({ rows })
  } catch (err) {
    console.error('[get-leads]', err.message)
    return res.status(500).json({ error: err.message })
  }
}

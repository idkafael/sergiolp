// POST /api/bulk-action
// Body: { secret, ids[], source, action, value }
// actions: set_stage | set_starred | set_archived | set_follow_up | delete

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY
const CRM_SECRET   = process.env.CRM_SECRET

const TABLES = {
  organic: process.env.TABLE_ORGANIC || 'leads',
  ads:     process.env.TABLE_ADS     || 'ads_leads',
}

// Mapeamento action → campo da tabela
const ACTION_FIELD = {
  set_stage:    'stage',
  set_starred:  'starred',
  set_archived: 'archived',
  set_follow_up:'follow_up_done',
}

function buildInFilter(ids) {
  // Supabase REST: ?id=in.(1,2,3) — suporta int e uuid
  return `id=in.(${ids.map(encodeURIComponent).join(',')})`
}

async function sbPatchMany(table, ids, body) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?${buildInFilter(ids)}`,
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
  if (!res.ok) throw new Error(await res.text())
}

async function sbDeleteMany(table, ids) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?${buildInFilter(ids)}`,
    {
      method: 'DELETE',
      headers: {
        apikey:         SUPABASE_KEY,
        Authorization:  `Bearer ${SUPABASE_KEY}`,
        'Prefer':       'return=minimal',
      },
    }
  )
  if (!res.ok) throw new Error(await res.text())
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin',  '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-secret')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' })

  const { secret, ids, source, action, value } = req.body || {}

  if ((secret || req.headers['x-secret']) !== CRM_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'ids deve ser um array não-vazio' })
  }
  if (!source || !action) {
    return res.status(400).json({ error: 'source e action são obrigatórios' })
  }

  const table = TABLES[source]
  if (!table) return res.status(400).json({ error: 'source inválido' })

  try {
    if (action === 'delete') {
      await sbDeleteMany(table, ids)
      return res.status(200).json({ ok: true, deleted: ids.length })
    }

    const field = ACTION_FIELD[action]
    if (!field) return res.status(400).json({ error: `action '${action}' não reconhecida` })

    await sbPatchMany(table, ids, { [field]: value })
    return res.status(200).json({ ok: true, updated: ids.length })
  } catch (err) {
    console.error('[bulk-action]', err.message)
    return res.status(500).json({ error: err.message })
  }
}

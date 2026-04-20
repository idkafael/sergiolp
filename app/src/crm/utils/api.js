// ─── API helpers ────────────────────────────────────────────────────────────

function headers(secret) {
  return { 'Content-Type': 'application/json', 'x-secret': secret }
}

async function parseJSON(res, label) {
  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    throw new Error(
      `${label}: servidor retornou ${res.status} (não-JSON). ` +
      `Verifique se as rotas /api/* existem no Vercel.`
    )
  }
  const data = await res.json()
  if (!res.ok) throw new Error(`${label}: ${data?.error || `HTTP ${res.status}`}`)
  return data
}

export async function getLeads(secret, source) {
  const res = await fetch(`/api/get-leads?source=${source}`, {
    headers: { 'x-secret': secret },
  })
  return parseJSON(res, `get-leads/${source}`)
}

export async function updateLead(secret, { id, source, field, value }) {
  const res = await fetch('/api/update-lead', {
    method: 'POST',
    headers: headers(secret),
    body: JSON.stringify({ secret, id, source, field, value }),
  })
  return parseJSON(res, 'update-lead')
}

export async function bulkAction(secret, { ids, source, action, value }) {
  const res = await fetch('/api/bulk-action', {
    method: 'POST',
    headers: headers(secret),
    body: JSON.stringify({ secret, ids, source, action, value }),
  })
  return parseJSON(res, 'bulk-action')
}

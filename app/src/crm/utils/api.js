// ─── API helpers ────────────────────────────────────────────────────────────

function headers(secret) {
  return { 'Content-Type': 'application/json', 'x-secret': secret }
}

export async function getLeads(secret, source) {
  const res = await fetch(`/api/get-leads?source=${source}`, {
    headers: { 'x-secret': secret },
  })
  if (!res.ok) throw new Error(`get-leads ${source}: HTTP ${res.status}`)
  return res.json() // { rows: Lead[] }
}

export async function updateLead(secret, { id, source, field, value }) {
  const res = await fetch('/api/update-lead', {
    method: 'POST',
    headers: headers(secret),
    body: JSON.stringify({ secret, id, source, field, value }),
  })
  if (!res.ok) throw new Error(`update-lead: HTTP ${res.status}`)
  return res.json()
}

export async function bulkAction(secret, { ids, source, action, value }) {
  const res = await fetch('/api/bulk-action', {
    method: 'POST',
    headers: headers(secret),
    body: JSON.stringify({ secret, ids, source, action, value }),
  })
  if (!res.ok) throw new Error(`bulk-action: HTTP ${res.status}`)
  return res.json()
}

// ─── CSV export helpers ──────────────────────────────────────────────────────

const LEAD_FIELDS = [
  'id','full_name','email','phone','stage','starred','archived',
  'follow_up_done','follow_up_at','payment_method','payment_value','payment_date',
  'q1','q2','q3','q4','q5','q6','q7','q8','q9','q10','created_at','completed',
]

const META_HEADERS = [
  'email','email','email','phone','phone','phone','madid','fn','ln','ct','st',
  'zip','country','dob','gen','age','lead_id','anon_id','extern_id','click_id',
  'client_ip_address','client_user_agent','pred_score',
]

function esc(val) {
  const str = val == null ? '' : String(val)
  return '"' + str.replace(/"/g, '""') + '"'
}

function download(content, filename) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function exportLeadsCSV(rows, source) {
  const date = new Date().toISOString().slice(0, 10)
  const lines = [
    LEAD_FIELDS.join(','),
    ...rows.map((r) => LEAD_FIELDS.map((f) => esc(r[f])).join(',')),
  ]
  download(lines.join('\n'), `leads-${source}-${date}.csv`)
}

export function exportMetaCSV(rows) {
  const date = new Date().toISOString().slice(0, 10)
  const lines = [
    META_HEADERS.join(','),
    ...rows.map((r) => {
      const cols = new Array(META_HEADERS.length).fill('')
      cols[0] = r.email  || ''
      cols[3] = r.phone  || ''
      return cols.map(esc).join(',')
    }),
  ]
  download(lines.join('\n'), `meta-leads-${date}.csv`)
}

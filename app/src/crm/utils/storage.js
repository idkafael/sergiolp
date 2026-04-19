// ─── localStorage wrappers para as chaves cb_kb_* ───────────────────────────

const KEYS = {
  stage:   'cb_kb_stage',   // { "organic_123": "contatado" }
  offers:  'cb_kb_offers',  // [{ id, name }]
  assign:  'cb_kb_assign',  // { "organic_123": "uuid-oferta" }
  guests:  'cb_kb_guests',  // [{ id, name, phone, email, _source: "guest" }]
  fuLog:   'cb_kb_fu_log',  // { "organic_123": { "2025-01-15": true, _entered: "2025-01-10" } }
}

function get(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function set(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* ignore */ }
}

// ── Stage ─────────────────────────────────────────────────────────────────
export const getKbStages = () => get(KEYS.stage) || {}
export const setKbStages = (val) => set(KEYS.stage, val)

export function getKbStage(source, id) {
  const key = `${source}_${id}`
  return (get(KEYS.stage) || {})[key] || 'novo'
}
export function setKbStage(source, id, stage) {
  const all = get(KEYS.stage) || {}
  all[`${source}_${id}`] = stage
  set(KEYS.stage, all)
}

// ── Offers ────────────────────────────────────────────────────────────────
export const getOffers = () => get(KEYS.offers) || []
export const setOffers = (val) => set(KEYS.offers, val)

// ── Assign ────────────────────────────────────────────────────────────────
export const getAssign = () => get(KEYS.assign) || {}
export const setAssign = (val) => set(KEYS.assign, val)

export function assignOffer(source, id, offerId) {
  const all = get(KEYS.assign) || {}
  all[`${source}_${id}`] = offerId
  set(KEYS.assign, all)
}

// ── Guests ────────────────────────────────────────────────────────────────
export const getGuests = () => get(KEYS.guests) || []
export const setGuests = (val) => set(KEYS.guests, val)

// ── Follow-up log ─────────────────────────────────────────────────────────
export const getFuLog = () => get(KEYS.fuLog) || {}
export const setFuLog = (val) => set(KEYS.fuLog, val)

export function getFuLogForLead(source, id) {
  return (get(KEYS.fuLog) || {})[`${source}_${id}`] || {}
}
export function setFuLogForLead(source, id, leadLog) {
  const all = get(KEYS.fuLog) || {}
  all[`${source}_${id}`] = leadLog
  set(KEYS.fuLog, all)
}

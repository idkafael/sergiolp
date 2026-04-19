const PIXEL_ID = '1446432270568919'
const ACCESS_TOKEN = import.meta.env.VITE_META_ACCESS_TOKEN
const API_VERSION = 'v21.0'

async function sha256(str) {
  const encoded = new TextEncoder().encode(str.trim().toLowerCase())
  const buffer = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function generateEventId(prefix = 'evt') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

/**
 * Envia um ou mais eventos para a Conversions API da Meta.
 * @param {Array<{ event_name: string, event_id: string, user_data: object }>} events
 */
async function sendToCAPI(events) {
  if (!ACCESS_TOKEN) return

  const eventTime = Math.floor(Date.now() / 1000)

  const payload = {
    data: events.map((ev) => ({
      event_name: ev.event_name,
      event_time: eventTime,
      event_id: ev.event_id,
      action_source: 'website',
      event_source_url: window.location.href,
      user_data: ev.user_data,
    })),
  }

  await fetch(
    `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  )
}

/**
 * Dispara eventos Lead + CompleteRegistration no browser pixel e na Conversions API.
 * @param {{ email: string, telefone: string }} data
 */
export async function trackLead({ email, telefone } = {}) {
  const leadEventId = generateEventId('lead')
  const regEventId  = generateEventId('reg')

  // 1. Browser pixel — IDs distintos para cada evento, permitindo deduplicação
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead',                {}, { eventID: leadEventId })
    window.fbq('track', 'CompleteRegistration', {}, { eventID: regEventId  })
  }

  // 2. Conversions API — envia os dois eventos numa única requisição
  try {
    const emailHash = email ? await sha256(email) : null

    // Normaliza telefone: remove não-dígitos e adiciona DDI 55 (Brasil)
    const digits = telefone ? telefone.replace(/\D/g, '') : null
    const phoneHash = digits ? await sha256(`55${digits}`) : null

    const userData = {
      em: emailHash ? [emailHash] : [],
      ph: phoneHash ? [phoneHash] : [],
      client_user_agent: navigator.userAgent,
      fbp: getCookie('_fbp') || null,
      fbc: getCookie('_fbc') || null,
    }

    await sendToCAPI([
      { event_name: 'Lead',                event_id: leadEventId, user_data: userData },
      { event_name: 'CompleteRegistration', event_id: regEventId,  user_data: userData },
    ])
  } catch (err) {
    // Não bloqueia o fluxo do usuário em caso de falha
    console.error('[Meta CAPI]', err)
  }
}

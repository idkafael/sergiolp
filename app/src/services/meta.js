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

function generateEventId() {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

/**
 * Dispara evento Lead no browser pixel e na Conversions API (server-side).
 * @param {{ email: string, telefone: string }} data
 */
export async function trackLead({ email, telefone } = {}) {
  const eventId = generateEventId()
  const eventTime = Math.floor(Date.now() / 1000)

  // 1. Browser pixel — usa o mesmo eventID para deduplicação
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {}, { eventID: eventId })
  }

  // 2. Conversions API — só envia se o token estiver configurado
  if (!ACCESS_TOKEN) return

  try {
    const emailHash = email ? await sha256(email) : null

    // Normaliza telefone: remove não-dígitos e adiciona DDI 55 (Brasil)
    const digits = telefone ? telefone.replace(/\D/g, '') : null
    const phoneHash = digits ? await sha256(`55${digits}`) : null

    const payload = {
      data: [
        {
          event_name: 'Lead',
          event_time: eventTime,
          event_id: eventId,
          action_source: 'website',
          event_source_url: window.location.href,
          user_data: {
            em: emailHash ? [emailHash] : [],
            ph: phoneHash ? [phoneHash] : [],
            client_user_agent: navigator.userAgent,
            fbp: getCookie('_fbp') || null,
            fbc: getCookie('_fbc') || null,
          },
        },
      ],
    }

    await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )
  } catch (err) {
    // Não bloqueia o fluxo do usuário em caso de falha
    console.error('[Meta CAPI]', err)
  }
}

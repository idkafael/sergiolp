import { useState } from 'react'

const TELEFONE_PATTERN = '^\\([0-9]{2}\\) [0-9]{4,5}-[0-9]{4}$'

function formatTelefone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function LeadForm({ onSubmit, submitLabel = 'Quero participar do Evento Esquadria Milionária', idPrefix = '' }) {
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function handleTelefoneChange(e) {
    setTelefone(formatTelefone(e.target.value))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    try {
      const result = await Promise.resolve(onSubmit?.({ email, telefone }))
      if (result?.ok) {
        setStatus('success')
        setEmail('')
        setTelefone('')
      } else {
        setStatus('error')
        setErrorMessage(result?.error || 'Erro ao enviar. Tente novamente.')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage(err?.message || 'Erro ao enviar. Tente novamente.')
    }
  }

  const n = (id) => idPrefix ? `${idPrefix}-${id}` : id

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status !== 'success' && (
        <>
          <div>
            <input
              id={n('email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Seu melhor e-mail"
              className="w-full px-4 py-3.5 text-sm rounded-xl bg-background border border-surface-light text-white placeholder:text-muted/60 focus:outline-none focus:border-gold/50 hover:border-surface-light/80 transition-colors"
            />
          </div>
          <div className="flex rounded-xl bg-background border border-surface-light overflow-hidden focus-within:border-gold/50 hover:border-surface-light/80 transition-colors">
            <div className="flex items-center gap-1.5 pl-4 pr-3 text-muted shrink-0 border-r border-surface-light">
              <span className="text-base" aria-hidden>🇧🇷</span>
              <span className="text-xs font-semibold">+55</span>
            </div>
            <input
              id={n('telefone')}
              type="tel"
              value={telefone}
              onChange={handleTelefoneChange}
              required
              pattern={TELEFONE_PATTERN}
              title="Use o formato (00) 00000-0000 ou (00) 0000-0000"
              placeholder="WhatsApp com DDD"
              className="flex-1 min-w-0 px-4 py-3.5 text-sm bg-transparent text-white placeholder:text-muted/60 focus:outline-none"
            />
          </div>
        </>
      )}

      {status === 'success' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <p className="text-sm text-green-400 font-medium text-center" role="alert">
              Cadastro confirmado com sucesso!
            </p>
          </div>
          <a
            href="https://chat.whatsapp.com/KsbakehDaKy2qruS6uB2zb"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-bold text-background bg-gold hover:bg-gold-light active:scale-[0.98] transition-all duration-200 rounded-xl shadow-[0_4px_24px_rgba(201,152,26,0.3)] hover:shadow-[0_4px_32px_rgba(201,152,26,0.45)] uppercase tracking-wider"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Entrar no Grupo do WhatsApp
          </a>
        </div>
      )}

      {status === 'error' && (
        <p className="text-sm text-red-400 font-medium text-center" role="alert">
          {errorMessage}
        </p>
      )}

      {status !== 'success' && (
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-bold text-background bg-gold hover:bg-gold-light active:scale-[0.98] transition-all duration-200 rounded-xl shadow-[0_4px_24px_rgba(201,152,26,0.3)] hover:shadow-[0_4px_32px_rgba(201,152,26,0.45)] uppercase tracking-wider disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Enviando...
            </>
          ) : (
            <>
              {submitLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      )}
    </form>
  )
}

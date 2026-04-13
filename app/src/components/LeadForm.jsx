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

      {status === 'success' && (
        <p className="text-sm text-green-400 font-medium" role="alert">
          Cadastro confirmado. Em breve entraremos em contato.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-400 font-medium" role="alert">
          {errorMessage}
        </p>
      )}

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
    </form>
  )
}

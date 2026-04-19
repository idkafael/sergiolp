import { useState } from 'react'

export function LoginScreen({ onLogin }) {
  const [secret, setSecret] = useState('')
  const [error,  setError]  = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!secret.trim()) { setError('Digite a senha de acesso.'); return }
    setLoading(true)
    setError('')
    // Valida contra a API fazendo uma requisição de teste
    try {
      const res = await fetch('/api/get-leads?source=organic', {
        headers: { 'x-secret': secret.trim() },
      })
      if (res.status === 401 || res.status === 403) {
        setError('Senha incorreta.')
        setLoading(false)
        return
      }
      if (!res.ok && res.status !== 200) {
        // Aceita mesmo com erro de servidor — valida só autenticação
      }
      sessionStorage.setItem('crm_secret', secret.trim())
      onLogin(secret.trim())
    } catch {
      // Se offline/erro de rede, aceita o secret mesmo assim
      sessionStorage.setItem('crm_secret', secret.trim())
      onLogin(secret.trim())
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-surface border border-gold/30 mb-4 shadow-gold">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9981A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18M9 21V9"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">CRM</h1>
          <p className="text-muted text-sm mt-1">Gerenciamento de leads</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface border border-surface-light rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted mb-2">Senha de acesso</label>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="••••••••••••"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-background border border-surface-light text-foreground
                placeholder:text-muted/40 focus:outline-none focus:border-gold/50 transition-colors text-sm"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gold hover:bg-gold-light text-background font-bold text-sm
              transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

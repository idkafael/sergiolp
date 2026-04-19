import { useState, useEffect, useCallback } from 'react'
import { getLeads } from '../utils/api'
import { SourceTabs }     from './SourceTabs'
import { LeadsView }      from './LeadsView'
import { CobrancasView }  from './CobrancasView'
import { KanbanView }     from './KanbanView'

const REFRESH_MS = 60_000

export function Dashboard({ secret, onLogout, showToast }) {
  const [organic,       setOrganic]       = useState([])
  const [ads,           setAds]           = useState([])
  const [loading,       setLoading]       = useState(true)
  const [error,         setError]         = useState(null)
  const [currentSource, setCurrentSource] = useState('organic')
  const [currentPage,   setCurrentPage]   = useState(1)

  // ── Carregar dados ────────────────────────────────────────────────────────
  const loadData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    setError(null)
    try {
      const [orgRes, adsRes] = await Promise.all([
        getLeads(secret, 'organic'),
        getLeads(secret, 'ads'),
      ])
      setOrganic(orgRes.rows || [])
      setAds(adsRes.rows || [])
    } catch (err) {
      setError(err.message || 'Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }, [secret])

  useEffect(() => {
    loadData()
    const interval = setInterval(() => loadData(true), REFRESH_MS)
    return () => clearInterval(interval)
  }, [loadData])

  // ── Atualizar lead localmente ─────────────────────────────────────────────
  function handleUpdate(source, id, field, value) {
    const setter = source === 'organic' ? setOrganic : setAds
    setter((prev) => {
      if (field === '_deleted') return prev.filter((r) => r.id !== id)
      return prev.map((r) => r.id === id ? { ...r, [field]: value } : r)
    })
  }

  const rows        = currentSource === 'organic' ? organic : ads
  const activeSource = currentSource === 'organic' || currentSource === 'ads' ? currentSource : 'organic'

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-surface-light bg-surface shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold/20 border border-gold/30 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9981A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
            </svg>
          </div>
          <h1 className="font-bold text-foreground text-base">CRM · Leads</h1>
        </div>
        <div className="flex items-center gap-3">
          {loading && <span className="text-xs text-muted animate-pulse">Atualizando…</span>}
          <button
            onClick={() => loadData()}
            title="Recarregar"
            className="p-1.5 rounded-lg text-muted hover:text-foreground transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
            </svg>
          </button>
          <button
            onClick={onLogout}
            className="px-3 py-1.5 text-xs rounded-lg text-muted hover:text-red-400 border border-surface-light hover:border-red-400/30 transition-colors"
          >Sair</button>
        </div>
      </header>

      {/* Tabs */}
      <SourceTabs
        current={currentSource}
        onChange={(s) => { setCurrentSource(s); setCurrentPage(1) }}
        organicCount={organic.length}
        adsCount={ads.length}
      />

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm">
            {error} —{' '}
            <button onClick={() => loadData()} className="underline hover:no-underline">tentar novamente</button>
          </div>
        )}

        {loading && !organic.length && !ads.length
          ? <LoadingSkeleton />
          : (
            <>
              {(currentSource === 'organic' || currentSource === 'ads') && (
                <LeadsView
                  rows={currentSource === 'organic' ? organic : ads}
                  source={currentSource}
                  secret={secret}
                  onUpdate={(id, field, value) => handleUpdate(currentSource, id, field, value)}
                  showToast={showToast}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
              {currentSource === 'payments' && (
                <CobrancasView organic={organic} ads={ads} />
              )}
              {currentSource === 'kanban' && (
                <KanbanView
                  organic={organic}
                  ads={ads}
                  secret={secret}
                  showToast={showToast}
                />
              )}
            </>
          )
        }
      </main>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-12 bg-surface rounded-xl" />
      ))}
    </div>
  )
}

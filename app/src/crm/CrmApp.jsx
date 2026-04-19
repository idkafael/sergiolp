import { useState } from 'react'
import { LoginScreen } from './components/LoginScreen'
import { Dashboard }   from './components/Dashboard'
import { Toast }       from './components/Toast'
import { useToast }    from './hooks/useToast'

export default function CrmApp() {
  const savedSecret = sessionStorage.getItem('crm_secret') || ''
  const [secret, setSecret] = useState(savedSecret)
  const { toast, showToast } = useToast()

  function handleLogin(s) {
    setSecret(s)
  }

  function handleLogout() {
    sessionStorage.removeItem('crm_secret')
    setSecret('')
  }

  return (
    <>
      {secret
        ? <Dashboard secret={secret} onLogout={handleLogout} showToast={showToast} />
        : <LoginScreen onLogin={handleLogin} />
      }
      <Toast toast={toast} />
    </>
  )
}

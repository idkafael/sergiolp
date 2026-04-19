import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App    from './App.jsx'
import CrmApp from './crm/CrmApp.jsx'

const isCrm = window.location.pathname.startsWith('/crm')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isCrm ? <CrmApp /> : <App />}
  </StrictMode>,
)

import { useState, useCallback, useRef } from 'react'

export function useToast() {
  const [toast, setToast] = useState({ message: '', visible: false })
  const timerRef = useRef(null)

  const showToast = useCallback((message) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToast({ message, visible: true })
    timerRef.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }))
    }, 2500)
  }, [])

  return { toast, showToast }
}

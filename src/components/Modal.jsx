import { useEffect } from 'react'
export default function Modal({ open, onClose, children }) {
  useEffect(() => { const k = e => e.key === 'Escape' && onClose(); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [onClose])
  return open ? <div className="lb" role="dialog" aria-modal="true" onClick={e => e.target === e.currentTarget && onClose()}>{children}</div> : null
}

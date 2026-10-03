import React from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import App from './App.jsx'
import './styles.css'
// Inertial smooth scrolling, including touch (syncTouch) so phones glide too.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, syncTouch: true, syncTouchLerp: 0.09, touchInertiaExponent: 1.6, autoRaf: true })
  window.lenis = lenis
  document.addEventListener('click', e => { // anchor links glide instead of jumping
    const a = e.target.closest('a[href^="#"]'); if (!a) return
    e.preventDefault(); lenis.scrollTo(a.getAttribute('href'), { duration: 1.6, easing: t => 1 - Math.pow(1 - t, 4) })
  })
}
createRoot(document.getElementById('root')).render(<App />)

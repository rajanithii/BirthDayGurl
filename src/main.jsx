import React from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import App from './App.jsx'
import './styles.css'

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
const perfMode = new URLSearchParams(window.location.search).get('perf') === '1'

const LENIS_OPTIONS = {
  lerp: 0.1,
  wheelMultiplier: 1,
  syncTouch: true,
  syncTouchLerp: 0.075,
  touchInertiaExponent: 1.7,
  touchMultiplier: 1.1,
  autoRaf: false,
}

const intro = document.createElement('div')
intro.className = 'intro-curtain'
intro.setAttribute('aria-hidden', 'true')
intro.innerHTML = '<div class="intro-sheen"></div>'
document.body.appendChild(intro)

document.body.classList.add('loading')

if (!reducedMotion) {
  const lenis = new Lenis(LENIS_OPTIONS)
  window.lenis = lenis
  lenis.stop()

  let rafId = 0
  const tick = time => {
    lenis.raf(time)
    rafId = requestAnimationFrame(tick)
  }
  rafId = requestAnimationFrame(tick)

  window.addEventListener('resize', () => lenis.resize(), { passive: true })
  window.addEventListener('orientationchange', () => lenis.resize(), { passive: true })
  window.addEventListener('load', () => lenis.resize(), { once: true })

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return
    e.preventDefault(); lenis.scrollTo(a.getAttribute('href'), { duration: 1.6, easing: t => 1 - Math.pow(1 - t, 4) })
  })

  window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId))

  setTimeout(() => {
    lenis.start()
    document.body.classList.remove('loading')
    intro.classList.add('hidden')
  }, 650)
}

if (perfMode && !reducedMotion) {
  const panel = document.createElement('div')
  panel.id = 'perf-meter'
  panel.className = 'perf-meter'
  panel.innerHTML = '<strong>perf</strong><span>60 fps</span><small>0 long tasks</small>'
  document.body.appendChild(panel)

  let last = performance.now()
  let frames = 0
  let longTasks = 0
  let frameTimer = 0
  const update = now => {
    frames += 1
    const delta = now - last
    if (delta >= 1000) {
      const fps = Math.max(1, Math.round((frames * 1000) / delta))
      const el = panel.querySelector('span')
      const taskEl = panel.querySelector('small')
      el.textContent = `${fps} fps`
      taskEl.textContent = `${longTasks} long tasks`
      frames = 0; last = now; frameTimer = 0
    }
    requestAnimationFrame(update)
  }

  const taskObserver = new PerformanceObserver(list => {
    longTasks += list.getEntries().filter(entry => entry.duration > 50).length
  })
  taskObserver.observe({ entryTypes: ['longtask'] })
  requestAnimationFrame(update)
  window.addEventListener('beforeunload', () => taskObserver.disconnect())
}

createRoot(document.getElementById('root')).render(<App />)

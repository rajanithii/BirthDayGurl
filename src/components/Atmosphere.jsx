// Fixed background: sky gradient (day -> sunset -> night), cloud buddies, stars, wandering kite.
import { useEffect, useRef } from 'react'
import Kite from './Kite'

const D = [[207, 224, 238], [251, 246, 236]], S = [[246, 220, 203], [220, 211, 236]], N = [[34, 42, 78], [76, 82, 126]]
const cl = v => Math.max(0, Math.min(1, v))
const mix = (a, b, t) => a.map((v, i) => v.map((x, j) => Math.round(x + (b[i][j] - x) * t)))
const stars = Array.from({ length: 70 }, () => [Math.random() * 100, Math.random() * 100, Math.random() * 4])

export default function Atmosphere({ onPage }) {
  const skyRef = useRef(null)
  const starsRef = useRef(null)
  const kiteRef = useRef(null)
  const offsetsRef = useRef([])
  const pageRef = useRef(1)
  const rafRef = useRef(0)

  useEffect(() => {
    const measure = () => {
      const sections = [...document.querySelectorAll('.s')]
      offsetsRef.current = sections.map(section => section.offsetTop)
      if (!offsetsRef.current.length) return
      const initialIndex = sections.reduce((acc, section, i) => (section.getBoundingClientRect().top < window.innerHeight * 0.5 ? i + 1 : acc), 1)
      pageRef.current = initialIndex
      onPage(initialIndex, sections.length)
    }

    const update = () => {
      const sky = skyRef.current
      const stars = starsRef.current
      const kite = kiteRef.current
      if (!sky || !stars || !kite) return

      const scrollY = window.scrollY
      const innerH = window.innerHeight
      const innerW = window.innerWidth
      const sections = offsetsRef.current
      const totalSections = sections.length || 1
      const y = scrollY + innerH * 0.5
      let activeIndex = 1
      for (let i = 0; i < sections.length; i += 1) {
        if (y >= sections[i]) activeIndex = i + 1
      }
      if (activeIndex !== pageRef.current) {
        pageRef.current = activeIndex
        onPage(activeIndex, totalSections)
      }

      const a = document.getElementById('kite')?.offsetTop ?? 0
      const b = document.getElementById('letter')?.offsetTop ?? a + 1
      const c = document.getElementById('fin')?.offsetTop ?? b + 1
      const t = cl((y - a) / Math.max(1, b - a))
      const nightT = cl((y - b) / Math.max(1, c - b))
      const col = y < a ? D : y < b ? mix(D, S, t) : mix(S, N, nightT)
      sky.style.background = `linear-gradient(180deg,rgb(${col[0]}),rgb(${col[1]}))`
      stars.style.opacity = String(cl((nightT - 0.5) * 2.2))
      document.body.classList.toggle('night', nightT > 0.78)

      const p = scrollY / (document.documentElement.scrollHeight - innerH || 1)
      kite.style.transform = `translate(${p * (innerW - 50)}px,${60 + Math.sin(p * 10) * 40 + p * innerH * 0.3}px) rotate(${Math.sin(p * 12) * 12}deg)`
      rafRef.current = requestAnimationFrame(update)
    }

    measure()
    const handleResize = () => measure()
    const resizeObserver = new ResizeObserver(() => measure())
    document.querySelectorAll('.s').forEach(section => resizeObserver.observe(section))
    window.addEventListener('resize', handleResize, { passive: true })
    rafRef.current = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [onPage])

  return (<>
    <div ref={skyRef} className="sky" /><div ref={starsRef} className="stars">{stars.map(([x, y, d], i) => <i key={i} style={{ left: x + '%', top: y + '%', animationDelay: d + 's' }} />)}</div>
    {[[12, 70, 0, 300], [42, 110, -40, 420], [72, 90, -70, 300]].map(([t, dur, dl, w], i) => (
      <div key={i} className="cl" style={{ top: t + '%', width: w, animationDuration: dur + 's', animationDelay: dl + 's' }}><b /><b /><u /></div>))}
    <div ref={kiteRef} className="kf"><Kite /></div><div className="grain" />
  </>)
}

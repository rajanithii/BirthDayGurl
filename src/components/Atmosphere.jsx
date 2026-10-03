// Fixed background: sky gradient (day -> sunset -> night), cloud buddies, stars, wandering kite.
import { useEffect, useRef } from 'react'
import Kite from './Kite'
const D = [[207, 224, 238], [251, 246, 236]], S = [[246, 220, 203], [220, 211, 236]], N = [[34, 42, 78], [76, 82, 126]]
const cl = v => Math.max(0, Math.min(1, v))
const mix = (a, b, t) => a.map((v, i) => v.map((x, j) => Math.round(x + (b[i][j] - x) * t)))
const stars = Array.from({ length: 70 }, () => [Math.random() * 100, Math.random() * 100, Math.random() * 4])
export default function Atmosphere({ onPage }) {
  const sky = useRef(), st = useRef(), kite = useRef()
  useEffect(() => {
    const upd = () => {
      const $ = s => document.querySelector(s).offsetTop, y = scrollY + innerHeight * 0.5, a = $('#kite'), b = $('#letter'), c = $('#fin')
      const col = y < a ? D : y < b ? mix(D, S, cl((y - a) / (b - a))) : mix(S, N, cl((y - b) / (c - b)))
      const nt = cl((y - b) / (c - b))
      sky.current.style.background = `linear-gradient(180deg,rgb(${col[0]}),rgb(${col[1]}))`
      st.current.style.opacity = cl((nt - 0.5) * 2.2); document.body.classList.toggle('night', nt > 0.78)
      const p = scrollY / (document.documentElement.scrollHeight - innerHeight || 1)
      kite.current.style.transform = `translate(${p * (innerWidth - 50)}px,${60 + Math.sin(p * 10) * 40 + p * innerHeight * 0.3}px) rotate(${Math.sin(p * 12) * 12}deg)`
      const ss = [...document.querySelectorAll('.s')]; let k = 0; ss.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.5) k = i }); onPage(k + 1, ss.length)
    }
    addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd()
    return () => { removeEventListener('scroll', upd); removeEventListener('resize', upd) }
  }, [onPage])
  return (<>
    <div ref={sky} className="sky" /><div ref={st} className="stars">{stars.map(([x, y, d], i) => <i key={i} style={{ left: x + '%', top: y + '%', animationDelay: d + 's' }} />)}</div>
    {[[12, 70, 0, 300], [42, 110, -40, 420], [72, 90, -70, 300]].map(([t, dur, dl, w], i) => (
      <div key={i} className="cl" style={{ top: t + '%', width: w, animationDuration: dur + 's', animationDelay: dl + 's' }}><b /><b /><u /></div>))}
    <div ref={kite} className="kf"><Kite /></div><div className="grain" />
  </>)
}

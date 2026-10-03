// Animated SVG flowers. Garden = a row that "blooms" in when scrolled into view.
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import R from './R'
const COLORS = [['#fff', '#f6c453'], ['#f7b7cf', '#fff3b0'], ['#cdbdf2', '#fff3b0'], ['#ffd2a8', '#ffffff'], ['#bfe3f7', '#fff3b0']]
export function Flower({ size = 70, c = 0, delay = 0, stem = 60 }) {
  const [petal, mid] = COLORS[c % COLORS.length], ref = useRef(), seen = useInView(ref, { once: true })
  return (
    <svg ref={ref} className={'fl' + (seen ? ' in' : '')} width={size} height={size + stem} viewBox={`0 0 100 ${100 + stem}`} style={{ animationDelay: delay + 's' }} aria-hidden="true">
      <path d={`M50 100 C46 120 54 140 50 ${100 + stem}`} stroke="#7fae78" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="38" cy="128" rx="12" ry="5" fill="#9cc79a" transform="rotate(-25 38 128)" />
      <g className="bloom" style={{ transitionDelay: delay * 0.6 + 's' }}>{[0, 60, 120, 180, 240, 300].map(a => <ellipse key={a} cx="50" cy="30" rx="13" ry="25" fill={petal} stroke="#00000012" transform={`rotate(${a} 50 50)`} />)}
        <circle cx="50" cy="50" r="12" fill={mid} /><circle cx="46" cy="47" r="2" fill="#3a3a46" /><circle cx="54" cy="47" r="2" fill="#3a3a46" /><path d="M45 54 Q50 59 55 54" stroke="#3a3a46" fill="none" strokeWidth="1.8" strokeLinecap="round" /></g>
    </svg>
  )
}
export function Garden({ n = 6 }) {
  return <R className="garden" aria-hidden="true">{Array.from({ length: n }, (_, i) => <Flower key={i} c={i} size={46 + (i % 3) * 14} delay={i * 0.4} stem={30 + (i % 2) * 24} />)}</R>
}

// Scroll-linked photo: swings in, straightens, sharpens from blur, inner image drifts (parallax).
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { P } from '../data'
export default function Photo({ d, onOpen, style }) {
  const ref = useRef(), { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(p, [0, 0.16], [0, 1]), y = useTransform(p, [0, 0.26], [80, 0]), scale = useTransform(p, [0, 0.26], [0.86, 1])
  const rotate = useTransform(p, [0, 0.3], [d.r * 3 - 7, d.r]), iy = useTransform(p, [0, 1], ['-9%', '9%']), filter = useTransform(p, [0, 0.24], ['blur(12px)', 'blur(0px)'])
  return (
    <motion.figure ref={ref} className="ph" data-tip={d.tip} style={{ opacity, y, scale, rotate, ...style }}>
      <div className="pw"><motion.img src={P[d.k]} alt={d.alt} loading="lazy" style={{ y: iy, scale: 1.2, filter }} onClick={() => onOpen({ src: P[d.k], alt: d.alt, cap: d.title })} /></div>
      <figcaption>{d.tag && <span className="hw">{d.tag}</span>}<b>{d.title}</b>{d.note && <em>{d.note}</em>}</figcaption>
    </motion.figure>
  )
}

// Scroll-linked photo: swings in, straightens, sharpens without blur to stay smooth and mobile-friendly.
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { P } from '../data'

export default function Photo({ d, onOpen, style }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.35 })

  return (
    <motion.figure
      ref={ref}
      className="ph"
      data-tip={d.tip}
      style={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 80,
        scale: isInView ? 1 : 0.88,
        rotate: isInView ? d.r : d.r * 3 - 7,
        willChange: isInView ? 'transform, opacity' : 'auto',
        ...style,
      }}
    >
      <div className="pw" style={{ clipPath: isInView ? 'inset(0 0 0% 0 round 24px)' : 'inset(0 0 100% 0 round 24px)' }}>
        <motion.img
          src={P[d.k]}
          alt={d.alt}
          loading="lazy"
          decoding="async"
          width={800}
          height={1000}
          style={{ y: 0, scale: 1.08, opacity: isInView ? 1 : 0.2, willChange: isInView ? 'transform, opacity' : 'auto' }}
          onClick={() => onOpen({ src: P[d.k], alt: d.alt, cap: d.title })}
        />
      </div>
      <figcaption>{d.tag && <span className="hw">{d.tag}</span>}<b>{d.title}</b>{d.note && <em>{d.note}</em>}</figcaption>
    </motion.figure>
  )
}

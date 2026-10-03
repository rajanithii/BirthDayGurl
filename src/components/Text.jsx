import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
// Hero title: letters spring in one by one.
export function Letters({ text, style }) {
  return (
    <motion.h1 className="wob" aria-label={text} style={style} initial="h" animate="v" transition={{ staggerChildren: 0.07, delayChildren: 1.1 }}>
      {[...text].map((c, i) => <motion.span key={i} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre' }}
        variants={{ h: { opacity: 0, y: 60, rotate: -14, scale: 0.6 }, v: { opacity: 1, y: 0, rotate: 0, scale: 1 } }} transition={{ type: 'spring', stiffness: 130, damping: 9 }}>{c}</motion.span>)}
    </motion.h1>
  )
}
function W({ w, p, i, n }) {
  const o = useTransform(p, [i / n, (i + 1) / n], [0.12, 1]), y = useTransform(p, [i / n, (i + 1) / n], [18, 0])
  return <motion.span style={{ opacity: o, y, display: 'inline-block', marginRight: '.28em' }}>{w}</motion.span>
}
// Words light up one by one as you scroll.
export function ScrollWords({ text }) {
  const ref = useRef(), { scrollYProgress: p } = useScroll({ target: ref, offset: ['start 0.92', 'start 0.4'] }), ws = text.split(' ')
  return <div ref={ref} className="big">{ws.map((w, i) => <W key={i} w={w} p={p} i={i} n={ws.length} />)}</div>
}

// Spring-based reveal: rises, fades and settles in as it enters the screen.
import { motion } from 'framer-motion'
export default function R({ as: T = 'div', className = '', ...p }) {
  const M = motion[T]
  return <M className={className} initial={{ opacity: 0, y: 46, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }} transition={{ type: 'spring', stiffness: 70, damping: 17, mass: 0.9 }} {...p} />
}

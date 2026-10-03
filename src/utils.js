import { useEffect, useRef } from 'react'
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.2 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return ref
}
export function burst(list) {
  for (let i = 0; i < 10; i++) {
    const e = document.createElement('span'); e.className = 'up'; e.textContent = list[i % list.length]
    e.style.left = 8 + Math.random() * 84 + 'vw'; e.style.top = 60 + Math.random() * 30 + 'vh'; e.style.animationDelay = Math.random() * 0.5 + 's'
    document.body.append(e); setTimeout(() => e.remove(), 2400)
  }
}

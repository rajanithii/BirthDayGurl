// "Did you eat?" gag: the NO button dodges, always staying inside the viewport.
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { burst } from '../utils'
const M = ['No? 🤨', 'Are you sure?', 'Bernice.', 'Nice try. 😭', 'I know you better than this.'], E = ['NOPE.', 'TRY AGAIN.', 'ABSOLUTELY NOT.', 'GO EAT.']
export default function NoGame() {
  const [n, setN] = useState(0), [pos, setPos] = useState(null), [msg, setMsg] = useState(''), [done, setDone] = useState(null)
  const last = useRef(0), btn = useRef()
  const flee = () => {
    const t = Date.now(); if (t - last.current < 450 || n >= 9) return; last.current = t
    const k = n + 1; setN(k); setMsg(n < 5 ? M[n] : '')
    if (k >= 9) return
    const w = btn.current.offsetWidth, h = btn.current.offsetHeight, m = 14
    setPos({ left: m + Math.random() * (innerWidth - w - 2 * m), top: Math.max(m + 50, m + Math.random() * (innerHeight - h - 2 * m)) })
  }
  const label = n >= 9 ? 'okay… fine 😭' : n >= 5 ? E[n - 5] : 'NO 😶'
  if (done) return <p className="big">{done === 'yes' ? <>GOOD. 😌 We may continue.<br /><span className="hw">The birthday committee approves.</span></> : <>Okay fine. 😂<br /><span className="hw">Birthday rule #1: snacks are always welcome.</span></>}</p>
  return (<>
    <p className="big" style={{ minHeight: '2.4em' }}>{msg}</p>
    <button className="bt" onClick={() => { setDone('yes'); burst(['🌸', '✦', '✨']) }}>YES, I ATE ✓</button>
    {(() => { const fly = pos && n < 9, go = () => { if (n < 9) return flee(); setDone('no'); burst(['🍚', '🍛', '🍎', '🥟']) }
      return <>
        <button ref={btn} className="bt" style={fly ? { visibility: 'hidden' } : undefined} onPointerEnter={flee} onFocus={flee} onClick={go}>{label}</button>
        {fly && createPortal(<button className="bt" style={{ position: 'fixed', zIndex: 50, ...pos }} onPointerEnter={flee} onFocus={flee} onClick={go}>{label}</button>, document.body)}
      </> })()}
  </>)
}

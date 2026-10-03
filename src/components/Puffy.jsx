// Original mascot: a pastel cloud-bot with a propeller beanie. Click for jokes.
import { useState } from 'react'
import { puffyJokes } from '../data'
export default function Puffy() {
  const [i, setI] = useState(-1)
  return (
    <button className="puffy" onClick={() => setI(v => (v + 1) % puffyJokes.length)} aria-label="Puffy the cloud buddy. Click for a joke.">
      {i >= 0 && <span className="say" key={i}>{puffyJokes[i]}</span>}
      <svg viewBox="0 0 120 110" width="86" aria-hidden="true">
        <g className="prop"><rect x="58" y="4" width="4" height="12" fill="#8a7fb8" /><ellipse cx="60" cy="4" rx="22" ry="3" fill="#f2a98c" /></g>
        <path d="M30 40a18 18 0 0 1 32-12 20 20 0 0 1 34 10 18 18 0 0 1 4 34H26a17 17 0 0 1 4-32z" fill="#e8f1fb" stroke="#9db8d8" strokeWidth="3" transform="translate(0 6)" />
        <circle cx="50" cy="52" r="5" fill="#3a3a46" /><circle cx="76" cy="52" r="5" fill="#3a3a46" /><circle cx="52" cy="50" r="1.6" fill="#fff" /><circle cx="78" cy="50" r="1.6" fill="#fff" />
        <ellipse cx="42" cy="66" rx="6" ry="4" fill="#f7b7cf" /><ellipse cx="86" cy="66" rx="6" ry="4" fill="#f7b7cf" /><path d="M54 64q9 10 18 0" stroke="#3a3a46" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="63" cy="94" r="7" fill="#f6c453" stroke="#c9a23a" strokeWidth="2" />
      </svg>
    </button>
  )
}

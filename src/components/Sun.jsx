export default function Sun() {
  return (
    <svg className="sun" viewBox="0 0 120 120" width="110" aria-hidden="true">
      <g className="rays" stroke="#f6c453" strokeWidth="6" strokeLinecap="round">{Array.from({ length: 12 }, (_, i) => <path key={i} d="M60 6v14" transform={`rotate(${i * 30} 60 60)`} />)}</g>
      <circle cx="60" cy="60" r="30" fill="#ffe08a" stroke="#f6c453" strokeWidth="3" /><circle cx="50" cy="56" r="3.5" fill="#3a3a46" /><circle cx="70" cy="56" r="3.5" fill="#3a3a46" />
      <path d="M50 68q10 9 20 0" stroke="#3a3a46" strokeWidth="3" fill="none" strokeLinecap="round" /><ellipse cx="44" cy="65" rx="5" ry="3" fill="#f7b7cf" /><ellipse cx="76" cy="65" rx="5" ry="3" fill="#f7b7cf" />
    </svg>
  )
}

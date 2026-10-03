export default function Kite({ color = '#f2a98c', className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 60 140" aria-hidden="true">
      <path d="M30 2L52 40 30 80 8 40Z" fill={color} stroke="#fff" strokeWidth="1.5" /><path d="M30 2V80M8 40H52" stroke="#fff" opacity=".8" />
      <path d="M30 80Q18 100 32 118T28 140" fill="none" stroke="#b9a98a" strokeWidth="1.2" /><circle cx="28" cy="100" r="3" fill="#fff" /><circle cx="32" cy="122" r="3" fill={color} />
    </svg>
  )
}

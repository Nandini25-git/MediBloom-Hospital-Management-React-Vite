import { Flower2 } from 'lucide-react'

export default function Logo() {
  return (
    <div className="logo">
      <span className="logo-mark" aria-hidden="true">
        <Flower2 size={20} />
      </span>
      <span className="logo-text">
        Medi<span>Bloom</span>
      </span>
    </div>
  )
}

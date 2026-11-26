import { useState } from 'react'
import { Mail, Phone, Star } from 'lucide-react'
import { doctors } from '../data/seed.js'
import { Badge, PageHeader } from '../components/ui.jsx'

const specialties = ['All', ...new Set(doctors.map((d) => d.specialty))]
const tones = ['lavender', 'mint', 'peach', 'sky', 'rose', 'butter']

export default function Doctors() {
  const [specialty, setSpecialty] = useState('All')
  const list = specialty === 'All' ? doctors : doctors.filter((d) => d.specialty === specialty)

  return (
    <div className="stack">
      <PageHeader title="Doctor directory" description={`${doctors.length} specialists across ${specialties.length - 1} departments`} />

      <div className="chips" role="group" aria-label="Filter by specialty">
        {specialties.map((s) => (
          <button key={s} className={`chip ${s === specialty ? 'is-active' : ''}`} onClick={() => setSpecialty(s)} aria-pressed={s === specialty}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid cards-grid">
        {list.map((d, i) => (
          <article key={d.id} className="card doctor-card">
            <div className="doctor-top">
              <span className={`avatar avatar-lg tone-${tones[i % tones.length]}`} aria-hidden="true">
                {d.name.replace('Dr. ', '').split(' ').map((n) => n[0]).join('')}
              </span>
              <Badge>{d.status}</Badge>
            </div>
            <h3>{d.name}</h3>
            <p className="muted small">{d.specialty} · {d.experience} yrs experience</p>
            <p className="rating small">
              <Star size={14} aria-hidden="true" fill="currentColor" /> {d.rating} rating
            </p>
            <div className="doctor-contact small">
              <a href={`tel:${d.phone.replace(/\s/g, '')}`}><Phone size={14} aria-hidden="true" /> {d.phone}</a>
              <a href={`mailto:${d.email}`}><Mail size={14} aria-hidden="true" /> Email</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

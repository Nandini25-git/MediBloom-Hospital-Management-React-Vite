import { BedDouble, MapPin, UserRound } from 'lucide-react'
import { departments, doctors } from '../data/seed.js'
import { PageHeader } from '../components/ui.jsx'

export default function Departments() {
  return (
    <div className="stack">
      <PageHeader title="Departments" description="Capacity and leadership across the hospital" />
      <div className="grid cards-grid">
        {departments.map((d) => {
          const pct = Math.round((d.occupied / d.beds) * 100)
          const staff = doctors.filter((doc) => doc.specialty === d.name).length
          return (
            <article key={d.id} className={`card dept-card tone-${d.tone}`}>
              <h3>{d.name}</h3>
              <p className="small dept-desc">{d.description}</p>
              <ul className="dept-meta small">
                <li><UserRound size={14} aria-hidden="true" /> {d.head} · {staff} doctor{staff === 1 ? '' : 's'}</li>
                <li><MapPin size={14} aria-hidden="true" /> {d.floor}</li>
                <li><BedDouble size={14} aria-hidden="true" /> {d.occupied} / {d.beds} beds occupied</li>
              </ul>
              <div className="progress progress-light" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${d.name} occupancy`}>
                <div className="progress-fill solid" style={{ width: `${pct}%` }} />
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

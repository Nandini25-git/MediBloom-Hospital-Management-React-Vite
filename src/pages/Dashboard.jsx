import { Link } from 'react-router-dom'
import { BedDouble, CalendarCheck, Stethoscope, Users } from 'lucide-react'
import { useHospital } from '../context/HospitalContext.jsx'
import { departments, doctors, invoices, weeklyAdmissions } from '../data/seed.js'
import { Badge, EmptyState, StatCard } from '../components/ui.jsx'

export default function Dashboard() {
  const { patients, appointments } = useHospital()
  const upcoming = appointments
    .filter((a) => a.status === 'Scheduled')
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
    .slice(0, 5)
  const available = doctors.filter((d) => d.status === 'Available').length
  const totalBeds = departments.reduce((sum, d) => sum + d.beds, 0)
  const occupiedBeds = departments.reduce((sum, d) => sum + d.occupied, 0)
  const revenue = invoices.filter((i) => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0)
  const maxAdmissions = Math.max(...weeklyAdmissions.map((d) => d.value))

  return (
    <div className="stack">
      <section className="grid stats-grid" aria-label="Key metrics">
        <StatCard icon={Users} label="Total patients" value={patients.length} hint="Active records" tone="lavender" />
        <StatCard icon={Stethoscope} label="Doctors on duty" value={`${available}/${doctors.length}`} hint="Available now" tone="mint" />
        <StatCard icon={CalendarCheck} label="Upcoming visits" value={upcoming.length} hint="Scheduled appointments" tone="peach" />
        <StatCard
          icon={BedDouble}
          label="Bed occupancy"
          value={`${Math.round((occupiedBeds / totalBeds) * 100)}%`}
          hint={`${occupiedBeds} of ${totalBeds} beds`}
          tone="sky"
        />
      </section>

      <section className="grid two-col">
        <div className="card">
          <div className="card-head">
            <h3>Weekly admissions</h3>
            <span className="muted small">{weeklyAdmissions.reduce((s, d) => s + d.value, 0)} this week</span>
          </div>
          <div className="bar-chart" role="img" aria-label="Bar chart of admissions per day this week">
            {weeklyAdmissions.map((d) => (
              <div key={d.day} className="bar-col">
                <span className="bar-value small">{d.value}</span>
                <div className="bar" style={{ height: `${(d.value / maxAdmissions) * 100}%` }} />
                <span className="muted small">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Department load</h3>
            <Link to="/departments" className="link small">View all</Link>
          </div>
          <ul className="progress-list">
            {departments.map((d) => {
              const pct = Math.round((d.occupied / d.beds) * 100)
              return (
                <li key={d.id}>
                  <div className="progress-label small">
                    <span>{d.name}</span>
                    <span className="muted">{pct}%</span>
                  </div>
                  <div className="progress" aria-hidden="true">
                    <div className={`progress-fill tone-${d.tone}`} style={{ width: `${pct}%` }} />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="grid two-col">
        <div className="card">
          <div className="card-head">
            <h3>Upcoming appointments</h3>
            <Link to="/appointments" className="link small">Manage</Link>
          </div>
          {upcoming.length === 0 ? (
            <EmptyState>No upcoming appointments.</EmptyState>
          ) : (
            <ul className="list">
              {upcoming.map((a) => (
                <li key={a.id} className="list-row">
                  <div>
                    <p className="strong">{a.patientName}</p>
                    <p className="muted small">{a.doctor} · {a.reason}</p>
                  </div>
                  <div className="text-right">
                    <p className="small strong">{a.time}</p>
                    <p className="muted small">{a.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Recent patients</h3>
            <span className="muted small">${revenue.toLocaleString()} collected</span>
          </div>
          <ul className="list">
            {patients.slice(0, 5).map((p) => (
              <li key={p.id} className="list-row">
                <div>
                  <p className="strong">{p.name}</p>
                  <p className="muted small">{p.department} · {p.age} yrs</p>
                </div>
                <Badge>{p.condition}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

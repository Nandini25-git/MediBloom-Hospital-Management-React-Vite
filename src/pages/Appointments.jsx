import { useState } from 'react'
import { CalendarPlus, Clock } from 'lucide-react'
import { useHospital } from '../context/HospitalContext.jsx'
import { doctors } from '../data/seed.js'
import { Badge, EmptyState, PageHeader } from '../components/ui.jsx'

const filters = ['All', 'Scheduled', 'Completed', 'Cancelled']

export default function Appointments() {
  const { patients, appointments, bookAppointment, cancelAppointment } = useHospital()
  const [filter, setFilter] = useState('All')
  const [form, setForm] = useState({ patientId: '', doctor: doctors[0].name, date: '', time: '', reason: '' })

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const patient = patients.find((p) => p.id === form.patientId)
    const doctor = doctors.find((d) => d.name === form.doctor)
    if (!patient || !doctor) return
    bookAppointment({ ...form, patientName: patient.name, department: doctor.specialty, reason: form.reason.trim() })
    setForm({ ...form, patientId: '', date: '', time: '', reason: '' })
  }

  const list = appointments
    .filter((a) => filter === 'All' || a.status === filter)
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))

  return (
    <div className="stack">
      <PageHeader title="Appointments" description="Book, track and cancel patient visits" />

      <div className="grid booking-layout">
        <form className="card stack-sm" onSubmit={handleSubmit} aria-label="Book appointment">
          <h3 className="with-icon"><CalendarPlus size={18} aria-hidden="true" /> Book appointment</h3>
          <label className="field">
            <span>Patient</span>
            <select value={form.patientId} onChange={update('patientId')} required>
              <option value="" disabled>Select a patient</option>
              {patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Doctor</span>
            <select value={form.doctor} onChange={update('doctor')}>
              {doctors.map((d) => (
                <option key={d.id} value={d.name} disabled={d.status === 'On Leave'}>
                  {d.name} — {d.specialty}{d.status === 'On Leave' ? ' (on leave)' : ''}
                </option>
              ))}
            </select>
          </label>
          <div className="row-2">
            <label className="field">
              <span>Date</span>
              <input type="date" value={form.date} onChange={update('date')} required />
            </label>
            <label className="field">
              <span>Time</span>
              <input type="time" value={form.time} onChange={update('time')} required />
            </label>
          </div>
          <label className="field">
            <span>Reason</span>
            <input value={form.reason} onChange={update('reason')} placeholder="e.g. Routine check-up" required />
          </label>
          <button type="submit" className="btn btn-primary btn-block">Confirm booking</button>
        </form>

        <div className="card">
          <div className="chips" role="group" aria-label="Filter appointments">
            {filters.map((f) => (
              <button key={f} className={`chip ${f === filter ? 'is-active' : ''}`} onClick={() => setFilter(f)} aria-pressed={f === filter}>
                {f}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <EmptyState>No appointments in this view.</EmptyState>
          ) : (
            <ul className="list">
              {list.map((a) => (
                <li key={a.id} className="list-row appointment-row">
                  <div className="date-pill" aria-hidden="true">
                    <span>{new Date(`${a.date}T00:00`).toLocaleDateString('en-US', { month: 'short' })}</span>
                    <strong>{a.date.slice(8)}</strong>
                  </div>
                  <div className="grow">
                    <p className="strong">{a.patientName}</p>
                    <p className="muted small">{a.doctor} · {a.department}</p>
                    <p className="muted small with-icon"><Clock size={12} aria-hidden="true" /> {a.time} · {a.reason}</p>
                  </div>
                  <div className="row-actions">
                    <Badge>{a.status}</Badge>
                    {a.status === 'Scheduled' && (
                      <button className="btn btn-ghost btn-sm" onClick={() => cancelAppointment(a.id)}>
                        Cancel<span className="sr-only"> appointment for {a.patientName}</span>
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

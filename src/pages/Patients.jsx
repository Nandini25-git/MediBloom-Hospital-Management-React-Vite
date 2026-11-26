import { useMemo, useState } from 'react'
import { Plus, Search, Trash2, X } from 'lucide-react'
import { useHospital } from '../context/HospitalContext.jsx'
import { departments } from '../data/seed.js'
import { Badge, EmptyState, PageHeader } from '../components/ui.jsx'

const emptyForm = { name: '', age: '', gender: 'Female', blood: 'O+', phone: '', department: departments[0].name, condition: 'Stable' }

export default function Patients() {
  const { patients, addPatient, removePatient } = useHospital()
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return patients
    return patients.filter((p) =>
      [p.name, p.id, p.department, p.condition, p.phone].some((v) => v.toLowerCase().includes(q)),
    )
  }, [patients, query])

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    addPatient({ ...form, name: form.name.trim(), age: Number(form.age) })
    setForm(emptyForm)
    setShowForm(false)
  }

  const handleRemove = (patient) => {
    if (window.confirm(`Remove ${patient.name} and their appointments?`)) removePatient(patient.id)
  }

  return (
    <div className="stack">
      <PageHeader
        title="Patient directory"
        description={`${patients.length} registered patients`}
        action={
          <button className="btn btn-primary" onClick={() => setShowForm((v) => !v)} aria-expanded={showForm}>
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? 'Close' : 'Add patient'}
          </button>
        }
      />

      {showForm && (
        <form className="card form-grid" onSubmit={handleSubmit} aria-label="Add patient">
          <label className="field span-2">
            <span>Full name</span>
            <input value={form.name} onChange={update('name')} required />
          </label>
          <label className="field">
            <span>Age</span>
            <input type="number" min="0" max="120" value={form.age} onChange={update('age')} required />
          </label>
          <label className="field">
            <span>Gender</span>
            <select value={form.gender} onChange={update('gender')}>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </label>
          <label className="field">
            <span>Blood group</span>
            <select value={form.blood} onChange={update('blood')}>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((b) => <option key={b}>{b}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Phone</span>
            <input type="tel" value={form.phone} onChange={update('phone')} required />
          </label>
          <label className="field">
            <span>Department</span>
            <select value={form.department} onChange={update('department')}>
              {departments.map((d) => <option key={d.id}>{d.name}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Condition</span>
            <select value={form.condition} onChange={update('condition')}>
              <option>Stable</option>
              <option>Recovering</option>
              <option>Critical</option>
            </select>
          </label>
          <div className="form-actions span-all">
            <button type="submit" className="btn btn-primary">Save patient</button>
          </div>
        </form>
      )}

      <div className="card">
        <label className="search">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search patients</span>
          <input
            type="search"
            placeholder="Search by name, ID, department or condition"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        {filtered.length === 0 ? (
          <EmptyState>No patients match your search.</EmptyState>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Patient</th>
                  <th scope="col">Age</th>
                  <th scope="col">Blood</th>
                  <th scope="col">Department</th>
                  <th scope="col">Admitted</th>
                  <th scope="col">Condition</th>
                  <th scope="col"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <p className="strong">{p.name}</p>
                      <p className="muted small">{p.id} · {p.phone}</p>
                    </td>
                    <td>{p.age}</td>
                    <td>{p.blood}</td>
                    <td>{p.department}</td>
                    <td>{p.admitted}</td>
                    <td><Badge>{p.condition}</Badge></td>
                    <td className="text-right">
                      <button className="icon-btn danger" onClick={() => handleRemove(p)} aria-label={`Remove ${p.name}`}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

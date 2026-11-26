import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useHospital } from '../context/HospitalContext.jsx'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { PageHeader } from '../components/ui.jsx'

export default function Settings() {
  const { user, updateProfile } = useAuth()
  const { resetData } = useHospital()
  const [name, setName] = useState(user.name)
  const [saved, setSaved] = useState(false)
  const [prefs, setPrefs] = useLocalStorage('medibloom-prefs', { hospital: 'MediBloom General Hospital', emailAlerts: true, smsAlerts: false })

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile({ name: name.trim() || user.name })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    if (window.confirm('Restore demo patients and appointments? Your changes will be lost.')) resetData()
  }

  return (
    <div className="stack">
      <PageHeader title="Workspace settings" description="Manage your profile and hospital preferences" />

      <div className="grid two-col">
        <form className="card stack-sm" onSubmit={handleSubmit}>
          <h3>Profile</h3>
          <label className="field">
            <span>Display name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="field">
            <span>Email</span>
            <input value={user.email} disabled />
          </label>
          <label className="field">
            <span>Hospital name</span>
            <input value={prefs.hospital} onChange={(e) => setPrefs({ ...prefs, hospital: e.target.value })} />
          </label>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save changes</button>
            {saved && <span className="small success" role="status">Saved</span>}
          </div>
        </form>

        <div className="stack">
          <div className="card stack-sm">
            <h3>Notifications</h3>
            <label className="toggle">
              <input type="checkbox" checked={prefs.emailAlerts} onChange={(e) => setPrefs({ ...prefs, emailAlerts: e.target.checked })} />
              <span>Email alerts for new appointments</span>
            </label>
            <label className="toggle">
              <input type="checkbox" checked={prefs.smsAlerts} onChange={(e) => setPrefs({ ...prefs, smsAlerts: e.target.checked })} />
              <span>SMS alerts for critical patients</span>
            </label>
          </div>

          <div className="card stack-sm">
            <h3>Demo data</h3>
            <p className="muted small">Data is stored in this browser only. Do not enter real patient information.</p>
            <button className="btn btn-ghost" onClick={handleReset}>
              <RotateCcw size={16} aria-hidden="true" /> Reset demo data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

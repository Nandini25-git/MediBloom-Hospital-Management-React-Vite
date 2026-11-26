import { useState } from 'react'
import { HeartPulse, ShieldCheck, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import Logo from '../components/Logo.jsx'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('admin@medibloom.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!login(email, password)) setError('Invalid email or password. Try the demo credentials below.')
  }

  return (
    <div className="login-page">
      <section className="login-hero" aria-hidden="true">
        <Logo />
        <div>
          <h1>Care that blooms, management that flows.</h1>
          <p>Patients, doctors, appointments and billing — gathered in one calm, colourful workspace.</p>
        </div>
        <ul className="login-features">
          <li><HeartPulse size={18} /> Real-time patient overview</li>
          <li><Sparkles size={18} /> Effortless appointment booking</li>
          <li><ShieldCheck size={18} /> Organised billing records</li>
        </ul>
      </section>

      <section className="login-panel">
        <form className="card login-card" onSubmit={handleSubmit}>
          <div className="mobile-only"><Logo /></div>
          <h2>Sign in</h2>
          <p className="muted">Access your hospital workspace</p>

          <label className="field">
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              required
            />
          </label>

          {error && <p className="error" role="alert">{error}</p>}

          <button type="submit" className="btn btn-primary btn-block">Sign in</button>

          <div className="demo-box">
            <p className="small"><strong>Demo login</strong></p>
            <p className="small muted">admin@medibloom.com · medibloom</p>
          </div>
        </form>
      </section>
    </div>
  )
}

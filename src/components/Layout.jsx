import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  Building2,
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Stethoscope,
  Users,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import Logo from './Logo.jsx'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/patients', label: 'Patients', icon: Users },
  { to: '/doctors', label: 'Doctors', icon: Stethoscope },
  { to: '/appointments', label: 'Appointments', icon: CalendarDays },
  { to: '/departments', label: 'Departments', icon: Building2 },
  { to: '/billing', label: 'Billing', icon: CreditCard },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const current = navItems.find((item) => (item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)))

  const initials = user.name
    .replace('Dr. ', '')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  return (
    <div className="shell">
      <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <div className="sidebar-top">
          <Logo />
          <button className="icon-btn mobile-only" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav>
          <ul className="nav-list">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} className="nav-link" onClick={() => setMenuOpen(false)}>
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-card">
          <p className="sidebar-card-title">Emergency line</p>
          <p className="sidebar-card-value">+1 555 0911</p>
          <p className="muted small">Available 24/7 for urgent care</p>
        </div>
      </aside>

      {menuOpen && <div className="backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />}

      <div className="main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-btn mobile-only" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu size={20} />
            </button>
            <div>
              <p className="muted small">Welcome back, {user.name.split(' ').slice(0, 2).join(' ')}</p>
              <h1 className="topbar-title">{current?.label ?? 'MediBloom'}</h1>
            </div>
          </div>
          <div className="topbar-right">
            <div className="user-chip">
              <span className="avatar" aria-hidden="true">{initials}</span>
              <span className="user-meta">
                <strong>{user.name}</strong>
                <span className="muted small">{user.role}</span>
              </span>
            </div>
            <button className="icon-btn" onClick={logout} aria-label="Log out" title="Log out">
              <LogOut size={18} />
            </button>
          </div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

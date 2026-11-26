export function PageHeader({ title, description, action }) {
  return (
    <div className="page-header">
      <div>
        <h2>{title}</h2>
        {description && <p className="muted">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function StatCard({ icon: Icon, label, value, hint, tone = 'lavender' }) {
  return (
    <div className={`card stat-card tone-${tone}`}>
      <span className="stat-icon" aria-hidden="true">
        <Icon size={20} />
      </span>
      <div>
        <p className="muted small">{label}</p>
        <p className="stat-value">{value}</p>
        {hint && <p className="small stat-hint">{hint}</p>}
      </div>
    </div>
  )
}

const badgeTones = {
  Stable: 'mint',
  Recovering: 'sky',
  Critical: 'rose',
  Available: 'mint',
  'In Surgery': 'peach',
  'On Leave': 'neutral',
  Scheduled: 'lavender',
  Completed: 'mint',
  Cancelled: 'neutral',
  Paid: 'mint',
  Pending: 'butter',
  Overdue: 'rose',
}

export function Badge({ children }) {
  return <span className={`badge tone-${badgeTones[children] ?? 'neutral'}`}>{children}</span>
}

export function EmptyState({ children }) {
  return <p className="empty">{children}</p>
}

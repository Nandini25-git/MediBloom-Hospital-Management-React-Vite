import { AlertCircle, CheckCircle2, Hourglass, Wallet } from 'lucide-react'
import { invoices } from '../data/seed.js'
import { Badge, PageHeader, StatCard } from '../components/ui.jsx'

const sum = (status) => invoices.filter((i) => !status || i.status === status).reduce((t, i) => t + i.amount, 0)
const money = (n) => `$${n.toLocaleString()}`

export default function Billing() {
  return (
    <div className="stack">
      <PageHeader title="Billing overview" description="Invoices and payment status for this month" />

      <section className="grid stats-grid" aria-label="Billing summary">
        <StatCard icon={Wallet} label="Total billed" value={money(sum())} tone="lavender" />
        <StatCard icon={CheckCircle2} label="Collected" value={money(sum('Paid'))} tone="mint" />
        <StatCard icon={Hourglass} label="Pending" value={money(sum('Pending'))} tone="butter" />
        <StatCard icon={AlertCircle} label="Overdue" value={money(sum('Overdue'))} tone="rose" />
      </section>

      <div className="card">
        <div className="card-head"><h3>Invoices</h3></div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Invoice</th>
                <th scope="col">Patient</th>
                <th scope="col">Service</th>
                <th scope="col">Date</th>
                <th scope="col" className="text-right">Amount</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id}>
                  <td className="strong">{i.id}</td>
                  <td>{i.patient}</td>
                  <td>{i.service}</td>
                  <td>{i.date}</td>
                  <td className="text-right strong">{money(i.amount)}</td>
                  <td><Badge>{i.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

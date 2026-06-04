import { useMemo, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { usePortalStore } from '../store/PortalStore'
import { technicianById } from '../data/portalData'
import { Card, FadeIn, StatusPill, JobStatusBadge, JOB_LABEL, JOB_SHORT, formatDate } from '../ui/ui'

export default function Accounts() {
  const { customerId } = useParams()
  if (customerId) return <AccountDetail customerId={customerId} />
  return <AccountList />
}

function AccountList() {
  const { user } = useAuth()
  const { customers } = usePortalStore()
  const spId = user?.refId ?? 'qc'
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const base = customers.filter((c) => c.servicePointId === spId)
    if (!q.trim()) return base
    const t = q.toLowerCase()
    return base.filter((c) => c.name.toLowerCase().includes(t) || c.address.toLowerCase().includes(t) || c.model.toLowerCase().includes(t))
  }, [customers, spId, q])

  return (
    <div className="space-y-5">
      <FadeIn>
        <h1 className="text-2xl font-extrabold tracking-tight text-eco-navy">Customer accounts</h1>
        <p className="mt-1 text-sm text-eco-body/60">Every homeowner in the territory — the same people they see as "their" dashboard.</p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, address or model…"
          className="w-full rounded-2xl border border-eco-navy/10 bg-white px-4 py-3 text-sm text-eco-navy shadow-eco-soft outline-none transition focus:border-eco-green focus:ring-2 focus:ring-eco-green/20"
        />
      </FadeIn>

      <FadeIn delay={0.08}>
        <Card className="overflow-hidden">
          <ul className="divide-y divide-eco-navy/6">
            {list.map((c) => (
              <li key={c.id}>
                <Link to={`/portal/sp/accounts/${c.id}`} className="flex items-center gap-4 p-4 transition hover:bg-eco-offwhite/50">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-eco-navy/5 text-sm font-bold text-eco-navy">
                    {c.name.split(' ').map((p) => p[0]).join('')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-eco-navy">{c.name}</p>
                    <p className="truncate text-xs text-eco-body/55">{c.address}</p>
                  </div>
                  <span className="hidden text-xs text-eco-body/55 sm:block">{c.model}</span>
                  <StatusPill status={c.status} pulse={false} />
                </Link>
              </li>
            ))}
            {list.length === 0 && <li className="p-6 text-center text-sm text-eco-body/50">No matches.</li>}
          </ul>
        </Card>
      </FadeIn>
    </div>
  )
}

function AccountDetail({ customerId }: { customerId: string }) {
  const navigate = useNavigate()
  const { getCustomer, jobs } = usePortalStore()
  const customer = getCustomer(customerId)

  if (!customer) {
    return (
      <Card className="p-8 text-center">
        <p className="text-sm text-eco-body/60">Account not found.</p>
        <Link to="/portal/sp/accounts" className="eco-btn-primary mt-4 inline-flex text-sm">Back to accounts</Link>
      </Card>
    )
  }

  const custJobs = jobs
    .filter((j) => j.customerId === customer.id)
    .sort((a, b) => +new Date(b.scheduledDate) - +new Date(a.scheduledDate))

  return (
    <div className="space-y-5">
      <FadeIn>
        <button onClick={() => navigate('/portal/sp/accounts')} className="text-sm font-medium text-eco-body/60 hover:text-eco-navy">
          ← All accounts
        </button>
        <div className="mt-2 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-eco-navy text-sm font-bold text-white">
            {customer.name.split(' ').map((p) => p[0]).join('')}
          </span>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-eco-navy">{customer.name}</h1>
            <p className="text-sm text-eco-body/60">{customer.address}</p>
          </div>
        </div>
      </FadeIn>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* System & status — the operator's view of the same customer */}
        <FadeIn delay={0.05}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">System & status</p>
              <StatusPill status={customer.status} pulse={false} />
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <Row k="Model" v={customer.model} />
              <Row k="Installed" v={formatDate(customer.installDate)} />
              <Row k="Warranty until" v={formatDate(customer.warrantyUntil)} />
              <Row k="Phone" v={customer.phone} />
              <Row k="Litres (lifetime)" v={`${customer.litresLifetime.toLocaleString('en-US')} L`} />
            </dl>
          </Card>
        </FadeIn>

        {/* Jobs */}
        <FadeIn delay={0.08}>
          <Card className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">Jobs & work orders</p>
            <ul className="mt-3 space-y-2">
              {custJobs.map((j) => (
                <li key={j.id}>
                  <Link
                    to={`/portal/sp/work-order/${j.id}`}
                    className="flex items-center gap-3 rounded-xl border border-eco-navy/8 p-3 transition hover:border-eco-green/30"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-eco-navy">{JOB_SHORT[j.type]}</p>
                      <p className="text-xs text-eco-body/55">{formatDate(j.scheduledDate)} · {technicianById(j.technicianId)?.name}</p>
                    </div>
                    <JobStatusBadge status={j.status} />
                  </Link>
                </li>
              ))}
              {custJobs.length === 0 && <li className="text-sm text-eco-body/50">No jobs on file.</li>}
            </ul>
          </Card>
        </FadeIn>

        {/* Service history (reflects completed work orders live) */}
        <FadeIn delay={0.1}>
          <Card className="p-6 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">Service history</p>
            <ul className="mt-3 divide-y divide-eco-navy/6">
              {customer.serviceHistory.map((v) => (
                <li key={v.id} className="flex items-start gap-3 py-3">
                  <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-eco-green/12 text-xs text-eco-green-dark">✓</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-eco-navy">{JOB_LABEL[v.type]}</p>
                    <p className="text-sm text-eco-body/60">{v.summary} · {v.technician}</p>
                  </div>
                  <span className="shrink-0 text-xs text-eco-body/45">{formatDate(v.date)}</span>
                </li>
              ))}
            </ul>
          </Card>
        </FadeIn>
      </div>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-eco-body/50">{k}</dt>
      <dd className="text-right font-medium text-eco-navy">{v}</dd>
    </div>
  )
}

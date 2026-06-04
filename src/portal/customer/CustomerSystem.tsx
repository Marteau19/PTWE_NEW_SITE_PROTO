import { useAuth } from '../auth/AuthContext'
import { usePortalStore } from '../store/PortalStore'
import { servicePointName } from '../data/portalData'
import { servicePoints } from '../../data/servicePoints'
import { Card, FadeIn, StatusPill, JOB_LABEL, formatDate } from '../ui/ui'

export default function CustomerSystem() {
  const { user } = useAuth()
  const { getCustomer } = usePortalStore()
  const customer = getCustomer(user?.refId ?? '')
  if (!customer) return null
  const sp = servicePoints.find((s) => s.id === customer.servicePointId)

  return (
    <div className="space-y-5">
      <FadeIn>
        <h1 className="text-2xl font-extrabold tracking-tight text-eco-navy sm:text-3xl">My system</h1>
        <p className="mt-1 text-sm text-eco-body/60">Your installation, journey, and the team that cares for it.</p>
      </FadeIn>

      {/* Project timeline */}
      <FadeIn delay={0.05}>
        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">Your project</p>
          <ol className="mt-5 space-y-0">
            {customer.timeline.map((step, i) => {
              const last = i === customer.timeline.length - 1
              return (
                <li key={step.label} className="relative flex gap-4 pb-7 last:pb-0">
                  {!last && (
                    <span
                      className={`absolute left-[11px] top-6 h-full w-0.5 ${
                        step.status === 'done' ? 'bg-eco-green' : 'bg-eco-navy/10'
                      }`}
                    />
                  )}
                  <span
                    className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                      step.status === 'done'
                        ? 'bg-eco-green text-white'
                        : step.status === 'current'
                          ? 'bg-eco-green/15 text-eco-green-dark ring-2 ring-eco-green'
                          : 'bg-eco-navy/8 text-eco-body/50'
                    }`}
                  >
                    {step.status === 'done' ? '✓' : i + 1}
                  </span>
                  <div className="pt-0.5">
                    <p className="text-sm font-semibold text-eco-navy">{step.label}</p>
                    {step.status === 'current' && (
                      <p className="text-xs font-medium text-eco-green">In progress now</p>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </Card>
      </FadeIn>

      {/* System details */}
      <FadeIn delay={0.08}>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">System details</p>
            <StatusPill status={customer.status} />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            <Detail label="Model" value={customer.model} />
            <Detail label="Installed" value={formatDate(customer.installDate)} />
            <Detail label="Warranty until" value={formatDate(customer.warrantyUntil)} />
            <Detail label="Location" value={customer.region} />
            <Detail label="Address" value={customer.address} className="col-span-2 sm:col-span-1" />
          </dl>
        </Card>
      </FadeIn>

      {/* Service Point card */}
      <FadeIn delay={0.11}>
        <Card className="overflow-hidden">
          <div className="bg-eco-navy p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-eco-green">Local team near you</p>
            <p className="mt-2 text-xl font-bold">{servicePointName} Service Point</p>
            <p className="mt-1 text-sm text-white/65">
              {sp?.country} · your dedicated Ecoflo team for installation, maintenance, and support.
            </p>
          </div>
          <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-eco-body/70">
              <p>📞 +1 800 632-6356</p>
              <p className="mt-1">✉️ quebec@ecoflo.com</p>
            </div>
            <a href="tel:+18006326356" className="eco-btn-primary text-sm">
              Contact your Service Point
            </a>
          </div>
        </Card>
      </FadeIn>

      {/* Service history */}
      <FadeIn delay={0.14}>
        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">Service history</p>
          <ul className="mt-4 divide-y divide-eco-navy/6">
            {customer.serviceHistory.map((v) => (
              <li key={v.id} className="flex items-start gap-3 py-3">
                <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-eco-green/12 text-xs text-eco-green-dark">
                  ✓
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-eco-navy">{JOB_LABEL[v.type]}</p>
                  <p className="text-sm text-eco-body/60">{v.summary}</p>
                  <p className="text-xs text-eco-body/45">{v.technician}</p>
                </div>
                <span className="shrink-0 text-xs text-eco-body/45">{formatDate(v.date)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </FadeIn>
    </div>
  )
}

function Detail({ label, value, className = '' }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-eco-body/45">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-eco-navy">{value}</dd>
    </div>
  )
}

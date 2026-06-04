import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { usePortalStore } from '../store/PortalStore'
import { technicianById, customerById } from '../data/portalData'
import { Card, FadeIn, StatTile, JobStatusBadge, JOB_SHORT, formatDate } from '../ui/ui'

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}
function isThisWeek(d: Date) {
  const now = new Date()
  const diff = (+d - +now) / (1000 * 60 * 60 * 24)
  return diff >= -1 && diff <= 7
}

export default function MyDay() {
  const { user } = useAuth()
  const { jobs } = usePortalStore()
  const spId = user?.refId ?? 'qc'
  const spJobs = jobs.filter((j) => j.servicePointId === spId)

  const now = new Date()
  const todayJobs = spJobs.filter((j) => isSameDay(new Date(j.scheduledDate), now))
  const open = spJobs.filter((j) => j.status !== 'completed')
  const fmrThisWeek = spJobs.filter((j) => j.type === 'FMR' && j.status !== 'completed' && isThisWeek(new Date(j.scheduledDate)))
  const upcoming = [...open].sort((a, b) => +new Date(a.scheduledDate) - +new Date(b.scheduledDate))
  const nextStop = upcoming[0]
  const nextCustomer = nextStop ? customerById(nextStop.customerId) : null

  return (
    <div className="space-y-5">
      <FadeIn>
        <h1 className="text-2xl font-extrabold tracking-tight text-eco-navy">My Day</h1>
        <p className="mt-1 text-sm text-eco-body/60">{formatDate(now.toISOString(), { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </FadeIn>

      {/* KPI strip */}
      <FadeIn delay={0.05}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Jobs today" value={todayJobs.length} accent />
          <StatTile label="Open work orders" value={open.length} />
          <StatTile label="FMR due this week" value={fmrThisWeek.length} />
          <StatTile label="Team on shift" value={4} />
        </div>
      </FadeIn>

      {/* Next stop */}
      {nextStop && nextCustomer && (
        <FadeIn delay={0.08}>
          <Card className="overflow-hidden">
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-green">Next stop</p>
                <p className="mt-2 text-xl font-bold text-eco-navy">
                  {nextCustomer.name} · {JOB_SHORT[nextStop.type]}
                </p>
                <p className="mt-1 text-sm text-eco-body/65">{nextStop.address}</p>
                <p className="mt-1 text-sm text-eco-body/65">
                  {formatDate(nextStop.scheduledDate, { weekday: 'short', month: 'short', day: 'numeric' })} ·{' '}
                  {nextStop.windowLabel} · {technicianById(nextStop.technicianId)?.name}
                </p>
              </div>
              <Link to={`/portal/sp/work-order/${nextStop.id}`} className="eco-btn-primary text-sm">
                Open work order →
              </Link>
            </div>
          </Card>
        </FadeIn>
      )}

      {/* Upcoming jobs list */}
      <FadeIn delay={0.11}>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">Upcoming jobs</p>
            <Link to="/portal/sp/schedule" className="text-xs font-semibold text-eco-green hover:text-eco-green-dark">
              View route →
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-eco-navy/6">
            {upcoming.map((j) => {
              const c = customerById(j.customerId)
              return (
                <li key={j.id}>
                  <Link to={`/portal/sp/work-order/${j.id}`} className="flex items-center gap-3 py-3 transition hover:bg-eco-offwhite/50">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-eco-navy/5 text-sm">
                      {j.type === 'FMR' ? '🔄' : j.type === 'inspection' ? '🔍' : j.type === 'pumping' ? '💧' : '🛠️'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-eco-navy">{c?.name} · {JOB_SHORT[j.type]}</p>
                      <p className="truncate text-xs text-eco-body/55">{j.address}</p>
                    </div>
                    <div className="hidden text-right text-xs text-eco-body/55 sm:block">
                      <p>{formatDate(j.scheduledDate, { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                      <p>{j.windowLabel}</p>
                    </div>
                    <JobStatusBadge status={j.status} />
                  </Link>
                </li>
              )
            })}
          </ul>
        </Card>
      </FadeIn>
    </div>
  )
}

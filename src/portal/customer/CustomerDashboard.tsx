import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../auth/AuthContext'
import { usePortalStore } from '../store/PortalStore'
import { technicianById, servicePointName } from '../data/portalData'
import {
  Card,
  FadeIn,
  StatusPill,
  StatTile,
  AnimatedNumber,
  JOB_LABEL,
  formatDate,
  formatDateTime,
} from '../ui/ui'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export default function CustomerDashboard() {
  const { user } = useAuth()
  const { getCustomer, jobs } = usePortalStore()
  const reduced = usePrefersReducedMotion()
  const customer = getCustomer(user?.refId ?? '')
  if (!customer) return null

  const firstName = customer.name.split(' ')[0]
  const upcoming = jobs
    .filter((j) => j.customerId === customer.id && j.status !== 'completed')
    .sort((a, b) => +new Date(a.scheduledDate) - +new Date(b.scheduledDate))[0]
  const tech = upcoming ? technicianById(upcoming.technicianId) : null
  const lastVisit = customer.serviceHistory.find((v) => v.completed)
  const lastMsg = customer.messages[customer.messages.length - 1]

  return (
    <div className="space-y-5">
      <FadeIn>
        <p className="text-sm text-eco-body/60">Good morning,</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-eco-navy sm:text-3xl">{firstName}.</h1>
      </FadeIn>

      {/* Hero status card */}
      <FadeIn delay={0.05}>
        <Card className="relative overflow-hidden p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-eco-green/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-eco-body/50">Your system</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-3xl font-extrabold tracking-tight text-eco-navy sm:text-4xl">
                  Everything's handled
                </span>
              </div>
              <div className="mt-4">
                <StatusPill status={customer.status} />
              </div>
              <p className="mt-4 max-w-sm text-sm text-eco-body/70">
                {customer.model} · cared for by your {servicePointName} Service Point.
              </p>
            </div>

            {/* Live droplet badge */}
            <motion.div
              className="relative flex h-32 w-32 shrink-0 items-center justify-center self-start rounded-full bg-gradient-to-b from-eco-green/15 to-eco-green/5"
              animate={reduced ? undefined : { scale: [1, 1.03, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="absolute inline-flex h-32 w-32 rounded-full bg-eco-green/20 animate-pulse-ring" />
              <svg viewBox="0 0 24 24" className="h-14 w-14 text-eco-green" fill="currentColor" aria-hidden>
                <path d="M12 2.5S5 10 5 14.5a7 7 0 0014 0C19 10 12 2.5 12 2.5z" />
              </svg>
            </motion.div>
          </div>
        </Card>
      </FadeIn>

      {/* Next maintenance */}
      <FadeIn delay={0.1}>
        <Card className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-green">Next maintenance</p>
              {upcoming ? (
                <>
                  <p className="mt-2 text-xl font-bold text-eco-navy">
                    {JOB_LABEL[upcoming.type]} · {formatDate(upcoming.scheduledDate)}
                  </p>
                  <p className="mt-1 text-sm text-eco-body/65">
                    {upcoming.windowLabel} · {tech?.name} from your {servicePointName} Service Point is coming.
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm text-eco-body/65">Nothing scheduled — you're all caught up.</p>
              )}
            </div>
            {tech && (
              <div className="flex items-center gap-3 rounded-2xl bg-eco-offwhite/70 px-4 py-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-eco-green/15 text-sm font-bold text-eco-green-dark">
                  {tech.name.split(' ').map((p) => p[0]).join('')}
                </span>
                <div>
                  <p className="text-sm font-semibold text-eco-navy">{tech.name}</p>
                  <p className="text-xs text-eco-body/55">{tech.role}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </FadeIn>

      {/* Litres treated */}
      <FadeIn delay={0.13}>
        <div className="grid grid-cols-2 gap-4">
          <StatTile
            label="Treated this month"
            value={<><AnimatedNumber value={customer.litresThisMonth} /> L</>}
            sub="No energy used"
            accent
          />
          <StatTile
            label="Lifetime treated"
            value={<><AnimatedNumber value={customer.litresLifetime} /> L</>}
            sub={`Since ${formatDate(customer.installDate, { year: 'numeric', month: 'short' })}`}
          />
        </div>
      </FadeIn>

      {/* Quick actions */}
      <FadeIn delay={0.16}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <QuickAction to="/portal/book" emoji="🗓️" label="Book a service" hint="FMR, inspection, repair" />
          <QuickAction to="/portal/store" emoji="🔄" label="Reorder filter media" hint="Genuine coco media" />
          <QuickAction to="/portal/system" emoji="📍" label="Your Service Point" hint={servicePointName} />
        </div>
      </FadeIn>

      {/* Recent activity */}
      <FadeIn delay={0.19}>
        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">Recent activity</p>
          <div className="mt-4 space-y-4">
            {lastVisit && (
              <ActivityRow
                emoji="✅"
                title={`${JOB_LABEL[lastVisit.type]} completed`}
                detail={`${lastVisit.summary} · ${lastVisit.technician}`}
                when={formatDate(lastVisit.date)}
              />
            )}
            {lastMsg && (
              <ActivityRow
                emoji="💬"
                title={lastMsg.from === 'servicePoint' ? `Message from ${servicePointName}` : 'You replied'}
                detail={lastMsg.body}
                when={formatDateTime(lastMsg.date)}
              />
            )}
          </div>
        </Card>
      </FadeIn>
    </div>
  )
}

function QuickAction({ to, emoji, label, hint }: { to: string; emoji: string; label: string; hint: string }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-2xl border border-eco-navy/8 bg-white p-4 shadow-eco-soft transition hover:-translate-y-0.5 hover:border-eco-green/30"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-eco-green-tint text-lg">{emoji}</span>
      <div>
        <p className="text-sm font-semibold text-eco-navy">{label}</p>
        <p className="text-xs text-eco-body/55">{hint}</p>
      </div>
    </Link>
  )
}

function ActivityRow({ emoji, title, detail, when }: { emoji: string; title: string; detail: string; when: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-base">{emoji}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-eco-navy">{title}</p>
        <p className="truncate text-sm text-eco-body/60">{detail}</p>
      </div>
      <span className="shrink-0 text-xs text-eco-body/45">{when}</span>
    </div>
  )
}

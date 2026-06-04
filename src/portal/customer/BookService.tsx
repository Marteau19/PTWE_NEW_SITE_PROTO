import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../auth/AuthContext'
import { usePortalStore } from '../store/PortalStore'
import { technicians, servicePointName, type JobType } from '../data/portalData'
import { Card, FadeIn, JOB_LABEL, formatDate } from '../ui/ui'

const SERVICE_TYPES: { type: JobType; emoji: string; desc: string }[] = [
  { type: 'FMR', emoji: '🔄', desc: 'Filter media replacement — every ~5 years' },
  { type: 'inspection', emoji: '🔍', desc: 'Annual check of all parameters' },
  { type: 'pumping', emoji: '💧', desc: 'Tank pumping and cleaning' },
  { type: 'repair', emoji: '🛠️', desc: 'Diagnose and fix a specific issue' },
]

// Build a few selectable upcoming weekday slots.
function nextSlots(count = 6): string[] {
  const out: string[] = []
  const d = new Date()
  d.setHours(8, 30, 0, 0)
  while (out.length < count) {
    d.setDate(d.getDate() + 1)
    const day = d.getDay()
    if (day !== 0 && day !== 6) out.push(new Date(d).toISOString())
  }
  return out
}

export default function BookService() {
  const { user } = useAuth()
  const { getCustomer, bookService } = usePortalStore()
  const navigate = useNavigate()
  const customer = getCustomer(user?.refId ?? '')
  const slots = useMemo(() => nextSlots(), [])

  const [type, setType] = useState<JobType | null>(null)
  const [date, setDate] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  if (!customer) return null
  const tech = technicians.find((t) => t.servicePointId === customer.servicePointId)!

  const confirm = () => {
    if (!type || !date) return
    bookService({ customerId: customer.id, type, date, technicianId: tech.id })
    setDone(true)
  }

  if (done) {
    return (
      <FadeIn>
        <Card className="mx-auto max-w-md p-8 text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-eco-green text-2xl text-white"
          >
            ✓
          </motion.div>
          <h2 className="mt-5 text-xl font-bold text-eco-navy">You're booked.</h2>
          <p className="mt-2 text-sm text-eco-body/65">
            {type && JOB_LABEL[type]} on {date && formatDate(date)}. Your {servicePointName} Service Point has
            it on the schedule — {tech.name} will be in touch.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={() => navigate('/portal')} className="eco-btn-primary text-sm">
              Back to home
            </button>
            <button
              onClick={() => {
                setDone(false)
                setType(null)
                setDate(null)
              }}
              className="eco-btn-outline text-sm"
            >
              Book another
            </button>
          </div>
        </Card>
      </FadeIn>
    )
  }

  return (
    <div className="space-y-5">
      <FadeIn>
        <h1 className="text-2xl font-extrabold tracking-tight text-eco-navy sm:text-3xl">Book a service</h1>
        <p className="mt-1 text-sm text-eco-body/60">A few taps and your Service Point takes it from here.</p>
      </FadeIn>

      {/* Step 1 — service type */}
      <FadeIn delay={0.05}>
        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">1 · Service type</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SERVICE_TYPES.map((s) => (
              <button
                key={s.type}
                onClick={() => setType(s.type)}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                  type === s.type
                    ? 'border-eco-green bg-eco-green-tint/50 ring-1 ring-eco-green'
                    : 'border-eco-navy/8 hover:border-eco-green/30'
                }`}
              >
                <span className="text-xl">{s.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-eco-navy">{JOB_LABEL[s.type]}</p>
                  <p className="text-xs text-eco-body/55">{s.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </FadeIn>

      {/* Step 2 — date */}
      <FadeIn delay={0.08}>
        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">2 · Pick a date</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {slots.map((s) => (
              <button
                key={s}
                onClick={() => setDate(s)}
                className={`rounded-2xl border p-3 text-center transition ${
                  date === s
                    ? 'border-eco-green bg-eco-green-tint/50 ring-1 ring-eco-green'
                    : 'border-eco-navy/8 hover:border-eco-green/30'
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-wide text-eco-body/50">
                  {new Date(s).toLocaleDateString('en-CA', { weekday: 'short' })}
                </p>
                <p className="text-sm font-bold text-eco-navy">
                  {new Date(s).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                </p>
                <p className="text-[11px] text-eco-body/50">8:30 AM</p>
              </button>
            ))}
          </div>
        </Card>
      </FadeIn>

      {/* Confirm */}
      <FadeIn delay={0.11}>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-sm text-eco-body/65">
            {type && date
              ? `${JOB_LABEL[type]} · ${formatDate(date)} · ${tech.name}`
              : 'Select a service type and date to continue.'}
          </p>
          <button onClick={confirm} disabled={!type || !date} className="eco-btn-primary text-sm disabled:cursor-not-allowed disabled:opacity-40">
            Confirm booking
          </button>
        </div>
      </FadeIn>
    </div>
  )
}

import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePortalStore } from '../store/PortalStore'
import { customerById, technicianById } from '../data/portalData'
import { Card, FadeIn, JobStatusBadge, StatusPill, JOB_LABEL, formatDate, formatDateTime } from '../ui/ui'

const CHECKLISTS: Record<string, string[]> = {
  FMR: ['Isolate and drain the filter', 'Remove spent coco media', 'Install new media kit', 'Replace gaskets & seals', 'Flush and restart system', 'Verify effluent clarity'],
  inspection: ['Check inlet & outlet', 'Inspect venting', 'Measure sludge depth', 'Confirm effluent parameters'],
  pumping: ['Locate access risers', 'Pump tank contents', 'Rinse interior', 'Confirm baffles intact'],
  repair: ['Diagnose reported issue', 'Replace faulty component', 'Test repair', 'Document outcome'],
  install: ['Excavate & set tank', 'Connect plumbing', 'Backfill & grade', 'Commission system'],
  'soil-test': ['Collect soil samples', 'Run percolation test', 'Record results'],
}

export default function WorkOrder() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { getJob, completeJob } = usePortalStore()
  const job = getJob(jobId ?? '')

  const checklistItems = job ? CHECKLISTS[job.type] ?? [] : []
  const [checked, setChecked] = useState<boolean[]>(() => checklistItems.map(() => false))
  const [note, setNote] = useState('')
  const [justCompleted, setJustCompleted] = useState(false)

  if (!job) {
    return (
      <Card className="p-8 text-center">
        <p className="text-sm text-eco-body/60">Work order not found.</p>
        <Link to="/portal/sp" className="eco-btn-primary mt-4 inline-flex text-sm">Back to My Day</Link>
      </Card>
    )
  }

  const customer = customerById(job.customerId)!
  const tech = technicianById(job.technicianId)
  const allChecked = checked.length > 0 && checked.every(Boolean)
  const isComplete = job.status === 'completed'

  const toggle = (i: number) => setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)))

  const markComplete = () => {
    completeJob(job.id, note)
    setJustCompleted(true)
  }

  return (
    <div className="space-y-5">
      <FadeIn>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-sm font-medium text-eco-body/60 hover:text-eco-navy">
            ← Back
          </button>
          <JobStatusBadge status={job.status} />
        </div>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-eco-navy">
          {JOB_LABEL[job.type]}
        </h1>
        <p className="mt-1 text-sm text-eco-body/60">
          Work order {job.id} · {formatDate(job.scheduledDate, { weekday: 'long', month: 'long', day: 'numeric' })} · {job.windowLabel}
        </p>
      </FadeIn>

      {/* Shared-state confirmation banner */}
      {justCompleted && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-2xl border border-eco-green/30 bg-eco-green-tint/60 p-4"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-eco-green text-white">✓</span>
          <div className="text-sm">
            <p className="font-semibold text-eco-green-dark">Work order completed.</p>
            <p className="text-eco-body/70">
              This visit is now in <strong>{customer.name}'s</strong> service history — switch to the Customer
              view to see it reflected live.
            </p>
          </div>
        </motion.div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        {/* Customer + system info (from shared dataset) */}
        <div className="space-y-5">
          <FadeIn delay={0.05}>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">Customer</p>
                <StatusPill status={customer.status} pulse={false} />
              </div>
              <p className="mt-3 text-lg font-bold text-eco-navy">{customer.name}</p>
              <p className="text-sm text-eco-body/65">{customer.address}</p>
              <p className="mt-1 text-sm text-eco-body/65">{customer.phone}</p>
              <Link
                to={`/portal/sp/accounts/${customer.id}`}
                className="mt-3 inline-flex text-xs font-semibold text-eco-green hover:text-eco-green-dark"
              >
                View full account →
              </Link>
            </Card>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Card className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">System</p>
              <dl className="mt-3 space-y-2 text-sm">
                <Row k="Model" v={customer.model} />
                <Row k="Installed" v={formatDate(customer.installDate)} />
                <Row k="Warranty" v={formatDate(customer.warrantyUntil)} />
                <Row k="Technician" v={tech?.name ?? '—'} />
              </dl>
              {job.notes && (
                <p className="mt-4 rounded-xl bg-eco-offwhite/70 p-3 text-sm text-eco-body/70">📝 {job.notes}</p>
              )}
            </Card>
          </FadeIn>
        </div>

        {/* Completion checklist + actions */}
        <FadeIn delay={0.1}>
          <Card className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">Completion checklist</p>
            <ul className="mt-4 space-y-2">
              {checklistItems.map((item, i) => (
                <li key={item}>
                  <button
                    onClick={() => toggle(i)}
                    disabled={isComplete}
                    className="flex w-full items-center gap-3 rounded-xl border border-eco-navy/8 p-3 text-left transition hover:border-eco-green/30 disabled:opacity-60"
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[11px] ${
                        checked[i] || isComplete
                          ? 'border-eco-green bg-eco-green text-white'
                          : 'border-eco-navy/20 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                    <span className={`text-sm ${checked[i] || isComplete ? 'text-eco-body/50 line-through' : 'text-eco-navy'}`}>
                      {item}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Notes + photo capture (mock) */}
            <div className="mt-5">
              <label className="mb-1.5 block text-xs font-semibold text-eco-body/60">Technician notes</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={isComplete}
                rows={2}
                placeholder="e.g. Media replaced, effluent clear, customer informed."
                className="w-full rounded-xl border border-eco-navy/12 bg-eco-offwhite/50 px-3 py-2.5 text-sm text-eco-navy outline-none transition focus:border-eco-green focus:ring-2 focus:ring-eco-green/20"
              />
              <div className="mt-3 flex gap-2">
                <button disabled={isComplete} className="flex items-center gap-2 rounded-xl border border-dashed border-eco-navy/20 px-3 py-2 text-xs font-medium text-eco-body/60 disabled:opacity-50">
                  📷 Add photo
                </button>
                <span className="flex items-center text-xs text-eco-body/40">2 photos attached (mock)</span>
              </div>
            </div>

            {/* Mark complete */}
            <div className="mt-6">
              {isComplete ? (
                <div className="rounded-xl bg-eco-green/10 p-4 text-center text-sm font-semibold text-eco-green-dark">
                  ✓ Completed {formatDateTime(new Date().toISOString())}
                </div>
              ) : (
                <button
                  onClick={markComplete}
                  disabled={!allChecked}
                  className="eco-btn-primary w-full py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {allChecked ? 'Mark work order complete' : 'Complete all checklist items first'}
                </button>
              )}
              {isComplete && (
                <Link to="/portal/sp" className="eco-btn-outline mt-3 inline-flex w-full justify-center text-sm">
                  Back to My Day
                </Link>
              )}
            </div>
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

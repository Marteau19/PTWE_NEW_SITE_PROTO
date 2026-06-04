// Shared portal UI primitives. Built on the existing eco-* tokens so the
// portal feels like the same product, one layer deeper.
import { motion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { SystemStatus, JobStatus, JobType } from '../data/portalData'

const EASE = [0.22, 1, 0.36, 1] as const

/** Soft, rounded surface — the calm building block of the customer side. */
export function Card({
  children,
  className = '',
  as: As = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'li'
}) {
  return (
    <As className={`rounded-3xl border border-eco-navy/8 bg-white shadow-eco-soft ${className}`}>
      {children}
    </As>
  )
}

/** Entry animation wrapper (mount-based; reveal as cards stagger in). */
export function FadeIn({
  children,
  delay = 0,
  className = '',
  y = 16,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const reduced = usePrefersReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: reduced ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Compact KPI / stat tile (used on both sides, denser on SP side). */
export function StatTile({
  label,
  value,
  sub,
  accent = false,
  className = '',
}: {
  label: string
  value: ReactNode
  sub?: string
  accent?: boolean
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        accent ? 'border-eco-green/25 bg-eco-green-tint/50' : 'border-eco-navy/8 bg-white'
      } ${className}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-eco-body/55">{label}</p>
      <p className="mt-1.5 text-2xl font-extrabold tracking-tight text-eco-navy sm:text-3xl">{value}</p>
      {sub && <p className="mt-1 text-xs text-eco-body/60">{sub}</p>}
    </div>
  )
}

const STATUS_MAP: Record<SystemStatus, { label: string; dot: string; text: string; bg: string }> = {
  'all-good': { label: 'All good', dot: 'bg-eco-green', text: 'text-eco-green-dark', bg: 'bg-eco-green/12' },
  'service-due': { label: 'Service due', dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-500/12' },
  attention: { label: 'Needs attention', dot: 'bg-rose-500', text: 'text-rose-700', bg: 'bg-rose-500/12' },
}

export function StatusPill({ status, pulse = true }: { status: SystemStatus; pulse?: boolean }) {
  const reduced = usePrefersReducedMotion()
  const s = STATUS_MAP[status]
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${s.bg} ${s.text}`}>
      <motion.span
        className={`h-2 w-2 rounded-full ${s.dot}`}
        animate={reduced || !pulse ? undefined : { opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      {s.label}
    </span>
  )
}

const JOB_STATUS_MAP: Record<JobStatus, { label: string; cls: string }> = {
  scheduled: { label: 'Scheduled', cls: 'bg-eco-navy/8 text-eco-navy' },
  'in-progress': { label: 'In progress', cls: 'bg-amber-500/15 text-amber-700' },
  completed: { label: 'Completed', cls: 'bg-eco-green/15 text-eco-green-dark' },
}

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const s = JOB_STATUS_MAP[status]
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${s.cls}`}>{s.label}</span>
}

export const JOB_LABEL: Record<JobType, string> = {
  FMR: 'Filter media replacement',
  inspection: 'Inspection',
  pumping: 'Pumping',
  repair: 'Repair',
  install: 'Installation',
  'soil-test': 'Soil test',
}

export const JOB_SHORT: Record<JobType, string> = {
  FMR: 'FMR',
  inspection: 'Inspection',
  pumping: 'Pumping',
  repair: 'Repair',
  install: 'Install',
  'soil-test': 'Soil test',
}

/** Smoothly animates a number when it mounts / changes (litres etc.). */
export function AnimatedNumber({
  value,
  format = (n: number) => Math.round(n).toLocaleString('en-US'),
  duration = 1.1,
}: {
  value: number
  format?: (n: number) => string
  duration?: number
}) {
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)
  const fromRef = useRef(0)
  const rafRef = useRef<number>()

  useEffect(() => {
    if (reduced) {
      setDisplay(value)
      return
    }
    const from = fromRef.current
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(from + (value - from) * eased)
      if (t < 1) rafRef.current = requestAnimationFrame(step)
      else fromRef.current = value
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value, duration, reduced])

  return <span className="tabular-nums">{format(display)}</span>
}

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions) {
  return new Date(iso).toLocaleDateString('en-CA', opts ?? { year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-CA', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

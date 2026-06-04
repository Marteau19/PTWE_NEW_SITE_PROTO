import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../auth/AuthContext'
import { reviews, computeRatingStats, type Review } from '../../data/reviews'
import type { JobType } from '../data/portalData'
import { Card, FadeIn, AnimatedNumber, JOB_SHORT, formatDate } from '../ui/ui'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type RatingFilter = 'All' | 'Positive' | 'Critical'
type ServiceFilter = 'All' | JobType

const SERVICE_OPTIONS: ('All' | JobType)[] = ['All', 'FMR', 'inspection', 'pumping', 'repair', 'install']

function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const cls = size === 'lg' ? 'text-2xl' : 'text-sm'
  return (
    <span className={`inline-flex gap-0.5 ${cls}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= rating ? 'text-amber-400' : 'text-eco-navy/15'}>★</span>
      ))}
    </span>
  )
}

export default function Reviews() {
  const { user } = useAuth()
  const spId = user?.refId ?? 'qc'
  const reduced = usePrefersReducedMotion()

  const { average, total, distribution } = computeRatingStats(spId)
  const maxDist = Math.max(...Object.values(distribution), 1)

  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('All')
  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>('All')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [sentReplies, setSentReplies] = useState<string[]>([])

  const filtered = reviews
    .filter((r) => r.servicePointId === spId)
    .filter((r) => {
      if (ratingFilter === 'Positive' && r.rating < 4) return false
      if (ratingFilter === 'Critical' && r.rating > 3) return false
      if (serviceFilter !== 'All' && r.serviceType !== serviceFilter) return false
      return true
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))

  const respondedCount = reviews.filter((r) => r.servicePointId === spId && (r.responded || sentReplies.includes(r.id))).length
  const responseRate = total ? Math.round((respondedCount / total) * 100) : 0

  const sendReply = (id: string) => {
    if (!replyText.trim()) return
    setSentReplies((prev) => [...prev, id])
    setReplyingTo(null)
    setReplyText('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <h1 className="text-2xl font-extrabold tracking-tight text-eco-navy">Reviews</h1>
        <p className="mt-1 text-sm text-eco-body/60">
          What customers say about their experience — good and bad. Respond to build trust.
        </p>
      </FadeIn>

      {/* ── Hero metric block ── */}
      <FadeIn delay={0.05}>
        <Card className="overflow-hidden">
          <div className="grid divide-y divide-eco-navy/6 sm:grid-cols-[auto_1fr_auto] sm:divide-x sm:divide-y-0">
            {/* Average */}
            <div className="flex flex-col items-center justify-center gap-2 px-8 py-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-eco-body/50">
                Overall rating
              </p>
              <p
                className="font-extrabold leading-none tracking-tightest text-eco-green"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 5rem)' }}
              >
                {reduced ? (
                  average.toFixed(1)
                ) : (
                  <AnimatedNumber value={average} format={(n) => n.toFixed(1)} duration={1.4} />
                )}
              </p>
              <Stars rating={Math.round(average)} size="lg" />
              <p className="text-xs text-eco-body/50">based on {total} reviews</p>
            </div>

            {/* Distribution bars */}
            <div className="px-6 py-5">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-eco-body/50">
                Rating breakdown
              </p>
              <div className="space-y-2">
                {([5, 4, 3, 2, 1] as const).map((star) => {
                  const count = distribution[star] ?? 0
                  const pct = maxDist ? (count / maxDist) * 100 : 0
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="w-4 text-right text-xs font-semibold text-eco-body/60">{star}</span>
                      <span className="text-xs text-amber-400">★</span>
                      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-eco-navy/6">
                        <motion.div
                          className={`h-full rounded-full ${star >= 4 ? 'bg-eco-green' : star === 3 ? 'bg-amber-400' : 'bg-rose-400'}`}
                          initial={reduced ? false : { width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.9, delay: 0.1 + (5 - star) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                      <span className="w-5 text-right text-xs text-eco-body/50">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Secondary stats */}
            <div className="flex flex-col justify-center gap-5 px-6 py-5 sm:min-w-[160px]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-eco-body/50">Response rate</p>
                <p className="mt-1 text-3xl font-extrabold tracking-tight text-eco-navy">{responseRate}%</p>
                <p className="text-xs text-eco-body/45">{respondedCount} of {total} replied</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-eco-body/50">Trend</p>
                <p className="mt-1 text-xl font-extrabold tracking-tight text-eco-green">↑ +0.2</p>
                <p className="text-xs text-eco-body/45">vs last 6 months</p>
              </div>
            </div>
          </div>
        </Card>
      </FadeIn>

      {/* Filters */}
      <FadeIn delay={0.08}>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {/* Rating filter */}
          <div className="flex items-center gap-1">
            {(['All', 'Positive', 'Critical'] as RatingFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setRatingFilter(f)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  ratingFilter === f ? 'bg-eco-navy text-white' : 'bg-white text-eco-body/60 hover:bg-eco-navy/6 border border-eco-navy/8'
                }`}
              >
                {f}
                {f === 'Positive' && <span className="ml-1 text-eco-green">★★★★</span>}
                {f === 'Critical' && <span className="ml-1 text-rose-400">★★★</span>}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-eco-navy/10" />

          {/* Service type filter */}
          <div className="flex flex-wrap items-center gap-1">
            {SERVICE_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setServiceFilter(s)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  serviceFilter === s ? 'bg-eco-navy text-white' : 'bg-white text-eco-body/60 hover:bg-eco-navy/6 border border-eco-navy/8'
                }`}
              >
                {s === 'All' ? 'All services' : JOB_SHORT[s]}
              </button>
            ))}
          </div>

          <span className="ml-auto text-xs text-eco-body/45">{filtered.length} review{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </FadeIn>

      {/* Review cards */}
      <div className="space-y-4">
        {filtered.map((review, i) => (
          <FadeIn key={review.id} delay={reduced ? 0 : 0.04 + i * 0.03}>
            <ReviewCard
              review={review}
              isReplying={replyingTo === review.id}
              justReplied={sentReplies.includes(review.id)}
              replyText={replyText}
              onStartReply={() => { setReplyingTo(review.id); setReplyText('') }}
              onChangeReply={setReplyText}
              onSendReply={() => sendReply(review.id)}
              onCancelReply={() => { setReplyingTo(null); setReplyText('') }}
            />
          </FadeIn>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-eco-body/50">No reviews match these filters.</p>
        )}
      </div>
    </div>
  )
}

function ReviewCard({
  review,
  isReplying,
  justReplied,
  replyText,
  onStartReply,
  onChangeReply,
  onSendReply,
  onCancelReply,
}: {
  review: Review
  isReplying: boolean
  justReplied: boolean
  replyText: string
  onStartReply: () => void
  onChangeReply: (v: string) => void
  onSendReply: () => void
  onCancelReply: () => void
}) {
  const isCritical = review.rating <= 3
  const hasReply = review.responded || justReplied

  return (
    <Card className={`p-5 ${isCritical ? 'border-rose-200/60' : ''}`}>
      {/* Header row */}
      <div className="flex items-start gap-4">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${isCritical ? 'bg-rose-400' : 'bg-eco-green'}`}>
          {review.customerName.split(' ').map((p) => p[0]).join('').slice(0, 2)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-sm font-bold text-eco-navy">{review.customerName}</p>
            {review.customerId && (
              <span className="rounded-full bg-eco-green/10 px-2 py-0.5 text-[10px] font-semibold text-eco-green-dark">
                Linked account
              </span>
            )}
            {isCritical && (
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-600">
                Critical
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <Stars rating={review.rating} />
            <span className="text-xs text-eco-body/50">{formatDate(review.date)}</span>
            <span className="text-eco-body/30">·</span>
            <span className="text-xs text-eco-body/50">{JOB_SHORT[review.serviceType]}</span>
          </div>
        </div>
      </div>

      {/* Review body */}
      <p className="mt-3 text-sm leading-relaxed text-eco-body/80">{review.body}</p>

      {/* Existing reply or just-sent reply */}
      {(review.responded && review.responseText) && (
        <div className="mt-4 rounded-2xl border border-eco-navy/8 bg-eco-offwhite/60 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-eco-green-dark">Your response</p>
          <p className="mt-1 text-sm text-eco-body/70">{review.responseText}</p>
        </div>
      )}
      {justReplied && !review.responded && (
        <div className="mt-4 rounded-2xl border border-eco-green/25 bg-eco-green-tint/40 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-eco-green-dark">Your response</p>
          <p className="mt-1 text-sm text-eco-body/70">{replyText || 'Response sent.'}</p>
        </div>
      )}

      {/* Reply action */}
      {!hasReply && (
        <AnimatePresence mode="wait">
          {isReplying ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden"
            >
              <textarea
                value={replyText}
                onChange={(e) => onChangeReply(e.target.value)}
                placeholder="Write a professional response…"
                rows={3}
                autoFocus
                className="w-full rounded-xl border border-eco-navy/12 bg-eco-offwhite/50 px-3 py-2.5 text-sm text-eco-navy outline-none transition focus:border-eco-green focus:ring-2 focus:ring-eco-green/20"
              />
              <div className="mt-2 flex justify-end gap-2">
                <button onClick={onCancelReply} className="eco-btn-outline py-1.5 text-xs">Cancel</button>
                <button onClick={onSendReply} disabled={!replyText.trim()} className="eco-btn-primary py-1.5 text-xs disabled:opacity-40">
                  Send response
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
              <button onClick={onStartReply} className="text-xs font-semibold text-eco-green hover:text-eco-green-dark transition">
                ↩ Respond
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Card>
  )
}

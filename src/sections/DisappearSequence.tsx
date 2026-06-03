import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Logo from '../components/Logo'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/** The Ecoflo treatment unit, drawn as a simple cutaway tank. */
function EcofloUnit() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full drop-shadow-xl" aria-hidden>
      {/* Access risers */}
      <rect x="58" y="6" width="26" height="26" rx="4" fill="#4E8208" />
      <rect x="116" y="6" width="26" height="26" rx="4" fill="#4E8208" />
      {/* Tank body */}
      <rect x="20" y="30" width="160" height="150" rx="20" fill="#64A70B" />
      <rect x="20" y="30" width="160" height="150" rx="20" fill="url(#unitShade)" />
      {/* Coconut-husk filter media texture */}
      <g opacity="0.85">
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 9 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={36 + c * 16} cy={60 + r * 22} r={5} fill="#EAF3DE" opacity="0.5" />
          )),
        )}
      </g>
      {/* Base */}
      <rect x="34" y="176" width="132" height="14" rx="6" fill="#3a5e06" />
      <defs>
        <linearGradient id="unitShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.16" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/** A row of grass blades that sprout (scaleY) as the lawn grows in. */
function GrassRow() {
  return (
    <div className="flex h-full w-full items-end justify-center gap-[3px] overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
        <span
          key={i}
          className="w-[4px] rounded-t-full bg-gradient-to-t from-[#4E8208] to-[#7cc41a]"
          style={{ height: `${50 + ((i * 37) % 45)}%` }}
        />
      ))}
    </div>
  )
}

export default function DisappearSequence() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Phase mapping.
  const unitY = useTransform(scrollYProgress, [0.05, 0.45], [-230, 60])
  const coverScale = useTransform(scrollYProgress, [0.42, 0.68], [0, 1])
  const grassScale = useTransform(scrollYProgress, [0.6, 0.85], [0, 1])
  const grassOpacity = useTransform(scrollYProgress, [0.58, 0.72], [0, 1])
  const sceneryOpacity = useTransform(scrollYProgress, [0.68, 0.92], [0, 1])
  const introOpacity = useTransform(scrollYProgress, [0, 0.12, 0.4], [1, 1, 0])
  const payoffOpacity = useTransform(scrollYProgress, [0.82, 0.96], [0, 1])
  const payoffY = useTransform(scrollYProgress, [0.82, 0.96], [30, 0])

  return (
    <section
      ref={ref}
      className="relative bg-eco-navy"
      style={{ height: reduced ? 'auto' : '320vh' }}
    >
      <div
        className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden"
        style={reduced ? { position: 'relative', height: 'auto', paddingTop: 96, paddingBottom: 96 } : undefined}
      >
        {/* Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#bfe0f5] via-[#dcefe9] to-[#eaf3de]" />

        {/* Distant hills */}
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute inset-x-0 top-[34%] h-[20%] w-full" aria-hidden>
          <path d="M0 120 Q360 40 720 110 T1440 90 V200 H0 Z" fill="#cfe6a8" opacity="0.7" />
          <path d="M0 150 Q480 90 960 140 T1440 130 V200 H0 Z" fill="#bcdd8e" opacity="0.7" />
        </svg>

        {/* Underground soil (cutaway) */}
        <div className="absolute inset-x-0 bottom-0 top-[52%] bg-gradient-to-b from-[#8a6a47] via-[#6f5436] to-[#4f3c26]">
          {/* soil strata lines */}
          <div className="absolute inset-x-0 top-[18%] h-px bg-black/10" />
          <div className="absolute inset-x-0 top-[42%] h-px bg-black/10" />
          <div className="absolute inset-x-0 top-[70%] h-px bg-black/10" />
        </div>

        {/* The Ecoflo unit (sits in front of soil-back, behind the cover) */}
        <motion.div
          className="absolute left-1/2 top-[52%] z-10 h-[210px] w-[190px] -translate-x-1/2"
          style={reduced ? { y: 60 } : { y: unitY }}
        >
          <EcofloUnit />
        </motion.div>

        {/* Topsoil + grass cover that grows down to bury the unit */}
        <motion.div
          className="absolute inset-x-0 top-[52%] z-20 origin-top"
          style={reduced ? { scaleY: 1, height: '48%' } : { scaleY: coverScale, height: '48%' }}
        >
          <div className="h-full w-full bg-gradient-to-b from-[#5a8f12] via-[#6f5436] to-[#4f3c26]" />
        </motion.div>

        {/* Surface grass strip */}
        <motion.div
          className="absolute inset-x-0 top-[50%] z-30 h-[36px] origin-bottom"
          style={reduced ? { scaleY: 1, opacity: 1 } : { scaleY: grassScale, opacity: grassOpacity }}
        >
          <GrassRow />
        </motion.div>

        {/* Scenery that returns on top — a calm tree + sun */}
        <motion.div
          className="absolute left-[12%] top-[24%] z-30"
          style={reduced ? { opacity: 1 } : { opacity: sceneryOpacity }}
        >
          <svg viewBox="0 0 120 160" className="h-32 w-24 sm:h-44 sm:w-32" aria-hidden>
            <rect x="54" y="92" width="12" height="60" rx="4" fill="#6f5436" />
            <circle cx="60" cy="62" r="42" fill="#64A70B" />
            <circle cx="38" cy="78" r="26" fill="#7cc41a" />
            <circle cx="84" cy="76" r="24" fill="#5a8f12" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute right-[14%] top-[16%] z-30 h-16 w-16 rounded-full bg-[#ffe7a0] blur-[2px] sm:h-20 sm:w-20"
          style={reduced ? { opacity: 1 } : { opacity: sceneryOpacity }}
        />

        {/* Intro label */}
        {!reduced && (
          <motion.div
            className="absolute inset-x-0 top-[16%] z-40 text-center"
            style={{ opacity: introOpacity }}
          >
            <span className="eco-eyebrow">The signature move</span>
            <h2 className="eco-h2 mt-3 px-6 text-eco-navy">Watch it disappear.</h2>
          </motion.div>
        )}

        {/* Payoff */}
        <motion.div
          className="absolute inset-x-0 bottom-[10%] z-40 px-6 text-center"
          style={reduced ? { opacity: 1 } : { opacity: payoffOpacity, y: payoffY }}
        >
          <div className="mx-auto mb-4 flex items-center justify-center">
            <Logo className="h-7 opacity-90" />
          </div>
          <p
            className="mx-auto max-w-3xl font-extrabold leading-[1.05] tracking-tightest text-eco-navy"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)' }}
          >
            The best technology is the kind you never think about.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

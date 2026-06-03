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
      {Array.from({ length: 80 }).map((_, i) => (
        <span
          key={i}
          className="w-[4px] rounded-t-full bg-gradient-to-t from-[#4E8208] to-[#7cc41a]"
          style={{ height: `${50 + ((i * 37) % 45)}%` }}
        />
      ))}
    </div>
  )
}

/** Leafy tree, bottom-aligned (preserveAspectRatio anchors trunk to ground). */
function Tree({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMax meet" className={className} aria-hidden>
      <rect x="54" y="92" width="12" height="68" rx="4" fill="#6f5436" />
      <circle cx="60" cy="62" r="44" fill="#5a8f12" />
      <circle cx="36" cy="78" r="28" fill="#7cc41a" />
      <circle cx="86" cy="74" r="26" fill="#64A70B" />
      <circle cx="60" cy="48" r="30" fill="#7cc41a" />
    </svg>
  )
}

/** Simple house: walls + gabled roof + door + windows + chimney. */
function House({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 160 150" preserveAspectRatio="xMidYMax meet" className={className} aria-hidden>
      {/* Chimney */}
      <rect x="106" y="22" width="18" height="40" rx="2" fill="#b07860" />
      {/* Walls */}
      <rect x="14" y="70" width="132" height="80" rx="2" fill="#f0ebe2" />
      {/* Roof */}
      <polygon points="2,74 80,12 158,74" fill="#c0876a" />
      <polygon points="2,74 80,12 158,74" fill="url(#roofShade)" />
      {/* Door */}
      <rect x="62" y="108" width="36" height="42" rx="3" fill="#8b6f47" />
      <circle cx="92" cy="130" r="2.6" fill="#c8a96e" />
      {/* Windows */}
      <rect x="22" y="84" width="32" height="28" rx="3" fill="#a8d4e6" stroke="#c0b49a" strokeWidth="1.5" />
      <rect x="106" y="84" width="32" height="28" rx="3" fill="#a8d4e6" stroke="#c0b49a" strokeWidth="1.5" />
      <line x1="38" y1="84" x2="38" y2="112" stroke="#c0b49a" strokeWidth="1.2" />
      <line x1="22" y1="98" x2="54" y2="98" stroke="#c0b49a" strokeWidth="1.2" />
      <line x1="122" y1="84" x2="122" y2="112" stroke="#c0b49a" strokeWidth="1.2" />
      <line x1="106" y1="98" x2="138" y2="98" stroke="#c0b49a" strokeWidth="1.2" />
      <defs>
        <linearGradient id="roofShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/** Above-ground round pool: deck wall + water + ladder. */
function AboveGroundPool({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 140 86" preserveAspectRatio="xMidYMax meet" className={className} aria-hidden>
      {/* Pool wall (cylinder exterior) */}
      <ellipse cx="70" cy="74" rx="64" ry="11" fill="#b8c8d4" />
      <rect x="6" y="24" width="128" height="50" fill="#cad8e0" />
      {/* Water surface */}
      <ellipse cx="70" cy="24" rx="64" ry="16" fill="#4ab3d8" />
      <ellipse cx="70" cy="24" rx="46" ry="9" fill="#63c4e8" opacity="0.55" />
      <ellipse cx="70" cy="24" rx="26" ry="5" fill="#88d6f2" opacity="0.5" />
      {/* Top rim ring */}
      <ellipse cx="70" cy="24" rx="64" ry="16" fill="none" stroke="#9ab8c8" strokeWidth="3.5" />
      {/* Ladder */}
      <rect x="106" y="6" width="4.5" height="44" rx="2" fill="#d4a060" />
      <rect x="116" y="6" width="4.5" height="44" rx="2" fill="#d4a060" />
      <rect x="106" y="16" width="14.5" height="3.5" rx="1.5" fill="#d4a060" />
      <rect x="106" y="27" width="14.5" height="3.5" rx="1.5" fill="#d4a060" />
      <rect x="106" y="38" width="14.5" height="3.5" rx="1.5" fill="#d4a060" />
    </svg>
  )
}

export default function DisappearSequence() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Phase mapping (only the tank + the burial cover/grass are scroll-driven).
  const unitY = useTransform(scrollYProgress, [0.05, 0.45], [-240, 70])
  const coverScale = useTransform(scrollYProgress, [0.42, 0.68], [0, 1])
  const grassScale = useTransform(scrollYProgress, [0.6, 0.85], [0, 1])
  const grassOpacity = useTransform(scrollYProgress, [0.58, 0.72], [0, 1])
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
        style={reduced ? { position: 'relative', height: '90vh', minHeight: 620 } : undefined}
      >
        {/* Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#bfe0f5] via-[#dcefe9] to-[#eaf3de]" />

        {/* Distant hills */}
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute inset-x-0 top-[34%] h-[20%] w-full" aria-hidden>
          <path d="M0 120 Q360 40 720 110 T1440 90 V200 H0 Z" fill="#cfe6a8" opacity="0.7" />
          <path d="M0 150 Q480 90 960 140 T1440 130 V200 H0 Z" fill="#bcdd8e" opacity="0.7" />
        </svg>

        {/* Sun — always present */}
        <div className="absolute right-[8%] top-[10%] z-[15] h-16 w-16 rounded-full bg-[#ffe39a] blur-[2px] sm:h-24 sm:w-24" />

        {/* Underground soil (cutaway) */}
        <div className="absolute inset-x-0 bottom-0 top-[58%] bg-gradient-to-b from-[#8a6a47] via-[#6f5436] to-[#4f3c26]">
          <div className="absolute inset-x-0 top-[16%] h-px bg-black/10" />
          <div className="absolute inset-x-0 top-[40%] h-px bg-black/10" />
          <div className="absolute inset-x-0 top-[68%] h-px bg-black/10" />
        </div>

        {/* ── Permanent landscape props, anchored to the ground line (58%) ── */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[16] h-[58%]">
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-[3%] sm:px-[8%] lg:px-[11%]">
            {/* Left cluster: big tree (+ pool on larger screens) */}
            <div className="flex items-end gap-3 sm:gap-6">
              <Tree className="h-[96px] w-[72px] sm:h-[210px] sm:w-[158px]" />
              <AboveGroundPool className="hidden sm:block sm:h-[110px] sm:w-[180px]" />
            </div>
            {/* Right cluster: house (+ small tree on larger screens) */}
            <div className="flex items-end gap-3 sm:gap-6">
              <Tree className="hidden sm:block sm:h-[150px] sm:w-[112px]" />
              <House className="h-[100px] w-[107px] sm:h-[205px] sm:w-[218px]" />
            </div>
          </div>
        </div>

        {/* Ecoflo unit (descends from sky into the soil cutaway) */}
        <motion.div
          className="absolute left-1/2 top-[58%] z-10 h-[120px] w-[108px] -translate-x-1/2 sm:h-[170px] sm:w-[155px]"
          style={reduced ? { y: 70 } : { y: unitY }}
        >
          <EcofloUnit />
        </motion.div>

        {/* Topsoil + grass cover that grows down to bury the unit */}
        <motion.div
          className="absolute inset-x-0 top-[58%] z-20 origin-top"
          style={reduced ? { scaleY: 1, height: '42%' } : { scaleY: coverScale, height: '42%' }}
        >
          <div className="h-full w-full bg-gradient-to-b from-[#5a8f12] via-[#6f5436] to-[#4f3c26]" />
        </motion.div>

        {/* Surface grass strip at the seam */}
        <motion.div
          className="absolute inset-x-0 top-[56%] z-[22] h-[36px] origin-bottom"
          style={reduced ? { scaleY: 1, opacity: 1 } : { scaleY: grassScale, opacity: grassOpacity }}
        >
          <GrassRow />
        </motion.div>

        {/* Intro label */}
        {!reduced && (
          <motion.div
            className="absolute inset-x-0 top-[14%] z-40 text-center"
            style={{ opacity: introOpacity }}
          >
            <span className="eco-eyebrow">The signature move</span>
            <h2 className="eco-h2 mt-3 px-6 text-eco-navy">Watch it disappear.</h2>
          </motion.div>
        )}

        {/* Payoff — occupies the same slot as the intro label, swapping in on scroll */}
        <motion.div
          className="absolute inset-x-0 top-[14%] z-40 px-6 text-center"
          style={reduced ? { opacity: 1 } : { opacity: payoffOpacity, y: payoffY }}
        >
          <div className="mx-auto mb-4 flex items-center justify-center">
            <Logo className="h-6 opacity-90 sm:h-7" />
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

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

/** Simple house: walls + gabled roof + door + two windows. */
function House() {
  return (
    <svg viewBox="0 0 160 140" className="h-full w-full" aria-hidden>
      {/* Walls */}
      <rect x="14" y="62" width="132" height="78" rx="2" fill="#f0ebe2" />
      {/* Roof */}
      <polygon points="0,66 80,6 160,66" fill="#c0876a" />
      <polygon points="0,66 80,6 160,66" fill="url(#roofShade)" />
      {/* Door */}
      <rect x="62" y="100" width="36" height="40" rx="3" fill="#8b6f47" />
      <circle cx="93" cy="122" r="2.5" fill="#c8a96e" />
      {/* Windows */}
      <rect x="20" y="76" width="32" height="28" rx="3" fill="#a8d4e6" stroke="#c0b49a" strokeWidth="1.5" />
      <rect x="108" y="76" width="32" height="28" rx="3" fill="#a8d4e6" stroke="#c0b49a" strokeWidth="1.5" />
      {/* Window crosses */}
      <line x1="36" y1="76" x2="36" y2="104" stroke="#c0b49a" strokeWidth="1.2" />
      <line x1="20" y1="90" x2="52" y2="90" stroke="#c0b49a" strokeWidth="1.2" />
      <line x1="124" y1="76" x2="124" y2="104" stroke="#c0b49a" strokeWidth="1.2" />
      <line x1="108" y1="90" x2="140" y2="90" stroke="#c0b49a" strokeWidth="1.2" />
      {/* Chimney */}
      <rect x="104" y="18" width="18" height="32" rx="2" fill="#b07860" />
      <defs>
        <linearGradient id="roofShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/** Above-ground round pool: deck + water + ladder. */
function AboveGroundPool() {
  return (
    <svg viewBox="0 0 120 72" className="h-full w-full" aria-hidden>
      {/* Pool wall (cylinder exterior) */}
      <ellipse cx="60" cy="62" rx="56" ry="10" fill="#b8c8d4" />
      <rect x="4" y="18" width="112" height="44" fill="#cad8e0" />
      {/* Water surface */}
      <ellipse cx="60" cy="18" rx="56" ry="14" fill="#4ab3d8" />
      {/* Water ripple highlights */}
      <ellipse cx="60" cy="18" rx="40" ry="8" fill="#63c4e8" opacity="0.5" />
      <ellipse cx="60" cy="18" rx="22" ry="4" fill="#88d6f2" opacity="0.4" />
      {/* Pool wall top ring */}
      <ellipse cx="60" cy="18" rx="56" ry="14" fill="none" stroke="#9ab8c8" strokeWidth="3" />
      {/* Ladder */}
      <rect x="92" y="4" width="4" height="38" rx="2" fill="#d4a060" />
      <rect x="100" y="4" width="4" height="38" rx="2" fill="#d4a060" />
      <rect x="92" y="12" width="12" height="3" rx="1" fill="#d4a060" />
      <rect x="92" y="22" width="12" height="3" rx="1" fill="#d4a060" />
      <rect x="92" y="32" width="12" height="3" rx="1" fill="#d4a060" />
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
          <div className="absolute inset-x-0 top-[18%] h-px bg-black/10" />
          <div className="absolute inset-x-0 top-[42%] h-px bg-black/10" />
          <div className="absolute inset-x-0 top-[70%] h-px bg-black/10" />
        </div>

        {/* Ecoflo unit */}
        <motion.div
          className="absolute left-1/2 top-[52%] z-10 h-[210px] w-[190px] -translate-x-1/2"
          style={reduced ? { y: 60 } : { y: unitY }}
        >
          <EcofloUnit />
        </motion.div>

        {/* Topsoil + grass cover */}
        <motion.div
          className="absolute inset-x-0 top-[52%] z-20 origin-top"
          style={reduced ? { scaleY: 1, height: '48%' } : { scaleY: coverScale, height: '48%' }}
        >
          <div className="h-full w-full bg-gradient-to-b from-[#5a8f12] via-[#6f5436] to-[#4f3c26]" />
        </motion.div>

        {/* Grass strip */}
        <motion.div
          className="absolute inset-x-0 top-[50%] z-30 h-[36px] origin-bottom"
          style={reduced ? { scaleY: 1, opacity: 1 } : { scaleY: grassScale, opacity: grassOpacity }}
        >
          <GrassRow />
        </motion.div>

        {/* ── Surface scenery (fades in once grass is grown) ── */}
        {/* Tree — left side */}
        <motion.div
          className="absolute left-[6%] top-[16%] z-30 sm:left-[10%]"
          style={reduced ? { opacity: 1 } : { opacity: sceneryOpacity }}
        >
          <svg viewBox="0 0 120 160" className="h-32 w-24 sm:h-44 sm:w-32" aria-hidden>
            <rect x="54" y="92" width="12" height="60" rx="4" fill="#6f5436" />
            <circle cx="60" cy="62" r="42" fill="#64A70B" />
            <circle cx="38" cy="78" r="26" fill="#7cc41a" />
            <circle cx="84" cy="76" r="24" fill="#5a8f12" />
          </svg>
        </motion.div>

        {/* Sun — top right */}
        <motion.div
          className="absolute right-[10%] top-[10%] z-30 h-14 w-14 rounded-full bg-[#ffe7a0] blur-[2px] sm:h-20 sm:w-20"
          style={reduced ? { opacity: 1 } : { opacity: sceneryOpacity }}
        />

        {/* House — right of center */}
        <motion.div
          className="absolute z-30"
          style={
            reduced
              ? { opacity: 1, bottom: '48%', right: '8%', width: 160, transform: 'translateY(100%)' }
              : { opacity: sceneryOpacity, bottom: '48%', right: '8%', width: 160, transform: 'translateY(100%)' }
          }
        >
          <House />
        </motion.div>

        {/* Above-ground pool — left of center, sitting on the grass */}
        <motion.div
          className="absolute z-30"
          style={
            reduced
              ? { opacity: 1, bottom: '48%', left: '18%', width: 110, transform: 'translateY(62%)' }
              : { opacity: sceneryOpacity, bottom: '48%', left: '18%', width: 110, transform: 'translateY(62%)' }
          }
        >
          <AboveGroundPool />
        </motion.div>

        {/* Small tree right of pool for depth */}
        <motion.div
          className="absolute z-30"
          style={
            reduced
              ? { opacity: 1, bottom: '48%', left: '33%', transform: 'translateY(100%)' }
              : { opacity: sceneryOpacity, bottom: '48%', left: '33%', transform: 'translateY(100%)' }
          }
        >
          <svg viewBox="0 0 72 100" className="h-20 w-14" aria-hidden>
            <rect x="32" y="58" width="8" height="36" rx="3" fill="#6f5436" />
            <circle cx="36" cy="38" r="28" fill="#64A70B" />
            <circle cx="22" cy="50" r="16" fill="#7cc41a" />
          </svg>
        </motion.div>

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
          className="absolute inset-x-0 bottom-[8%] z-40 px-6 text-center"
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

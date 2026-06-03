import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import Logo from '../components/Logo'
import Reveal from '../components/Reveal'
import { fragmentedRoles } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { scrollToId } from '../lib/scroll'

// Scattered start positions (in px) for each contractor chip around the center.
const scatter = [
  { x: -150, y: -120, r: -12 },
  { x: 160, y: -150, r: 10 },
  { x: -200, y: 30, r: 8 },
  { x: 190, y: 60, r: -9 },
  { x: -120, y: 150, r: 14 },
  { x: 120, y: 170, r: -7 },
  { x: -30, y: -190, r: -5 },
  { x: 40, y: 210, r: 11 },
]

function Chip({
  label,
  start,
  progress,
  reduced,
}: {
  label: string
  start: { x: number; y: number; r: number }
  progress: MotionValue<number>
  reduced: boolean
}) {
  // Converge toward center and fade out as the user scrolls through.
  const x = useTransform(progress, [0, 0.65], [start.x, 0])
  const y = useTransform(progress, [0, 0.65], [start.y, 0])
  const rotate = useTransform(progress, [0, 0.65], [start.r, 0])
  const opacity = useTransform(progress, [0.2, 0.62], [1, 0])
  const scale = useTransform(progress, [0.2, 0.65], [1, 0.4])

  if (reduced) {
    return (
      <span className="rounded-full border border-eco-navy/10 bg-white px-3 py-1.5 text-xs font-medium text-eco-body shadow-eco-soft">
        {label}
      </span>
    )
  }

  return (
    <motion.div
      style={{ x, y, rotate, opacity, scale }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-eco-navy/10 bg-white px-4 py-2 text-sm font-medium text-eco-body shadow-eco-card"
    >
      {label}
    </motion.div>
  )
}

export default function TurnkeySolution() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.55'],
  })

  // Central Ecoflo mark grows in as the chips collapse.
  const markScale = useTransform(scrollYProgress, [0.45, 0.85], [0.6, 1])
  const markOpacity = useTransform(scrollYProgress, [0.45, 0.8], [0, 1])
  const ringScale = useTransform(scrollYProgress, [0.5, 1], [0.8, 1.15])
  const ringOpacity = useTransform(scrollYProgress, [0.5, 0.85, 1], [0, 0.5, 0.2])

  return (
    <section id="turnkey" className="bg-white py-24 sm:py-32">
      <div className="eco-container">
        {/* The problem */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eco-eyebrow">The old way</span>
          <h2 className="eco-h2 mt-4">
            A new septic system shouldn't mean juggling a dozen strangers.
          </h2>
          <p className="eco-lead mt-5">
            Soil testers, designers, permits, excavators, installers, inspectors,
            maintenance crews. Different numbers, different timelines, and every
            gap between them becomes your problem.
          </p>
        </Reveal>

        {/* The converging animation */}
        <div ref={ref} className="relative mx-auto mt-16 h-[380px] max-w-3xl sm:h-[440px]">
          {reduced ? (
            <div className="flex h-full flex-col items-center justify-center gap-8">
              <div className="flex flex-wrap justify-center gap-2">
                {fragmentedRoles.map((r) => (
                  <Chip key={r} label={r} start={scatter[0]} progress={scrollYProgress} reduced />
                ))}
              </div>
              <span className="text-2xl text-eco-navy/30">↓</span>
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-eco-green-tint">
                <Logo className="h-7" />
              </div>
            </div>
          ) : (
            <>
              {/* Pulsing ring behind the mark */}
              <motion.div
                style={{ scale: ringScale, opacity: ringOpacity }}
                className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-eco-green sm:h-52 sm:w-52"
              />
              {/* Chips */}
              {fragmentedRoles.map((role, i) => (
                <Chip
                  key={role}
                  label={role}
                  start={scatter[i % scatter.length]}
                  progress={scrollYProgress}
                  reduced={false}
                />
              ))}
              {/* Central Ecoflo mark */}
              <motion.div
                style={{ scale: markScale, opacity: markOpacity }}
                className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-eco-card ring-1 ring-eco-green/20 sm:h-40 sm:w-40"
              >
                <Logo className="h-8 sm:h-9" />
              </motion.div>
            </>
          )}
        </div>

        {/* The resolution */}
        <Reveal className="mx-auto mt-14 max-w-2xl text-center" delay={0.05}>
          <span className="eco-eyebrow">The Ecoflo way</span>
          <h2 className="eco-h2 mt-4">
            One partner. <span className="text-eco-green">Every step.</span>
          </h2>
          <p className="eco-lead mt-5">
            Ecoflo manages the entire lifecycle of your system — from the first
            soil test to lifetime maintenance. You make one call. We handle the
            rest, so you can simply live your life.
          </p>
          <button
            onClick={() => scrollToId('journey')}
            className="eco-btn-outline mt-8"
          >
            See the four steps →
          </button>
        </Reveal>
      </div>
    </section>
  )
}

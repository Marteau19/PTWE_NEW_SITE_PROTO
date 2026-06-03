import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Logo from '../components/Logo'
import Reveal from '../components/Reveal'
import { fragmentedRoles } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { scrollToId } from '../lib/scroll'

// Each chip's angle (degrees) in the circle layout, evenly distributed.
const CHIP_ANGLES = fragmentedRoles.map((_, i) => (360 / fragmentedRoles.length) * i - 90)
const ORBIT_R = 195

interface ChipItem {
  label: string
  angle: number
}

function getXY(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r }
}

// A single chip + its connector line (radial layout, wide screens only).
function ChipNode({
  item,
  index,
  orbit,
  inView,
  reduced,
}: {
  item: ChipItem
  index: number
  orbit: number
  inView: boolean
  reduced: boolean
}) {
  const { x, y } = getXY(item.angle, orbit)
  const lx2 = (x / orbit) * (orbit - 32)
  const ly2 = (y / orbit) * (orbit - 32)
  const delay = reduced ? 0 : index * 0.07 + 0.1

  return (
    <motion.g
      initial={reduced ? false : { opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.line
        x1={0}
        y1={0}
        x2={lx2}
        y2={ly2}
        stroke="#64A70B"
        strokeWidth={1.2}
        strokeDasharray="4 3"
        opacity={0.5}
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.55, delay: delay + 0.1, ease: 'easeOut' }}
      />
      <foreignObject x={x - 68} y={y - 18} width={136} height={36} style={{ overflow: 'visible' }}>
        <div
          className="flex h-9 items-center justify-center whitespace-nowrap rounded-full border border-eco-navy/10 bg-white px-4 text-[13px] font-medium text-eco-body shadow-eco-card"
          style={{ fontSize: 13 }}
        >
          {item.label}
        </div>
      </foreignObject>
    </motion.g>
  )
}

export default function TurnkeySolution() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const [orbit, setOrbit] = useState(ORBIT_R)
  const [isCompact, setIsCompact] = useState(false)

  // Radial hub on wide screens; a clean grid on mobile so chips never clip.
  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth
      setIsCompact(w < 768)
      setOrbit(w < 900 ? 172 : ORBIT_R)
    }
    measure()
    window.addEventListener('resize', measure, { passive: true })
    return () => window.removeEventListener('resize', measure)
  }, [])

  const chips: ChipItem[] = fragmentedRoles.map((label, i) => ({ label, angle: CHIP_ANGLES[i] }))
  const SIZE = (orbit + 90) * 2

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

        {/* Diagram */}
        <div ref={ref} className="mx-auto mt-10 w-full">
          {isCompact ? (
            /* ── Mobile: logo + 2-column chip grid ── */
            <div className="flex flex-col items-center">
              <motion.div
                className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-eco-card ring-2 ring-eco-green/20"
                initial={reduced ? false : { scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Logo className="h-7" />
              </motion.div>
              <p className="mb-6 mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-eco-green">
                All of it — one team
              </p>
              <div className="grid w-full max-w-sm grid-cols-2 gap-2.5">
                {chips.map((chip, i) => (
                  <motion.div
                    key={chip.label}
                    className="flex items-center gap-2 rounded-full border border-eco-navy/10 bg-white px-3.5 py-2.5 text-[13px] font-medium text-eco-body shadow-eco-soft"
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: reduced ? 0 : i * 0.05 + 0.1 }}
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-eco-green" />
                    <span className="truncate">{chip.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            /* ── Wide: radial hub-and-spoke ── */
            <div
              className="relative mx-auto flex items-center justify-center"
              style={{ width: SIZE, maxWidth: '100%', height: SIZE, maxHeight: SIZE }}
              aria-label="All roles connected to Ecoflo as one team"
            >
              <svg
                viewBox={`${-SIZE / 2} ${-SIZE / 2} ${SIZE} ${SIZE}`}
                width={SIZE}
                height={SIZE}
                className="absolute inset-0"
                overflow="visible"
                aria-hidden
              >
                <motion.circle
                  cx={0}
                  cy={0}
                  r={orbit}
                  fill="none"
                  stroke="#64A70B"
                  strokeWidth={1}
                  strokeDasharray="6 5"
                  opacity={0.18}
                  initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 0.18 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                />
                {chips.map((chip, i) => (
                  <ChipNode
                    key={chip.label}
                    item={chip}
                    index={i}
                    orbit={orbit}
                    inView={inView}
                    reduced={reduced}
                  />
                ))}
              </svg>

              <motion.div
                className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-eco-card ring-2 ring-eco-green/20 sm:h-36 sm:w-36"
                initial={reduced ? false : { scale: 0.7, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Logo className="h-9 sm:h-11" />
              </motion.div>
            </div>
          )}
        </div>

        {/* The resolution */}
        <Reveal className="mx-auto mt-10 max-w-2xl text-center" delay={0.05}>
          <span className="eco-eyebrow">The Ecoflo way</span>
          <h2 className="eco-h2 mt-4">
            One partner. <span className="text-eco-green">Every step.</span>
          </h2>
          <p className="eco-lead mt-5">
            Every role in that list is covered by Ecoflo — one accountable team,
            from the first soil test to lifetime maintenance. You make one call.
            We handle the rest.
          </p>
          <button onClick={() => scrollToId('journey')} className="eco-btn-outline mt-8">
            See the four steps →
          </button>
        </Reveal>
      </div>
    </section>
  )
}

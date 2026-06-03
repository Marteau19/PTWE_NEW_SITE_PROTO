import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from '../components/Reveal'
import { journeySteps } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const icons = [
  // 01 Soil test & design
  <path
    key="soil"
    d="M12 3l7 4v6c0 4.5-3 7.5-7 8-4-.5-7-3.5-7-8V7l7-4z M9 12l2 2 4-4"
  />,
  // 02 Installation
  <path key="install" d="M3 13h11l3-3 4 1v5h-2 M5 18a2 2 0 104 0 2 2 0 10-4 0 M15 18a2 2 0 104 0 2 2 0 10-4 0" />,
  // 03 It disappears
  <path
    key="hide"
    d="M3 12s3-6 9-6 9 6 9 6-3 6-9 6c-2 0-3.7-.6-5-1.4 M3 3l18 18 M9.5 9.5a3 3 0 004 4"
  />,
  // 04 Lifetime care
  <path key="care" d="M12 21s-7-4.3-9.2-9.1C1.3 8.5 3 5.5 6 5.5c1.8 0 3.2 1 4 2.3.8-1.3 2.2-2.3 4-2.3 3 0 4.7 3 3.2 6.4C19 16.7 12 21 12 21z" />,
]

function StepIcon({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      {icons[index]}
    </svg>
  )
}

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.6'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="journey" className="bg-eco-offwhite py-24 sm:py-32">
      <div className="eco-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eco-eyebrow">The journey</span>
          <h2 className="eco-h2 mt-4">Four steps. All handled by Ecoflo.</h2>
          <p className="eco-lead mt-5">
            Not a chain of subcontractors — one team, accountable from the first
            visit to the last.
          </p>
        </Reveal>

        <div ref={ref} className="relative mx-auto mt-20 max-w-5xl">
          {/* Connecting line — horizontal on desktop, vertical on mobile */}
          <div className="absolute left-[31px] top-2 bottom-2 w-0.5 bg-eco-navy/10 lg:left-0 lg:right-0 lg:top-[31px] lg:h-0.5 lg:w-auto" />
          <motion.div
            className="absolute left-[31px] top-2 w-0.5 origin-top bg-eco-green lg:left-0 lg:right-0 lg:top-[31px] lg:h-0.5 lg:w-auto lg:origin-left"
            style={
              reduced
                ? { transform: 'scaleY(1)' }
                : {
                    scaleY: lineScale,
                    scaleX: lineScale,
                    bottom: 8,
                  }
            }
          />

          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-6">
            {journeySteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.12} className="flex gap-5 lg:block">
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-eco-green shadow-eco-card ring-1 ring-eco-navy/5">
                  <StepIcon index={i} />
                  <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-eco-green text-[11px] font-bold text-white">
                    {step.step}
                  </span>
                </div>
                <div className="lg:mt-6 lg:pr-4">
                  <h3 className="text-lg font-bold text-eco-navy">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-eco-body">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-16 text-center" delay={0.1}>
          <p className="mx-auto inline-flex max-w-xl items-center gap-2 rounded-full bg-eco-green-tint px-5 py-2.5 text-sm font-semibold text-eco-green-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-eco-green" />
            Every step delivered by Ecoflo — never a third party.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import Reveal from '../components/Reveal'
import EcofloServiceWheel from '../components/EcofloServiceWheel'
import { scrollToId } from '../lib/scroll'

export default function TurnkeySolution() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section id="turnkey" className="bg-white py-24 sm:py-32">
      <div className="eco-container">
        {/* The problem */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="eco-h2">
            <span className="text-eco-green">Ecoflo is with you</span>
            <br />
            <span className="text-eco-green">every step of the way</span>
          </h2>
          <div className="eco-lead mt-6 space-y-4">
            <p>
              Septic systems can feel overwhelming. Terms are unfamiliar,
              regulations are complex, and finding the right help often means
              juggling multiple contractors and waiting for callbacks.
            </p>
            <p>It doesn't have to be that way.</p>
            <p>
              Ecoflo is Premier Tech Water and Environment's complete service
              offer for homeowners. Our team handles everything, from your septic
              installation to maintenance, inspections, tankering and repairs.
            </p>
            <p>
              You never need to be a wastewater treatment expert — that's our job.
            </p>
          </div>
        </Reveal>

        {/* Service wheel — every service, one team */}
        <div ref={ref} className="mx-auto mt-12 w-full max-w-[460px]">
          <EcofloServiceWheel inView={inView} className="h-auto w-full" />
        </div>

        {/* The resolution */}
        <Reveal className="mx-auto mt-12 max-w-2xl text-center" delay={0.05}>
          <span className="eco-eyebrow">The Ecoflo way</span>
          <h2 className="eco-h2 mt-4">
            One partner. <span className="text-eco-green">Every step.</span>
          </h2>
          <p className="eco-lead mt-5">
            Every service in that wheel is covered by Ecoflo — one accountable team,
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

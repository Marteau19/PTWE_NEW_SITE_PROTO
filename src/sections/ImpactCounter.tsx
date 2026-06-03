import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import OdometerCounter from '../components/OdometerCounter'
import { RevealGroup, RevealItem } from '../components/Reveal'
import { servicePointCount } from '../data/servicePoints'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface Stat {
  end: number
  suffix?: string
  prefix?: string
  label: string
  decimals?: number
}

const stats: Stat[] = [
  { end: 100000, suffix: '+', label: 'Systems installed' },
  { end: 30, label: 'Years of proven performance' },
  { end: 0, suffix: ' kWh', label: 'Energy used to treat your water' },
  { end: servicePointCount, label: 'Active Service Points' },
]

function StatTile({ stat }: { stat: Stat }) {
  const reduced = usePrefersReducedMotion()
  return (
    <RevealItem className="text-center">
      <div className="font-extrabold tracking-tight text-white" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}>
        {reduced ? (
          <span>
            {stat.prefix}
            {stat.end.toLocaleString('en-US')}
            {stat.suffix}
          </span>
        ) : (
          <CountUp
            end={stat.end}
            duration={2.2}
            separator=","
            prefix={stat.prefix}
            suffix={stat.suffix}
            decimals={stat.decimals}
            enableScrollSpy
            scrollSpyOnce
          />
        )}
      </div>
      <p className="mt-3 text-sm font-medium leading-snug text-white/70">{stat.label}</p>
    </RevealItem>
  )
}

export default function ImpactCounter() {
  return (
    <section className="relative overflow-hidden bg-eco-navy py-24 sm:py-32">
      {/* Soft brand glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-eco-green/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-eco-green/10 blur-[120px]" />

      <div className="eco-container relative">
        {/* Live odometer centerpiece */}
        <div className="text-center">
          <span className="eco-eyebrow text-eco-green">Real impact, every second</span>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-white/55">
            Litres of wastewater filtered
          </p>
          <div className="mt-5 flex justify-center" style={{ fontSize: 'clamp(2rem, 6.5vw, 5rem)' }}>
            <OdometerCounter seed={2_500_000_000} perSecond={700} />
          </div>
          <div className="mt-4 inline-flex items-center gap-2">
            <motion.span
              className="h-2 w-2 rounded-full bg-eco-green"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/45">
              Live · illustrative figure
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto my-16 h-px max-w-3xl bg-white/10" />

        {/* Supporting stat tiles */}
        <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((s) => (
            <StatTile key={s.label} stat={s} />
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

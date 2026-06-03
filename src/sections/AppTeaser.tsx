import { motion } from 'framer-motion'
import Logo from '../components/Logo'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const features = [
  'See your system status at a glance',
  'Track litres treated, month over month',
  'Maintenance scheduled automatically',
  'One tap to reach your Service Point',
]

const timeline = [
  { label: 'Soil test & design', done: true },
  { label: 'Installed & activated', done: true },
  { label: 'Active care', done: true, current: true },
]

function PhoneScreen() {
  const reduced = usePrefersReducedMotion()
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#f7faf2] to-white px-4 pb-5 pt-3 text-left">
      {/* status bar */}
      <div className="flex items-center justify-between px-1 text-[10px] font-semibold text-eco-navy/70">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span>5G</span>
          <span className="inline-block h-2.5 w-5 rounded-[3px] border border-eco-navy/40" />
        </div>
      </div>

      {/* header */}
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-eco-body/60">Good morning</p>
          <p className="text-base font-bold text-eco-navy">Your Ecoflo</p>
        </div>
        <Logo className="h-4" />
      </div>

      {/* status card */}
      <div className="mt-3 rounded-2xl bg-eco-navy p-4 text-white shadow-eco-soft">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-white/60">System status</span>
          <motion.span
            className="flex items-center gap-1.5 rounded-full bg-eco-green/20 px-2 py-0.5 text-[11px] font-semibold text-eco-green"
            animate={reduced ? undefined : { opacity: [1, 0.55, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-eco-green" />
            All good
          </motion.span>
        </div>
        <p className="mt-3 text-3xl font-extrabold tracking-tight">12,480 L</p>
        <p className="text-[11px] text-white/55">Treated this month · no energy used</p>
      </div>

      {/* next maintenance */}
      <div className="mt-3 flex items-center justify-between rounded-2xl border border-eco-navy/8 bg-white p-3.5 shadow-eco-soft">
        <div>
          <p className="text-[11px] text-eco-body/60">Next maintenance</p>
          <p className="text-sm font-bold text-eco-navy">Sept 14, 2026</p>
        </div>
        <span className="rounded-full bg-eco-green-tint px-2.5 py-1 text-[10px] font-semibold text-eco-green-dark">
          Auto-scheduled
        </span>
      </div>

      {/* timeline */}
      <div className="mt-3 rounded-2xl border border-eco-navy/8 bg-white p-3.5 shadow-eco-soft">
        <p className="mb-2.5 text-[11px] uppercase tracking-wider text-eco-body/55">Your project</p>
        <div className="space-y-2.5">
          {timeline.map((t) => (
            <div key={t.label} className="flex items-center gap-2.5">
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] text-white ${
                  t.current ? 'bg-eco-green ring-2 ring-eco-green/25' : 'bg-eco-green'
                }`}
              >
                ✓
              </span>
              <span className="text-[12px] font-medium text-eco-navy">{t.label}</span>
              {t.current && (
                <span className="ml-auto text-[10px] font-semibold text-eco-green">Now</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button className="mt-auto w-full rounded-xl bg-eco-green py-3 text-[13px] font-semibold text-white">
        Contact your Service Point
      </button>
    </div>
  )
}

export default function AppTeaser() {
  const reduced = usePrefersReducedMotion()
  return (
    <section className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="eco-container">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <span className="eco-eyebrow">The Ecoflo app</span>
              <h2 className="eco-h2 mt-4">
                Everything you need,
                <br />
                in your pocket.
              </h2>
              <p className="eco-lead mt-5 max-w-md">
                Your whole system — tracked, transparent, and in one place. No phone
                tag, no chasing paperwork. Just open the app and see that all is well.
              </p>
            </Reveal>

            <RevealGroup className="mt-8 space-y-3.5">
              {features.map((f) => (
                <RevealItem key={f} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-eco-green-tint text-xs font-bold text-eco-green-dark">
                    ✓
                  </span>
                  <span className="text-[15px] font-medium text-eco-navy">{f}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* iPhone mockup */}
          <div className="order-1 flex justify-center lg:order-2">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* glow */}
              <div className="absolute -inset-8 -z-10 rounded-[60px] bg-eco-green/10 blur-3xl" />
              {/* device */}
              <div className="relative h-[600px] w-[296px] rounded-[46px] border-[5px] border-[#0c1726] bg-[#0c1726] p-1.5 shadow-eco-phone">
                <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-white">
                  {/* notch */}
                  <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[#0c1726]" />
                  <PhoneScreen />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

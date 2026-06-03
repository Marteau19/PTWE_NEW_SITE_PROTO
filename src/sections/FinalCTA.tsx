import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import { scrollToId } from '../lib/scroll'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const BG =
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80'

export default function FinalCTA() {
  const reduced = usePrefersReducedMotion()
  return (
    <section id="cta" className="relative overflow-hidden bg-eco-navy">
      {/* Background photo */}
      <SmartImage
        src={BG}
        alt="A calm lakeside landscape at golden hour"
        dataAsset="cta/landscape"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
        fallbackClassName="absolute inset-0 h-full w-full bg-gradient-to-br from-[#0a3a1e] to-eco-navy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-eco-navy via-eco-navy/80 to-eco-navy/55" />

      <div className="eco-container relative py-28 sm:py-36">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2
            className="font-extrabold leading-[1.02] tracking-tightest text-white"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
          >
            Ready for a septic system
            <br className="hidden sm:block" /> you'll never have to think about?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
            One partner, every step — from soil test to lifetime care. Let's find
            your local Ecoflo team.
          </p>
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <button onClick={() => scrollToId('map')} className="eco-btn-primary px-8 py-4 text-base">
              Find your Service Point
            </button>
            <button
              onClick={() => scrollToId('turnkey')}
              className="eco-btn-ghost px-8 py-4 text-base"
            >
              Get started
            </button>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

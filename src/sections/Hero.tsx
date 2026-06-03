import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { scrollToId } from '../lib/scroll'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const HERO_IMG =
  'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=2400&q=80'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const [imgFailed, setImgFailed] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Gentle parallax + fade as the hero leaves.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background image with slow Ken Burns zoom */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y }}
      >
        {imgFailed ? (
          <div className="h-full w-full bg-gradient-to-b from-[#0a3a1e] via-eco-navy to-[#020f22]" />
        ) : (
          <motion.img
            src={HERO_IMG}
            alt="A quiet lakeside home surrounded by green nature"
            data-asset="hero/landscape-home"
            onError={() => setImgFailed(true)}
            className="h-[112%] w-full object-cover"
            initial={reduced ? false : { scale: 1.08 }}
            animate={reduced ? undefined : { scale: 1.16 }}
            transition={{ duration: 22, ease: 'easeOut' }}
            draggable={false}
          />
        )}
        {/* Readability gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-eco-navy/70 via-eco-navy/35 to-eco-navy/65"
          style={reduced ? undefined : { opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-eco-navy/55 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="eco-container relative flex h-full flex-col justify-center pt-20"
        style={reduced ? undefined : { y: contentY }}
      >
        <div className="max-w-3xl">
          <motion.span
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-eco-green" />
            30 years of making a difference
          </motion.span>

          <motion.h1
            className="font-extrabold leading-[0.96] tracking-tightest text-white"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 6rem)' }}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            Grounded by design.
            <br />
            <span className="text-eco-green">Elevated</span> by experience.
          </motion.h1>

          <motion.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
          >
            One partner who handles every step, so you never think about it again.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.36 }}
          >
            <button onClick={() => scrollToId('cta')} className="eco-btn-primary px-8 py-4 text-base">
              Get started
            </button>
            <button
              onClick={() => scrollToId('journey')}
              className="group inline-flex items-center gap-2 text-base font-semibold text-white/90 transition-colors hover:text-white"
            >
              See how it works
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/60">
            Scroll
          </span>
          <div className="relative flex h-9 w-5 justify-center rounded-full border border-white/40">
            <span className="mt-1.5 h-2 w-1 rounded-full bg-white/80 animate-scroll-cue" />
          </div>
        </div>
      )}
    </section>
  )
}

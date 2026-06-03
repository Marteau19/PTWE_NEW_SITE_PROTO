import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { navLinks } from '../data/content'
import { scrollToId } from '../lib/scroll'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    setMenuOpen(false)
    scrollToId(id)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-eco-out ${
        scrolled
          ? 'border-b border-eco-navy/5 bg-white/85 backdrop-blur-md shadow-eco-soft'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="eco-container flex h-[68px] items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center"
          aria-label="Ecoflo home"
        >
          <Logo variant={scrolled ? 'color' : 'white'} className="h-7 sm:h-8" />
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.targetId}
              onClick={() => go(link.targetId)}
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-eco-navy/80 hover:text-eco-green' : 'text-white/85 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => go('cta')} className="eco-btn-primary">
            Get started
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 transition-all duration-300 ${
                menuOpen ? 'top-1.5 rotate-45 bg-eco-navy' : `top-0 ${scrolled ? 'bg-eco-navy' : 'bg-white'}`
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 transition-all duration-300 ${
                menuOpen ? 'opacity-0' : `opacity-100 ${scrolled ? 'bg-eco-navy' : 'bg-white'}`
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 transition-all duration-300 ${
                menuOpen ? 'top-1.5 -rotate-45 bg-eco-navy' : `top-3 ${scrolled ? 'bg-eco-navy' : 'bg-white'}`
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-[68px] border-b border-eco-navy/5 bg-white/95 px-6 pb-6 pt-2 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.targetId}
                  onClick={() => go(link.targetId)}
                  className="rounded-xl px-3 py-3 text-left text-base font-medium text-eco-navy hover:bg-eco-green-tint"
                >
                  {link.label}
                </button>
              ))}
              <button onClick={() => go('cta')} className="eco-btn-primary mt-3 w-full">
                Get started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

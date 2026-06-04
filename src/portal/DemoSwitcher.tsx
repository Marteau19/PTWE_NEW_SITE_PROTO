import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth, type Role } from './auth/AuthContext'

/** Presenter aid — a floating control to jump between roles instantly during
 *  the demo. Deliberately styled distinct from the product UI (dark chip). */
export default function DemoSwitcher() {
  const { role, login, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  // Hidden on the public marketing site and the login screen.
  if (location.pathname === '/' || location.pathname === '/login') return null

  const switchTo = (r: Role) => {
    login(r)
    navigate(r === 'customer' ? '/portal' : '/portal/sp')
    setOpen(false)
  }

  const goLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="fixed bottom-5 right-5 z-[1000] flex flex-col items-end gap-2 print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="w-56 overflow-hidden rounded-2xl border border-white/10 bg-eco-navy/95 p-2 text-white shadow-2xl backdrop-blur"
          >
            <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
              Switch view
            </p>
            <button
              onClick={() => switchTo('customer')}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                role === 'customer' ? 'bg-eco-green/20 text-eco-green' : 'hover:bg-white/10'
              }`}
            >
              <span className="text-base">🏡</span> Customer · Marie
            </button>
            <button
              onClick={() => switchTo('servicePoint')}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                role === 'servicePoint' ? 'bg-eco-green/20 text-eco-green' : 'hover:bg-white/10'
              }`}
            >
              <span className="text-base">🛠️</span> Service Point · Québec
            </button>
            <div className="my-1 h-px bg-white/10" />
            <button
              onClick={goLogout}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm text-white/70 transition hover:bg-white/10"
            >
              <span className="text-base">↩︎</span> Log out → site
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-eco-navy px-4 py-2.5 text-sm font-semibold text-white shadow-xl transition hover:bg-[#08294f]"
      >
        <span className="flex h-2 w-2 rounded-full bg-eco-green" />
        Demo
        <span className="text-white/50">·</span>
        <span className="text-white/70">{role === 'customer' ? 'Customer' : 'Service Point'}</span>
      </button>
    </div>
  )
}

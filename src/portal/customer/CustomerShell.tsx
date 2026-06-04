import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from '../../components/Logo'
import { useAuth } from '../auth/AuthContext'
import { usePortalStore } from '../store/PortalStore'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const nav = [
  { to: '/portal', label: 'Home', end: true },
  { to: '/portal/system', label: 'My system', end: false },
  { to: '/portal/book', label: 'Services', end: false },
  { to: '/portal/store', label: 'Store', end: false },
]

export default function CustomerShell() {
  const { user } = useAuth()
  const { getCustomer } = usePortalStore()
  const location = useLocation()
  const reduced = usePrefersReducedMotion()
  const customer = getCustomer(user?.refId ?? '')
  const firstName = customer?.name.split(' ')[0] ?? 'there'

  return (
    <div className="min-h-[100svh] bg-eco-offwhite/70">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-eco-navy/6 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <Logo variant="color" className="h-7" />
            <span className="hidden text-sm font-medium text-eco-body/50 sm:inline">Portal</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'bg-eco-green-tint text-eco-green-dark' : 'text-eco-body/70 hover:text-eco-navy'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs text-eco-body/50">Signed in</p>
              <p className="text-sm font-semibold text-eco-navy">{customer?.name}</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-eco-green/15 text-sm font-bold text-eco-green-dark">
              {firstName[0]}
            </span>
          </div>
        </div>
      </header>

      {/* Page body */}
      <main className="mx-auto max-w-5xl px-5 pb-28 pt-6 sm:pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile bottom nav (pocket experience) */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-eco-navy/8 bg-white/95 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-md items-stretch justify-around px-2">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-eco-green-dark' : 'text-eco-body/55'
                }`
              }
            >
              <span className="text-base">{n.label === 'Home' ? '🏠' : n.label === 'My system' ? '💧' : n.label === 'Services' ? '🗓️' : '🛒'}</span>
              {n.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

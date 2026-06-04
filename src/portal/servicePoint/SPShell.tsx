import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from '../../components/Logo'
import { servicePointName } from '../data/portalData'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const fieldNav = [
  { to: '/portal/sp', label: 'My Day', icon: '📋', end: true },
  { to: '/portal/sp/schedule', label: 'Schedule & route', icon: '🗺️', end: false },
]
const mgmtNav = [
  { to: '/portal/sp/operations', label: 'Operations', icon: '📊', end: false },
  { to: '/portal/sp/accounts', label: 'Customer accounts', icon: '👥', end: false },
]

export default function SPShell() {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()

  // Which lens are we in? (drives the header label + switcher highlight)
  const inMgmt = location.pathname.startsWith('/portal/sp/operations') || location.pathname.startsWith('/portal/sp/accounts')

  return (
    <div className="min-h-[100svh] bg-[#f4f6f8] lg:flex">
      {/* Sidebar */}
      <aside className="sticky top-0 z-40 flex h-auto shrink-0 flex-col border-b border-eco-navy/8 bg-eco-navy text-white lg:h-[100svh] lg:w-64 lg:border-b-0 lg:border-r lg:border-white/10">
        <div className="flex items-center gap-2.5 px-5 py-4">
          <Logo variant="white" className="h-6" />
          <span className="text-xs font-medium text-white/45">Service Point</span>
        </div>
        <div className="px-5 pb-3">
          <p className="text-sm font-semibold">{servicePointName}</p>
          <p className="text-xs text-white/45">Operational portal</p>
        </div>

        {/* Lens switcher */}
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:gap-4 lg:overflow-visible">
          <LensGroup title="Field" items={fieldNav} />
          <LensGroup title="Management" items={mgmtNav} />
        </nav>

        <div className="mt-auto hidden px-5 py-4 text-[11px] text-white/35 lg:block">
          One platform · two lenses on the same reality.
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-eco-navy/8 bg-white/90 px-5 py-3 backdrop-blur-md lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-eco-green">
                {inMgmt ? 'Management lens' : 'Field lens'}
              </p>
              <p className="text-sm font-semibold text-eco-navy">{servicePointName} Service Point</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-eco-navy text-xs font-bold text-white">
              QC
            </span>
          </div>
        </header>

        <main className="flex-1 px-5 pb-12 pt-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

function LensGroup({ title, items }: { title: string; items: typeof fieldNav }) {
  return (
    <div className="shrink-0">
      <p className="mb-1 hidden px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30 lg:block">
        {title}
      </p>
      <div className="flex gap-1 lg:flex-col">
        {items.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-eco-green text-white' : 'text-white/70 hover:bg-white/10'
              }`
            }
          >
            <span>{n.icon}</span>
            {n.label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

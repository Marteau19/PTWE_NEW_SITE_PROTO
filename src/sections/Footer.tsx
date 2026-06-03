import Logo from '../components/Logo'
import { navLinks } from '../data/content'
import { scrollToId } from '../lib/scroll'

const columns: { title: string; links: { label: string; targetId?: string }[] }[] = [
  {
    title: 'Explore',
    links: navLinks.map((l) => ({ label: l.label, targetId: l.targetId })),
  },
  {
    title: 'Solution',
    links: [
      { label: 'How it works', targetId: 'journey' },
      { label: 'The technology', targetId: 'turnkey' },
      { label: 'The app', targetId: 'trust' },
      { label: 'Service Points', targetId: 'map' },
    ],
  },
  {
    title: 'Company',
    links: [{ label: 'About Ecoflo' }, { label: 'Sustainability' }, { label: 'Careers' }, { label: 'Contact' }],
  },
]

export default function Footer() {
  return (
    <footer className="bg-eco-navy text-white">
      <div className="eco-container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo variant="white" className="h-8" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              An invisible, energy-free septic system — and one partner for every step.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/8 px-3.5 py-1.5 text-xs font-semibold text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-eco-green" />
              30 years of making a difference
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => link.targetId && scrollToId(link.targetId)}
                      className="text-sm text-white/70 transition-colors hover:text-eco-green"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>A Premier Tech Water &amp; Environment brand.</p>
          <p>© {new Date().getFullYear()} Ecoflo. Prototype — illustrative content only.</p>
        </div>
      </div>
    </footer>
  )
}

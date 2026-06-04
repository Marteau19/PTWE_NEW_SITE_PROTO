import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../components/Logo'
import { useAuth, type Role } from './auth/AuthContext'
import { demoAccounts } from './data/portalData'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function Login() {
  const { login, role: current } = useAuth()
  const navigate = useNavigate()
  const reduced = usePrefersReducedMotion()
  const [role, setRole] = useState<Role>('customer')
  const [email, setEmail] = useState(demoAccounts.customer.email)
  const [password, setPassword] = useState(demoAccounts.customer.password)

  // Already logged in? Skip straight to the portal.
  useEffect(() => {
    if (current === 'customer') navigate('/portal', { replace: true })
    if (current === 'servicePoint') navigate('/portal/sp', { replace: true })
  }, [current, navigate])

  const pickRole = (r: Role) => {
    setRole(r)
    setEmail(demoAccounts[r].email)
    setPassword(demoAccounts[r].password)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    login(role)
    navigate(role === 'customer' ? '/portal' : '/portal/sp')
  }

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-eco-navy px-5 py-12">
      {/* Brand ambience */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-eco-green/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-eco-green/10 blur-[140px]" />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Link to="/" aria-label="Back to Ecoflo home" className="inline-flex">
            <Logo variant="white" className="h-9" />
          </Link>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.22em] text-eco-green">The Ecoflo Portal</p>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-eco-card sm:p-8">
          {/* Role toggle */}
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-2xl bg-eco-navy/5 p-1">
            {(['customer', 'servicePoint'] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => pickRole(r)}
                className="relative rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors"
              >
                {role === r && (
                  <motion.span
                    layoutId="role-pill"
                    className="absolute inset-0 rounded-xl bg-white shadow-eco-soft"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 ${role === r ? 'text-eco-navy' : 'text-eco-body/60'}`}>
                  {r === 'customer' ? 'Customer' : 'Service Point'}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-eco-body/70">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-eco-navy/12 bg-eco-offwhite/60 px-4 py-3 text-sm text-eco-navy outline-none transition focus:border-eco-green focus:ring-2 focus:ring-eco-green/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-eco-body/70">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-eco-navy/12 bg-eco-offwhite/60 px-4 py-3 text-sm text-eco-navy outline-none transition focus:border-eco-green focus:ring-2 focus:ring-eco-green/20"
              />
            </div>

            <button type="submit" className="eco-btn-primary w-full py-3.5">
              Sign in
            </button>
          </form>

          <div className="mt-5 rounded-xl bg-eco-green-tint/60 px-4 py-3 text-center text-xs text-eco-body/70">
            <span className="font-semibold text-eco-green-dark">Demo accounts</span> · pick a role above to
            prefill. {role === 'customer' ? demoAccounts.customer.email : demoAccounts.servicePoint.email} ·
            any password.
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-white/50">
          <Link to="/" className="transition hover:text-white">
            ← Back to ecoflo.com
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

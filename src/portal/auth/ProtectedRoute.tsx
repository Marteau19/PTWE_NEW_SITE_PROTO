import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth, type Role } from './AuthContext'

/** Guards portal routes. Redirects to /login when unauthenticated, or to the
 *  correct portal home when the logged-in role doesn't match this branch. */
export default function ProtectedRoute({ role, children }: { role: Role; children: ReactNode }) {
  const { role: current } = useAuth()
  if (!current) return <Navigate to="/login" replace />
  if (current !== role) {
    return <Navigate to={current === 'customer' ? '/portal' : '/portal/sp'} replace />
  }
  return <>{children}</>
}

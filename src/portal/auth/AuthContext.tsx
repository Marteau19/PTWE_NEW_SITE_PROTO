// Mock auth — front-end only. No real credentials are checked.
import { createContext, useContext, useState, type ReactNode } from 'react'
import { demoAccounts, DEMO_CUSTOMER_ID, DEMO_SERVICE_POINT_ID } from '../data/portalData'

export type Role = 'customer' | 'servicePoint'

export interface PortalUser {
  name: string
  email: string
  /** customerId or servicePointId depending on role */
  refId: string
}

interface AuthState {
  role: Role | null
  user: PortalUser | null
  login: (role: Role) => void
  logout: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null)
  const [user, setUser] = useState<PortalUser | null>(null)

  const login = (r: Role) => {
    if (r === 'customer') {
      setUser({ ...demoAccounts.customer, refId: DEMO_CUSTOMER_ID })
    } else {
      setUser({ ...demoAccounts.servicePoint, refId: DEMO_SERVICE_POINT_ID })
    }
    setRole(r)
  }

  const logout = () => {
    setRole(null)
    setUser(null)
  }

  return <AuthContext.Provider value={{ role, user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MarketingHome from './pages/MarketingHome'
import { AuthProvider } from './portal/auth/AuthContext'
import { PortalStoreProvider } from './portal/store/PortalStore'
import Login from './portal/Login'
import DemoSwitcher from './portal/DemoSwitcher'
import ProtectedRoute from './portal/auth/ProtectedRoute'
import CustomerShell from './portal/customer/CustomerShell'
import CustomerDashboard from './portal/customer/CustomerDashboard'
import CustomerSystem from './portal/customer/CustomerSystem'
import BookService from './portal/customer/BookService'
import Store from './portal/customer/Store'
import SPShell from './portal/servicePoint/SPShell'
import MyDay from './portal/servicePoint/MyDay'
import Schedule from './portal/servicePoint/Schedule'
import WorkOrder from './portal/servicePoint/WorkOrder'
import Operations from './portal/servicePoint/Operations'
import Accounts from './portal/servicePoint/Accounts'

export default function App() {
  return (
    <AuthProvider>
      <PortalStoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MarketingHome />} />
            <Route path="/login" element={<Login />} />

            {/* Customer portal */}
            <Route
              path="/portal"
              element={
                <ProtectedRoute role="customer">
                  <CustomerShell />
                </ProtectedRoute>
              }
            >
              <Route index element={<CustomerDashboard />} />
              <Route path="system" element={<CustomerSystem />} />
              <Route path="book" element={<BookService />} />
              <Route path="store" element={<Store />} />
            </Route>

            {/* Service Point portal */}
            <Route
              path="/portal/sp"
              element={
                <ProtectedRoute role="servicePoint">
                  <SPShell />
                </ProtectedRoute>
              }
            >
              <Route index element={<MyDay />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="work-order/:jobId" element={<WorkOrder />} />
              <Route path="operations" element={<Operations />} />
              <Route path="accounts" element={<Accounts />} />
              <Route path="accounts/:customerId" element={<Accounts />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <DemoSwitcher />
        </BrowserRouter>
      </PortalStoreProvider>
    </AuthProvider>
  )
}

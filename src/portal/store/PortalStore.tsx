// Shared in-memory store — the heart of the "two lenses, one reality" demo.
// Both the customer view and the Service Point view read and write the SAME
// state here. When an operator marks a work order complete, the linked
// customer's service history updates live, with no reload.

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  customers as seedCustomers,
  jobs as seedJobs,
  partOrders as seedPartOrders,
  technicianById,
  type Customer,
  type Job,
  type JobType,
  type PartOrder,
  type ServiceVisit,
} from '../data/portalData'

interface BookingInput {
  customerId: string
  type: JobType
  date: string // ISO
  technicianId: string
}

interface PortalState {
  customers: Customer[]
  jobs: Job[]
  partOrders: PartOrder[]
  /** Marks a work order complete; mirrors it into the customer's history. */
  completeJob: (jobId: string, note?: string) => void
  /** Customer books a service; creates a new scheduled job for the SP. */
  bookService: (input: BookingInput) => Job
  /** Customer places a parts order. */
  placeOrder: (customerId: string, partId: string, qty: number) => void
  getCustomer: (id: string) => Customer | undefined
  getJob: (id: string) => Job | undefined
}

const PortalContext = createContext<PortalState | null>(null)

const niceType: Record<JobType, string> = {
  FMR: 'Filter media replacement',
  inspection: 'Inspection',
  pumping: 'Pumping',
  repair: 'Repair',
  install: 'Installation',
  'soil-test': 'Soil test',
}

let seq = 1000

export function PortalStoreProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(() => seedCustomers.map((c) => ({ ...c })))
  const [jobs, setJobs] = useState<Job[]>(() => seedJobs.map((j) => ({ ...j })))
  const [partOrders, setPartOrders] = useState<PartOrder[]>(() => seedPartOrders.map((o) => ({ ...o })))

  const value = useMemo<PortalState>(() => {
    const completeJob: PortalState['completeJob'] = (jobId, note) => {
      setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: 'completed' } : j)))
      setJobs((curr) => {
        const job = curr.find((j) => j.id === jobId)
        if (job) {
          const techName = technicianById(job.technicianId)?.name ?? 'Service Point team'
          const visit: ServiceVisit = {
            id: `v-${jobId}`,
            date: new Date().toISOString(),
            type: job.type,
            summary: note?.trim()
              ? note.trim()
              : `${niceType[job.type]} completed by your Service Point`,
            technician: techName,
            completed: true,
          }
          // Mirror into the linked customer's history + clear "service due".
          setCustomers((cs) =>
            cs.map((c) =>
              c.id === job.customerId
                ? {
                    ...c,
                    status: 'all-good',
                    serviceHistory: [visit, ...c.serviceHistory.filter((v) => v.id !== visit.id)],
                  }
                : c,
            ),
          )
        }
        return curr
      })
    }

    const bookService: PortalState['bookService'] = ({ customerId, type, date, technicianId }) => {
      const customer = customers.find((c) => c.id === customerId)
      const newJob: Job = {
        id: `job-${++seq}`,
        customerId,
        servicePointId: customer?.servicePointId ?? 'qc',
        type,
        scheduledDate: date,
        windowLabel: '8:00 – 10:00',
        status: 'scheduled',
        technicianId,
        address: customer?.address ?? '',
        notes: 'Booked by customer via the Ecoflo Portal.',
      }
      setJobs((prev) => [newJob, ...prev])
      setCustomers((cs) =>
        cs.map((c) => (c.id === customerId && c.status === 'all-good' ? { ...c, status: 'service-due' } : c)),
      )
      return newJob
    }

    const placeOrder: PortalState['placeOrder'] = (customerId, partId, qty) => {
      setPartOrders((prev) => [
        { id: `po-${++seq}`, customerId, partId, qty, date: new Date().toISOString(), status: 'processing' },
        ...prev,
      ])
    }

    return {
      customers,
      jobs,
      partOrders,
      completeJob,
      bookService,
      placeOrder,
      getCustomer: (id) => customers.find((c) => c.id === id),
      getJob: (id) => jobs.find((j) => j.id === id),
    }
  }, [customers, jobs, partOrders])

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
}

export function usePortalStore() {
  const ctx = useContext(PortalContext)
  if (!ctx) throw new Error('usePortalStore must be used within PortalStoreProvider')
  return ctx
}

export { niceType }

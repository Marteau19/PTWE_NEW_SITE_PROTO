// MOCK DATA — Ecoflo Portal. Illustrative only, no real customers.
// Everything here is linked by id so the same event can be shown from two
// lenses: the customer's worry-free view and the Service Point's operations.
// The hero example — Marie Tremblay / Québec City (`qc`) / FMR / tech Luc —
// is wired end to end.

import { servicePoints } from '../../data/servicePoints'

export type JobType = 'FMR' | 'inspection' | 'pumping' | 'repair' | 'install' | 'soil-test'
export type JobStatus = 'scheduled' | 'in-progress' | 'completed'
export type SystemStatus = 'all-good' | 'service-due' | 'attention'
export type QuoteStatus = 'pending' | 'approved' | 'expired'
export type LeadStage = 'new' | 'qualified' | 'quoted' | 'won'
export type LeadSource = 'Sludge pumping' | 'Customer service' | 'Inspection' | 'Multi-brand service'

export interface Technician {
  id: string
  name: string
  servicePointId: string
  role: string
  jobsCompleted: number
  utilization: number // 0–100
}

export interface ServiceVisit {
  id: string
  date: string // ISO
  type: JobType
  summary: string
  technician: string
  completed: boolean
}

export interface TimelineStep {
  label: string
  status: 'done' | 'current' | 'upcoming'
}

export interface CustomerDoc {
  id: string
  name: string
  kind: 'Warranty' | 'Permit' | 'Invoice' | 'Manual' | 'Report'
  date: string
}

export interface CustomerMessage {
  id: string
  from: 'customer' | 'servicePoint'
  author: string
  body: string
  date: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  region: string
  servicePointId: string
  model: string
  installDate: string
  warrantyUntil: string
  status: SystemStatus
  litresThisMonth: number
  litresLifetime: number
  litresPerSecond: number
  lat: number
  lng: number
  timeline: TimelineStep[]
  serviceHistory: ServiceVisit[]
  documents: CustomerDoc[]
  messages: CustomerMessage[]
}

export interface Job {
  id: string
  customerId: string
  servicePointId: string
  type: JobType
  scheduledDate: string // ISO
  windowLabel: string // e.g. "8:00 – 10:00"
  status: JobStatus
  technicianId: string
  address: string
  notes?: string
}

export interface QuoteLine {
  label: string
  amount: number
}
export interface Quote {
  id: string
  customerId: string
  title: string
  lines: QuoteLine[]
  total: number
  status: QuoteStatus
  date: string
}

export interface Part {
  id: string
  name: string
  blurb: string
  price: number
  category: 'Filter media' | 'Kits' | 'Accessories'
  reorder?: boolean
}

export interface PartOrder {
  id: string
  customerId: string
  partId: string
  qty: number
  date: string
  status: 'delivered' | 'processing'
}

export interface Lead {
  id: string
  name: string
  source: LeadSource
  stage: LeadStage
  value: number
  region: string
  servicePointId: string
}

const sp = (id: string) => servicePoints.find((s) => s.id === id)!

// ── Technicians (Québec City team is the focus) ──────────────────────────
export const technicians: Technician[] = [
  { id: 'luc', name: 'Luc Bélanger', servicePointId: 'qc', role: 'Senior technician', jobsCompleted: 412, utilization: 86 },
  { id: 'sophie', name: 'Sophie Gagné', servicePointId: 'qc', role: 'Field technician', jobsCompleted: 298, utilization: 74 },
  { id: 'marc', name: 'Marc Pelletier', servicePointId: 'qc', role: 'Field technician', jobsCompleted: 351, utilization: 79 },
  { id: 'julie', name: 'Julie Caron', servicePointId: 'qc', role: 'Install lead', jobsCompleted: 188, utilization: 68 },
]

// ── Helper: build dates relative to "today" so the demo always feels live ─
const today = new Date()
function dayOffset(n: number, hh = 9, mm = 0): string {
  const d = new Date(today)
  d.setDate(d.getDate() + n)
  d.setHours(hh, mm, 0, 0)
  return d.toISOString()
}

// ── Customers (Québec City territory) ────────────────────────────────────
const qc = sp('qc')

export const customers: Customer[] = [
  {
    id: 'marie',
    name: 'Marie Tremblay',
    email: 'marie@example.com',
    phone: '+1 418 555 0142',
    address: '128 Rang Saint-Joseph, Saint-Augustin-de-Desmaures, QC',
    region: 'Québec',
    servicePointId: 'qc',
    model: 'Ecoflo Coco Filter — 750',
    installDate: '2019-06-14',
    warrantyUntil: '2034-06-14',
    status: 'service-due',
    litresThisMonth: 12_480,
    litresLifetime: 2_184_000,
    litresPerSecond: 0.6,
    lat: 46.7325,
    lng: -71.46,
    timeline: [
      { label: 'Soil test & design', status: 'done' },
      { label: 'Quote approved', status: 'done' },
      { label: 'Installed & activated', status: 'done' },
      { label: 'Active care', status: 'current' },
    ],
    serviceHistory: [
      { id: 'v-marie-1', date: '2023-05-09', type: 'FMR', summary: 'Filter media replaced, system flushed', technician: 'Luc Bélanger', completed: true },
      { id: 'v-marie-2', date: '2022-04-21', type: 'inspection', summary: 'Annual inspection — all parameters nominal', technician: 'Sophie Gagné', completed: true },
      { id: 'v-marie-3', date: '2019-06-14', type: 'install', summary: 'System installed and commissioned', technician: 'Julie Caron', completed: true },
    ],
    documents: [
      { id: 'd-marie-1', name: 'Warranty certificate', kind: 'Warranty', date: '2019-06-14' },
      { id: 'd-marie-2', name: 'Installation permit', kind: 'Permit', date: '2019-05-30' },
      { id: 'd-marie-3', name: 'FMR invoice 2023', kind: 'Invoice', date: '2023-05-09' },
      { id: 'd-marie-4', name: 'Owner manual', kind: 'Manual', date: '2019-06-14' },
    ],
    messages: [
      { id: 'm-marie-1', from: 'servicePoint', author: 'Québec City Service Point', body: 'Bonjour Marie — your filter media replacement is booked. Luc will be your technician.', date: dayOffset(-3, 10, 15) },
      { id: 'm-marie-2', from: 'customer', author: 'Marie Tremblay', body: 'Perfect, thank you! Morning works best for me.', date: dayOffset(-3, 11, 2) },
    ],
  },
  {
    id: 'andre',
    name: 'André Côté',
    email: 'andre@example.com',
    phone: '+1 418 555 0188',
    address: '45 Chemin du Lac, Lac-Beauport, QC',
    region: 'Québec',
    servicePointId: 'qc',
    model: 'Ecoflo Coco Filter — 1000',
    installDate: '2021-09-02',
    warrantyUntil: '2036-09-02',
    status: 'all-good',
    litresThisMonth: 16_900,
    litresLifetime: 1_020_000,
    litresPerSecond: 0.8,
    lat: 46.9651,
    lng: -71.2861,
    timeline: [
      { label: 'Soil test & design', status: 'done' },
      { label: 'Quote approved', status: 'done' },
      { label: 'Installed & activated', status: 'done' },
      { label: 'Active care', status: 'current' },
    ],
    serviceHistory: [
      { id: 'v-andre-1', date: '2024-08-18', type: 'inspection', summary: 'Annual inspection — nominal', technician: 'Marc Pelletier', completed: true },
      { id: 'v-andre-2', date: '2021-09-02', type: 'install', summary: 'System installed and commissioned', technician: 'Julie Caron', completed: true },
    ],
    documents: [
      { id: 'd-andre-1', name: 'Warranty certificate', kind: 'Warranty', date: '2021-09-02' },
      { id: 'd-andre-2', name: 'Inspection report 2024', kind: 'Report', date: '2024-08-18' },
    ],
    messages: [],
  },
  {
    id: 'nathalie',
    name: 'Nathalie Roy',
    email: 'nathalie@example.com',
    phone: '+1 418 555 0207',
    address: '12 Rue des Érables, Stoneham, QC',
    region: 'Québec',
    servicePointId: 'qc',
    model: 'Ecoflo Coco Filter — 750',
    installDate: '2020-07-22',
    warrantyUntil: '2035-07-22',
    status: 'attention',
    litresThisMonth: 9_240,
    litresLifetime: 1_460_000,
    litresPerSecond: 0.5,
    lat: 47.0,
    lng: -71.37,
    timeline: [
      { label: 'Soil test & design', status: 'done' },
      { label: 'Quote approved', status: 'done' },
      { label: 'Installed & activated', status: 'done' },
      { label: 'Active care', status: 'current' },
    ],
    serviceHistory: [
      { id: 'v-nat-1', date: '2023-06-30', type: 'FMR', summary: 'Filter media replaced', technician: 'Luc Bélanger', completed: true },
      { id: 'v-nat-2', date: '2020-07-22', type: 'install', summary: 'System installed and commissioned', technician: 'Julie Caron', completed: true },
    ],
    documents: [{ id: 'd-nat-1', name: 'Warranty certificate', kind: 'Warranty', date: '2020-07-22' }],
    messages: [],
  },
  {
    id: 'pierre',
    name: 'Pierre Lavoie',
    email: 'pierre@example.com',
    phone: '+1 418 555 0233',
    address: '301 Route de Fossambault, Sainte-Catherine-de-la-Jacques-Cartier, QC',
    region: 'Québec',
    servicePointId: 'qc',
    model: 'Ecoflo Coco Filter — 1000',
    installDate: '2018-05-03',
    warrantyUntil: '2033-05-03',
    status: 'all-good',
    litresThisMonth: 14_100,
    litresLifetime: 2_760_000,
    litresPerSecond: 0.7,
    lat: 46.84,
    lng: -71.62,
    timeline: [
      { label: 'Soil test & design', status: 'done' },
      { label: 'Quote approved', status: 'done' },
      { label: 'Installed & activated', status: 'done' },
      { label: 'Active care', status: 'current' },
    ],
    serviceHistory: [
      { id: 'v-pierre-1', date: '2024-05-12', type: 'FMR', summary: 'Filter media replaced', technician: 'Sophie Gagné', completed: true },
      { id: 'v-pierre-2', date: '2018-05-03', type: 'install', summary: 'System installed and commissioned', technician: 'Julie Caron', completed: true },
    ],
    documents: [{ id: 'd-pierre-1', name: 'Warranty certificate', kind: 'Warranty', date: '2018-05-03' }],
    messages: [],
  },
  {
    id: 'genevieve',
    name: 'Geneviève Fortin',
    email: 'genevieve@example.com',
    phone: '+1 418 555 0261',
    address: '88 Rue Principale, Shannon, QC',
    region: 'Québec',
    servicePointId: 'qc',
    model: 'Ecoflo Coco Filter — 750',
    installDate: '2022-10-11',
    warrantyUntil: '2037-10-11',
    status: 'all-good',
    litresThisMonth: 11_300,
    litresLifetime: 640_000,
    litresPerSecond: 0.5,
    lat: 46.88,
    lng: -71.51,
    timeline: [
      { label: 'Soil test & design', status: 'done' },
      { label: 'Quote approved', status: 'done' },
      { label: 'Installed & activated', status: 'done' },
      { label: 'Active care', status: 'current' },
    ],
    serviceHistory: [
      { id: 'v-gen-1', date: '2022-10-11', type: 'install', summary: 'System installed and commissioned', technician: 'Julie Caron', completed: true },
    ],
    documents: [{ id: 'd-gen-1', name: 'Warranty certificate', kind: 'Warranty', date: '2022-10-11' }],
    messages: [],
  },
]

// ── Jobs / work orders (this week's route for Québec City) ───────────────
// Marie's FMR is the hero job: scheduled, assigned to Luc, completable.
export const jobs: Job[] = [
  {
    id: 'job-marie-fmr',
    customerId: 'marie',
    servicePointId: 'qc',
    type: 'FMR',
    scheduledDate: dayOffset(2, 8, 30),
    windowLabel: '8:30 – 10:00',
    status: 'scheduled',
    technicianId: 'luc',
    address: '128 Rang Saint-Joseph, Saint-Augustin-de-Desmaures, QC',
    notes: 'Filter media replacement — 5-year interval. Bring 750 media kit.',
  },
  {
    id: 'job-nat-insp',
    customerId: 'nathalie',
    servicePointId: 'qc',
    type: 'inspection',
    scheduledDate: dayOffset(1, 11, 0),
    windowLabel: '11:00 – 12:00',
    status: 'scheduled',
    technicianId: 'sophie',
    address: '12 Rue des Érables, Stoneham, QC',
    notes: 'Customer reported a faint odour — inspect venting.',
  },
  {
    id: 'job-andre-pump',
    customerId: 'andre',
    servicePointId: 'qc',
    type: 'pumping',
    scheduledDate: dayOffset(0, 13, 30),
    windowLabel: '13:30 – 15:00',
    status: 'in-progress',
    technicianId: 'marc',
    address: '45 Chemin du Lac, Lac-Beauport, QC',
  },
  {
    id: 'job-pierre-fmr',
    customerId: 'pierre',
    servicePointId: 'qc',
    type: 'FMR',
    scheduledDate: dayOffset(3, 9, 0),
    windowLabel: '9:00 – 10:30',
    status: 'scheduled',
    technicianId: 'luc',
    address: '301 Route de Fossambault, Sainte-Catherine-de-la-Jacques-Cartier, QC',
  },
  {
    id: 'job-gen-insp',
    customerId: 'genevieve',
    servicePointId: 'qc',
    type: 'inspection',
    scheduledDate: dayOffset(4, 14, 0),
    windowLabel: '14:00 – 15:00',
    status: 'scheduled',
    technicianId: 'sophie',
    address: '88 Rue Principale, Shannon, QC',
  },
]

// ── Quotes ───────────────────────────────────────────────────────────────
export const quotes: Quote[] = [
  {
    id: 'q-nat-1',
    customerId: 'nathalie',
    title: 'Venting repair + inspection',
    lines: [
      { label: 'Vent stack repair', amount: 340 },
      { label: 'Diagnostic inspection', amount: 120 },
    ],
    total: 460,
    status: 'pending',
    date: dayOffset(-1, 16, 0),
  },
  {
    id: 'q-gen-1',
    customerId: 'genevieve',
    title: 'Extended care plan (3 yr)',
    lines: [{ label: '3-year proactive care plan', amount: 890 }],
    total: 890,
    status: 'approved',
    date: dayOffset(-12, 9, 0),
  },
]

// ── Parts catalog ────────────────────────────────────────────────────────
export const parts: Part[] = [
  { id: 'media-750', name: 'Coco filter media — 750', blurb: 'Genuine coconut-husk media for the Ecoflo 750. 5-year service life.', price: 320, category: 'Filter media', reorder: true },
  { id: 'media-1000', name: 'Coco filter media — 1000', blurb: 'Genuine coconut-husk media for the Ecoflo 1000.', price: 410, category: 'Filter media' },
  { id: 'fmr-kit', name: 'FMR service kit', blurb: 'Everything for a filter media replacement: media, gaskets, seals.', price: 480, category: 'Kits', reorder: true },
  { id: 'riser-kit', name: 'Access riser kit', blurb: 'Watertight riser extension for easier access.', price: 145, category: 'Accessories' },
  { id: 'effluent-filter', name: 'Effluent filter cartridge', blurb: 'Replacement outlet filter cartridge.', price: 68, category: 'Accessories' },
  { id: 'care-plan', name: 'Proactive care plan — 1 yr', blurb: 'Annual inspection + priority scheduling with your Service Point.', price: 240, category: 'Kits' },
]

export const partOrders: PartOrder[] = [
  { id: 'po-marie-1', customerId: 'marie', partId: 'effluent-filter', qty: 1, date: '2024-03-02', status: 'delivered' },
  { id: 'po-marie-2', customerId: 'marie', partId: 'media-750', qty: 1, date: '2023-05-01', status: 'delivered' },
]

// ── Leads pipeline (the flywheel) ────────────────────────────────────────
export const leads: Lead[] = [
  { id: 'l1', name: 'Lac-St-Charles property', source: 'Sludge pumping', stage: 'new', value: 9800, region: 'Québec', servicePointId: 'qc' },
  { id: 'l2', name: 'Valcartier residence', source: 'Inspection', stage: 'qualified', value: 11200, region: 'Québec', servicePointId: 'qc' },
  { id: 'l3', name: 'Wendake cottage', source: 'Customer service', stage: 'quoted', value: 8600, region: 'Québec', servicePointId: 'qc' },
  { id: 'l4', name: 'Pont-Rouge new build', source: 'Multi-brand service', stage: 'quoted', value: 13400, region: 'Québec', servicePointId: 'qc' },
  { id: 'l5', name: 'Donnacona lakeside', source: 'Sludge pumping', stage: 'won', value: 10500, region: 'Québec', servicePointId: 'qc' },
  { id: 'l6', name: 'Neuville farmhouse', source: 'Inspection', stage: 'new', value: 7600, region: 'Québec', servicePointId: 'qc' },
  { id: 'l7', name: 'Cap-Santé estate', source: 'Customer service', stage: 'qualified', value: 12900, region: 'Québec', servicePointId: 'qc' },
  { id: 'l8', name: 'Fossambault resort', source: 'Multi-brand service', stage: 'won', value: 18800, region: 'Québec', servicePointId: 'qc' },
]

// ── Demo account directory ───────────────────────────────────────────────
export const DEMO_CUSTOMER_ID = 'marie'
export const DEMO_SERVICE_POINT_ID = 'qc'
export const servicePointName = qc.name

export const demoAccounts = {
  customer: { email: 'marie@example.com', password: 'demo1234', name: 'Marie Tremblay' },
  servicePoint: { email: 'service@ecoflo.com', password: 'demo1234', name: 'Québec City Service Point' },
}

// ── Convenience lookups ──────────────────────────────────────────────────
export const customerById = (id: string) => customers.find((c) => c.id === id)
export const technicianById = (id: string) => technicians.find((t) => t.id === id)
export const partById = (id: string) => parts.find((p) => p.id === id)
export const jobsForServicePoint = (id: string) => jobs.filter((j) => j.servicePointId === id)
export const customersForServicePoint = (id: string) => customers.filter((c) => c.servicePointId === id)

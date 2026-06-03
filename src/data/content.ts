// Central content + nav config. Copy is approved brand voice (see BRAND.md).

export interface NavLink {
  label: string
  targetId: string
}

export const navLinks: NavLink[] = [
  { label: 'How it works', targetId: 'journey' },
  { label: 'Our solution', targetId: 'turnkey' },
  { label: 'Find a Service Point', targetId: 'map' },
  { label: 'About', targetId: 'trust' },
]

export interface JourneyStep {
  step: string
  title: string
  description: string
}

export const journeySteps: JourneyStep[] = [
  {
    step: '01',
    title: 'Soil test & design',
    description: 'We assess your land and design the right system for your property.',
  },
  {
    step: '02',
    title: 'Installation',
    description: 'Delivered and installed by your local Ecoflo Service Point.',
  },
  {
    step: '03',
    title: 'It disappears',
    description: 'The system goes underground. Your yard stays your yard.',
  },
  {
    step: '04',
    title: 'Lifetime care',
    description: 'Proactive maintenance, monitoring and support — all handled for you.',
  },
]

// The "many contractors" mess that Ecoflo replaces (section 3).
export const fragmentedRoles: string[] = [
  'Soil tester',
  'System designer',
  'Permit paperwork',
  'Excavation crew',
  'Installer',
  'Inspector',
  'Maintenance crew',
  'Emergency callouts',
]

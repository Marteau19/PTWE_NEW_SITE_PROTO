// MOCK DATA — illustrative homeowner testimonials for the prototype.

export interface Testimonial {
  quote: string
  name: string
  location: string
  avatar: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'From the soil test to the day they switched it on, we dealt with one team. No chasing contractors, no surprises. Our yard looks like nothing was ever there.',
    name: 'Sarah & Marc L.',
    location: 'Lakeside cottage, Eastern Townships, QC',
    avatar:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'We barely think about it. The app tells us everything is fine, maintenance just happens, and the grass grew back beautifully over it.',
    name: 'James P.',
    location: 'Rural home, Burlington, VT',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'No electricity to run it, no noise, no smell. It felt like the responsible choice for the lake and for our family — and it was genuinely easy.',
    name: 'Élise R.',
    location: 'Waterfront property, near Québec City',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
  },
]

export interface CertBadge {
  label: string
  sub: string
}

// Placeholder compliance / certification badges (illustrative).
export const certBadges: CertBadge[] = [
  { label: 'BNQ', sub: 'Certified performance' },
  { label: 'NSF/ANSI 40', sub: 'Treatment standard' },
  { label: 'CE', sub: 'European conformity' },
  { label: 'ISO 14001', sub: 'Environmental mgmt' },
  { label: 'CSA', sub: 'Safety verified' },
]

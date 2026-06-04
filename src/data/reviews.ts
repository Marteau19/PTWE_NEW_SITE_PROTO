// MOCK DATA — Customer reviews for the Québec City Service Point.
// A realistic spread: predominantly positive with honest critical ones included.
// Reviews linked to customerId mirror the portalData.ts dataset, so the
// "one platform, one dataset" thread is maintained.

import type { JobType } from '../portal/data/portalData'

export interface Review {
  id: string
  servicePointId: string
  rating: 1 | 2 | 3 | 4 | 5
  customerName: string
  /** Links to a Customer in portalData when available. */
  customerId?: string
  date: string
  serviceType: JobType
  body: string
  responded?: boolean
  responseText?: string
}

export const reviews: Review[] = [
  {
    id: 'r-01',
    servicePointId: 'qc',
    rating: 5,
    customerName: 'Marie Tremblay',
    customerId: 'marie',
    date: '2023-05-12',
    serviceType: 'FMR',
    body: "Luc arrived right on time, explained everything he was doing, and left the yard spotless. The whole visit took less than an hour. This is exactly what I expected from Ecoflo — zero stress, completely invisible. Five stars, no hesitation.",
    responded: true,
    responseText: "Thank you Marie! Luc loved hearing this. See you in a few years for the next one 😊",
  },
  {
    id: 'r-02',
    servicePointId: 'qc',
    rating: 5,
    customerName: 'André Côté',
    customerId: 'andre',
    date: '2024-08-21',
    serviceType: 'inspection',
    body: "Marc was professional and thorough. He showed me the effluent results on the spot and walked me through what everything meant. The portal update came through the same day. Very impressed.",
  },
  {
    id: 'r-03',
    servicePointId: 'qc',
    rating: 4,
    customerName: 'Nathalie Roy',
    customerId: 'nathalie',
    date: '2023-07-05',
    serviceType: 'FMR',
    body: "Good service overall. Sophie was friendly and efficient. My only comment is that the appointment confirmation came late — only a day before. Better advance notice would be great. The work itself was perfect.",
    responded: true,
    responseText: "Thank you Nathalie, that's fair feedback on the reminder timing. We've updated our booking flow — you'll now get a confirmation 72 hours in advance.",
  },
  {
    id: 'r-04',
    servicePointId: 'qc',
    rating: 5,
    customerName: 'Pierre Lavoie',
    customerId: 'pierre',
    date: '2024-05-14',
    serviceType: 'FMR',
    body: "This is my second filter media replacement in six years. Same quality both times. Sophie was great — fast, clean, and clearly knows the system inside out. I genuinely never think about my septic system and that's exactly what I want.",
  },
  {
    id: 'r-05',
    servicePointId: 'qc',
    rating: 5,
    customerName: 'Geneviève Fortin',
    customerId: 'genevieve',
    date: '2022-10-14',
    serviceType: 'install',
    body: "Installation day went perfectly. Julie's crew was on site at 8 AM and done by early afternoon. The yard was raked and tidy when they left. The system has been completely silent ever since. Absolutely the right choice.",
  },
  {
    id: 'r-06',
    servicePointId: 'qc',
    rating: 2,
    customerName: 'François Beaulieu',
    date: '2024-06-03',
    serviceType: 'repair',
    body: "I called about a persistent odour. The first technician diagnosed it as a venting issue and left without fixing it, saying a part needed to be ordered. Three weeks went by with no update — I had to call twice to follow up. When Luc finally came back the repair itself was done well, but the communication in between was really poor. I expect better from a premium service.",
    responded: true,
    responseText: "François, you're absolutely right and we apologise. A part delay shouldn't mean three weeks of silence on our end. We've flagged this internally and we're improving how we communicate during open repair tickets. Thank you for staying with us.",
  },
  {
    id: 'r-07',
    servicePointId: 'qc',
    rating: 5,
    customerName: 'Isabelle Deschênes',
    date: '2024-01-18',
    serviceType: 'inspection',
    body: "I was nervous because I'd heard horror stories about septic inspections. This couldn't have been more different. Marc spent about 45 minutes, showed me the numbers (all green), and answered every question I had. I'm converted — if you have an Ecoflo, just book the annual inspection and sleep easy.",
  },
  {
    id: 'r-08',
    servicePointId: 'qc',
    rating: 3,
    customerName: 'Jean-Paul Bouchard',
    date: '2023-11-09',
    serviceType: 'pumping',
    body: "The pumping was done competently but the technician was in and out so fast I barely had a chance to ask any questions. I'd appreciate a brief explanation of what was found and whether everything looked normal. It felt transactional rather than like a service call from a team that knows my property.",
  },
  {
    id: 'r-09',
    servicePointId: 'qc',
    rating: 5,
    customerName: 'Caroline Bouchard',
    date: '2025-02-10',
    serviceType: 'inspection',
    body: "We just bought a property with an Ecoflo system and called the Service Point to understand what we'd inherited. Sophie was incredibly helpful — she pulled up the full service history, explained the remaining warranty, and booked our first inspection on the spot. This is customer service done right.",
    responded: true,
    responseText: "Welcome to the Ecoflo family, Caroline! Sophie will be happy to hear this. Don't hesitate to reach out anytime.",
  },
  {
    id: 'r-10',
    servicePointId: 'qc',
    rating: 4,
    customerName: 'Réjean Tremblay',
    date: '2024-09-28',
    serviceType: 'FMR',
    body: "Everything was done to a high standard. My only small comment: the technician's arrival was about 40 minutes past the window. Not a big deal, but a quick text to say he was running late would've been appreciated. The work itself and the follow-up report on the portal were excellent.",
  },
  {
    id: 'r-11',
    servicePointId: 'qc',
    rating: 5,
    customerName: 'Sylvie Marchand',
    date: '2025-01-29',
    serviceType: 'install',
    body: "We replaced an old conventional system with an Ecoflo during a full bathroom renovation. Julie's team coordinated seamlessly with our contractor. The system was in the ground and commissioned in one day. Six months later — nothing. No smell, no maintenance calls, no worry. Exactly as promised.",
  },
  {
    id: 'r-12',
    servicePointId: 'qc',
    rating: 1,
    customerName: 'Gaétan Lévesque',
    date: '2023-08-14',
    serviceType: 'repair',
    body: "I had an emergency leak near the access riser and was told the earliest available slot was 11 days away. For a system issue that could contaminate my yard, that's not acceptable. I had to rent equipment and do a temporary fix myself. When someone finally did arrive the repair was quick and professional, but the emergency response protocol needs serious work.",
    responded: true,
    responseText: "Gaétan, a 11-day wait for an emergency call is not the standard we hold ourselves to, and we're sorry this happened during a period of high demand. We've since added an emergency escalation line and dedicated on-call coverage. We hope to earn back your confidence.",
  },
  {
    id: 'r-13',
    servicePointId: 'qc',
    rating: 5,
    customerName: 'Hélène Gosselin',
    date: '2024-12-04',
    serviceType: 'inspection',
    body: "Simple, efficient, professional. The inspection took under an hour, the report appeared in my portal the same evening, and everything was green. This is what I pay for — a team I can trust to tell me the truth about my system. Highly recommend.",
  },
  {
    id: 'r-14',
    servicePointId: 'qc',
    rating: 4,
    customerName: 'Mathieu Girard',
    date: '2025-03-17',
    serviceType: 'FMR',
    body: "Luc did a great job. He was fast, tidy, and clearly experienced. I'm giving four instead of five only because the invoice took a bit longer than expected to show up in the portal — I had to ask. Small admin issue, not a reflection on the service quality which was excellent.",
  },
  {
    id: 'r-15',
    servicePointId: 'qc',
    rating: 5,
    customerName: 'Danielle Ouellet',
    date: '2025-04-22',
    serviceType: 'pumping',
    body: "Marc arrived early, was courteous, and explained what he was doing at each step — which I appreciated as I was watching. The whole area was left clean. I've had bad experiences with other providers in the past so this felt like a genuine upgrade. Will definitely stay with Ecoflo.",
  },
]

// Derived aggregates — computed from the data so the display is always consistent.

export function computeRatingStats(spId: string) {
  const spReviews = reviews.filter((r) => r.servicePointId === spId)
  const total = spReviews.length
  if (total === 0) return { average: 0, total: 0, distribution: {} as Record<number, number> }

  const sum = spReviews.reduce((s, r) => s + r.rating, 0)
  const average = Math.round((sum / total) * 10) / 10

  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  spReviews.forEach((r) => distribution[r.rating]++)

  return { average, total, distribution }
}

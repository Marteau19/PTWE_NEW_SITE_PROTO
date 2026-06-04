// MOCK DATA — Marketing assets library for the Québec City Service Point.
// All assets are marked preapproved; a few are co-brandable for acquired
// companies operating under the Ecoflo umbrella.

export type AssetCategory = 'Flyers' | 'Social media' | 'Brochures' | 'Email templates'
export type AssetFormat = 'PDF' | 'Image' | 'Editable'
export type AssetLanguage = 'EN' | 'FR' | 'EN/FR'

export interface MarketingAsset {
  id: string
  title: string
  description: string
  category: AssetCategory
  format: AssetFormat
  language: AssetLanguage
  version: string
  updatedDate: string
  approved: true
  coBrandable?: boolean
  /** Unsplash photo id used as thumbnail background. */
  thumbPhoto?: string
  /** Fallback gradient when photo unavailable. */
  thumbGradient: string
}

export const marketingAssets: MarketingAsset[] = [
  {
    id: 'ma-01',
    title: 'Ecoflo — homeowner introduction flyer',
    description: 'One-page overview of how the Ecoflo system works, written for first-time homeowners. Ideal for pumping visits and trade shows.',
    category: 'Flyers',
    format: 'PDF',
    language: 'EN/FR',
    version: '3.2',
    updatedDate: '2025-03-15',
    approved: true,
    thumbGradient: 'from-eco-green-tint to-[#c8e698]',
  },
  {
    id: 'ma-02',
    title: 'Filter media replacement — why it matters',
    description: 'Explains the 5-year FMR cycle and its environmental benefits. Designed for door drops and in-van leave-behinds.',
    category: 'Flyers',
    format: 'PDF',
    language: 'FR',
    version: '2.0',
    updatedDate: '2025-01-20',
    approved: true,
    thumbGradient: 'from-[#d6efc5] to-eco-green/25',
  },
  {
    id: 'ma-03',
    title: 'Spring maintenance reminder — social post set',
    description: '4 ready-to-post images for Instagram and Facebook. Each includes caption copy in EN and FR. Seasonal reminder to book a spring inspection.',
    category: 'Social media',
    format: 'Image',
    language: 'EN/FR',
    version: '1.4',
    updatedDate: '2025-02-28',
    approved: true,
    thumbPhoto: '1499781350541-dbbab4537350',
    thumbGradient: 'from-sky-100 to-eco-green/20',
  },
  {
    id: 'ma-04',
    title: 'Co-brand social template — Ecoflo partner',
    description: 'Editable Canva template with logo lockup for Service Points operating under a co-brand. Drop in your logo alongside Ecoflo.',
    category: 'Social media',
    format: 'Editable',
    language: 'EN/FR',
    version: '1.1',
    updatedDate: '2025-04-10',
    approved: true,
    coBrandable: true,
    thumbGradient: 'from-eco-navy/10 to-eco-green-tint',
  },
  {
    id: 'ma-05',
    title: 'Full product brochure — Ecoflo Coco Filter range',
    description: '12-page brochure covering the full Coco Filter product family: 750, 1000, and IHP variants. Technical specs, certifications, and warranty.',
    category: 'Brochures',
    format: 'PDF',
    language: 'EN/FR',
    version: '5.0',
    updatedDate: '2024-11-01',
    approved: true,
    thumbGradient: 'from-[#e8f3d6] to-eco-green/15',
  },
  {
    id: 'ma-06',
    title: 'Environmental impact brochure',
    description: 'Four-page story on Ecoflo\'s environmental footprint: zero electricity, coconut husk media, and clean effluent data. Great for eco-conscious customers.',
    category: 'Brochures',
    format: 'PDF',
    language: 'FR',
    version: '2.3',
    updatedDate: '2025-01-08',
    approved: true,
    thumbPhoto: '1559827260-dc66d52bef19',
    thumbGradient: 'from-emerald-100 to-eco-green/20',
  },
  {
    id: 'ma-07',
    title: 'Co-brand brochure — partner edition',
    description: 'Editable InDesign template for partners who co-brand with Ecoflo. Includes approved copy blocks and logo placement zones.',
    category: 'Brochures',
    format: 'Editable',
    language: 'EN/FR',
    version: '1.0',
    updatedDate: '2025-03-01',
    approved: true,
    coBrandable: true,
    thumbGradient: 'from-eco-navy/8 to-[#c8e698]/40',
  },
  {
    id: 'ma-08',
    title: 'Welcome to Ecoflo — customer onboarding email',
    description: 'HTML email sent after system activation. Introduces the customer portal, their Service Point contact, and the maintenance schedule.',
    category: 'Email templates',
    format: 'Editable',
    language: 'EN',
    version: '2.1',
    updatedDate: '2025-02-14',
    approved: true,
    thumbGradient: 'from-eco-green-tint to-[#f0f8e4]',
  },
  {
    id: 'ma-09',
    title: 'FMR booking reminder email',
    description: 'Triggered 60 days before a customer\'s scheduled filter media replacement. Personalisable with date, technician name, and Service Point contact.',
    category: 'Email templates',
    format: 'Editable',
    language: 'FR',
    version: '1.3',
    updatedDate: '2025-04-05',
    approved: true,
    thumbGradient: 'from-amber-50 to-eco-green/10',
  },
  {
    id: 'ma-10',
    title: 'Annual inspection reminder — bilingual email',
    description: 'Clean bilingual reminder (EN/FR toggle) for annual inspection booking. Includes a one-click CTA that links to the Service Point\'s booking page.',
    category: 'Email templates',
    format: 'PDF',
    language: 'EN/FR',
    version: '1.0',
    updatedDate: '2025-05-12',
    approved: true,
    thumbGradient: 'from-eco-green-tint to-sky-50',
  },
  {
    id: 'ma-11',
    title: '"Your water is clean" — awareness social set',
    description: '6-image carousel series about clean water and Ecoflo\'s role. Pre-written captions for LinkedIn, Facebook, and Instagram.',
    category: 'Social media',
    format: 'Image',
    language: 'EN',
    version: '1.2',
    updatedDate: '2025-03-22',
    approved: true,
    thumbPhoto: '1542718610-a1d656d1884c',
    thumbGradient: 'from-sky-100 to-eco-green/15',
  },
  {
    id: 'ma-12',
    title: 'Trade show pull-up banner',
    description: 'Standard 850 × 2000 mm retractable banner design. Available in EN and FR. Print-ready PDF at 300 dpi.',
    category: 'Flyers',
    format: 'PDF',
    language: 'EN/FR',
    version: '2.0',
    updatedDate: '2024-09-30',
    approved: true,
    thumbGradient: 'from-eco-navy/12 to-eco-green-tint',
  },
]

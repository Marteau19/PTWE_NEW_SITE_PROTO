// MOCK DATA — illustrative Service Point network for the Ecoflo prototype.
// Not real locations or coverage data. Coordinates are approximate city centers.

export type Region = 'North America' | 'Europe'

export interface ServicePoint {
  id: string
  name: string
  region: Region
  country: string
  lat: number
  lng: number
  /** Illustrative coverage radius in kilometres (150–250). */
  coverageRadiusKm: number
}

export const servicePoints: ServicePoint[] = [
  // ── North America ──────────────────────────────────────────────
  // Quebec
  { id: 'mtl', name: 'Montréal', region: 'North America', country: 'Canada', lat: 45.5019, lng: -73.5674, coverageRadiusKm: 220 },
  { id: 'qc', name: 'Québec City', region: 'North America', country: 'Canada', lat: 46.8139, lng: -71.208, coverageRadiusKm: 200 },
  { id: 'sher', name: 'Sherbrooke', region: 'North America', country: 'Canada', lat: 45.4042, lng: -71.8929, coverageRadiusKm: 165 },
  { id: 'tr', name: 'Trois-Rivières', region: 'North America', country: 'Canada', lat: 46.3432, lng: -72.5429, coverageRadiusKm: 175 },
  { id: 'gat', name: 'Gatineau', region: 'North America', country: 'Canada', lat: 45.4765, lng: -75.7013, coverageRadiusKm: 185 },
  // Ontario
  { id: 'ott', name: 'Ottawa', region: 'North America', country: 'Canada', lat: 45.4215, lng: -75.6972, coverageRadiusKm: 210 },
  { id: 'tor', name: 'Toronto', region: 'North America', country: 'Canada', lat: 43.6532, lng: -79.3832, coverageRadiusKm: 240 },
  // Atlantic Canada
  { id: 'hfx', name: 'Halifax', region: 'North America', country: 'Canada', lat: 44.6488, lng: -63.5752, coverageRadiusKm: 230 },
  { id: 'mon', name: 'Moncton', region: 'North America', country: 'Canada', lat: 46.0878, lng: -64.7782, coverageRadiusKm: 190 },
  // US Northeast
  { id: 'btv', name: 'Burlington, VT', region: 'North America', country: 'United States', lat: 44.4759, lng: -73.2121, coverageRadiusKm: 175 },
  { id: 'pwm', name: 'Portland, ME', region: 'North America', country: 'United States', lat: 43.6591, lng: -70.2568, coverageRadiusKm: 195 },
  { id: 'alb', name: 'Albany, NY', region: 'North America', country: 'United States', lat: 42.6526, lng: -73.7562, coverageRadiusKm: 205 },

  // ── Europe ─────────────────────────────────────────────────────
  // UK zones
  { id: 'man', name: 'Manchester — North', region: 'Europe', country: 'United Kingdom', lat: 53.4808, lng: -2.2426, coverageRadiusKm: 180 },
  { id: 'bir', name: 'Birmingham — Midlands', region: 'Europe', country: 'United Kingdom', lat: 52.4862, lng: -1.8904, coverageRadiusKm: 170 },
  { id: 'lon', name: 'London — South', region: 'Europe', country: 'United Kingdom', lat: 51.5072, lng: -0.1276, coverageRadiusKm: 210 },
  { id: 'exe', name: 'Exeter — South West', region: 'Europe', country: 'United Kingdom', lat: 50.7184, lng: -3.5339, coverageRadiusKm: 160 },
  // France
  { id: 'par', name: 'Paris', region: 'Europe', country: 'France', lat: 48.8566, lng: 2.3522, coverageRadiusKm: 230 },
  { id: 'lyo', name: 'Lyon', region: 'Europe', country: 'France', lat: 45.764, lng: 4.8357, coverageRadiusKm: 200 },
  { id: 'bord', name: 'Bordeaux', region: 'Europe', country: 'France', lat: 44.8378, lng: -0.5792, coverageRadiusKm: 215 },
  { id: 'nan', name: 'Nantes', region: 'Europe', country: 'France', lat: 47.2184, lng: -1.5536, coverageRadiusKm: 185 },
  { id: 'ren', name: 'Rennes', region: 'Europe', country: 'France', lat: 48.1173, lng: -1.6778, coverageRadiusKm: 165 },
]

export const servicePointCount = servicePoints.length

export const regionViews: Record<Region, { center: [number, number]; zoom: number }> = {
  'North America': { center: [45.6, -72.5], zoom: 5 },
  Europe: { center: [49.5, 0.5], zoom: 5 },
}

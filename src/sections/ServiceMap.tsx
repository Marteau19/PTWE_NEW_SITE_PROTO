import { Fragment, useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Reveal from '../components/Reveal'
import {
  servicePoints,
  servicePointCount,
  regionViews,
  type Region,
} from '../data/servicePoints'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

// Custom pulsing Ecoflo marker.
const ecoIcon = L.divIcon({
  className: 'eco-marker',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -10],
  html: `
    <span class="relative flex h-[18px] w-[18px] items-center justify-center">
      <span class="absolute inline-flex h-[18px] w-[18px] rounded-full bg-eco-green/60 animate-pulse-ring"></span>
      <span class="relative inline-flex h-[12px] w-[12px] rounded-full bg-eco-green ring-2 ring-white"></span>
    </span>`,
})

/** Flies the map to a region when the active view changes. */
function FlyController({ view, reduced }: { view: Region; reduced: boolean }) {
  const map = useMap()
  useEffect(() => {
    const { center, zoom } = regionViews[view]
    if (reduced) map.setView(center, zoom)
    else map.flyTo(center, zoom, { duration: 1.4 })
  }, [view, map, reduced])
  return null
}

export default function ServiceMap() {
  const reduced = usePrefersReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<Region>('North America')
  const [radiusProgress, setRadiusProgress] = useState(reduced ? 1 : 0)
  const started = useRef(false)

  // Expand coverage circles outward once the map scrolls into view.
  useEffect(() => {
    if (reduced) {
      setRadiusProgress(1)
      return
    }
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const dur = 1600
          const animate = (now: number) => {
            const t = Math.min((now - start) / dur, 1)
            // ease-out
            setRadiusProgress(1 - Math.pow(1 - t, 3))
            if (t < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [reduced])

  return (
    <section id="map" className="bg-eco-offwhite py-24 sm:py-32">
      <div className="eco-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eco-eyebrow">Find a Service Point</span>
          <h2 className="eco-h2 mt-4">A local team near you, everywhere we operate.</h2>
          <p className="eco-lead mt-5">
            {servicePointCount} Service Points across North America and Europe — each
            one your single, local partner for the full turnkey service.
          </p>
        </Reveal>

        {/* Region toggles */}
        <Reveal className="mt-10 flex justify-center" delay={0.05}>
          <div className="inline-flex rounded-full border border-eco-navy/10 bg-white p-1 shadow-eco-soft">
            {(['North America', 'Europe'] as Region[]).map((r) => (
              <button
                key={r}
                onClick={() => setView(r)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                  view === r ? 'bg-eco-green text-white' : 'text-eco-navy/70 hover:text-eco-navy'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Full-width map */}
      <Reveal className="mt-12" delay={0.1}>
        <div
          ref={wrapRef}
          className="relative mx-auto h-[520px] w-full max-w-[1320px] overflow-hidden rounded-none sm:h-[600px] sm:rounded-3xl"
        >
          <MapContainer
            center={regionViews['North America'].center}
            zoom={regionViews['North America'].zoom}
            scrollWheelZoom={false}
            zoomControl
            className="h-full w-full"
            worldCopyJump
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
              subdomains="abcd"
            />
            <FlyController view={view} reduced={reduced} />

            {servicePoints.map((p) => (
              <Fragment key={p.id}>
                <Circle
                  center={[p.lat, p.lng]}
                  radius={p.coverageRadiusKm * 1000 * radiusProgress}
                  pathOptions={{
                    color: '#64A70B',
                    weight: 1,
                    fillColor: '#64A70B',
                    fillOpacity: 0.1,
                  }}
                />
                <Marker position={[p.lat, p.lng]} icon={ecoIcon}>
                  <Popup>
                    <div className="min-w-[180px]">
                      <p className="text-sm font-bold text-eco-navy">{p.name}</p>
                      <p className="mt-0.5 text-xs text-eco-body/70">
                        {p.country} · {p.region}
                      </p>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-eco-green-dark">
                        <span className="h-1.5 w-1.5 rounded-full bg-eco-green" />
                        Turnkey service available here
                      </p>
                    </div>
                  </Popup>
                </Marker>
              </Fragment>
            ))}
          </MapContainer>

          {/* Corner stat, Tesla-charger-map style */}
          <div className="pointer-events-none absolute bottom-4 left-4 z-[500] rounded-2xl bg-white/90 px-4 py-3 shadow-eco-card backdrop-blur sm:bottom-6 sm:left-6">
            <p className="text-2xl font-extrabold leading-none text-eco-navy">
              {servicePointCount}
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-eco-body/60">
              Service Points
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

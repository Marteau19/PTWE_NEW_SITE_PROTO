import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useAuth } from '../auth/AuthContext'
import { usePortalStore } from '../store/PortalStore'
import { customerById, technicianById } from '../data/portalData'
import { servicePoints } from '../../data/servicePoints'
import { Card, FadeIn, JobStatusBadge, JOB_SHORT, formatDate } from '../ui/ui'

function numberedIcon(n: number, done: boolean) {
  const bg = done ? '#4E8208' : '#041E42'
  return L.divIcon({
    className: 'eco-marker',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -14],
    html: `<span style="display:flex;height:26px;width:26px;align-items:center;justify-content:center;border-radius:9999px;background:${bg};color:#fff;font-size:12px;font-weight:700;border:2px solid #fff;box-shadow:0 2px 8px rgba(4,30,66,.35)">${n}</span>`,
  })
}

export default function Schedule() {
  const { user } = useAuth()
  const { jobs } = usePortalStore()
  const spId = user?.refId ?? 'qc'
  const sp = servicePoints.find((s) => s.id === spId)!

  // This week's jobs in scheduled order = the route.
  const route = useMemo(
    () =>
      jobs
        .filter((j) => j.servicePointId === spId)
        .sort((a, b) => +new Date(a.scheduledDate) - +new Date(b.scheduledDate)),
    [jobs, spId],
  )

  const stops = route
    .map((j) => {
      const c = customerById(j.customerId)
      return c ? { job: j, customer: c } : null
    })
    .filter(Boolean) as { job: (typeof route)[number]; customer: NonNullable<ReturnType<typeof customerById>> }[]

  const line: [number, number][] = [[sp.lat, sp.lng], ...stops.map((s) => [s.customer.lat, s.customer.lng] as [number, number])]

  return (
    <div className="space-y-5">
      <FadeIn>
        <h1 className="text-2xl font-extrabold tracking-tight text-eco-navy">Schedule &amp; route</h1>
        <p className="mt-1 text-sm text-eco-body/60">This week's stops across the {sp.name} territory.</p>
      </FadeIn>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        {/* Map */}
        <FadeIn delay={0.05}>
          <Card className="overflow-hidden">
            <div className="h-[360px] w-full sm:h-[460px]">
              <MapContainer
                center={[sp.lat, sp.lng]}
                zoom={9}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <Polyline positions={line} pathOptions={{ color: '#64A70B', weight: 3, dashArray: '6 8', opacity: 0.8 }} />
                {/* Service Point home base */}
                <Marker
                  position={[sp.lat, sp.lng]}
                  icon={L.divIcon({
                    className: 'eco-marker',
                    iconSize: [16, 16],
                    iconAnchor: [8, 8],
                    html: `<span style="display:block;height:16px;width:16px;border-radius:9999px;background:#64A70B;border:3px solid #fff;box-shadow:0 2px 8px rgba(4,30,66,.4)"></span>`,
                  })}
                >
                  <Popup>{sp.name} Service Point — home base</Popup>
                </Marker>
                {stops.map((s, i) => (
                  <Marker
                    key={s.job.id}
                    position={[s.customer.lat, s.customer.lng]}
                    icon={numberedIcon(i + 1, s.job.status === 'completed')}
                  >
                    <Popup>
                      <strong>{s.customer.name}</strong>
                      <br />
                      {JOB_SHORT[s.job.type]} · {s.job.windowLabel}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </Card>
        </FadeIn>

        {/* Job list */}
        <FadeIn delay={0.08}>
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">Route order</p>
            <ol className="mt-3 space-y-2">
              {stops.map((s, i) => {
                const tech = technicianById(s.job.technicianId)
                return (
                  <li key={s.job.id}>
                    <Link
                      to={`/portal/sp/work-order/${s.job.id}`}
                      className="flex items-center gap-3 rounded-2xl border border-eco-navy/8 p-3 transition hover:border-eco-green/30 hover:bg-eco-offwhite/40"
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                          s.job.status === 'completed' ? 'bg-eco-green-dark' : 'bg-eco-navy'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-eco-navy">{s.customer.name}</p>
                        <p className="truncate text-xs text-eco-body/55">
                          {JOB_SHORT[s.job.type]} · {formatDate(s.job.scheduledDate, { weekday: 'short', day: 'numeric', month: 'short' })} · {tech?.name}
                        </p>
                      </div>
                      <JobStatusBadge status={s.job.status} />
                    </Link>
                  </li>
                )
              })}
            </ol>
          </Card>
        </FadeIn>
      </div>
    </div>
  )
}

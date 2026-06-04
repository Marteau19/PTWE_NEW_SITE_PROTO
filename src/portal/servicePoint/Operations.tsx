import { useMemo } from 'react'
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, Tooltip } from 'recharts'
import { useAuth } from '../auth/AuthContext'
import { usePortalStore } from '../store/PortalStore'
import { leads, technicians, type LeadStage } from '../data/portalData'
import { computeRatingStats } from '../../data/reviews'
import { Card, FadeIn, StatTile, AnimatedNumber } from '../ui/ui'

const STAGE_ORDER: LeadStage[] = ['new', 'qualified', 'quoted', 'won']
const STAGE_LABEL: Record<LeadStage, string> = { new: 'New', qualified: 'Qualified', quoted: 'Quoted', won: 'Won' }

export default function Operations() {
  const { user } = useAuth()
  const { jobs, customers } = usePortalStore()
  const spId = user?.refId ?? 'qc'

  const spLeads = leads.filter((l) => l.servicePointId === spId)
  const spJobs = jobs.filter((j) => j.servicePointId === spId)
  const spCustomers = customers.filter((c) => c.servicePointId === spId)
  const spTechs = technicians.filter((t) => t.servicePointId === spId)

  // Derived KPIs (kept consistent with the underlying data)
  const fmrJobs = spJobs.filter((j) => j.type === 'FMR')
  const fmrDone = fmrJobs.filter((j) => j.status === 'completed').length
  const fmrRate = fmrJobs.length ? Math.round((fmrDone / fmrJobs.length) * 100) : 100
  const wonLeads = spLeads.filter((l) => l.stage === 'won')
  const pipelineValue = spLeads.reduce((s, l) => s + l.value, 0)
  const wonValue = wonLeads.reduce((s, l) => s + l.value, 0)
  const conversion = spLeads.length ? Math.round((wonLeads.length / spLeads.length) * 100) : 0
  const monthlyRevenue = 184_000 + wonValue
  const { average: avgRating, total: reviewTotal } = computeRatingStats(spId)

  const funnel = useMemo(
    () =>
      STAGE_ORDER.map((stage) => ({
        stage: STAGE_LABEL[stage],
        count: spLeads.filter((l) => l.stage === stage).length,
        value: spLeads.filter((l) => l.stage === stage).reduce((s, l) => s + l.value, 0),
      })),
    [spLeads],
  )

  // Lead sources (the flywheel inputs)
  const sources = useMemo(() => {
    const map = new Map<string, number>()
    spLeads.forEach((l) => map.set(l.source, (map.get(l.source) ?? 0) + 1))
    return [...map.entries()].map(([source, count]) => ({ source, count }))
  }, [spLeads])

  return (
    <div className="space-y-5">
      <FadeIn>
        <h1 className="text-2xl font-extrabold tracking-tight text-eco-navy">Operations</h1>
        <p className="mt-1 text-sm text-eco-body/60">The business behind the turnkey promise.</p>
      </FadeIn>

      {/* KPI cards */}
      <FadeIn delay={0.05}>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <StatTile label="Revenue (mo.)" value={<>$<AnimatedNumber value={monthlyRevenue} /></>} sub="Service + installs" accent />
          <StatTile label="Active contracts" value={<AnimatedNumber value={spCustomers.length * 18 + 42} />} sub="Across territory" />
          <StatTile label="FMR completion" value={`${fmrRate}%`} sub={`${fmrDone}/${fmrJobs.length} this cycle`} />
          <StatTile label="Lead conversion" value={`${conversion}%`} sub={`${wonLeads.length}/${spLeads.length} leads won`} />
          <StatTile
            label="Avg. rating"
            value={<><span className="text-amber-400">★</span> {avgRating.toFixed(1)}</>}
            sub={`${reviewTotal} reviews`}
            accent
          />
        </div>
      </FadeIn>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        {/* Leads funnel (the flywheel) */}
        <FadeIn delay={0.08}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">Leads pipeline</p>
              <span className="text-xs font-semibold text-eco-green">${pipelineValue.toLocaleString('en-US')} in play</span>
            </div>

            {/* Funnel bars */}
            <div className="mt-5 space-y-3">
              {funnel.map((f, i) => {
                const max = Math.max(...funnel.map((x) => x.count), 1)
                return (
                  <div key={f.stage} className="flex items-center gap-3">
                    <span className="w-20 shrink-0 text-xs font-medium text-eco-body/60">{f.stage}</span>
                    <div className="h-9 flex-1 overflow-hidden rounded-lg bg-eco-navy/5">
                      <div
                        className="flex h-full items-center justify-end rounded-lg bg-gradient-to-r from-eco-green to-eco-green-dark px-3 text-xs font-bold text-white transition-all"
                        style={{ width: `${30 + (f.count / max) * 70}%`, opacity: 1 - i * 0.12 }}
                      >
                        {f.count}
                      </div>
                    </div>
                    <span className="w-20 shrink-0 text-right text-xs text-eco-body/55">${(f.value / 1000).toFixed(0)}k</span>
                  </div>
                )
              })}
            </div>

            {/* Source breakdown */}
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-wider text-eco-body/45">Lead sources (the flywheel)</p>
            <div className="mt-3 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sources} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
                  <XAxis dataKey="source" tick={{ fontSize: 10, fill: '#3A4A50' }} interval={0} tickFormatter={(s: string) => s.split(' ')[0]} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(100,167,11,0.08)' }} contentStyle={{ borderRadius: 12, border: '1px solid rgba(4,30,66,0.08)', fontSize: 12 }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {sources.map((_, i) => (
                      <Cell key={i} fill={['#64A70B', '#4E8208', '#8cc63f', '#041E42'][i % 4]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-xs text-eco-body/55">
              Pumping, customer service, inspections and multi-brand work all feed septic & IHP solutions.
            </p>
          </Card>
        </FadeIn>

        {/* Team overview */}
        <FadeIn delay={0.11}>
          <Card className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-body/50">Team overview</p>
            <ul className="mt-4 space-y-3">
              {spTechs.map((t) => (
                <li key={t.id} className="rounded-2xl border border-eco-navy/8 p-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-eco-navy text-xs font-bold text-white">
                        {t.name.split(' ').map((p) => p[0]).join('')}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-eco-navy">{t.name}</p>
                        <p className="text-xs text-eco-body/55">{t.role}</p>
                      </div>
                    </div>
                    <span className="text-xs text-eco-body/55">{t.jobsCompleted} jobs</span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-eco-navy/8">
                      <div className="h-full rounded-full bg-eco-green" style={{ width: `${t.utilization}%` }} />
                    </div>
                    <span className="w-10 text-right text-xs font-semibold text-eco-body/60">{t.utilization}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </FadeIn>
      </div>
    </div>
  )
}

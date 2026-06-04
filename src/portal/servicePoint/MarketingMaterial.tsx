import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  marketingAssets,
  type MarketingAsset,
  type AssetCategory,
  type AssetFormat,
  type AssetLanguage,
} from '../../data/marketingAssets'
import { Card, FadeIn, formatDate } from '../ui/ui'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const CATEGORIES: ('All' | AssetCategory)[] = ['All', 'Flyers', 'Social media', 'Brochures', 'Email templates']
const FORMATS: ('All' | AssetFormat)[] = ['All', 'PDF', 'Image', 'Editable']
const LANGUAGES: ('All' | AssetLanguage)[] = ['All', 'EN', 'FR', 'EN/FR']

const FORMAT_ICON: Record<AssetFormat, string> = { PDF: '📄', Image: '🖼️', Editable: '✏️' }
const LANG_COLORS: Record<AssetLanguage, string> = {
  'EN': 'bg-sky-100 text-sky-700',
  'FR': 'bg-indigo-100 text-indigo-700',
  'EN/FR': 'bg-purple-100 text-purple-700',
}

export default function MarketingMaterial() {
  const reduced = usePrefersReducedMotion()
  const [catFilter, setCatFilter] = useState<'All' | AssetCategory>('All')
  const [fmtFilter, setFmtFilter] = useState<'All' | AssetFormat>('All')
  const [langFilter, setLangFilter] = useState<'All' | AssetLanguage>('All')
  const [preview, setPreview] = useState<MarketingAsset | null>(null)
  const [downloaded, setDownloaded] = useState<string | null>(null)

  const filtered = marketingAssets.filter((a) => {
    if (catFilter !== 'All' && a.category !== catFilter) return false
    if (fmtFilter !== 'All' && a.format !== fmtFilter) return false
    if (langFilter !== 'All' && a.language !== langFilter) return false
    return true
  })

  const mockDownload = (asset: MarketingAsset) => {
    setDownloaded(asset.id)
    setTimeout(() => setDownloaded(null), 2200)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <h1 className="text-2xl font-extrabold tracking-tight text-eco-navy">Marketing material</h1>
        <p className="mt-1 text-sm text-eco-body/60">
          Brand-approved assets, ready to use. Everything here has been reviewed by Marcom — deploy with confidence, no back-and-forth needed.
        </p>
      </FadeIn>

      {/* Filters */}
      <FadeIn delay={0.05}>
        <Card className="flex flex-wrap items-center gap-x-6 gap-y-4 px-5 py-4">
          <FilterGroup label="Category" options={CATEGORIES} active={catFilter} setActive={setCatFilter as (v: string) => void} />
          <div className="hidden h-6 w-px bg-eco-navy/10 lg:block" />
          <FilterGroup label="Format" options={FORMATS} active={fmtFilter} setActive={setFmtFilter as (v: string) => void} />
          <div className="hidden h-6 w-px bg-eco-navy/10 lg:block" />
          <FilterGroup label="Language" options={LANGUAGES} active={langFilter} setActive={setLangFilter as (v: string) => void} />
          <span className="ml-auto text-xs text-eco-body/45">{filtered.length} asset{filtered.length !== 1 ? 's' : ''}</span>
        </Card>
      </FadeIn>

      {/* Asset grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((asset, i) => (
          <FadeIn key={asset.id} delay={reduced ? 0 : 0.04 + i * 0.04}>
            <AssetCard
              asset={asset}
              onPreview={() => setPreview(asset)}
              onDownload={() => mockDownload(asset)}
              justDownloaded={downloaded === asset.id}
            />
          </FadeIn>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-eco-body/50">No assets match these filters.</p>
        )}
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className="fixed inset-0 z-[900] flex items-end justify-center bg-eco-navy/45 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
          >
            <motion.div
              className="w-full max-w-xl overflow-hidden rounded-t-3xl bg-white shadow-eco-card sm:rounded-3xl"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Large thumbnail */}
              <div className={`flex aspect-video items-center justify-center bg-gradient-to-br ${preview.thumbGradient}`}>
                <div className="flex flex-col items-center gap-2 text-eco-navy/40">
                  <span className="text-5xl">{FORMAT_ICON[preview.format]}</span>
                  <span className="text-xs font-semibold uppercase tracking-widest">{preview.format}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold leading-snug text-eco-navy">{preview.title}</h2>
                  <ApprovedBadge />
                </div>
                <p className="mt-2 text-sm text-eco-body/65">{preview.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Tag label={preview.category} />
                  <Tag label={preview.format} icon={FORMAT_ICON[preview.format]} />
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${LANG_COLORS[preview.language]}`}>{preview.language}</span>
                  {preview.coBrandable && <Tag label="Co-brandable" accent />}
                </div>
                <p className="mt-3 text-xs text-eco-body/45">
                  Approved by Marcom · updated {formatDate(preview.updatedDate)} · v{preview.version}
                </p>
                <div className="mt-5 flex justify-end gap-2">
                  <button onClick={() => setPreview(null)} className="eco-btn-outline text-sm">Close</button>
                  <button onClick={() => { mockDownload(preview); setPreview(null) }} className="eco-btn-primary text-sm">
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AssetCard({
  asset,
  onPreview,
  onDownload,
  justDownloaded,
}: {
  asset: MarketingAsset
  onPreview: () => void
  onDownload: () => void
  justDownloaded: boolean
}) {
  return (
    <Card className="flex flex-col overflow-hidden">
      {/* Thumbnail */}
      <button
        onClick={onPreview}
        className={`flex aspect-[16/7] w-full items-center justify-center bg-gradient-to-br ${asset.thumbGradient} transition hover:opacity-90`}
        aria-label={`Preview ${asset.title}`}
      >
        <span className="text-3xl opacity-60">{FORMAT_ICON[asset.format]}</span>
      </button>

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Title + approved */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold leading-snug text-eco-navy">{asset.title}</p>
          <ApprovedBadge />
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-eco-body/60">{asset.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          <Tag label={asset.category} />
          <Tag label={asset.format} icon={FORMAT_ICON[asset.format]} />
          <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${LANG_COLORS[asset.language]}`}>{asset.language}</span>
          {asset.coBrandable && <Tag label="Co-brandable" accent />}
        </div>

        {/* Meta */}
        <p className="text-[10px] text-eco-body/40">
          Approved by Marcom · {formatDate(asset.updatedDate)} · v{asset.version}
        </p>

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          <button onClick={onPreview} className="eco-btn-outline flex-1 py-2 text-xs">
            Preview
          </button>
          <button
            onClick={onDownload}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-semibold transition ${
              justDownloaded ? 'bg-eco-green text-white' : 'bg-eco-green text-white hover:bg-eco-green-dark'
            }`}
          >
            {justDownloaded ? '✓ Downloaded' : 'Download'}
          </button>
        </div>
      </div>
    </Card>
  )
}

function ApprovedBadge() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-eco-green/12 px-2.5 py-0.5 text-[10px] font-bold text-eco-green-dark">
      ✓ Preapproved
    </span>
  )
}

function Tag({ label, icon, accent = false }: { label: string; icon?: string; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
        accent ? 'bg-eco-navy/8 text-eco-navy' : 'bg-eco-navy/6 text-eco-body/60'
      }`}
    >
      {icon && <span className="text-[10px]">{icon}</span>}
      {label}
    </span>
  )
}

function FilterGroup<T extends string>({
  label,
  options,
  active,
  setActive,
}: {
  label: string
  options: T[]
  active: T
  setActive: (v: T) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-eco-body/45">{label}</span>
      <div className="flex flex-wrap gap-1">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => setActive(o)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              active === o
                ? 'bg-eco-navy text-white'
                : 'bg-eco-navy/6 text-eco-body/60 hover:bg-eco-navy/12'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

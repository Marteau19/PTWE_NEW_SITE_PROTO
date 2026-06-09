import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

// Six services arranged around the Ecoflo hub, recreating the brand wheel.
// Mid-angles use math convention (90° = up). Right-hand segments carry the
// green accent arc, left-hand the blue — matching the source artwork.
interface Segment {
  lines: string[]
  a0: number
  a1: number
  accent: 'green' | 'blue'
}

const SEGMENTS: Segment[] = [
  { lines: ['Free site', 'assessment'], a0: 30, a1: 90, accent: 'green' },
  { lines: ['Expert', 'advice'], a0: 90, a1: 150, accent: 'blue' },
  { lines: ['Tankering', 'CCTV survey', 'Drain jetting'], a0: 150, a1: 210, accent: 'blue' },
  { lines: ['Service', 'Maintenance', 'Coco filter renewal'], a0: 210, a1: 270, accent: 'blue' },
  { lines: ['Septic', 'installation'], a0: 270, a1: 330, accent: 'green' },
  { lines: ['Soil testing', 'Drainage design'], a0: 330, a1: 390, accent: 'green' },
]

const RO = 190 // outer radius
const RI = 94 // inner radius (ring hole)
const RC = 78 // centre hub radius
const GAP = 1.6 // degrees of white gap between segments

const NAVY = '#041E42'
const GREEN = '#64A70B'
const BLUE = '#2BA8E0'

function pt(r: number, deg: number): [number, number] {
  const a = (deg * Math.PI) / 180
  return [r * Math.cos(a), -r * Math.sin(a)] // minus y → 90° points up
}

function ringPath(a0: number, a1: number, ri: number, ro: number) {
  const [ox0, oy0] = pt(ro, a0)
  const [ox1, oy1] = pt(ro, a1)
  const [ix1, iy1] = pt(ri, a1)
  const [ix0, iy0] = pt(ri, a0)
  const large = a1 - a0 > 180 ? 1 : 0
  return `M ${ox0} ${oy0} A ${ro} ${ro} 0 ${large} 0 ${ox1} ${oy1} L ${ix1} ${iy1} A ${ri} ${ri} 0 ${large} 1 ${ix0} ${iy0} Z`
}

export default function EcofloServiceWheel({
  className = '',
  inView = true,
}: {
  className?: string
  inView?: boolean
}) {
  const reduced = usePrefersReducedMotion()

  return (
    <svg
      viewBox="-210 -210 420 420"
      className={className}
      role="img"
      aria-label="Ecoflo services: free site assessment, expert advice, tankering, CCTV survey, drain jetting, service, maintenance, coco filter renewal, septic installation, soil testing and drainage design — all from one team."
    >
      {SEGMENTS.map((seg, i) => {
        const a0 = seg.a0 + GAP
        const a1 = seg.a1 - GAP
        const mid = (seg.a0 + seg.a1) / 2
        const [lx, ly] = pt((RI + RO) / 2, mid)
        const accent = seg.accent === 'green' ? GREEN : BLUE
        const delay = reduced ? 0 : 0.12 + i * 0.08

        return (
          <motion.g
            key={i}
            initial={reduced ? false : { opacity: 0, scale: 0.86 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.86 }}
            transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: '0px 0px' }}
          >
            {/* Navy body */}
            <path d={ringPath(a0, a1, RI, RO)} fill={NAVY} />
            {/* Accent outer arc */}
            <path d={ringPath(a0, a1, RO - 9, RO)} fill={accent} />
            {/* Label */}
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              fill="#ffffff"
              style={{ fontWeight: 600 }}
              fontSize={seg.lines.length > 2 ? 13 : 14.5}
            >
              {seg.lines.map((line, li) => (
                <tspan
                  key={li}
                  x={lx}
                  dy={li === 0 ? -(seg.lines.length - 1) * 8.5 : 17}
                >
                  {line}
                </tspan>
              ))}
            </text>
          </motion.g>
        )
      })}

      {/* Centre hub */}
      <motion.g
        initial={reduced ? false : { opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.55, delay: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: '0px 0px' }}
      >
        <circle cx={0} cy={0} r={RC + 6} fill="#ffffff" />
        <circle cx={0} cy={0} r={RC} fill={GREEN} />
        <text
          x={0}
          y={0}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#ffffff"
          fontSize={29}
          style={{ fontWeight: 800, letterSpacing: '0.04em' }}
        >
          ECOFLO
        </text>
      </motion.g>
    </svg>
  )
}

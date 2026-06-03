import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface OdometerCounterProps {
  /** Starting value when the component mounts. */
  seed: number
  /** Litres added per second (drives the live ticking). */
  perSecond: number
}

const DIGIT_H = 1.18 // em — height of one digit cell

/** A single rolling digit column (0–9) that translates to the target digit. */
function Digit({ value }: { value: number }) {
  return (
    <span
      className="relative inline-block overflow-hidden tabular-nums"
      style={{ height: `${DIGIT_H}em`, width: '0.62em' }}
      aria-hidden
    >
      <span
        className="absolute left-0 top-0 flex flex-col transition-transform duration-300 ease-out"
        style={{ transform: `translateY(-${value * DIGIT_H}em)` }}
      >
        {Array.from({ length: 10 }, (_, d) => (
          <span
            key={d}
            className="flex items-center justify-center"
            style={{ height: `${DIGIT_H}em` }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}

/**
 * Odometer-style live counter. Seeds with an illustrative figure and ticks
 * up continuously via requestAnimationFrame with rolling digits. Static for
 * reduced-motion users.
 */
export default function OdometerCounter({ seed, perSecond }: OdometerCounterProps) {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(seed)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    if (reduced) {
      setValue(seed)
      return
    }
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const elapsed = (now - startRef.current) / 1000
      setValue(Math.floor(seed + elapsed * perSecond))
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [seed, perSecond, reduced])

  // Render with thousands separators; separators sit between digit columns.
  const digits = Math.floor(value).toString().split('')
  const fromEnd = (i: number) => digits.length - 1 - i

  return (
    <span
      className="inline-flex items-end font-extrabold leading-none tracking-tight text-white"
      role="text"
      aria-label={`${Math.floor(value).toLocaleString('en-US')} litres`}
    >
      {digits.map((d, i) => (
        <span key={i} className="inline-flex items-end">
          {reduced ? (
            <span className="tabular-nums">{d}</span>
          ) : (
            <Digit value={Number(d)} />
          )}
          {fromEnd(i) > 0 && fromEnd(i) % 3 === 0 && (
            <span className="mx-[0.04em] inline-block">,</span>
          )}
        </span>
      ))}
    </span>
  )
}

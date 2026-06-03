import { useState } from 'react'

interface LogoProps {
  /** 'color' for light backgrounds, 'white' for dark/green backgrounds. */
  variant?: 'color' | 'white'
  className?: string
}

const LOGO_SRC = '/brand/ecoflo-logo.png'

/**
 * Renders the official Ecoflo wordmark as an <img> (never redrawn).
 * For dark/green backgrounds we apply the BRAND.md-approved CSS filter to
 * produce a clean white reverse from the color PNG. Falls back to a styled
 * "ECOFLO®" wordmark in brand green if the file fails to load.
 */
export default function Logo({ variant = 'color', className = '' }: LogoProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        className={`select-none font-extrabold tracking-tight ${
          variant === 'white' ? 'text-white' : 'text-eco-green'
        } ${className}`}
        aria-label="Ecoflo"
      >
        ECOFLO
        <sup className="ml-0.5 align-super text-[0.5em] font-semibold">®</sup>
      </span>
    )
  }

  return (
    <img
      src={LOGO_SRC}
      alt="Ecoflo"
      data-asset="brand/ecoflo-logo"
      onError={() => setFailed(true)}
      className={`w-auto select-none object-contain ${
        variant === 'white' ? '[filter:brightness(0)_invert(1)]' : ''
      } ${className}`}
      draggable={false}
    />
  )
}

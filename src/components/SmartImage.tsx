import { useState } from 'react'

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  /** Identifier so brand photography can be swapped in later. */
  dataAsset: string
  /** Tailwind gradient classes used for the graceful fallback block. */
  fallbackClassName?: string
}

/**
 * <img> with a tasteful brand-palette fallback. If the remote (Unsplash)
 * image fails to load, we render a subtle two-tone block instead of a
 * broken image — never leave a broken image (per spec).
 */
export default function SmartImage({
  src,
  alt,
  dataAsset,
  className = '',
  fallbackClassName = 'bg-gradient-to-br from-eco-green-tint via-[#dcebc6] to-eco-green/30',
  ...rest
}: SmartImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        data-asset={dataAsset}
        className={`${fallbackClassName} ${className}`}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      data-asset={dataAsset}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  )
}

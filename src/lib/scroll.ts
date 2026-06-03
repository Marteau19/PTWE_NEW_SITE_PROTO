/** Smooth-scroll to a section by id, accounting for the sticky nav height. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const navOffset = 76
  const top = el.getBoundingClientRect().top + window.scrollY - navOffset
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
}

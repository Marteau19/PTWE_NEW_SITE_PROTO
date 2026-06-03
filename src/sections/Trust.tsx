import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import { testimonials, certBadges } from '../data/testimonials'

export default function Trust() {
  return (
    <section id="trust" className="bg-white py-24 sm:py-32">
      <div className="eco-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eco-eyebrow">Trusted since 1995</span>
          <h2 className="eco-h2 mt-4">Credible by every measure.</h2>
          <p className="eco-lead mt-5">
            100,000+ property owners trust Ecoflo — and the system is built on a
            physical barrier of 100% natural, renewable, compostable coconut husk
            that protects your property and the environment around it.
          </p>
        </Reveal>

        {/* Testimonials */}
        <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem
              key={t.name}
              className="flex flex-col rounded-3xl border border-eco-navy/8 bg-eco-offwhite p-7 shadow-eco-soft"
            >
              <div className="mb-4 flex gap-0.5 text-eco-green" aria-label="5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="flex-1 text-[15px] leading-relaxed text-eco-body">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <SmartImage
                  src={t.avatar}
                  alt={t.name}
                  dataAsset={`testimonial/${t.name}`}
                  className="h-11 w-11 rounded-full object-cover"
                  fallbackClassName="h-11 w-11 rounded-full bg-eco-green-tint"
                />
                <div>
                  <p className="text-sm font-bold text-eco-navy">{t.name}</p>
                  <p className="text-xs text-eco-body/60">{t.location}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Certification badges */}
        <Reveal className="mt-20" delay={0.05}>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-eco-body/45">
            Certified & compliant
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {certBadges.map((b) => (
              <div
                key={b.label}
                className="flex min-w-[130px] flex-col items-center rounded-2xl border border-eco-navy/8 bg-white px-6 py-4 text-center shadow-eco-soft"
              >
                <span className="text-base font-extrabold tracking-tight text-eco-navy">
                  {b.label}
                </span>
                <span className="mt-1 text-[11px] text-eco-body/55">{b.sub}</span>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-relaxed text-eco-body/45">
            Illustrative certification marks shown for prototype purposes. Ecoflo
            systems are engineered to meet environmental protection and regulatory
            compliance standards in every region we serve.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

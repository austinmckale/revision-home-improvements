import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import QuoteForm from "@/components/forms/QuoteForm";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/url";
import { getServiceJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Bathroom Remodeling — Get a Quote | Lehigh Valley & Berks County",
  description:
    "Request a bathroom remodeling quote from RHI Pros. Licensed, insured, warranty-backed. Serving Allentown, Bethlehem, Lehigh Valley, Reading, and Berks County.",
  robots: { index: false, follow: false },
};

const processSteps = [
  {
    num: "1",
    title: "Tell us about your bathroom",
    desc: "Fill out the form — takes about 60 seconds.",
  },
  {
    num: "2",
    title: "We call to discuss scope",
    desc: "Within one business day. We schedule a walk-through and measure the space.",
  },
  {
    num: "3",
    title: "You get a written scope",
    desc: "Clear pricing and scope of work before any work begins. No surprises.",
  },
];

const authorityItems = [
  "Full gut demo down to studs and subfloor",
  "Schluter Kerdi waterproofing in all wet zones",
  "Subfloor rot repair when found during demo",
  "Galvanized drain replacement with PVC",
  "Exhaust ducted to exterior through soffit",
  "Tile set on Ditra uncoupling membrane",
  "Vanity scribed to fit out-of-plumb walls",
  "Trim, paint, and silicone detailing last",
];

const faqs = [
  {
    q: "Can you work with my existing plumbing layout?",
    a: "Usually yes. Moving drains or supply lines adds cost and time — we tell you upfront whether keeping the current layout is the better value for the result you want.",
  },
  {
    q: "Do you handle waterproofing?",
    a: "Yes. Proper waterproofing behind tile and at the shower base is critical. We do not shortcut wet-zone assemblies.",
  },
  {
    q: "How long does a typical bathroom remodel take?",
    a: "Most full bathroom remodels take 2–4 weeks depending on scope, tile complexity, and what we find behind the walls. We give you a timeline with the written scope.",
  },
];

const galleryImages = [
  {
    src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg",
    alt: "Finished shower with glass doors and matte black fixtures",
  },
  {
    src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-door-open.jpg",
    alt: "Completed bathroom with new barn door entry",
  },
  {
    src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-finished-shower-detail.jpg",
    alt: "Close-up of finished shower enclosure and fixtures",
  },
  {
    src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-shelves-corner.jpg",
    alt: "Custom tiled corner shelves in shower",
  },
];

export default function BathroomLandingPage() {
  const jsonLd = getServiceJsonLd(
    "Bathroom Remodeling",
    absoluteUrl("/landing/bathroom-remodeling"),
    "Allentown, Bethlehem, Lehigh Valley, Reading, Wyomissing, Berks County",
  );

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ── HERO: Headline + Trust + CTA ── */}
      <section className="hero-band py-8 md:py-14">
        <Container>
          <div className="mx-auto max-w-2xl text-center md:text-left">
            <h1 className="heading-serif text-3xl text-[var(--accent)] md:text-4xl lg:text-5xl">
              Bathroom Remodeling
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              Written scope before work starts. Licensed. Insured. Warranty&#8209;backed.
            </p>

            {/* Trust row */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-medium text-[var(--muted)] md:justify-start">
              <span>PA HIC #PA185945</span>
              <span className="hidden sm:inline">·</span>
              <span>Waterproofing&#8209;first</span>
              <span className="hidden sm:inline">·</span>
              <span>Clean jobsite</span>
              <span className="hidden sm:inline">·</span>
              <span>Lehigh Valley & Berks County</span>
            </div>

            {/* CTA buttons */}
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:items-start">
              <a
                href="#landing-quote-form"
                className="inline-flex w-full items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-dark)] sm:w-auto"
              >
                Get My Bathroom Quote
              </a>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex w-full items-center justify-center rounded-full border border-[var(--brand)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--surface-soft)] sm:w-auto"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ── HERO IMAGE ── */}
      <section className="bg-[var(--surface-soft)]">
        <Container className="py-0">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl">
            <Image
              src="/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg"
              alt="Finished bathroom remodel showing updated shower, vanity, and clean modern finishes."
              width={1200}
              height={800}
              priority
              sizes="(max-width: 768px) 100vw, 720px"
              className="h-auto w-full object-cover"
            />
          </div>
        </Container>
      </section>

      {/* ── INLINE QUOTE FORM ── */}
      <section id="landing-quote-form" className="py-10 md:py-16">
        <Container className="mx-auto max-w-xl">
          <QuoteForm defaultService="Bathroom Remodeling" />
        </Container>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-soft)] py-10 md:py-14">
        <Container className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-0.5 text-[var(--brand)]">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="mt-4 text-base italic leading-relaxed text-[var(--accent)]">
            &ldquo;This company has the experience and know-how to do almost any work you need.
            Their work is impeccable and communication was consistent.&rdquo;
          </blockquote>
          <p className="mt-3 text-sm font-semibold text-[var(--accent)]">Richard K.</p>
          <p className="text-xs text-[var(--muted)]">Bathroom remodel · Angi Review · Jun 2024</p>
        </Container>
      </section>

      {/* ── PHOTO GALLERY (horizontal scroll on mobile) ── */}
      <section className="py-10 md:py-14">
        <Container>
          <h2 className="heading-serif text-center text-2xl text-[var(--accent)] md:text-left">
            Recent Bathroom Work
          </h2>
          <p className="mt-1 text-center text-sm text-[var(--muted)] md:text-left">
            Bethlehem, PA — full gut and rebuild
          </p>
          <div className="mt-5 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
            {galleryImages.map((img) => (
              <div
                key={img.src}
                className="w-64 flex-shrink-0 overflow-hidden rounded-xl bg-[var(--surface-soft)] md:w-auto"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 256px, 25vw"
                  className="h-44 w-full object-cover md:h-52"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── WHAT HAPPENS NEXT ── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-soft)] py-10 md:py-14">
        <Container className="mx-auto max-w-2xl">
          <h2 className="heading-serif text-center text-2xl text-[var(--accent)]">
            What Happens Next
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {processSteps.map((s) => (
              <div key={s.num} className="text-center md:text-left">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">
                  {s.num}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-[var(--accent)]">{s.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── AUTHORITY SNAPSHOT (collapsed) ── */}
      <section className="py-10 md:py-14">
        <Container className="mx-auto max-w-2xl">
          <details className="surface group overflow-hidden rounded-2xl">
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-[var(--accent)] outline-none marker:content-['']">
              <span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
                  Example Scope
                </span>
                <br />
                Full bathroom gut and rebuild — Bethlehem, PA
              </span>
              <span className="text-[var(--brand)] transition-transform group-open:rotate-180">↓</span>
            </summary>
            <div className="border-t border-[var(--border)] px-5 pb-5 pt-4">
              <p className="text-sm text-[var(--muted)]">
                Complete tear-out and rebuild of a dated second-floor bathroom including hidden rot
                repair, full waterproofing, plumbing corrections, new tile, and finish work
                coordinated around a family still using the home.
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-[var(--muted)]">
                {authorityItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-[var(--muted)]">
                Shown to illustrate build quality and sequencing. Your scope will vary based on
                layout, conditions, and finish selections.
              </p>
            </div>
          </details>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-soft)] py-10 md:py-14">
        <Container className="mx-auto max-w-2xl">
          <h2 className="heading-serif text-2xl text-[var(--accent)]">Quick Answers</h2>
          <div className="mt-5 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="surface group overflow-hidden rounded-xl bg-white transition-colors open:bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-[var(--accent)] outline-none marker:content-['']">
                  {faq.q}
                  <span className="ml-2 text-[var(--brand)] transition-transform group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <div className="px-5 pb-4 pt-0 text-sm text-[var(--muted)]">{faq.a}</div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* ── REPEAT CTA ── */}
      <section className="py-10 md:py-14">
        <Container className="mx-auto max-w-xl text-center">
          <h2 className="heading-serif text-2xl text-[var(--accent)]">
            Ready to start your bathroom project?
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            No obligation. Written scope before any work begins.
          </p>
          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#landing-quote-form"
              className="inline-flex w-full items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-dark)] sm:w-auto"
            >
              Get My Bathroom Quote
            </a>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex w-full items-center justify-center rounded-full border border-[var(--brand)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--surface-soft)] sm:w-auto"
            >
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

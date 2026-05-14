import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import QuoteForm from "@/components/forms/QuoteForm";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/url";
import { getServiceJsonLd } from "@/lib/structuredData";
import { testimonials } from "@/content/testimonials";

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
    desc: "Within one business day we schedule a walk-through and measure the space.",
  },
  {
    num: "3",
    title: "You get a written scope",
    desc: "Clear pricing and scope of work before any work begins. No surprises.",
  },
];

const faqs = [
  {
    q: "How much does a bathroom remodel cost?",
    a: "It depends on scope — a basic refresh starts lower, while a full gut-and-rebuild with tile, plumbing, and waterproofing will cost more. We give you a written scope with clear pricing before any work starts, so there are no surprises.",
  },
  {
    q: "How long does a typical bathroom remodel take?",
    a: "Most full bathroom remodels take 2–4 weeks depending on scope, tile complexity, and what we find behind the walls. We give you a timeline with the written scope.",
  },
  {
    q: "Can you work with my existing plumbing layout?",
    a: "Usually yes. Moving drains or supply lines adds cost and time — we tell you upfront whether keeping the current layout is the better value for the result you want.",
  },
  {
    q: "Do you handle waterproofing?",
    a: "Yes. Proper waterproofing behind tile and at the shower base is critical. We use Schluter Kerdi systems in all wet zones — we do not shortcut wet-zone assemblies.",
  },
  {
    q: "What does a full bathroom gut include?",
    a: "Full demo down to studs and subfloor, rot repair if needed, galvanized drain replacement with PVC, Schluter Kerdi waterproofing, tile on Ditra uncoupling membrane, vanity scribed to fit, exhaust ducted to exterior, and all trim/paint/silicone detailing.",
  },
];

const galleryImages = [
  {
    src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg",
    alt: "Finished shower with glass doors and matte black fixtures",
  },
  {
    src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-vanity.jpg",
    alt: "Updated vanity with matte black fixtures, modern mirror, and new lighting",
  },
  {
    src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-finished-shower-detail.jpg",
    alt: "Close-up of finished shower enclosure and fixtures",
  },
  {
    src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-door-open.jpg",
    alt: "Completed bathroom with new barn door entry",
  },
];

export default function BathroomLandingPage() {
  const jsonLd = getServiceJsonLd(
    "Bathroom Remodeling",
    absoluteUrl("/landing/bathroom-remodeling"),
    "Allentown, Bethlehem, Lehigh Valley, Reading, Wyomissing, Berks County",
  );

  const bathroomReviews = testimonials
    .filter((t) => t.serviceSlug === "bathroom-remodeling")
    .slice(0, 3);

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ── HERO: Text + Image side-by-side on desktop ── */}
      <section className="hero-band py-8 md:py-14">
        <Container>
          <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2">
            {/* Left: copy */}
            <div className="text-center md:text-left">
              <h1 className="heading-serif text-3xl text-[var(--accent)] md:text-4xl lg:text-[2.75rem] lg:leading-tight">
                Your Bathroom, Done Right the&nbsp;First&nbsp;Time
              </h1>
              <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
                Written scope before work starts. No surprises on price or timeline.
              </p>

              {/* Trust row */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-medium text-[var(--muted)] md:justify-start">
                <span className="flex items-center gap-1">
                  <svg className="h-3.5 w-3.5 text-[var(--brand)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  5.0 on Google
                </span>
                <span className="hidden sm:inline">·</span>
                <span>PA HIC #PA185945</span>
                <span className="hidden sm:inline">·</span>
                <span>Waterproofing&#8209;first</span>
                <span className="hidden sm:inline">·</span>
                <span>Lehigh Valley &amp; Berks County</span>
              </div>

              {/* CTA buttons */}
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:items-start">
                <a
                  href="#landing-quote-form"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-dark)] sm:w-auto"
                >
                  Get My Free Quote
                </a>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[var(--brand)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--surface-soft)] sm:w-auto"
                >
                  Call {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Right: hero image */}
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg"
                alt="Finished bathroom remodel showing updated shower, vanity, and clean modern finishes."
                width={1200}
                height={800}
                priority
                sizes="(max-width: 768px) 100vw, 520px"
                className="h-64 w-full object-cover object-bottom sm:h-72 md:h-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── INLINE QUOTE FORM ── */}
      <section id="landing-quote-form" className="py-10 md:py-16">
        <Container className="mx-auto max-w-xl">
          <QuoteForm defaultService="Bathroom Remodeling" />
        </Container>
      </section>

      {/* ── WHAT HAPPENS NEXT (anxiety reducer — before social proof) ── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-soft)] py-10 md:py-14">
        <Container className="mx-auto max-w-2xl">
          <h2 className="heading-serif text-center text-2xl text-[var(--accent)]">
            What Happens After You Submit
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

      {/* ── REVIEWS ── */}
      <section className="py-10 md:py-14">
        <Container className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="heading-serif text-2xl text-[var(--accent)]">What Our Clients Say</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                5.0 stars on Google (9 reviews) · 5.0 on Angi (9 reviews)
              </p>
            </div>
            <a
              href={siteConfig.googleBusinessProfileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--brand)] px-4 py-2 text-xs font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
            >
              See Google Reviews
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {bathroomReviews.map((review) => (
              <article
                key={`${review.name}-${review.source}`}
                className="flex flex-col rounded-xl bg-[var(--surface-soft)] p-5"
              >
                <div className="flex items-center gap-0.5 text-[var(--brand)]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-[var(--accent)]">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <div className="mt-4 border-t border-[var(--border)] pt-3">
                  <p className="text-sm font-semibold text-[var(--accent)]">{review.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {review.context} · {review.source}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 text-center">
            <a
              href="#landing-quote-form"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand)] transition hover:underline"
            >
              Get your free quote
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </a>
          </div>
        </Container>
      </section>

      {/* ── PHOTO GALLERY (horizontal scroll on mobile) ── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-soft)] py-10 md:py-14">
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
                className="w-64 flex-shrink-0 overflow-hidden rounded-xl bg-white md:w-auto"
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

      {/* ── FAQ ── */}
      <section className="py-10 md:py-14">
        <Container className="mx-auto max-w-2xl">
          <h2 className="heading-serif text-2xl text-[var(--accent)]">Common Questions</h2>
          <div className="mt-5 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="surface group overflow-hidden rounded-xl transition-colors"
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
      <section className="border-t border-[var(--border)] bg-[var(--surface-soft)] py-10 md:py-14">
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
              Get My Free Quote
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

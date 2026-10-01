import ServiceHero from "@/components/sections/ServiceHero";
import { getProjectImageProps } from "@/content/projectImagePreviews";
import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import QuoteForm from "@/components/forms/QuoteForm";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/url";
import { getServiceJsonLd } from "@/lib/structuredData";
import { getFeaturedTestimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Bathroom Remodeling — Get a Quote | Lehigh Valley & Berks County",
  description:
    "Request a bathroom remodeling quote from RHI Pros. Pennsylvania HIC number PA185945. Written scope and estimate. Serving Allentown, Bethlehem, Lehigh Valley, Reading, and Berks County.",
  robots: { index: false, follow: false },
};

const processSteps = [
  {
    num: "1",
    title: "Tell us about your bathroom",
    desc: "Share your location, priorities and the changes you have in mind.",
  },
  {
    num: "2",
    title: "We call to discuss scope",
    desc: "Discuss your priorities, location and availability, then agree on the next step.",
  },
  {
    num: "3",
    title: "You get a written scope",
    desc: "Review the proposed work, pricing and dependencies before construction. Approve any scope changes before additional work proceeds.",
  },
];

const faqs = [
  {
    q: "How much does a bathroom remodel cost?",
    a: "Cost depends on the agreed scope, materials and existing conditions. A surface refresh and a full rebuild involve different work. Review the written proposal, exclusions and allowances before construction; concealed conditions may require assessment and an approved change to scope or pricing.",
  },
  {
    q: "How long does a typical bathroom remodel take?",
    a: "Timing depends on the agreed scope, material availability, room access and existing conditions. Confirm the schedule and any dependencies alongside your written scope.",
  },
  {
    q: "Can you work with my existing plumbing layout?",
    a: "Keeping the existing layout may be an option, depending on its condition and your planned fixtures. Moving drains or supply lines can affect cost and timing. Assess both options and confirm plumbing responsibilities in the proposal.",
  },
  {
    q: "Do you handle waterproofing?",
    a: "Discuss the wet areas, selected fixtures and proposed waterproofing assembly during scope planning. The system, preparation and installation responsibilities should be named in the written proposal.",
  },
  {
    q: "What does a full bathroom gut include?",
    a: "The scope depends on the room and existing conditions. Agree on demolition limits, plumbing and electrical responsibilities, ventilation, wet-area preparation, fixtures, surfaces and finish work before construction. Repairs to concealed conditions need assessment rather than an assumption that every bathroom needs the same work.",
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
    alt: "Bathroom doorway with a sliding door, gray vanity and black-framed shower enclosure",
  },
];

export default function BathroomLandingPage() {
  const jsonLd = getServiceJsonLd(
    "Bathroom Remodeling",
    absoluteUrl("/landing/bathroom-remodeling"),
    "Allentown, Bethlehem, Lehigh Valley, Reading, Wyomissing, Berks County",
  );

  const bathroomReviews = getFeaturedTestimonials();

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ── HERO: Text + Image side-by-side on desktop ── */}
      <ServiceHero
        eyebrow="Bathroom remodeling · Lehigh Valley & Berks County"
        title="A bathroom, thoughtfully rebuilt."
        intro="Start with a written scope. Bring tile, fixtures, waterproofing, and finish details together in a bathroom designed around your home."
        image={galleryImages[0]}
        primaryHref="#landing-quote-form"
        primaryLabel="Request a bathroom quote"
        secondaryHref={siteConfig.phoneHref}
        secondaryLabel={`Call ${siteConfig.phoneDisplay}`}
      />

      {/* ── INLINE QUOTE FORM ── */}
      <section id="landing-quote-form" className="py-10 md:py-16">
        <Container className="mx-auto max-w-xl">
          <QuoteForm defaultService="Bathroom Remodeling" />
        </Container>
      </section>

      {/* ── WHAT HAPPENS NEXT (anxiety reducer — before social proof) ── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-soft)] py-10 md:py-14">
        <Container className="mx-auto max-w-2xl">
          <h2 className="heading-serif text-center text-2xl text-[var(--accent)]">What Happens After You Submit</h2>
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
              <h2 className="heading-serif text-2xl text-[var(--accent)]">Independent company reviews</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Company review excerpts from Angi, with links to the original source.
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
                  <a
                    href={review.verification.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[var(--brand)] underline underline-offset-4"
                  >
                    {review.context} · {review.source}
                  </a>
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
            Bathroom details, up close
          </h2>
          <p className="mt-1 text-center text-sm text-[var(--muted)] md:text-left">
            Explore shower, vanity and finish details.
          </p>
          <div className="mt-5 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
            {galleryImages.map((img) => (
              <div key={img.src} className="w-64 flex-shrink-0 overflow-hidden rounded-xl bg-white md:w-auto">
                <Image
                  {...getProjectImageProps(img)}
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
              <details key={faq.q} className="surface group overflow-hidden rounded-xl transition-colors">
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-[var(--accent)] outline-none marker:content-['']">
                  {faq.q}
                  <span className="ml-2 text-[var(--brand)] transition-transform group-open:rotate-180">↓</span>
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
          <h2 className="heading-serif text-2xl text-[var(--accent)]">Ready to start your bathroom project?</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">No obligation. Written scope before any work begins.</p>
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

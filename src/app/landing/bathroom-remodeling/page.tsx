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
import TestimonialStrip from "@/components/sections/TestimonialStrip";
import FaqList from "@/components/sections/FaqList";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Bathroom Remodeling — Get a Quote | Lehigh Valley & Berks County",
  description:
    "Request a bathroom remodeling quote from RHI Pros, PA HIC PA185945. A detailed written proposal before work begins. Serving Allentown, Bethlehem, the Lehigh Valley, Reading and Berks County.",
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
    title: "We call to talk it through",
    desc: "We discuss your priorities, location and timing, and set up a visit.",
  },
  {
    num: "3",
    title: "You get a written proposal",
    desc: "Review the work, price and timing before anything starts. Any change is approved by you first.",
  },
];

const faqs = [
  {
    q: "How much does a bathroom remodel cost?",
    a: "It depends on the size of the room, your materials and what is behind the walls. A refresh and a full rebuild are very different projects. Your written proposal spells out the price, allowances and exclusions before work starts.",
  },
  {
    q: "How long does a typical bathroom remodel take?",
    a: "It depends on the work, material availability and existing conditions. Your proposal includes the schedule before work begins.",
  },
  {
    q: "Can you work with my existing plumbing layout?",
    a: "Often, yes, depending on its condition and your new fixtures. Moving drains or supply lines adds cost and time, so we compare both options with you.",
  },
  {
    q: "Do you handle waterproofing?",
    a: "Yes. The waterproofing system for your shower and wet areas is chosen during planning and named in your proposal.",
  },
  {
    q: "What does a full bathroom gut include?",
    a: "It depends on the room. A full gut usually covers demolition, plumbing and electrical work, ventilation, shower preparation, fixtures, surfaces and finishes. Hidden damage is assessed once walls are open rather than assumed.",
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
        intro="Tile, fixtures, waterproofing and finishes, planned together in a bathroom built around the way you use it."
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
          <h2 className="heading-serif text-center text-2xl text-[var(--accent)]">What happens next</h2>
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
        <Container className="mx-auto max-w-5xl">
          <TestimonialStrip items={bathroomReviews} />
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
          <div
            className="mt-5 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible"
            tabIndex={0}
            role="region"
            aria-label="Bathroom photos"
          >
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
      <section className="pb-10 md:pb-14">
        <Container className="mx-auto max-w-2xl">
          <FaqList title="Common questions" items={faqs} />
        </Container>
      </section>

      {/* ── REPEAT CTA ── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-soft)] py-10 md:py-14">
        <Container className="mx-auto max-w-xl text-center">
          <h2 className="heading-serif text-2xl text-[var(--accent)]">Ready to start your bathroom project?</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">No obligation. A written proposal before any work begins.</p>
          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="#landing-quote-form">Request a quote</Button>
            <Button href={siteConfig.phoneHref} variant="secondary">
              Call {siteConfig.phoneDisplay}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

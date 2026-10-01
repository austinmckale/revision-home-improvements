import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import QuoteForm from "@/components/forms/QuoteForm";
import JsonLd from "@/components/JsonLd";
import TestimonialStrip from "@/components/sections/TestimonialStrip";
import { siteConfig } from "@/content/site";
import { insuranceClaimsClarification } from "@/content/restoration";
import { getFeaturedTestimonials } from "@/content/testimonials";
import { absoluteUrl } from "@/lib/url";
import { getServiceJsonLd, getBreadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Fire & Water Damage Restoration | Reading PA & Lehigh Valley",
  description:
    "Fire and water damage restoration in Reading, Berks County and the Lehigh Valley. Call RHI Pros for assessment, repair scopes and insurance documentation support.",
  alternates: { canonical: "/fire-water-damage-restoration" },
};

const firstSteps = [
  { title: "Put safety first", copy: "Protect occupants and avoid entering unsafe areas." },
  {
    title: "Call to discuss the damage",
    copy: "Tell us what happened and where. We will discuss the next steps and scheduling.",
  },
  {
    title: "Gather the details",
    copy: "Share available photos and claim information so the repair scope can be reviewed.",
  },
  { title: "Plan the recovery", copy: "We develop a written scope and discuss the sequence of reconstruction work." },
];
const recoveryServices = [
  {
    href: "/services/fire-damage-restoration",
    title: "After fire damage",
    copy: "Interior reconstruction, finish repairs, and a phased rebuild plan.",
  },
  {
    href: "/services/water-damage-restoration",
    title: "After water damage",
    copy: "Assessment of affected finishes and a coordinated repair scope.",
  },
  {
    href: "/insurance-claims",
    title: "Claim-related repairs",
    copy: "Documentation and scope support for insurance-related projects.",
  },
];

export default function FireWaterDamageRestorationPage() {
  const restorationTestimonials = getFeaturedTestimonials();
  return (
    <>
      <JsonLd
        data={getServiceJsonLd(
          "Fire and Water Damage Restoration",
          absoluteUrl("/fire-water-damage-restoration"),
          "Reading, Wyomissing, Berks County, Allentown, Bethlehem, Lehigh Valley",
        )}
      />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Emergency Restoration", href: "/fire-water-damage-restoration" },
        ])}
      />
      <section className="border-b border-[var(--border)] bg-[var(--surface-soft)] py-10 sm:py-16">
        <Container className="grid items-center gap-9 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
          <div className="min-w-0">
            <p className="eyebrow">Restoration support · Lehigh Valley & Berks County</p>
            <h1 className="heading-serif mt-5 text-[clamp(2.4rem,4.7vw,4.5rem)] leading-[1.06] tracking-[-.025em] text-[var(--accent)]">
              Fire &amp; water damage restoration.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
              When your home has been damaged, start with a conversation. We help define the repairs, document the
              scope, and plan the rebuild.
            </p>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <Button href={siteConfig.phoneHref}>Call {siteConfig.phoneDisplay}</Button>
              <Button href="#quote-form-section" variant="secondary">
                Request an assessment
              </Button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              For an urgent project, call directly to discuss availability.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{insuranceClaimsClarification}</p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--border)] pt-4 text-xs font-semibold text-[var(--muted)]">
              <span>PA HIC #PA185945</span>
              <span>Discuss availability</span>
              <span>Written repair scopes</span>
            </div>
          </div>
          <figure className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--accent)] lg:aspect-[4/5]">
              <Image
                src="/images/projects/fire-damage-documentation/after/37-img_8934.jpg"
                alt="Supplied condition photograph showing charred upper siding and boarded windows above a stone-faced lower story."
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <figcaption className="flex items-start justify-between gap-4 border-b border-[var(--border)] py-4 text-xs leading-relaxed text-[var(--muted)]">
              <span>Condition photo · damage visible at the upper exterior</span>
              <Link
                href="/projects/lehigh-valley-fire-damage-documentation"
                className="shrink-0 font-semibold text-[var(--brand)]"
              >
                See condition photos ↗
              </Link>
            </figcaption>
          </figure>
        </Container>
      </section>
      <section className="py-12 sm:py-20">
        <Container>
          <p className="eyebrow">Start here</p>
          <h2 className="heading-serif mt-4 text-3xl text-[var(--accent)] sm:text-4xl">From uncertainty to a plan.</h2>
          <ol className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {firstSteps.map((step, index) => (
              <li key={step.title} className="border-t border-[var(--border)] pt-5">
                <span className="heading-serif text-4xl text-[var(--brand)]">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-semibold text-[var(--accent)]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{step.copy}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {recoveryServices.map((service) => (
              <Link
                href={service.href}
                key={service.href}
                className="group border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--brand)]"
              >
                <h3 className="heading-serif text-2xl text-[var(--accent)]">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{service.copy}</p>
                <span className="mt-5 block text-sm font-semibold text-[var(--brand)]">Explore support ↗</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-[var(--surface-soft)] py-12 sm:py-20">
        <Container className="grid items-start gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <p className="eyebrow">Tell us what happened</p>
            <h2 className="heading-serif mt-4 text-3xl text-[var(--accent)] sm:text-4xl">Let’s plan your next step.</h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--muted)]">
              Share the type of damage, affected rooms, location, and any existing claim information. We will review
              your request and discuss the work involved.
            </p>
            <ul className="mt-6 space-y-3 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted)]">
              <li>Damage assessment and rebuild scoping</li>
              <li>Drywall, flooring, trim, and finish reconstruction</li>
              <li>Milestone updates and a final walkthrough</li>
              <li>Insurance documentation support when needed</li>
            </ul>
            {restorationTestimonials.length > 0 && (
              <div className="mt-8">
                <TestimonialStrip items={restorationTestimonials} title="Independent company reviews" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <QuoteForm />
          </div>
        </Container>
      </section>
    </>
  );
}

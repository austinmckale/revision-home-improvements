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
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  title: "Fire & Water Damage Restoration | Reading PA & Lehigh Valley",
  description:
    "Fire and water damage restoration in Reading, Berks County and the Lehigh Valley. Call RHI Pros for an assessment, a detailed repair estimate and documentation for your claim.",
  path: "/fire-water-damage-restoration",
});

const firstSteps = [
  { title: "Put safety first", copy: "Protect occupants and avoid entering unsafe areas." },
  {
    title: "Call to discuss the damage",
    copy: "Tell us what happened and where. We will discuss the next steps and scheduling.",
  },
  {
    title: "Gather the details",
    copy: "Share photos and any claim information so we can review the repairs.",
  },
  { title: "Plan the recovery", copy: "We prepare a written repair plan and walk you through the order of the rebuild." },
];
const recoveryServices = [
  {
    href: "/services/fire-damage-restoration",
    title: "After fire damage",
    copy: "Drywall, flooring, trim and finishes rebuilt in clear phases.",
  },
  {
    href: "/services/water-damage-restoration",
    title: "After water damage",
    copy: "Damaged finishes reviewed and rebuilt once the space is dry.",
  },
  {
    href: "/insurance-claims",
    title: "Claim-related repairs",
    copy: "Photos and detailed estimates for your insurance claim.",
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
              When your home has been damaged, start with a phone call. We assess the damage, document it for your
              claim and rebuild the rooms you live in.
            </p>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <Button href={siteConfig.phoneHref}>Call {siteConfig.phoneDisplay}</Button>
              <Button href="#quote-form-section" variant="secondary">
                Request an assessment
              </Button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{insuranceClaimsClarification}</p>
            <p className="annotation mt-7 border-t border-[var(--border)] pt-4 text-[0.62rem] text-[var(--muted)]">
              {siteConfig.hicLabel}
            </p>
          </div>
          <figure className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--accent)] lg:aspect-[4/5]">
              <Image
                src="/images/projects/allentown-flooring-replacement/after/living-room-finished.jpg"
                alt="Finished living area with light wood-look flooring and freshly painted walls."
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <figcaption className="flex items-start justify-between gap-4 border-b border-[var(--border)] py-4 text-xs leading-relaxed text-[var(--muted)]">
              <span>Finished interior · new flooring and fresh walls</span>
              <Link href="/projects" className="shrink-0 font-semibold text-[var(--brand)]">
                See finished projects ↗
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
                <span className="mt-5 block text-sm font-semibold text-[var(--brand)]">Learn more ↗</span>
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
              Tell us the type of damage, which rooms were affected, where you are and whether a claim is open. We will
              review it and follow up to talk through the work.
            </p>
            <ul className="mt-6 space-y-3 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted)]">
              <li>Damage assessment and rebuild planning</li>
              <li>Drywall, flooring, trim and finish reconstruction</li>
              <li>Regular updates and a final walkthrough</li>
              <li>Photos and estimates for your insurance claim</li>
            </ul>
            {restorationTestimonials.length > 0 && (
              <div className="mt-8">
                <TestimonialStrip items={restorationTestimonials} />
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

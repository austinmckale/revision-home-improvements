import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import QuoteForm from "@/components/forms/QuoteForm";
import JsonLd from "@/components/JsonLd";
import TestimonialStrip from "@/components/sections/TestimonialStrip";
import { siteConfig } from "@/content/site";
import { getTestimonialsByService } from "@/content/testimonials";
import { absoluteUrl } from "@/lib/url";
import { getServiceJsonLd, getBreadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Fire & Water Damage Restoration | Reading PA & Lehigh Valley",
  description:
    "Emergency fire and water damage restoration with insurance coordination and rebuild scopes across Reading, Berks County, and the Lehigh Valley.",
  alternates: { canonical: "/fire-water-damage-restoration" },
};

export default function FireWaterDamageRestorationPage() {
  const jsonLd = getServiceJsonLd(
    "Fire and Water Damage Restoration",
    absoluteUrl("/fire-water-damage-restoration"),
    "Reading, Wyomissing, Berks County, Allentown, Bethlehem, Lehigh Valley",
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Emergency Restoration", href: "/fire-water-damage-restoration" }])} />
      <section className="hero-band py-14">
        <Container className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Emergency Restoration Support</p>
            <h1 className="mt-2 text-4xl font-extrabold text-[var(--accent)]">Fire and Water Damage Restoration</h1>
            <p className="mt-3 text-[var(--muted)]">
              When damage happens, speed and scope clarity matter. We prioritize call-first scheduling, practical recovery planning,
              and full rebuild execution.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={siteConfig.phoneHref}>Call {siteConfig.phoneDisplay}</Button>
              <Button href="/request-a-quote" variant="secondary">
                Request Assessment
              </Button>
            </div>
          </div>
          <div className="surface overflow-hidden rounded-2xl">
            <Image
              src="/images/projects/img_7540.jpg"
              alt="Interior reconstruction work following property damage."
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold text-[var(--accent)]">First 60 Minutes: What to Do</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <article className="surface rounded-lg p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Safety First</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">Protect occupants and avoid entering unsafe areas.</p>
              </article>
              <article className="surface rounded-lg p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Call Immediately</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">We provide next-step guidance and priority scheduling direction.</p>
              </article>
              <article className="surface rounded-lg p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Document Damage</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">Capture photos and key details for claim and scope alignment.</p>
              </article>
              <article className="surface rounded-lg p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Stabilize Scope</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">We build a phased recovery plan and execution timeline.</p>
              </article>
            </div>

            <h3 className="mt-8 text-xl font-semibold text-[var(--accent)]">How We Support Recovery</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
              <li>Damage assessment and practical rebuild scoping</li>
              <li>Interior reconstruction for drywall, flooring, trim, and finishes</li>
              <li>Timeline coordination and communication from start to final walkthrough</li>
              <li>Insurance-claim documentation support when needed</li>
            </ul>

            <h3 className="mt-8 text-xl font-semibold text-[var(--accent)]">Related Restoration Services</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Link href="/services/fire-damage-restoration" className="surface rounded-lg p-3 text-sm hover:border-[var(--brand)]">
                Fire Damage Restoration
              </Link>
              <Link href="/services/water-damage-restoration" className="surface rounded-lg p-3 text-sm hover:border-[var(--brand)]">
                Water Damage Restoration
              </Link>
              <Link href="/insurance-claims" className="surface rounded-lg p-3 text-sm hover:border-[var(--brand)]">
                Insurance Claims Assistance
              </Link>
            </div>
          </div>
          <div>
            <TestimonialStrip
              items={[...getTestimonialsByService("water-damage-restoration"), ...getTestimonialsByService("fire-damage-restoration")].slice(0, 3)}
              title="Restoration Client Feedback"
            />
            <QuoteForm />
          </div>
        </Container>
      </section>
    </>
  );
}

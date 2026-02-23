import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import QuoteForm from "@/components/forms/QuoteForm";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/url";
import { getServiceJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Fire and Water Damage Restoration",
  description:
    "Call-first fire and water damage restoration support in Reading, Berks County, and Lehigh Valley, including rebuild scopes and insurance claim coordination.",
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
            <div className="surface rounded-xl border-[var(--brand)] p-5">
              <h2 className="text-xl font-semibold text-[var(--accent)]">What to do first</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
                <li>Call for immediate next-step guidance and scheduling.</li>
                <li>Protect occupants and avoid entering unsafe areas.</li>
                <li>Capture photos and key details for documentation.</li>
                <li>We review scope priorities and build a phased plan quickly.</li>
              </ul>
            </div>

            <h2 className="mt-8 text-2xl font-bold text-[var(--accent)]">How We Support Recovery</h2>
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

            <div className="surface mt-8 rounded-xl p-5">
              <h3 className="text-xl font-semibold text-[var(--accent)]">Need immediate restoration help?</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Call now for priority scheduling. If you prefer, submit the form and we will follow up quickly with next steps.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href={siteConfig.phoneHref}>Call {siteConfig.phoneDisplay}</Button>
                <Button href="/request-a-quote" variant="secondary">
                  Request a Quote
                </Button>
              </div>
            </div>
          </div>
          <QuoteForm />
        </Container>
      </section>
    </>
  );
}

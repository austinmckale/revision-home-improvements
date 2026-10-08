import PageIntro from "@/components/sections/PageIntro";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import FaqList from "@/components/sections/FaqList";
import { locations, placeName } from "@/content/locations";
import { siteConfig } from "@/content/site";
import { getServiceBySlug } from "@/content/services";
import { insuranceClaimsClarification } from "@/content/restoration";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  title: "Insurance Claim Remodeling Support | Reading PA & Lehigh Valley",
  description:
    "Insurance claim repairs in Reading, Berks County and the Lehigh Valley: photos, a detailed repair estimate for your adjuster, and the rebuild itself.",
  path: "/insurance-claims",
});

const steps = [
  {
    title: "Document",
    copy: "Photos and notes of the damage, room by room, ready to share with your adjuster.",
  },
  {
    title: "Estimate",
    copy: "A detailed repair estimate that matches the damage. Any change is explained and approved in writing first.",
  },
  {
    title: "Rebuild",
    copy: "Drywall, flooring, trim and finishes put back together, with regular updates through the final walkthrough.",
  },
];

export default function InsuranceClaimsPage() {
  const claimFaqs = getServiceBySlug("insurance-claims")?.faqs ?? [];

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Insurance Claims", href: "/insurance-claims" },
        ])}
      />
      <PageIntro eyebrow="Insurance claims" title="Insurance claim repairs, handled clearly.">
        <p>
          After a fire, leak or storm, we document the damage, write a detailed repair estimate and rebuild your home
          while your claim moves forward.
        </p>
      </PageIntro>
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_.7fr] lg:gap-16">
            <div>
              <h2 className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">How we help.</h2>
              <ol className="mt-8 border-t border-[var(--accent)]">
                {steps.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid gap-2 border-b border-[var(--border)] py-6 sm:grid-cols-[3rem_10rem_1fr] sm:items-baseline sm:gap-6"
                  >
                    <span className="font-mono text-xs tracking-[.15em] text-[var(--brand)]">0{index + 1}</span>
                    <h3 className="heading-serif text-2xl text-[var(--accent)]">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">{step.copy}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">{insuranceClaimsClarification}</p>
              {claimFaqs.length > 0 ? <FaqList id="questions" title="Common questions" items={claimFaqs} /> : null}
            </div>
            <div className="h-fit bg-[var(--accent)] p-6 text-white sm:p-8">
              <p className="eyebrow eyebrow-light">Urgent damage?</p>
              <p className="heading-serif mt-4 text-2xl leading-snug">Call us to talk it through.</p>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                If anyone is unsafe or the damage is still active, contact emergency services or a mitigation company
                first. Then call us about the repairs and our current availability.
              </p>
              <div className="mt-6 grid gap-3">
                <Button href={siteConfig.phoneHref}>Call {siteConfig.phoneDisplay}</Button>
                <Button href="/request-a-quote?service=insurance-claims" variant="secondary">
                  Request claim help
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-[var(--border)] pt-6 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              Claim repairs across{" "}
              {locations.map((location, index) => (
                <span key={location.slug}>
                  {index > 0 ? (index === locations.length - 1 ? " and " : ", ") : null}
                  <Link
                    href={`/${location.slug}/insurance-claims`}
                    className="font-semibold text-[var(--accent)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:text-[var(--brand)] hover:decoration-[var(--brand)]"
                  >
                    {placeName(location)}
                  </Link>
                </span>
              ))}
              .{" "}
              <Link
                href="/fire-water-damage-restoration"
                className="font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
              >
                Fire &amp; water damage restoration →
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

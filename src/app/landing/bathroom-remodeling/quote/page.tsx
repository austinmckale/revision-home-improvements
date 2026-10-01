import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import QuoteForm from "@/components/forms/QuoteForm";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Get Your Bathroom Quote",
  description:
    "Request a bathroom remodeling quote. Written scope before work begins. Pennsylvania HIC number PA185945. Discuss scope, scheduling and warranty terms.",
  robots: { index: false, follow: false },
};

export default function BathroomLandingQuotePage() {
  return (
    <section className="py-8 md:py-14">
      <Container className="mx-auto max-w-xl">
        {/* Trust headline */}
        <div className="mb-6 text-center">
          <h1 className="heading-serif text-3xl leading-tight text-[var(--accent)] md:text-4xl">
            Get Your Bathroom Quote
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Written scope before work begins. No obligation.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-medium text-[var(--muted)]">
            <span>PA HIC #PA185945 · Written scope</span>
          </div>
        </div>

        {/* Form */}
        <QuoteForm defaultService="Bathroom Remodeling" />

        <div className="mt-8 border-t border-[var(--border)] bg-[var(--surface-soft)] p-5 text-center">
          <p className="text-sm text-[var(--muted)]">Read independent company reviews before planning your bathroom.</p>
          <a
            href={siteConfig.angiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-semibold text-[var(--brand)] underline underline-offset-4"
          >
            Company reviews on Angi ↗
          </a>
        </div>

        {/* Phone fallback */}
        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          Prefer to talk?{" "}
          <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)]">
            Call {siteConfig.phoneDisplay}
          </a>
        </p>
      </Container>
    </section>
  );
}

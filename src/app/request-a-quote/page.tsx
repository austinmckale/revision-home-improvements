import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import QuoteForm from "@/components/forms/QuoteForm";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/content/site";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Request a Free Quote — Fast Response",
  description:
    "Request a home remodeling or restoration quote for Reading, Berks County, and Lehigh Valley projects.",
  alternates: { canonical: "/request-a-quote" },
};

export default function RequestQuotePage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Request a Quote", href: "/request-a-quote" }])} />
      <section className="py-14">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--accent)]">Request a Quote</h1>
            <p className="mt-3 text-[var(--muted)]">
              Send your project details once and we will route you to the right next step fast, whether this is a planned remodel or a time-sensitive restoration scope.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <article className="surface rounded-xl p-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Tell us</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">Service type, location, and timeline priority.</p>
              </article>
              <article className="surface rounded-xl p-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">We review</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">Scope fit, urgency, and scheduling constraints.</p>
              </article>
              <article className="surface rounded-xl p-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">You decide</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">Next steps for estimate, financing, and start timing.</p>
              </article>
            </div>

            <div className="surface mt-6 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-[var(--accent)]">Best Info to Include</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
                <li>Room/area affected and what outcome you want</li>
                <li>Any deadline, occupancy, or access constraints</li>
                <li>Whether this is an insurance-related or urgent damage situation</li>
              </ul>
            </div>

            <div className="surface mt-6 rounded-2xl border-[var(--brand)] p-6">
              <h2 className="text-xl font-semibold text-[var(--accent)]">Need immediate restoration help?</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                For active fire or water damage situations, call now for priority scheduling guidance.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href={siteConfig.phoneHref}>Call {siteConfig.phoneDisplay}</Button>
                <Button href="/fire-water-damage-restoration" variant="secondary">
                  Restoration Help
                </Button>
              </div>
            </div>

            <p className="mt-4 text-sm font-semibold text-[var(--brand)]">
              {siteConfig.financing.teaser} {siteConfig.financing.shortDisclosure}
            </p>
          </div>

          <QuoteForm />
        </Container>
      </section>
    </>
  );
}

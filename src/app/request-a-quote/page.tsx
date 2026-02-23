import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import QuoteForm from "@/components/forms/QuoteForm";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a home remodeling or restoration quote for Reading, Berks County, and Lehigh Valley projects.",
};

export default function RequestQuotePage() {
  return (
    <section className="py-14">
      <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="text-4xl font-extrabold text-[var(--accent)]">Request a Quote</h1>
          <p className="mt-3 text-[var(--muted)]">
            Share your project details and location. We will follow up quickly with scope confirmation and scheduling options.
          </p>

          <div className="surface mt-6 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-[var(--accent)]">What to include</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
              <li>Project type and priority</li>
              <li>Property ZIP code and service area</li>
              <li>Any urgent restoration concerns</li>
            </ul>
          </div>

          <div className="surface mt-6 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-[var(--accent)]">What happens next</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--muted)]">
              <li>We review your details and confirm scope fit.</li>
              <li>Our team reaches out for discovery and planning.</li>
              <li>You receive clear next steps for estimate and scheduling.</li>
            </ol>
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
  );
}

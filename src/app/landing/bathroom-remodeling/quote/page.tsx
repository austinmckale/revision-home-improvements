import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import QuoteForm from "@/components/forms/QuoteForm";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Get Your Bathroom Quote | RHI Pros",
  description:
    "Request a bathroom remodeling quote. Written scope before work begins. Licensed, insured, warranty-backed.",
  robots: { index: false, follow: false },
};

export default function BathroomLandingQuotePage() {
  return (
    <section className="py-8 md:py-14">
      <Container className="mx-auto max-w-xl">
        {/* Trust headline */}
        <div className="mb-6 text-center">
          <h1 className="heading-serif text-2xl text-[var(--accent)] md:text-3xl">
            Get Your Bathroom Quote
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Written scope before work begins. No obligation.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-medium text-[var(--muted)]">
            <span>Licensed · PA HIC #PA185945</span>
            <span>·</span>
            <span>Insured</span>
            <span>·</span>
            <span>Warranty&#8209;backed</span>
          </div>
        </div>

        {/* Form */}
        <QuoteForm defaultService="Bathroom Remodeling" />

        {/* Testimonial below form */}
        <div className="mt-8 rounded-2xl bg-[var(--surface-soft)] p-5 text-center">
          <div className="flex items-center justify-center gap-0.5 text-[var(--brand)]">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="mt-3 text-sm italic leading-relaxed text-[var(--accent)]">
            &ldquo;Their work is impeccable and communication was consistent.&rdquo;
          </blockquote>
          <p className="mt-2 text-xs font-semibold text-[var(--accent)]">Richard K.</p>
          <p className="text-xs text-[var(--muted)]">Bathroom remodel · Angi Review</p>
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

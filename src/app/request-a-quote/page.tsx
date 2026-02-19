import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import QuoteForm from "@/components/forms/QuoteForm";

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
            Share your project scope and location. We will follow up with the next steps and scheduling details.
          </p>
        <div className="surface mt-6 rounded-2xl p-6">
          <h2 className="text-xl font-semibold">What to include</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
              <li>Project type and priority</li>
              <li>Property ZIP code and service area</li>
            <li>Any urgent restoration concerns</li>
          </ul>
        </div>
        <div className="surface mt-6 rounded-2xl p-6">
          <h2 className="text-xl font-semibold">What happens next</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--muted)]">
            <li>We review your details and confirm scope fit.</li>
            <li>Our team contacts you for call-based discovery.</li>
            <li>You get a clear next-step path for estimate and scheduling.</li>
          </ol>
        </div>
      </div>
        <QuoteForm />
      </Container>
    </section>
  );
}

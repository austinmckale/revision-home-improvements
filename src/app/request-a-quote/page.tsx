import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import QuoteForm from "@/components/forms/QuoteForm";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/content/site";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: { absolute: "Request a Quote | RHI Pros | Lehigh Valley & Berks County" },
  description:
    "Request a kitchen, bathroom, basement, or restoration quote in Allentown, Bethlehem, or the Lehigh Valley. Fast response and clear scope.",
  alternates: { canonical: "/request-a-quote" },
};

export default function RequestQuotePage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Request a Quote", href: "/request-a-quote" }])} />
      <section className="bg-[var(--background)] py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-6 lg:gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Headline + intro first */}
            <div className="order-1 lg:order-none">
              <p className="eyebrow">A good place to start</p>
              <h1 className="heading-serif mt-4 text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl lg:text-6xl">Tell us what you have in mind.</h1>
              <p className="mt-4 max-w-2xl leading-relaxed text-[var(--muted)] sm:text-lg">
                You do not need a full plan to start. Tell us about the project and we will
                help you figure out scope, timeline, and next steps.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button href={siteConfig.phoneHref} variant="secondary">
                  Call {siteConfig.phoneDisplay}
                </Button>
                <Link href="/services" className="text-sm font-semibold text-[var(--brand)] hover:underline lg:hidden">Browse Services</Link>
                <span className="hidden lg:inline-flex"><Button href="/services" variant="secondary">Browse Services</Button></span>
              </div>
            </div>

            {/* Form: after intro on mobile, sticky sidebar on desktop */}
            <div className="order-2 lg:row-span-3 lg:order-none">
              <div className="lg:sticky lg:top-6">
                <QuoteForm />
              </div>
            </div>

            {/* Reassurance: after form on mobile, below headline on desktop */}
            <div className="order-3 space-y-4 lg:space-y-6 lg:order-none">
              <div className="border-l-2 border-[var(--brand)] bg-[var(--surface-soft)] p-4 lg:p-5">
                <h2 className="heading-serif text-2xl text-[var(--accent)]">What happens after you submit</h2>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--muted)]">
                  <li>We review your details and confirm we can help with your scope and location.</li>
                  <li>We follow up by phone or email to discuss next steps.</li>
                  <li>If the project is a fit, we schedule a site visit to build your written scope and estimate.</li>
                </ol>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  No obligation, no pressure. If we are not the right fit, we will tell you.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-[var(--muted)]">
                <p className="surface rounded-lg px-3 py-2">PA HIC registered · PA185945</p>
                <p className="surface rounded-lg px-3 py-2">Insured and warranty-backed</p>
                <p className="surface rounded-lg px-3 py-2">Written scope before work begins</p>
                <p className="surface rounded-lg px-3 py-2">No obligation, honest assessment upfront</p>
              </div>

              <blockquote className="border-t border-[var(--border)] py-4 lg:py-5">
                <p className="text-sm text-[var(--muted)]">
                  &ldquo;This company has the experience and know-how to do almost any work you need.
                  Their work is impeccable and communication was consistent.&rdquo;
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--accent)]">Richard K.</p>
                <p className="text-xs text-[var(--muted)]">Bathroom remodel · Berks County</p>
              </blockquote>

              <p className="text-sm text-[var(--muted)]">
                Want to learn more first?{" "}
                <Link href="/our-process" className="font-semibold text-[var(--brand)]">Our process</Link>,{" "}
                <Link href="/projects" className="font-semibold text-[var(--brand)]">recent work</Link>, or{" "}
                <Link href="/licenses-and-insurance" className="font-semibold text-[var(--brand)]">licenses &amp; insurance</Link>.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

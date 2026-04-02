import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import QuoteForm from "@/components/forms/QuoteForm";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/content/site";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Request a Remodeling Quote | Reading PA & Lehigh Valley",
  description:
    "Request a kitchen, bathroom, basement, or restoration quote in Reading, Berks County, or the Lehigh Valley. Fast response and clear scope.",
  alternates: { canonical: "/request-a-quote" },
};

export default function RequestQuotePage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Request a Quote", href: "/request-a-quote" }])} />
      <section className="py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Headline + intro first */}
            <div className="order-1 lg:order-none">
              <h1 className="text-4xl font-extrabold text-[var(--accent)]">Request a Quote</h1>
              <p className="mt-3 text-[var(--muted)]">
                You do not need a full plan to start. Tell us about the project and we will
                help you figure out scope, timeline, and next steps.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href={siteConfig.phoneHref} variant="secondary">
                  Call {siteConfig.phoneDisplay}
                </Button>
                <Button href="/services" variant="secondary">Browse Services</Button>
              </div>
            </div>

            {/* Form: after intro on mobile, sticky sidebar on desktop */}
            <div className="order-2 lg:row-span-3 lg:order-none">
              <div className="lg:sticky lg:top-6">
                <QuoteForm />
              </div>
            </div>

            {/* Reassurance: after form on mobile, below headline on desktop */}
            <div className="order-3 space-y-6 lg:order-none">
              <div className="surface rounded-xl p-5">
                <h2 className="text-lg font-semibold text-[var(--accent)]">What Happens After You Submit</h2>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--muted)]">
                  <li>We review your details and confirm we can help with your scope and location.</li>
                  <li>We follow up by phone or email to discuss next steps.</li>
                  <li>If the project is a fit, we schedule a site visit to build your written scope and estimate.</li>
                </ol>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  No obligation, no pressure. If we are not the right fit, we will tell you.
                </p>
              </div>

              <div className="grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
                <p className="surface rounded-lg px-3 py-2">PA licensed · HIC #PA185945</p>
                <p className="surface rounded-lg px-3 py-2">Insured and warranty-backed</p>
                <p className="surface rounded-lg px-3 py-2">Written scope before work begins</p>
                <p className="surface rounded-lg px-3 py-2">No obligation, honest assessment upfront</p>
              </div>

              <blockquote className="surface rounded-xl p-5">
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

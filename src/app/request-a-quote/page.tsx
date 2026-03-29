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
            <div>
              <h1 className="text-4xl font-extrabold text-[var(--accent)]">Request a Quote</h1>
              <p className="mt-3 text-[var(--muted)]">
                You do not need a full plan to reach out. Tell us what you are thinking and we will
                help you figure out scope, timeline, and budget from there.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href={siteConfig.phoneHref} variant="secondary">
                  Call {siteConfig.phoneDisplay}
                </Button>
                <Button href="/services" variant="secondary">Browse Services</Button>
              </div>

              <div className="mt-8 surface rounded-xl p-5">
                <h2 className="text-lg font-semibold text-[var(--accent)]">What Happens After You Submit</h2>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--muted)]">
                  <li>We review your project details and confirm we can help with your scope and location.</li>
                  <li>We reach out by phone or email to ask any follow-up questions and discuss next steps.</li>
                  <li>If the project is a fit, we schedule a site visit or call to build your written scope and estimate.</li>
                </ol>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  No obligation, no pressure. If we are not the right fit, we will tell you.
                </p>
              </div>

              <div className="mt-6 grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
                <p className="surface rounded-lg px-3 py-2">PA licensed · HIC #PA185945</p>
                <p className="surface rounded-lg px-3 py-2">Insured and warranty-backed</p>
                <p className="surface rounded-lg px-3 py-2">Written scope before work begins</p>
                <p className="surface rounded-lg px-3 py-2">
                  Serving {siteConfig.serviceAreas}
                </p>
              </div>

              <blockquote className="mt-6 surface rounded-xl p-5">
                <p className="text-sm text-[var(--muted)]">
                  &ldquo;This company has the experience and know-how to do almost any work you need.
                  Their work is impeccable and communication was consistent.&rdquo;
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--accent)]">Richard K.</p>
                <p className="text-xs text-[var(--muted)]">Bathroom remodel · Berks County</p>
              </blockquote>

              <p className="mt-6 text-sm text-[var(--muted)]">
                Want to learn more before reaching out?{" "}
                <Link href="/our-process" className="font-semibold text-[var(--brand)]">See how we run projects</Link>,{" "}
                <Link href="/projects" className="font-semibold text-[var(--brand)]">view recent work</Link>, or{" "}
                <Link href="/licenses-and-insurance" className="font-semibold text-[var(--brand)]">check our licenses</Link>.
              </p>
            </div>
            <QuoteForm />
          </div>
        </Container>
      </section>
    </>
  );
}

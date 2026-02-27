import type { Metadata } from "next";
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
                Tell us about your project. We provide a written scope, realistic timeline, and clear next steps.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href={siteConfig.phoneHref} variant="secondary">
                  Call {siteConfig.phoneDisplay}
                </Button>
                <Button href="/services">Browse Services</Button>
              </div>
            </div>
            <QuoteForm />
          </div>
        </Container>
      </section>
    </>
  );
}

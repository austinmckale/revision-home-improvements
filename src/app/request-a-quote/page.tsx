import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import QuoteForm from "@/components/forms/QuoteForm";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/content/site";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  title: { absolute: "Request a Quote | RHI Pros | Lehigh Valley & Berks County" },
  description:
    "Request a kitchen, bathroom, basement or damage-repair quote in the Lehigh Valley, Reading or Berks County. Tell us about the project and get clear next steps.",
  path: "/request-a-quote",
});

export default function RequestQuotePage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Request a Quote", href: "/request-a-quote" },
        ])}
      />
      <section className="bg-[var(--background)] py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-6 lg:gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Headline + intro first */}
            <div className="order-1 lg:order-none">
              <h1>
                <span className="eyebrow">Request a quote</span>{" "}
                <span className="heading-serif mt-4 block text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl lg:text-6xl">
                  Tell us what you have in mind.
                </span>
              </h1>
              <p className="mt-4 max-w-2xl leading-relaxed text-[var(--muted)] sm:text-lg">
                You do not need a full plan to start. Tell us about the project and we will help you work out the details,
                a realistic timeline and the next steps.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button href={siteConfig.phoneHref} variant="secondary">
                  Call {siteConfig.phoneDisplay}
                </Button>
                <Link
                  href="/services"
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--brand)] hover:underline lg:rounded-md lg:border lg:border-[var(--border)] lg:px-5 lg:py-3"
                >
                  Browse services
                </Link>
                <Link
                  href="/#scope-builder"
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:text-[var(--brand)] hover:underline"
                >
                  Not sure yet? Try the project planner →
                </Link>
              </div>
            </div>

            {/* Form: after intro on mobile, sticky sidebar on desktop */}
            <div className="order-2 lg:row-span-3 lg:order-none">
              <div className="lg:sticky lg:top-24">
                <QuoteForm />
              </div>
            </div>

            {/* Reassurance: after form on mobile, below headline on desktop */}
            <div className="order-3 space-y-4 lg:space-y-6 lg:order-none">
              <div className="border-l-2 border-[var(--brand)] bg-[var(--surface-soft)] p-4 lg:p-5">
                <h2 className="heading-serif text-2xl text-[var(--accent)]">What happens after you submit</h2>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--muted)]">
                  <li>We review your request and confirm we can help in your area.</li>
                  <li>We follow up by phone or email to talk it through.</li>
                  <li>If it is a good fit, we visit the space and prepare a written proposal.</li>
                </ol>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  No obligation, no pressure. If we are not the right fit, we will tell you.
                </p>
              </div>

              <div className="border-t border-[var(--border)] py-4 lg:py-5">
                <p className="text-sm text-[var(--muted)]">Read what clients say about us.</p>
                <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
                  <a
                    href={siteConfig.googleBusinessProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-[var(--brand)] underline-offset-4 hover:underline"
                  >
                    Google reviews ↗
                  </a>
                  <a
                    href={siteConfig.angiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-[var(--brand)] underline-offset-4 hover:underline"
                  >
                    Angi reviews ↗
                  </a>
                </p>
                <p className="annotation mt-3 text-[0.62rem] text-[var(--muted)]">{siteConfig.hicLabel}</p>
              </div>

              <p className="text-sm text-[var(--muted)]">
                Want to learn more first?{" "}
                <Link href="/our-process" className="font-semibold text-[var(--brand)]">
                  Our process
                </Link>
                ,{" "}
                <Link href="/projects" className="font-semibold text-[var(--brand)]">
                  recent work
                </Link>
                , or{" "}
                <Link href="/licenses-and-insurance" className="font-semibold text-[var(--brand)]">
                  registration &amp; insurance
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

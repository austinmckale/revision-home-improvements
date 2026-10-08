import PageIntro from "@/components/sections/PageIntro";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { company } from "@/content/company";
import { siteConfig } from "@/content/site";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  title: "PA HIC Registration & Insurance Details",
  description:
    "RHI Pros is registered as a Pennsylvania home improvement contractor (PA185945). See how to verify registration and request a certificate of insurance.",
  path: "/licenses-and-insurance",
});

export default function LicensesAndInsurancePage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Registration & Insurance", href: "/licenses-and-insurance" },
        ])}
      />
      <PageIntro eyebrow="Registration & insurance" title="Credentials you can check.">
        <p>
          RHI Pros is a registered Pennsylvania home improvement contractor. A current certificate of insurance is
          available on request when you review your estimate.
        </p>
      </PageIntro>
      <section className="py-14 sm:py-20">
        <Container className="max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            <article className="border-t border-[var(--accent)] pt-6">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">Pennsylvania registration</h2>
              <p className="annotation mt-5 text-[0.65rem] text-[var(--brand)]">Home Improvement Contractor</p>
              <p className="heading-serif mt-1 text-4xl text-[var(--accent)]">{siteConfig.hicNumber}</p>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">
                Registered to {company.legalName}. You can confirm current status through the{" "}
                <a
                  href="https://www.attorneygeneral.gov/businesses-and-organizations/home-improvement-contractor-registration/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--brand)] underline underline-offset-4"
                >
                  Pennsylvania Attorney General
                </a>
                .
              </p>
              <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">
                HIC registration is Pennsylvania&apos;s required registration for home improvement contractors. It is
                not a state license, certification or a guarantee of workmanship.
              </p>
            </article>
            <article className="border-t border-[var(--accent)] pt-6">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">Insurance</h2>
              <p className="mt-5 leading-relaxed text-[var(--muted)]">
                Ask for a current certificate of insurance when you review your estimate, and check:
              </p>
              <dl className="mt-4 border-t border-[var(--border)] text-sm">
                <div className="grid gap-1 border-b border-[var(--border)] py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <dt className="font-semibold text-[var(--accent)]">General liability</dt>
                  <dd className="text-[var(--muted)]">Policy dates, limits and the work covered</dd>
                </div>
                <div className="grid gap-1 border-b border-[var(--border)] py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <dt className="font-semibold text-[var(--accent)]">Workers&apos; compensation</dt>
                  <dd className="text-[var(--muted)]">Coverage for the people working in your home</dd>
                </div>
                <div className="grid gap-1 border-b border-[var(--border)] py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <dt className="font-semibold text-[var(--accent)]">Named insured</dt>
                  <dd className="text-[var(--muted)]">The company on the certificate and any subcontractor coverage</dd>
                </div>
              </dl>
            </article>
          </div>
          <p className="mt-12 text-sm text-[var(--muted)]">
            Questions about registration or insurance?{" "}
            <Link href="/request-a-quote" className="font-semibold text-[var(--brand)] underline-offset-4 hover:underline">
              Ask with your quote request
            </Link>{" "}
            or call{" "}
            <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)] underline-offset-4 hover:underline">
              {siteConfig.phoneDisplay}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}

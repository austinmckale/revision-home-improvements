import PageIntro from "@/components/sections/PageIntro";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { company } from "@/content/company";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "PA HIC Registration & Insurance Details",
  description:
    "Review RHI Pros' Pennsylvania HIC number PA185945 and the registration and insurance documents to check before your project starts.",
  alternates: { canonical: "/licenses-and-insurance" },
};

export default function LicensesAndInsurancePage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Registration & Insurance", href: "/licenses-and-insurance" },
        ])}
      />
      <PageIntro eyebrow="Confidence from the start" title="Registration & insurance.">
        <p>
          Review contractor registration and project-specific insurance documentation before signing. Use the
          registration number below when checking the official Pennsylvania record.
        </p>
      </PageIntro>
      <section className="support-content py-12 sm:py-20">
        <Container className="max-w-5xl">
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="surface rounded-sm p-6">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">PA HIC Registration</h2>
              <div className="mt-3 space-y-3 text-[var(--muted)]">
                <div className="rounded-lg border border-[var(--border)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
                    Pennsylvania Home Improvement Contractor
                  </p>
                  <p className="mt-1 text-lg font-bold text-[var(--accent)]">{siteConfig.hicNumber}</p>
                </div>
                <p className="text-sm">
                  Pennsylvania HIC number associated with {company.legalName}: {company.license.hic}.
                </p>
                <p className="text-sm">
                  HIC registration is not a state contractor license, certification, endorsement, or proof of
                  workmanship. Use the{" "}
                  <a
                    href="https://www.attorneygeneral.gov/businesses-and-organizations/home-improvement-contractor-registration/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--brand)] underline"
                  >
                    Pennsylvania Attorney General&apos;s registration information
                  </a>{" "}
                  to find the official verification options and confirm current status and expiration.
                </p>
              </div>
            </article>
            <article className="surface rounded-sm p-6">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">Insurance</h2>
              <div className="mt-3 space-y-3 text-[var(--muted)]">
                <div className="rounded-lg border border-[var(--border)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">General Liability</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--accent)]">
                    Review current policy dates, limits and the work covered
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
                    Workers Compensation
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--accent)]">
                    Confirm applicable coverage and who will be working on site
                  </p>
                </div>
                <p className="text-sm">
                  Ask for a current certificate of insurance and confirm the named insured, policy period, limits,
                  exclusions and any subcontractor coverage relevant to your scope. A marketing label does not replace
                  the policy documents.
                </p>
              </div>
            </article>
          </div>

          <div className="surface mt-6 rounded-sm p-6">
            <h2 className="heading-serif text-3xl text-[var(--accent)]">Why This Matters</h2>
            <p className="mt-2 text-[var(--muted)]">
              Registration and insurance are different checks. Verify the current registration record and review the
              insurance documents for your project. Coverage depends on the policy terms and the circumstances of a
              claim.
            </p>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Confirm the credentials, coverage and responsibilities alongside the written scope before work begins.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--border)] pt-6 text-sm">
            <Link href="/warranty" className="font-semibold text-[var(--brand)]">
              Workmanship Warranty
            </Link>
            <Link href="/our-process" className="font-semibold text-[var(--brand)]">
              Our Process
            </Link>
            <Link href="/about" className="font-semibold text-[var(--brand)]">
              About Us
            </Link>
          </div>
        </Container>
      </section>

      <section className="pb-14">
        <Container className="max-w-4xl">
          <p className="text-sm text-[var(--muted)]">
            Ready to get started?{" "}
            <Link href="/request-a-quote" className="font-semibold text-[var(--brand)]">
              Request a quote
            </Link>{" "}
            and include any questions about registration and insurance with your project details.
          </p>
        </Container>
      </section>
    </>
  );
}

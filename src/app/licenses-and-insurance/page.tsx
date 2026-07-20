import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { company } from "@/content/company";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Licensed & Insured Contractor",
  description:
    "RHI Pros is a licensed and insured home improvement contractor in Pennsylvania. Verify our credentials before your project starts.",
  alternates: { canonical: "/licenses-and-insurance" },
};

export default function LicensesAndInsurancePage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Licenses & Insurance", href: "/licenses-and-insurance" }])} />
      <section className="py-14">
        <Container className="max-w-4xl">
          <h1 className="text-4xl font-extrabold text-[var(--accent)]">Registration and Insurance</h1>
          <p className="mt-4 text-[var(--muted)]">
            We believe you should be able to review contractor credentials before signing anything. Here is how we are registered and insured.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="surface rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-[var(--accent)]">PA HIC Registration</h2>
              <div className="mt-3 space-y-3 text-[var(--muted)]">
                <div className="rounded-lg border border-[var(--border)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
                    Pennsylvania Home Improvement Contractor
                  </p>
                  <p className="mt-1 text-lg font-bold text-[var(--accent)]">{siteConfig.hicNumber}</p>
                </div>
                <p className="text-sm">
                  {company.name} is registered as a Pennsylvania home improvement contractor under {company.license.hic}.
                </p>
                <p className="text-sm">
                  PA185945 is a Pennsylvania Home Improvement Contractor registration number. Registration confirms that{" "}
                  {company.legalName} is registered as required by state law. It is not a state license, certification,
                  endorsement, or proof of workmanship or competency.
                </p>
              </div>
            </article>
            <article className="surface rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-[var(--accent)]">Insurance</h2>
              <div className="mt-3 space-y-3 text-[var(--muted)]">
                <div className="rounded-lg border border-[var(--border)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">General Liability</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--accent)]">Active coverage for all project operations</p>
                </div>
                <div className="rounded-lg border border-[var(--border)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">Workers Compensation</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--accent)]">Coverage for all crew members on site</p>
                </div>
                <p className="text-sm">
                  Certificate of insurance is available upon request during your estimate review. We carry coverage that meets or exceeds standard requirements for residential remodeling and restoration work.
                </p>
              </div>
            </article>
          </div>

          <div className="surface mt-6 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-[var(--accent)]">Why This Matters</h2>
            <p className="mt-2 text-[var(--muted)]">
              Hiring an unregistered or uninsured contractor puts your home and your wallet at risk. A valid PA HIC
              registration means the contractor meets Pennsylvania&apos;s registration requirements. Active insurance
              means you are protected if something goes wrong on the job.
            </p>
            <p className="mt-3 text-sm text-[var(--muted)]">
              We provide credential documentation as part of every estimate, before you sign anything.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/warranty" className="font-semibold text-[var(--brand)]">Workmanship Warranty</Link>
            <Link href="/our-process" className="font-semibold text-[var(--brand)]">Our Process</Link>
            <Link href="/about" className="font-semibold text-[var(--brand)]">About Us</Link>
          </div>
        </Container>
      </section>

      <section className="pb-14">
        <Container className="max-w-4xl">
          <p className="text-sm text-[var(--muted)]">
            Ready to get started?{" "}
            <Link href="/request-a-quote" className="font-semibold text-[var(--brand)]">Request a quote</Link> and we will provide credential documentation alongside your scope and estimate.
          </p>
        </Container>
      </section>
    </>
  );
}

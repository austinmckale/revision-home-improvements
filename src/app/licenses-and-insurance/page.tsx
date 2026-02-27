import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Licensed & Insured Contractor | Revision Home Improvements",
  description:
    "Revision Home Improvements is a licensed and insured home improvement contractor in Pennsylvania. Verify our credentials before your project starts.",
  alternates: { canonical: "/licenses-and-insurance" },
};

export default function LicensesAndInsurancePage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Licenses & Insurance", href: "/licenses-and-insurance" }])} />
      <section className="py-14">
        <Container className="max-w-4xl">
          <h1 className="text-4xl font-extrabold text-[var(--accent)]">Licensed and Insured in Pennsylvania</h1>
          <p className="mt-4 text-[var(--muted)]">
            We believe you should be able to verify your contractor before signing anything. Here are our credentials — available for review during your estimate appointment.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="surface rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-[var(--accent)]">Licensing</h2>
              <div className="mt-3 space-y-3 text-[var(--muted)]">
                <div className="rounded-lg border border-[var(--border)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">PA Home Improvement Contractor</p>
                  <p className="mt-1 text-lg font-bold text-[var(--accent)]">{siteConfig.hicNumber}</p>
                </div>
                <p className="text-sm">
                  Registered with the Pennsylvania Attorney General&apos;s Office as required for all home improvement contractors operating in the state.
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
              Hiring an unlicensed or uninsured contractor puts your home and your wallet at risk. A valid PA HIC registration means the contractor meets state requirements. Active insurance means you are protected if something goes wrong on the job.
            </p>
            <p className="mt-3 text-sm text-[var(--muted)]">
              We provide credential verification as part of every estimate — before you sign anything.
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
            Ready to verify and get started?{" "}
            <Link href="/request-a-quote" className="font-semibold text-[var(--brand)]">Request a quote</Link> and we will provide credential documentation alongside your scope and estimate.
          </p>
        </Container>
      </section>
    </>
  );
}

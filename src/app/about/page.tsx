import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Revision Home Improvements and our approach to remodeling and restoration projects in Reading and Lehigh Valley.",
};

export default function AboutPage() {
  return (
    <section className="py-14">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">About Revision Home Improvements</h1>
        <p className="mt-4 text-[var(--muted)]">
          We are a local remodeling and restoration contractor focused on clear communication, durable workmanship, and
          projects that align with homeowner priorities and budgets.
        </p>
        <div className="surface mt-6 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">What Clients Value</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
            <li>Straightforward project planning and scope review</li>
            <li>Reliable scheduling and progress updates</li>
            <li>One team for remodeling and restoration work</li>
          </ul>
        </div>
        <div className="surface mt-6 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">How We Run Projects</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--muted)]">
            <li>Define scope and priorities during discovery</li>
            <li>Set schedule expectations and material path</li>
            <li>Execute with milestone communication</li>
            <li>Complete with final walkthrough and punch-list review</li>
          </ol>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href="/request-a-quote">Request a Quote</Button>
            <Button href={siteConfig.phoneHref} variant="secondary">
              Call {siteConfig.phoneDisplay}
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href="/our-process" className="font-semibold text-[var(--brand)]">
              Our Process
            </Link>
            <Link href="/warranty" className="font-semibold text-[var(--brand)]">
              Workmanship Warranty
            </Link>
            <Link href="/licenses-and-insurance" className="font-semibold text-[var(--brand)]">
              Licenses and Insurance
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

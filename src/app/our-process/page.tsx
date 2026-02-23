import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "See how Revision Home Improvements runs remodeling and restoration projects from discovery through final walkthrough.",
  alternates: { canonical: "/our-process" },
};

const processSteps = [
  "Discovery call and high-level scope review",
  "In-home assessment with priority and budget alignment",
  "Written proposal with project phases and milestone timeline",
  "Material and schedule confirmation before start",
  "Build execution with progress communication",
  "Final walkthrough and closeout punch-list completion",
];

export default function OurProcessPage() {
  return (
    <section className="py-14">
      <Container className="max-w-5xl">
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">Our Process</h1>
        <p className="mt-4 text-[var(--muted)]">
          We use a structured delivery model so your project stays predictable from estimate to closeout.
        </p>

        <ProcessTimeline title="Project Delivery Workflow" steps={processSteps} />

        <div className="surface mt-8 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">What You Can Expect</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
            <li>Clear scope and options before construction starts.</li>
            <li>Defined communication cadence and milestone check-ins.</li>
            <li>Quality-control review before final handoff.</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/request-a-quote">Start With a Quote</Button>
          <Button href={siteConfig.phoneHref} variant="secondary">
            Call {siteConfig.phoneDisplay}
          </Button>
        </div>
      </Container>
    </section>
  );
}

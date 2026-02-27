import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import JsonLd from "@/components/JsonLd";

import { getBreadcrumbJsonLd, getHowToJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Our Project Process — From Discovery to Final Walkthrough",
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
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Our Process", href: "/our-process" }])} />
      <JsonLd data={getHowToJsonLd("Home Improvement Project Process", processSteps)} />
    <section className="py-14">
      <Container className="max-w-5xl">
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">Our Process</h1>
        <p className="mt-4 text-[var(--muted)]">
          The goal is not just quality work. The goal is a project you can follow without guessing what comes next.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="surface rounded-xl p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Before Build</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Scope clarity, budget alignment, and schedule mapping happen before work starts.</p>
          </article>
          <article className="surface rounded-xl p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">During Build</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Milestones, sequencing, and communication stay structured as work progresses.</p>
          </article>
          <article className="surface rounded-xl p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Closeout</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">We finish with walkthrough standards, punch-list completion, and documented handoff.</p>
          </article>
        </div>

        <ProcessTimeline title="Project Delivery Workflow" steps={processSteps} />

        <div className="surface mt-8 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">What Homeowners Notice Most</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
            <li>Clear decisions upfront so changes are minimized later.</li>
            <li>Predictable checkpoints instead of reactive updates.</li>
            <li>Accountable finish standards at final handoff.</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link href="/warranty" className="font-semibold text-[var(--brand)]">Workmanship Warranty</Link>
          <Link href="/licenses-and-insurance" className="font-semibold text-[var(--brand)]">Licenses &amp; Insurance</Link>
          <Link href="/projects" className="font-semibold text-[var(--brand)]">See Our Work</Link>
        </div>
      </Container>
    </section>

      <section className="pb-14">
        <Container className="max-w-4xl">
          <p className="text-sm text-[var(--muted)]">
            Ready to start?{" "}
            <Link href="/request-a-quote" className="font-semibold text-[var(--brand)]">Tell us about your project</Link> and we will walk you through each step.
          </p>
        </Container>
      </section>
    </>
  );
}

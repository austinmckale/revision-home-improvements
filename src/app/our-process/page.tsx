import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import JsonLd from "@/components/JsonLd";
import BottomCTA from "@/components/sections/BottomCTA";

import { getBreadcrumbJsonLd, getHowToJsonLd } from "@/lib/structuredData";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  title: "Our Remodeling Process",
  description:
    "Explore remodeling and restoration planning from first conversation to final walkthrough, including written scope, scheduling and approval of changes.",
  path: "/our-process",
});

const processSteps = [
  "Discovery call and high-level scope review",
  "In-home assessment with priority and budget alignment",
  "Written proposal with project phases and milestone timeline",
  "Material and schedule confirmation before start",
  "Build execution with progress communication and approval of scope changes before additional work",
  "Final walkthrough and closeout punch-list completion",
];

const processTitles = [
  "Start the conversation",
  "Assess the space",
  "Review the proposal",
  "Confirm the details",
  "Follow the work",
  "Walk through together",
];
const processDecisions = [
  "Share your goals, location and priorities.",
  "Discuss what matters most and your budget range.",
  "Review included work, exclusions, allowances and timing.",
  "Confirm selections and any material or access dependencies.",
  "Review the cost and schedule impact before approving a change.",
  "Agree on any remaining items and review the handoff details.",
];

export default function OurProcessPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Our Process", href: "/our-process" },
        ])}
      />
      <JsonLd data={getHowToJsonLd("Home Improvement Project Process", processSteps)} />
      <section className="bg-[var(--background)] py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="max-w-4xl">
            <p className="eyebrow">How we work</p>
            <h1 className="heading-serif mt-4 text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl lg:text-7xl">
              A clear path from first conversation to final walkthrough.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Know what happens next, which decisions need your input, and how changes to scope are handled.
            </p>
          </div>

          <div className="mt-10 grid gap-px bg-[var(--border)] md:mt-14 md:grid-cols-3">
            <article className="bg-[var(--surface)] p-6 sm:p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[.16em] text-[var(--brand)]">Before build</h2>
              <p className="heading-serif mt-3 text-2xl text-[var(--accent)]">Know the plan.</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Scope clarity, budget alignment, and schedule mapping happen before work starts.
              </p>
            </article>
            <article className="bg-[var(--surface)] p-6 sm:p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[.16em] text-[var(--brand)]">During build</h2>
              <p className="heading-serif mt-3 text-2xl text-[var(--accent)]">Stay in the loop.</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Milestones, sequencing, and communication stay structured as work progresses.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                If hidden conditions change the scope, we document what was found, explain the options and any price or
                timeline impact, and get approval before additional work proceeds.
              </p>
            </article>
            <article className="bg-[var(--surface)] p-6 sm:p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[.16em] text-[var(--brand)]">Closeout</h2>
              <p className="heading-serif mt-3 text-2xl text-[var(--accent)]">Finish with care.</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                We finish with walkthrough standards, punch-list completion, and documented handoff.
              </p>
            </article>
          </div>

          <ProcessTimeline
            title="Six steps, with clear decisions along the way"
            steps={processSteps}
            stepTitles={processTitles}
            decisions={processDecisions}
            headingLevel="h2"
          />

          <div className="mt-12 grid gap-8 border-t border-[var(--border)] pt-8 md:grid-cols-[.7fr_1.3fr] md:pt-10">
            <h2 className="heading-serif text-3xl text-[var(--accent)]">What to confirm along the way</h2>
            <ul className="grid gap-3 text-[var(--muted)] sm:grid-cols-3">
              <li>The agreed scope, selections and exclusions before work begins.</li>
              <li>Who to contact and when to expect progress updates.</li>
              <li>Any remaining items and the applicable warranty terms at handoff.</li>
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/warranty" className="font-semibold text-[var(--brand)]">
              Workmanship Warranty
            </Link>
            <Link href="/licenses-and-insurance" className="font-semibold text-[var(--brand)]">
              Registration &amp; Insurance
            </Link>
            <Link href="/projects" className="font-semibold text-[var(--brand)]">
              See Our Work
            </Link>
          </div>
        </Container>
      </section>

      <BottomCTA
        title="Ready to take the first step?"
        description="Tell us what you are thinking. We will walk you through scope, timing, and what happens next."
        showFinancing={false}
      />
    </>
  );
}

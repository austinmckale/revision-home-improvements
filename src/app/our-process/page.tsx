import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/JsonLd";
import BottomCTA from "@/components/sections/BottomCTA";

import { getBreadcrumbJsonLd, getHowToJsonLd } from "@/lib/structuredData";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  title: "Our Remodeling Process",
  description:
    "How a remodeling or restoration project works with RHI Pros, from the first conversation and written proposal to the final walkthrough.",
  path: "/our-process",
});

const steps = [
  {
    title: "Start the conversation",
    detail: "Call or send a request. Tell us about the space, what you want to change and your timing.",
    yours: "Share photos, your address and what matters most.",
  },
  {
    title: "See the space",
    detail: "We visit, measure and talk through the options and your budget range.",
    yours: "Tell us your priorities and the range you are comfortable with.",
  },
  {
    title: "Review the proposal",
    detail: "You receive a written proposal covering the work, materials, price, allowances and timing.",
    yours: "Check what is included and excluded, and ask anything.",
  },
  {
    title: "Confirm the details",
    detail: "Selections are finalized, materials are ordered and the schedule is set.",
    yours: "Confirm your selections and access to the home.",
  },
  {
    title: "Build",
    detail: "We keep you updated as the work moves along and keep the work area organized every day.",
    yours: "Approve any change before it happens.",
  },
  {
    title: "Walk through together",
    detail: "We review the finished work with you and close out any final details.",
    yours: "Sign off on the work and keep your warranty terms.",
  },
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
      <JsonLd
        data={getHowToJsonLd(
          "Home Improvement Project Process",
          steps.map((step) => `${step.title}: ${step.detail}`),
        )}
      />
      <section className="bg-[var(--background)] py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="max-w-4xl">
            <p className="eyebrow">How we work</p>
            <h1 className="heading-serif mt-4 text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl lg:text-7xl">
              From first conversation to final walkthrough.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Six steps, each with a clear next move, so you always know what is happening and what we need from you.
            </p>
          </div>

          <ol className="mt-12 border-t border-[var(--accent)] md:mt-16">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-3 border-b border-[var(--border)] py-7 md:grid-cols-[4rem_minmax(0,16rem)_1fr_minmax(0,16rem)] md:gap-8"
              >
                <span className="font-mono text-xs tracking-[.15em] text-[var(--brand)] md:pt-2">
                  {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                </span>
                <h2 className="heading-serif text-2xl leading-snug text-[var(--accent)] sm:text-3xl">{step.title}</h2>
                <p className="text-base leading-relaxed text-[var(--muted)] md:pt-1">{step.detail}</p>
                <p className="border-l-2 border-[var(--brand)]/40 pl-3 text-sm leading-relaxed text-[var(--muted)] md:pt-1">
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-[.12em] text-[var(--brand)]">
                    Your part
                  </span>
                  {step.yours}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-6 bg-[var(--surface-soft)] p-6 sm:p-8 md:grid-cols-[.8fr_1.2fr] md:items-center md:gap-12">
            <h2 className="heading-serif text-3xl text-[var(--accent)]">If something unexpected turns up.</h2>
            <p className="text-base leading-relaxed text-[var(--muted)]">
              Opening walls and floors can reveal conditions no one could see. When that happens, we show you what we
              found, explain the options and any change in price or timing, and wait for your approval before any extra
              work begins.
            </p>
          </div>
        </Container>
      </section>

      <BottomCTA title="Ready to take the first step?" showFinancing={false} />
    </>
  );
}

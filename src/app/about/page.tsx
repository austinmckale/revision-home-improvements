import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/JsonLd";
import BottomCTA from "@/components/sections/BottomCTA";
import TestimonialStrip from "@/components/sections/TestimonialStrip";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { siteConfig } from "@/content/site";
import { testimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "About Us — Local Remodeling Contractor in Reading & Lehigh Valley",
  description:
    "Meet the team behind Revision Home Improvements. Licensed PA contractor serving Reading, Berks County, and Lehigh Valley with clear communication and quality execution.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "About", href: "/about" }])} />
      <section className="hero-band py-14">
        <Container className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">About Us</p>
            <h1 className="mt-2 text-4xl font-extrabold text-[var(--accent)]">Built on Clarity, Delivered with Care</h1>
            <p className="mt-4 text-[var(--muted)]">
              We started Revision Home Improvements because too many homeowners were getting vague estimates, missed timelines, and surprise costs. We decided to do it differently — written scopes, predictable schedules, and honest communication from day one.
            </p>
            <p className="mt-3 text-[var(--muted)]">
              Today we serve homeowners across {siteConfig.serviceAreas} with kitchen, bathroom, basement, flooring, outdoor, and restoration projects.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/request-a-quote">Request a Quote</Button>
              <Button href={siteConfig.phoneHref} variant="secondary">
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
          </div>
          <div className="surface overflow-hidden rounded-2xl">
            <Image
              src="/images/projects/Frontier-1.jpg"
              alt="Outdoor project site by Revision Home Improvements in Reading, PA."
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="max-w-5xl">
          <h2 className="text-2xl font-bold text-[var(--accent)]">Who We Work Best With</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <article className="surface rounded-xl p-5">
              <h3 className="font-semibold text-[var(--accent)]">Homeowners Who Value Transparency</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">You want a written scope and clear options before any work begins — not surprises halfway through.</p>
            </article>
            <article className="surface rounded-xl p-5">
              <h3 className="font-semibold text-[var(--accent)]">Families Balancing Budget and Quality</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">We present tiered options so you can prioritize what matters most without overbuilding your budget.</p>
            </article>
            <article className="surface rounded-xl p-5">
              <h3 className="font-semibold text-[var(--accent)]">Property Owners Facing Damage</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">Fire or water damage requires fast response and clear planning. We handle restoration and remodeling under one team.</p>
            </article>
          </div>

          <h2 className="mt-10 text-2xl font-bold text-[var(--accent)]">How We Run Every Project</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <article className="surface rounded-lg p-5">
              <h3 className="font-semibold text-[var(--accent)]">Scope Before Demo</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">We confirm priorities, budget range, and constraints before construction starts. No work begins until you approve the plan.</p>
            </article>
            <article className="surface rounded-lg p-5">
              <h3 className="font-semibold text-[var(--accent)]">Milestone Communication</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">You know what is happening, what is next, and what decisions are coming. No guessing, no chasing updates.</p>
            </article>
            <article className="surface rounded-lg p-5">
              <h3 className="font-semibold text-[var(--accent)]">Value Per Dollar</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">We present options that maximize your outcome without padding the scope. Every dollar goes toward results you can see.</p>
            </article>
            <article className="surface rounded-lg p-5">
              <h3 className="font-semibold text-[var(--accent)]">Clean Closeout</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">Final walkthrough, punch-list completion, and warranty documentation are built into delivery — not an afterthought.</p>
            </article>
          </div>

          <div className="surface mt-8 rounded-xl p-5 text-center">
            <p className="text-sm text-[var(--muted)]">
              <span className="font-semibold text-[var(--accent)]">{siteConfig.hicNumber}</span> · Licensed and insured in Pennsylvania · {siteConfig.warrantyYears}-year workmanship warranty
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/our-process" className="font-semibold text-[var(--brand)]">Our Process</Link>
            <Link href="/warranty" className="font-semibold text-[var(--brand)]">Workmanship Warranty</Link>
            <Link href="/licenses-and-insurance" className="font-semibold text-[var(--brand)]">Licenses &amp; Insurance</Link>
            <Link href="/projects" className="font-semibold text-[var(--brand)]">See Our Work</Link>
          </div>

          <TestimonialStrip items={testimonials.slice(0, 3)} title="What Homeowners Say About Working With Us" />
        </Container>
      </section>

      <BottomCTA
        title="Let's talk about your project"
        description="Whether it's a planned remodel or an urgent repair, we'll walk you through scope, timeline, and next steps."
        links={[{ href: "/services", label: "Browse Services" }, { href: "/service-areas", label: "Find Your Area" }]}
      />
    </>
  );
}

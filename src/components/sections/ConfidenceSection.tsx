import Link from "next/link";
import { siteConfig } from "@/content/site";

type ConfidenceSectionProps = {
  title?: string;
  intro?: string;
  className?: string;
};

const confidenceItems = [
  {
    title: "Written Scope and Milestones",
    detail: "Every project starts with a clear scope, timeline checkpoints, and approval path before build work starts.",
  },
  {
    title: "Workmanship Warranty Terms",
    detail: "Coverage details are documented in your proposal so expectations are clear before construction begins.",
  },
  {
    title: "Clean Jobsite Standards",
    detail: "Daily site care, organized sequencing, and final walkthrough punch-list completion are built into the process.",
  },
  {
    title: "Financing and Budget Options",
    detail: `${siteConfig.financing.teaser} ${siteConfig.financing.shortDisclosure}`,
  },
];

export default function ConfidenceSection({
  title = "Why Homeowners Feel Confident Hiring Us",
  intro = "We focus on predictable execution, transparent communication, and written project standards.",
  className = "",
}: ConfidenceSectionProps) {
  return (
    <section className={`surface rounded-2xl p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-[var(--accent)]">{title}</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">{intro}</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {confidenceItems.map((item) => (
          <article key={item.title} className="rounded-xl border border-[var(--border)] bg-white p-4">
            <h3 className="text-sm font-semibold text-[var(--accent)]">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{item.detail}</p>
          </article>
        ))}
      </div>
      <p className="mt-4 text-sm">
        <Link href="/request-a-quote" className="font-semibold text-[var(--brand)]">
          Request your written scope and quote
        </Link>
      </p>
      <div className="mt-2 flex flex-wrap gap-3 text-sm">
        <Link href="/our-process" className="font-semibold text-[var(--accent)]">
          Our Process
        </Link>
        <Link href="/warranty" className="font-semibold text-[var(--accent)]">
          Workmanship Warranty
        </Link>
        <Link href="/licenses-and-insurance" className="font-semibold text-[var(--accent)]">
          Licenses and Insurance
        </Link>
      </div>
    </section>
  );
}

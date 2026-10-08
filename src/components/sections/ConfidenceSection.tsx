import { siteConfig } from "@/content/site";

type ConfidenceSectionProps = {
  title?: string;
  intro?: string;
  className?: string;
};

const confidenceItems = [
  {
    title: "A detailed proposal",
    detail: "The work, materials, price and timing are in writing before anything starts.",
  },
  {
    title: "No surprise changes",
    detail: "If something unexpected turns up, you see the options and the cost before any extra work begins.",
  },
  {
    title: "A respectful jobsite",
    detail: "Work areas are kept organized every day, and we finish with a walkthrough together.",
  },
  {
    title: "Financing options",
    detail: `${siteConfig.financing.teaser} ${siteConfig.financing.shortDisclosure}`,
  },
];

export default function ConfidenceSection({
  title = "What you can count on.",
  intro,
  className = "",
}: ConfidenceSectionProps) {
  return (
    <section className={`border-y border-[var(--border)] py-8 sm:py-10 ${className}`}>
      <h2 className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">{title}</h2>
      {intro ? <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{intro}</p> : null}
      <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {confidenceItems.map((item) => (
          <article key={item.title} className="border-t border-[var(--accent)] pt-4">
            <h3 className="heading-serif text-xl text-[var(--accent)]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

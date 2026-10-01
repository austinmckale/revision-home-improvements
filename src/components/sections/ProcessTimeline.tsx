type ProcessTimelineProps = {
  title: string;
  steps: string[];
  stepTitles?: string[];
  decisions?: string[];
  headingLevel?: "h2" | "h3";
};

export default function ProcessTimeline({
  title,
  steps,
  stepTitles,
  decisions,
  headingLevel = "h3",
}: ProcessTimelineProps) {
  const Heading = headingLevel;
  return (
    <section className="mt-10">
      <Heading className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">{title}</Heading>
      <ol className="process-timeline mt-8 grid gap-7 md:grid-cols-3 md:gap-x-6 md:gap-y-10 xl:grid-cols-6 xl:gap-x-4">
        {steps.map((step, index) => (
          <li key={step} className="process-timeline-step">
            <p className="font-mono text-xs tracking-[.14em] text-[var(--brand)]">
              {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </p>
            <p className="heading-serif mt-3 text-xl leading-snug text-[var(--accent)]">
              {stepTitles?.[index] ?? step}
            </p>
            {stepTitles?.[index] ? <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{step}</p> : null}
            {decisions?.[index] ? (
              <div className="mt-4 border-l-2 border-[var(--brand)]/40 pl-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[.12em] text-[var(--brand)]">
                  Your decision
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{decisions[index]}</p>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

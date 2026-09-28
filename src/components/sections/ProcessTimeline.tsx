type ProcessTimelineProps = {
  title: string;
  steps: string[];
};

export default function ProcessTimeline({ title, steps }: ProcessTimelineProps) {
  return (
    <section className="mt-10">
      <h3 className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">{title}</h3>
      <ol className="process-timeline mt-8 grid gap-7 md:grid-cols-3 md:gap-x-6 md:gap-y-10 xl:grid-cols-6 xl:gap-x-4">
        {steps.map((step, index) => (
          <li key={step} className="process-timeline-step">
            <p className="font-mono text-xs tracking-[.14em] text-[var(--brand)]">{String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</p>
            <p className="heading-serif mt-3 text-xl leading-snug text-[var(--accent)]">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

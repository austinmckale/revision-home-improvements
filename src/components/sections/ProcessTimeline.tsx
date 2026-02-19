type ProcessTimelineProps = {
  title: string;
  steps: string[];
};

export default function ProcessTimeline({ title, steps }: ProcessTimelineProps) {
  return (
    <section className="mt-10">
      <h3 className="text-2xl font-bold text-[var(--accent)]">{title}</h3>
      <ol className="mt-4 grid gap-3 md:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step} className="surface rounded-lg p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">Step {index + 1}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

import { testimonials } from "@/content/testimonials";

export default function TestimonialStrip() {
  return (
    <section className="mt-10">
      <h3 className="text-2xl font-bold text-[var(--accent)]">Client Feedback</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.context} className="surface rounded-lg p-4">
            <p className="text-sm text-[var(--muted)]">&ldquo;{item.quote}&rdquo;</p>
            <p className="mt-3 text-sm font-semibold">{item.name}</p>
            <p className="text-xs text-[var(--muted)]">{item.context}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

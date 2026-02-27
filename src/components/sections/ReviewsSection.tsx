import { testimonials } from "@/content/testimonials";
import { siteConfig } from "@/content/site";

export default function ReviewsSection() {
  const items = testimonials.slice(0, 6);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-bold text-[var(--accent)]">Verified Reviews</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">
              5.0 rating on Angi (9 reviews). More feedback on Google.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <a
              href={siteConfig.googleBusinessProfileUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--brand)] px-3 py-1.5 font-semibold text-[var(--brand)]"
            >
              Google Reviews
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {items.map((item) => (
            <article key={`${item.name}-${item.context}`} className="surface rounded-lg p-4">
              <p className="text-sm text-[var(--muted)]">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-3 text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-[var(--muted)]">{item.context}</p>
              {item.source ? <p className="mt-1 text-[11px] text-[var(--muted)]">{item.source}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

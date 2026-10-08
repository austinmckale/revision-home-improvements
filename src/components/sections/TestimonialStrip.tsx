import { getFeaturedTestimonials, isSourceCheckedTestimonial, Testimonial } from "@/content/testimonials";
import { siteConfig } from "@/content/site";

type TestimonialStripProps = {
  items?: Testimonial[];
  title?: string;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-amber-600" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const profileLinks = [
  {
    href: siteConfig.googleBusinessProfileUrl,
    label: "Google Reviews",
    ariaLabel: "Read RHI Pros reviews on Google (opens in a new tab)",
  },
  {
    href: siteConfig.angiUrl,
    label: "Angi Reviews",
    ariaLabel: "Read RHI Pros reviews on Angi (opens in a new tab)",
  },
  {
    href: siteConfig.facebookPageUrl,
    label: "Facebook",
    ariaLabel: "Visit the RHI Pros Facebook page (opens in a new tab)",
  },
] as const;

export default function TestimonialStrip({ items, title = "What clients say" }: TestimonialStripProps) {
  const displayItems = (items ?? getFeaturedTestimonials()).filter(isSourceCheckedTestimonial);

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="heading-serif text-3xl text-[var(--accent)]">
          {displayItems.length ? title : "Read our reviews"}
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {profileLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className="inline-flex min-h-6 items-center border-b border-transparent text-xs font-semibold text-[var(--accent)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      {displayItems.length ? (
        <div className="mt-6 grid gap-px bg-[var(--border)] md:grid-cols-3">
          {displayItems.map((item) => (
            <article key={`${item.name}-${item.context}`} className="flex flex-col bg-[var(--surface)] p-5 sm:p-6">
              <StarRating rating={item.rating} />
              <p className="heading-serif mt-3 flex-1 text-xl leading-snug text-[var(--accent)]">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-5 border-t border-[var(--border)] pt-3 text-sm font-semibold">{item.name}</p>
              <a
                href={item.verification.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read ${item.name}'s full review on ${item.verification.platform} (opens in a new tab)`}
                className="mt-1 inline-flex min-h-6 items-center text-xs text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--brand)] hover:underline"
              >
                {item.source} ↗
              </a>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

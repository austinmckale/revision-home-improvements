import Link from "next/link";
import type { Location } from "@/content/locations";
import type { Service } from "@/content/services";

type LocalHighlightsSectionProps = {
  location: Location;
  serviceItems: Service[];
  className?: string;
  maxServices?: number;
  whyTitle?: string;
  servicesTitle?: string;
  priorityTitle?: string;
  showCityHubLink?: boolean;
};

export default function LocalHighlightsSection({
  location,
  serviceItems,
  className = "",
  maxServices = 8,
  whyTitle,
  servicesTitle,
  priorityTitle = "Areas We Serve",
  showCityHubLink = false,
}: LocalHighlightsSectionProps) {
  const visibleServices = serviceItems.slice(0, maxServices);

  return (
    <section className={className}>
      <article className="surface rounded-xl p-5">
        <h2 className="text-xl font-bold text-[var(--accent)]">{whyTitle || `Why ${location.short} homeowners choose us`}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
          {location.whyUs.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <h3 className="mt-8 text-xl font-bold text-[var(--accent)]">
        {servicesTitle || `Services in ${location.short}`}
      </h3>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {visibleServices.map((service) => (
          <Link
            key={service.slug}
            href={`/${location.slug}/${service.slug}`}
            className="surface rounded-lg p-3 text-sm font-semibold hover:border-[var(--brand)]"
          >
            {service.name}
          </Link>
        ))}
      </div>
      {showCityHubLink && (
        <p className="mt-3 text-sm">
          <Link href={`/${location.slug}`} className="font-semibold text-[var(--brand)]">
            View all services in {location.short}
          </Link>
        </p>
      )}

      <h3 className="mt-8 text-xl font-bold text-[var(--accent)]">{priorityTitle}</h3>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {location.priorityAreas.join(", ")}
      </p>
    </section>
  );
}

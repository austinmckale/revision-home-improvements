import Link from "next/link";
import Container from "@/components/ui/Container";
import { primaryServices } from "@/content/services";
import { locations } from "@/content/locations";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--surface-soft)] py-12">
      <Container className="grid gap-10 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold text-[var(--accent)]">Revision Home Improvements</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Remodeling and restoration contractor serving Reading, Berks County, and Lehigh Valley.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">Services</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {primaryServices.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="hover:text-[var(--brand)]">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">Service Areas</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {locations.map((location) => (
              <li key={location.slug}>
                <Link href={`/${location.slug}`} className="hover:text-[var(--brand)]">
                  {location.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/privacy" className="mt-4 inline-block text-sm font-semibold hover:text-[var(--brand)]">
            Privacy Policy
          </Link>
        </div>
      </Container>
    </footer>
  );
}

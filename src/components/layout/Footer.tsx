import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { primaryServices } from "@/content/services";
import { locations } from "@/content/locations";
import { siteConfig } from "@/content/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--surface-soft)]">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold text-[var(--accent)]">Revision Home Improvements</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Remodeling and restoration contractor serving Reading, Berks County, and Lehigh Valley.
            </p>
            <div className="mt-4 space-y-1 text-sm text-[var(--muted)]">
              <p>{siteConfig.address.street}</p>
              <p>
                <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)]">
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.primaryEmail}`} className="hover:text-[var(--brand)]">
                  {siteConfig.primaryEmail}
                </a>
              </p>
              <p>
                <a
                  href={siteConfig.googleBusinessProfileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--brand)]"
                >
                  Google Business Profile
                </a>
              </p>
            </div>
            <p className="mt-3 text-xs text-[var(--muted)]">{siteConfig.hicNumber}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button href="/request-a-quote" className="text-xs">Request a Quote</Button>
            </div>
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
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">Company</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-[var(--brand)]">About Us</Link>
              </li>
              <li>
                <Link href="/our-process" className="hover:text-[var(--brand)]">Our Process</Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-[var(--brand)]">Workmanship Warranty</Link>
              </li>
              <li>
                <Link href="/licenses-and-insurance" className="hover:text-[var(--brand)]">Licenses &amp; Insurance</Link>
              </li>
              <li>
                <Link href="/fire-water-damage-restoration" className="font-semibold text-[var(--brand)]">
                  Emergency Restoration
                </Link>
              </li>
              <li>
                <Link href="/insurance-claims" className="hover:text-[var(--brand)]">Insurance Claims</Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className="border-t border-[var(--border)]">
        <Container className="flex flex-wrap items-center justify-between gap-2 py-4 text-xs text-[var(--muted)]">
          <p>&copy; {new Date().getFullYear()} Revision Home Improvements. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[var(--brand)]">Privacy Policy</Link>
            <Link href="/financing-terms" className="hover:text-[var(--brand)]">Financing Terms</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { primaryServices } from "@/content/services";
import { locations } from "@/content/locations";
import { siteConfig } from "@/content/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[var(--accent)] text-white/80">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold text-white">{siteConfig.name}</h2>
            <p className="mt-2 text-sm text-white/70">
              Remodeling and restoration contractor serving Reading, Berks County, and Lehigh Valley.
            </p>
            <div className="mt-5 space-y-1.5 text-sm text-white/70">
              <p>{siteConfig.address.street}</p>
              <p>
                <a href={siteConfig.phoneHref} className="font-semibold text-white transition-colors hover:text-[var(--brand)]">
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.primaryEmail}`} className="transition-colors hover:text-white">
                  {siteConfig.primaryEmail}
                </a>
              </p>
              <p>
                <a
                  href={siteConfig.googleBusinessProfileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Google Business Profile
                </a>
              </p>
              <p>
                <a
                  href={siteConfig.facebookPageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Facebook Page
                </a>
              </p>
            </div>
            <p className="mt-4 text-xs text-white/40">{siteConfig.hicNumber}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button href="/request-a-quote" className="text-xs">Request a Quote</Button>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {primaryServices.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="transition-colors hover:text-white">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">Service Areas</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {locations.map((location) => (
                <li key={location.slug}>
                  <Link href={`/${location.slug}`} className="transition-colors hover:text-white">
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="transition-colors hover:text-white">About Us</Link>
              </li>
              <li>
                <Link href="/our-process" className="transition-colors hover:text-white">Our Process</Link>
              </li>
              <li>
                <Link href="/warranty" className="transition-colors hover:text-white">Workmanship Warranty</Link>
              </li>
              <li>
                <Link href="/licenses-and-insurance" className="transition-colors hover:text-white">Licenses &amp; Insurance</Link>
              </li>
              <li>
                <Link href="/fire-water-damage-restoration" className="font-semibold text-white transition-colors hover:text-[var(--brand)]">
                  Emergency Restoration
                </Link>
              </li>
              <li>
                <Link href="/insurance-claims" className="transition-colors hover:text-white">Insurance Claims</Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/financing-terms" className="transition-colors hover:text-white">Financing Terms</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

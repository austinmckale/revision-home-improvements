import Link from "next/link";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/content/site";

const externalProfileLinks = [
  {
    href: siteConfig.googleBusinessProfileUrl,
    label: "Google",
    ariaLabel: "RHI Pros on Google Business Profile (opens in a new tab)",
  },
  {
    href: siteConfig.facebookPageUrl,
    label: "Facebook",
    ariaLabel: "RHI Pros on Facebook (opens in a new tab)",
  },
  {
    href: siteConfig.angiUrl,
    label: "Angi",
    ariaLabel: "RHI Pros reviews on Angi (opens in a new tab)",
  },
  {
    href: siteConfig.yelpUrl,
    label: "Yelp",
    ariaLabel: "RHI Pros on Yelp (opens in a new tab)",
  },
] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#202823] text-white/70">
      <div className="h-1 w-full bg-[var(--brand)]" />
      <Container className="py-14 sm:py-18 lg:py-24">
        <div className="grid gap-12 border-b border-white/12 pb-12 md:grid-cols-2 lg:grid-cols-[1.25fr_.7fr_.7fr_1fr] lg:gap-10 lg:pb-16">
          <div className="max-w-sm">
            <Link href="/" className="group inline-block">
              <span className="heading-serif text-3xl tracking-wide text-white transition-colors group-hover:text-white/80">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[.15em] text-white/40">Reimagine · Build · Enjoy</p>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              Remodeling and restoration across the Lehigh Valley and Berks County, with clear scopes and steady communication from the first conversation to closeout.
            </p>
          </div>

          <div>
            <h3 className="text-[0.65rem] font-bold uppercase tracking-[.2em] text-white/40">Expertise</h3>
            <ul className="mt-5 space-y-3 text-sm font-medium">
              <li><Link href="/services" className="transition-colors hover:text-white">All services</Link></li>
              <li><Link href="/projects" className="transition-colors hover:text-white">Selected projects</Link></li>
              <li><Link href="/fire-water-damage-restoration" className="transition-colors hover:text-white">Emergency restoration</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.65rem] font-bold uppercase tracking-[.2em] text-white/40">Company</h3>
            <ul className="mt-5 space-y-3 text-sm font-medium">
              <li><Link href="/about" className="transition-colors hover:text-white">About RHI Pros</Link></li>
              <li><Link href="/our-process" className="transition-colors hover:text-white">Our process</Link></li>
              <li><Link href="/warranty" className="transition-colors hover:text-white">Workmanship warranty</Link></li>
              <li><Link href="/service-areas" className="transition-colors hover:text-white">Service areas</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[.2em] text-white/40">Talk with our team</p>
            <a href={siteConfig.phoneHref} className="heading-serif mt-4 block text-2xl text-white transition-colors hover:text-white/80">{siteConfig.phoneDisplay}</a>
            <a href={`mailto:${siteConfig.primaryEmail}`} className="mt-2 inline-block text-sm transition-colors hover:text-white">{siteConfig.primaryEmail}</a>
            <p className="mt-4 text-xs text-white/45">{siteConfig.address.street}</p>
            <Link href="/request-a-quote" className="mt-6 inline-flex min-h-11 items-center justify-center bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)]">Request a quote <span className="ml-3" aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col-reverse items-center justify-between gap-5 py-6 text-xs text-white/45 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}.{" "}
            <Link href="/licenses-and-insurance" className="hover:text-white transition-colors">
              {siteConfig.hicLabel}
            </Link>
            .
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-medium">
            {externalProfileLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

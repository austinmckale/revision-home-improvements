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

const serviceLinks = [
  { href: "/services/kitchen-remodeling", label: "Kitchen remodeling" },
  { href: "/services/bathroom-remodeling", label: "Bathroom remodeling" },
  { href: "/services/basement-finishing", label: "Basement finishing" },
  { href: "/services/paver-installation", label: "Patios & outdoor living" },
  { href: "/fire-water-damage-restoration", label: "Fire & water damage repair" },
  { href: "/services", label: "All services" },
];

const companyLinks = [
  { href: "/projects", label: "Project photos" },
  { href: "/about", label: "About RHI Pros" },
  { href: "/our-process", label: "Our process" },
  { href: "/warranty", label: "Workmanship warranty" },
  { href: "/licenses-and-insurance", label: "Registration & insurance" },
  { href: "/financing", label: "Financing" },
];

const localLinks = [
  { href: "/lehigh-valley-pa", label: "Lehigh Valley" },
  { href: "/allentown-pa", label: "Allentown" },
  { href: "/bethlehem-pa", label: "Bethlehem" },
  { href: "/reading-pa", label: "Reading" },
  { href: "/wyomissing-pa", label: "Wyomissing" },
  { href: "/berks-county-pa", label: "Berks County" },
];

const columnHeadingClass = "text-[0.65rem] font-bold uppercase tracking-[.2em] text-white/65";
const titleCellClass = "border-white/20 px-4 py-3.5";
const titleLabelClass = "annotation text-[0.58rem] text-white/50";
const columnLinkClass = "inline-flex min-h-10 items-center transition-colors hover:text-white";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#202823] text-white/70">
      <div className="h-1 w-full bg-[var(--brand)]" />
      <Container className="py-14 sm:py-18 lg:py-24">
        <div className="grid gap-12 border-b border-white/12 pb-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.8fr_1fr] lg:gap-10 lg:pb-16">
          <div className="max-w-sm">
            <Link href="/" className="group inline-block">
              <span className="heading-serif text-3xl tracking-wide text-white transition-colors group-hover:text-white/80">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[.15em] text-white/65">Reimagine · Build · Enjoy</p>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              Remodeling and restoration for homes across the Lehigh Valley and Berks County.
            </p>
          </div>

          <nav aria-labelledby="footer-services-heading">
            <h2 id="footer-services-heading" className={columnHeadingClass}>
              Services
            </h2>
            <ul className="mt-4 text-sm font-medium">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={columnLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company-heading">
            <h2 id="footer-company-heading" className={columnHeadingClass}>
              Company
            </h2>
            <ul className="mt-4 text-sm font-medium">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={columnLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={columnHeadingClass}>Talk with our team</h2>
            <a
              href={siteConfig.phoneHref}
              className="heading-serif mt-4 inline-flex min-h-11 items-center text-2xl text-white transition-colors hover:text-white/80"
            >
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.primaryEmail}`}
              className="flex min-h-8 items-center text-sm transition-colors hover:text-white"
            >
              {siteConfig.primaryEmail}
            </a>
            <Link
              href="/request-a-quote"
              className="mt-6 inline-flex min-h-11 items-center justify-center bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)]"
            >
              Request a quote{" "}
              <span className="ml-3" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>
        <nav aria-label="Local service areas" className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
          <span className="mr-2 text-xs font-semibold uppercase tracking-widest text-white/65">Service areas</span>
          {localLinks.map((link) => (
            <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
      <Container className="pb-10">
        {/* Drafting title block: the firm details found in the corner of every drawing set. */}
        <div className="grid grid-cols-2 border border-white/20 text-xs text-white/70 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className={`${titleCellClass} col-span-2 md:col-span-1`}>
            <p className={titleLabelClass}>Firm</p>
            <p className="mt-1.5 font-semibold text-white">
              {siteConfig.name} · {siteConfig.legalName}
            </p>
          </div>
          <div className={`${titleCellClass} border-t md:border-l md:border-t-0`}>
            <p className={titleLabelClass}>Registration</p>
            <Link
              href="/licenses-and-insurance"
              className="mt-1 inline-flex min-h-6 items-center font-semibold text-white transition-colors hover:text-white/80"
            >
              {siteConfig.hicLabel}
            </Link>
          </div>
          <div className={`${titleCellClass} border-l border-t md:border-t-0`}>
            <p className={titleLabelClass}>Service area</p>
            <p className="mt-1.5 text-white">Lehigh Valley &amp; Berks County, PA</p>
          </div>
        </div>
        <div className="mt-5 flex flex-col-reverse items-center justify-between gap-3 text-xs text-white/65 md:flex-row">
          <p className="text-white/50">
            &copy; {new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 font-medium">
            {externalProfileLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="inline-flex min-h-8 items-center transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Link href="/privacy" className="inline-flex min-h-8 items-center transition-colors hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

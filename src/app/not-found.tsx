import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

const popularLinks = [
  { href: "/services/kitchen-remodeling", label: "Kitchen remodeling" },
  { href: "/services/bathroom-remodeling", label: "Bathroom remodeling" },
  { href: "/services/basement-finishing", label: "Basement finishing" },
  { href: "/services/paver-installation", label: "Patios & outdoor living" },
  { href: "/fire-water-damage-restoration", label: "Fire & water damage repair" },
  { href: "/service-areas", label: "Service areas" },
];

export default function NotFound() {
  return (
    <section className="bg-[var(--background)] py-20 sm:py-28">
      <Container className="max-w-3xl">
        <p className="eyebrow">Page not found</p>
        <h1 className="heading-serif mt-5 text-4xl leading-[1.05] tracking-[-.03em] text-[var(--accent)] sm:text-6xl">
          This page has moved or no longer exists.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          Try one of these instead, or call{" "}
          <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)] underline underline-offset-4">
            {siteConfig.phoneDisplay}
          </a>{" "}
          and tell us what you were looking for.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/request-a-quote">Request a quote</Button>
          <Button href="/projects" variant="secondary">
            See project photos
          </Button>
        </div>
        <nav aria-label="Popular pages" className="mt-12 border-t border-[var(--border)] pt-6">
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {popularLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-11 items-center justify-between border-b border-[var(--border)] text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--brand)]"
                >
                  {link.label} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}

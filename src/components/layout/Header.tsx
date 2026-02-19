import Link from "next/link";
import { siteConfig } from "@/content/site";
import Container from "@/components/ui/Container";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/request-a-quote", label: "Request a Quote" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-[var(--accent)]">
          Revision Home Improvements
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="font-medium hover:text-[var(--brand)]">
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href={siteConfig.phoneHref}
          className="rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--brand-dark)]"
        >
          Call {siteConfig.phoneDisplay}
        </a>
      </Container>
    </header>
  );
}

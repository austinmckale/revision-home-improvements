import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import Container from "@/components/ui/Container";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/fire-water-damage-restoration", label: "Emergency" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/projects", label: "Projects" },
  { href: "/our-process", label: "Process" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-[var(--accent)]">
          <Image
            src="/images/brand/chat-logo.png"
            alt="Revision Home Improvements logo"
            width={56}
            height={56}
            className="h-12 w-12 object-contain"
            priority
          />
          <span className="hidden text-base font-bold leading-tight tracking-tight sm:block">
            Revision Home Improvements
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="font-medium hover:text-[var(--brand)]">
              {link.label}
            </Link>
          ))}
          <Link
            href="/request-a-quote"
            className="rounded-full bg-[var(--brand)] px-4 py-2 font-semibold text-white hover:bg-[var(--brand-dark)]"
          >
            Get a Quote
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={siteConfig.phoneHref}
            className="hidden rounded-full border border-[var(--brand)] px-4 py-2 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--surface-soft)] md:inline-flex"
          >
            {siteConfig.phoneDisplay}
          </a>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}

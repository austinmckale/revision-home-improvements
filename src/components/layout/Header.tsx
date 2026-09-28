"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

const getScrollSnapshot = () => window.scrollY > 40;
const getServerScrollSnapshot = () => false;

export default function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isScrolled = useSyncExternalStore(subscribeToScroll, getScrollSnapshot, getServerScrollSnapshot);

  const isTransparent = isHomepage && !isScrolled;

  // Header structural classes
  const headerClass = `top-0 z-50 w-full transition-all duration-300 ${
    isHomepage ? "fixed" : "sticky"
  } ${
    isTransparent
      ? "border-transparent bg-transparent py-2 shadow-none"
      : "border-b border-[var(--border)] bg-[var(--background)]/95 py-0 shadow-[0_8px_30px_rgba(30,42,34,.04)] backdrop-blur-xl"
  }`;

  // Link text colors
  const textClass = isTransparent ? "!text-white drop-shadow-md" : "text-[var(--accent)]";
  const hoverClass = isTransparent ? "hover:!text-white/80" : "hover:text-[var(--brand)]";

  // Logo color - removing invert to keep brand colors intact, using drop shadow for legibility over images
  const logoClass = `h-10 w-10 object-contain transition-all duration-300 ${
    isTransparent ? "drop-shadow-md" : ""
  }`;

  // Phone button styling
  const phoneBtnClass = `hidden border-b px-0 py-1 text-xs font-semibold tracking-wide transition-colors lg:inline-flex ${
    isTransparent
      ? "border-white/50 !text-white hover:border-white"
      : "border-[var(--border)] text-[var(--accent)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
  }`;

  return (
    <header className={headerClass}>
      <Container className="flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className={`flex shrink-0 items-center gap-2.5 ${textClass} transition-colors`}>
          <Image
            src="/images/brand/chat-logo.png"
            alt={`${siteConfig.name} logo`}
            width={56}
            height={56}
            className={logoClass}
            priority
          />
          <span className="heading-serif text-lg leading-tight tracking-wide sm:text-xl">
            {siteConfig.name}
          </span>
        </Link>
        <nav className={`hidden items-center gap-4 text-xs lg:flex lg:gap-6 lg:text-[0.8125rem] ${textClass}`} aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`group relative py-2 font-medium transition-colors ${hoverClass}`}>
              {link.label}
              <span className={`absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${isTransparent ? "bg-white" : "bg-[var(--brand)]"}`} aria-hidden="true" />
            </Link>
          ))}
          <Link
            href="/request-a-quote"
            className={`px-4 py-2.5 font-semibold transition-colors duration-300 ${
              isTransparent
                ? "bg-white !text-[var(--foreground)] hover:bg-white/90"
                : "bg-[var(--brand)] !text-white hover:bg-[var(--brand-dark)]"
            }`}
          >
            Get a Quote
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <a href={siteConfig.phoneHref} className={phoneBtnClass}>
            {siteConfig.phoneDisplay}
          </a>
          <a
            href={siteConfig.phoneHref}
            className={`flex h-10 w-10 items-center justify-center transition-colors lg:hidden ${
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-[var(--brand)] hover:bg-[var(--surface-soft)]"
            }`}
            aria-label={`Call ${siteConfig.phoneDisplay}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
          <MobileNav key={pathname} isTransparent={isTransparent} />
        </div>
      </Container>
    </header>
  );
}

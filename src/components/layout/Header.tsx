"use client";

import { useState, useEffect } from "react";
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

export default function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHomepage) {
      setIsScrolled(true); // Default behavior on other pages
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  const isTransparent = isHomepage && !isScrolled;

  // Header structural classes
  const headerClass = `top-0 z-50 w-full transition-all duration-300 ${
    isHomepage ? "fixed" : "sticky"
  } ${
    isTransparent
      ? "bg-transparent border-transparent py-2 shadow-none"
      : "bg-[var(--surface)]/95 backdrop-blur border-b border-[var(--border)] py-0"
  }`;

  // Link text colors
  const textClass = isTransparent ? "!text-white drop-shadow-md" : "text-[var(--accent)]";
  const hoverClass = isTransparent ? "hover:!text-white/80" : "hover:text-[var(--brand)]";

  // Logo color - removing invert to keep brand colors intact, using drop shadow for legibility over images
  const logoClass = `h-12 w-12 object-contain transition-all duration-300 ${
    isTransparent ? "drop-shadow-md" : ""
  }`;

  // Phone button styling
  const phoneBtnClass = `hidden rounded-full border px-4 py-2 text-sm font-semibold transition-colors md:inline-flex ${
    isTransparent
      ? "border-white/50 !text-white hover:bg-white/10 drop-shadow-md backdrop-blur-sm"
      : "border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--surface-soft)]"
  }`;

  return (
    <header className={headerClass}>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className={`flex items-center gap-2 ${textClass} transition-colors`}>
          <Image
            src="/images/brand/chat-logo.png"
            alt={`${siteConfig.name} logo`}
            width={56}
            height={56}
            className={logoClass}
            priority
          />
          <span className="heading-serif text-lg leading-tight sm:text-xl">
            {siteConfig.name}
          </span>
        </Link>
        <nav className={`hidden items-center gap-5 text-sm md:flex ${textClass}`} aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`font-medium transition-colors ${hoverClass}`}>
              {link.label}
            </Link>
          ))}
          <Link
            href="/request-a-quote"
            className={`rounded-full px-4 py-2 font-semibold transition-colors ${
              isTransparent
                ? "bg-white !text-[var(--foreground)] hover:bg-gray-100 shadow-md"
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
          <MobileNav isTransparent={isTransparent} />
        </div>
      </Container>
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/fire-water-damage-restoration", label: "Emergency Restoration" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/projects", label: "Projects" },
  { href: "/our-process", label: "Our Process" },
  { href: "/about", label: "About" },
  { href: "/financing", label: "Financing" },
  { href: "/warranty", label: "Warranty" },
];

interface MobileNavProps {
  isTransparent?: boolean;
}

export default function MobileNav({ isTransparent = false }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
          isTransparent && !open
            ? "text-white hover:bg-white/10"
            : "text-[var(--accent)] hover:bg-[var(--surface-soft)]"
        }`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 top-16 z-40 flex flex-col bg-[var(--surface)]/95 backdrop-blur">
          <button
            type="button"
            aria-label="Close menu overlay"
            className="absolute inset-0 -z-10 bg-black/5"
            onClick={() => setOpen(false)}
          />
          <div className="p-4">
            <div className="flex flex-col gap-3 pb-6">
              <a
                href={siteConfig.phoneHref}
                className="flex w-full items-center justify-center rounded-sm border border-[var(--brand)] px-4 py-3 font-semibold text-[var(--brand)] transition-colors hover:bg-[var(--surface-soft)]"
              >
                Call {siteConfig.phoneDisplay}
              </a>
              <Link
                href="/request-a-quote"
                className="flex w-full items-center justify-center rounded-sm bg-[var(--brand)] px-4 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-dark)]"
              >
                Request a Quote
              </Link>
            </div>
            <nav
              className="flex flex-col divide-y divide-[var(--border)]"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3.5 text-base font-medium transition-colors ${
                    pathname === link.href ? "text-[var(--brand)]" : "text-[var(--accent)] hover:text-[var(--brand)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

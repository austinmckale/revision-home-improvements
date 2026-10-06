"use client";

import { useState, useEffect, useRef, useCallback, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";

import Portal from "@/components/ui/Portal";
import useModalFocus from "@/components/ui/useModalFocus";

const navLinks = [
  { href: "/services", label: "Services", primary: true },
  { href: "/projects", label: "Projects", primary: true },
  { href: "/our-process", label: "Our Process" },
  { href: "/fire-water-damage-restoration", label: "Emergency Restoration" },
  { href: "/about", label: "About" },
  { href: "/financing", label: "Financing" },
  { href: "/warranty", label: "Warranty" },
  { href: "/service-areas", label: "Service Areas" },
];

const serviceShortcuts = [
  { href: "/services/kitchen-remodeling", label: "Kitchens" },
  { href: "/services/bathroom-remodeling", label: "Bathrooms" },
  { href: "/services/basement-finishing", label: "Basements" },
  { href: "/services/paver-installation", label: "Patios" },
  { href: "/fire-water-damage-restoration", label: "Fire & water" },
];

/** Matches the panel's CSS exit animation in globals.css. */
const EXIT_DURATION_MS = 260;

interface MobileNavProps {
  isTransparent?: boolean;
}

export default function MobileNav({ isTransparent = false }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const requestClose = useCallback(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setOpen(false);
      return;
    }
    setClosing(true);
  }, []);

  useModalFocus(open, panelRef, closeButtonRef, requestClose, triggerRef);

  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, EXIT_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [closing]);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleResize = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", handleResize);
    return () => {
      desktop.removeEventListener("change", handleResize);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const scrollPosition = window.pageYOffset;

    // CAPTURE POSITION AND DISABLE SCROLL
    const originalStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
      height: document.documentElement.style.height,
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.documentElement.style.height = "100%";

    return () => {
      document.body.style.position = originalStyles.position;
      document.body.style.top = originalStyles.top;
      document.body.style.width = originalStyles.width;
      document.body.style.overflow = originalStyles.overflow;
      document.documentElement.style.height = originalStyles.height;
      if (scrollPosition !== 0) {
        window.scrollTo({ top: scrollPosition, behavior: "instant" });
      }
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-lg transition-colors ${
          isTransparent && !open
            ? "text-white hover:bg-white/10"
            : "text-[var(--accent)] hover:bg-[var(--surface-soft)]"
        }`}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-navigation-panel"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </svg>
      </button>

      {open && (
        <Portal>
          <div
            ref={panelRef}
            id="mobile-navigation-panel"
            role="dialog"
            aria-modal="true"
            aria-label="RHI Pros navigation"
            tabIndex={-1}
            className={`mobile-nav-panel fixed inset-0 z-[9999] flex flex-col bg-[var(--accent)] shadow-2xl selection:bg-brand selection:text-white ${
              closing ? "is-closing" : ""
            }`}
          >
            {/* Header in Overlay */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 px-4">
              <span className="heading-serif text-lg font-bold uppercase tracking-widest text-white">
                {siteConfig.name}
              </span>
              <button
                type="button"
                ref={closeButtonRef}
                onClick={requestClose}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close menu"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col"
                onClick={(event) => {
                  if ((event.target as HTMLElement).closest("a")) setOpen(false);
                }}
              >
                <div className="mb-8 grid grid-cols-2 gap-3">
                  <a
                    href={siteConfig.phoneHref}
                    className="flex flex-col items-center justify-center rounded-sm border border-white/20 bg-white/5 p-4 text-center text-white transition-colors hover:bg-white/10 active:bg-white/20"
                  >
                    <span className="mb-1 text-[0.6rem] font-bold uppercase tracking-widest text-white/70">
                      Direct Call
                    </span>
                    <span className="text-sm font-semibold tracking-tight">{siteConfig.phoneDisplay}</span>
                  </a>
                  <Link
                    href="/request-a-quote"
                    className="flex flex-col items-center justify-center rounded-sm bg-[var(--brand)] p-4 text-center text-white transition-colors hover:bg-[var(--brand-dark)] active:scale-[0.98]"
                  >
                    <span className="mb-1 text-[0.6rem] font-bold uppercase tracking-widest text-white/80">
                      Next Project
                    </span>
                    <span className="text-sm font-semibold tracking-tight">Get a Quote</span>
                  </Link>
                </div>

                <div className="flex flex-col space-y-0.5">
                  {navLinks.map((link, i) => (
                    <div
                      key={link.href}
                      className="mobile-nav-item"
                      style={{ "--mobile-nav-delay": `${i * 40 + 100}ms` } as CSSProperties}
                    >
                      <Link
                        href={link.href}
                        aria-current={
                          pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined
                        }
                        className={`block py-2.5 transition-all active:scale-[0.98] ${
                          link.primary ? "heading-serif text-4xl text-white" : "text-lg text-white/75 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/65">
                  Popular services
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {serviceShortcuts.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-10 items-center rounded-full border border-white/20 px-4 text-sm text-white/85 transition-colors hover:border-white/50 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto pt-10">
                <div className="border-t border-white/10 pb-4 pt-8">
                  <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.65rem] font-bold uppercase tracking-[0.2em]">
                    <a
                      href={siteConfig.facebookPageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="RHI Pros on Facebook (opens in a new tab)"
                      className="inline-flex min-h-8 items-center text-white/70 transition-colors hover:text-white"
                    >
                      Facebook
                    </a>
                    <a
                      href={siteConfig.googleBusinessProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Read RHI Pros reviews on Google (opens in a new tab)"
                      className="inline-flex min-h-8 items-center text-white/70 transition-colors hover:text-white"
                    >
                      Google Reviews
                    </a>
                  </div>

                  <p className="mb-2.5 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/65">
                    Service area
                  </p>
                  <p className="text-sm font-medium tracking-tight text-white/70">
                    Lehigh Valley &amp; Berks County, PA
                  </p>
                  <p className="mt-4 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-white/65">
                    {siteConfig.hicLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

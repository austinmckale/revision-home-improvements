"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/content/site";

import Portal from "@/components/ui/Portal";

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

interface MobileNavProps {
  isTransparent?: boolean;
}

export default function MobileNav({ isTransparent = false }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mounted || !open) return;

    let scrollPosition = window.pageYOffset;
    
    // CAPTURE POSITION AND DISABLE SCROLL
    const originalStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
      height: document.documentElement.style.height
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
        window.scrollTo(0, scrollPosition);
      }
    };
  }, [open, mounted]);

  if (!mounted) {
    return (
      <div className="md:hidden">
        <div className="h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
          isTransparent && !open
            ? "text-white hover:bg-white/10"
            : "text-[var(--accent)] hover:bg-[var(--surface-soft)]"
        }`}
        aria-label="Open menu"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <Portal>
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[9999] flex flex-col bg-[#194734] bg-opacity-100 shadow-2xl selection:bg-brand selection:text-white"
            >
              {/* Header in Overlay */}
              <div className="flex h-16 items-center justify-between px-4 shrink-0 border-b border-white/5">
                <span className="heading-serif text-lg font-bold text-white tracking-widest uppercase">
                  {siteConfig.name}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  aria-label="Close menu"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <nav className="flex flex-col space-y-5">
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <a
                      href={siteConfig.phoneHref}
                      className="flex flex-col items-center justify-center rounded-sm border border-white/20 bg-white/5 p-4 text-center text-white transition-colors hover:bg-white/10 active:bg-white/20"
                    >
                      <span className="text-[0.6rem] font-bold uppercase tracking-widest text-white/40 mb-1">Direct Call</span>
                      <span className="text-sm font-semibold tracking-tight">{siteConfig.phoneDisplay}</span>
                    </a>
                    <Link
                      href="/request-a-quote"
                      className="flex flex-col items-center justify-center rounded-sm bg-[var(--brand)] p-4 text-center text-white transition-colors hover:bg-[var(--brand-dark)] active:scale-[0.98]"
                    >
                      <span className="text-[0.6rem] font-bold uppercase tracking-widest text-white/70 mb-1">Next Project</span>
                      <span className="text-sm font-semibold tracking-tight">Get a Quote</span>
                    </Link>
                  </div>

                  <div className="flex flex-col space-y-0.5">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 + 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className={`block py-2.5 transition-all active:scale-[0.98] ${
                            link.primary 
                              ? "heading-serif text-4xl text-white" 
                              : "text-lg text-white/40 hover:text-white"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                <div className="mt-auto pt-12">
                  <div className="border-t border-white/10 pt-8 pb-4">
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-[0.65rem] font-bold uppercase tracking-[0.2em]">
                      <a href={siteConfig.facebookPageUrl} target="_blank" rel="noreferrer" className="text-white/30 hover:text-[var(--brand)] transition-colors">
                        Facebook
                      </a>
                      <a href={siteConfig.googleBusinessProfileUrl} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[var(--brand)] transition-colors">
                        Google Reviews
                      </a>
                    </div>

                    <p className="text-[0.55rem] font-bold uppercase tracking-[0.3em] text-white/20 mb-2.5">Service Location</p>
                    <p className="text-sm text-white/70 font-medium tracking-tight">
                      Lehigh Valley, PA
                    </p>
                    <p className="mt-4 text-[0.65rem] font-bold tracking-[0.1em] text-white/20 uppercase">
                      {siteConfig.hicNumber}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
}

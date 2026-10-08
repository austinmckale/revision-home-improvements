"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import Container from "@/components/ui/Container";

/** Paths where the emergency banner shows at full prominence */
const RESTORATION_PATHS = [
  "/fire-water-damage-restoration",
  "/services/fire-damage-restoration",
  "/services/water-damage-restoration",
  "/insurance-claims",
];

export default function EmergencyBar() {
  const pathname = usePathname();

  // Hide completely on homepage
  if (pathname === "/") return null;

  const isRestorationPage = RESTORATION_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

  // On restoration pages: full emergency banner
  if (isRestorationPage) {
    return (
      <aside
        aria-label="Fire and water damage help"
        className="border-b border-[var(--border)] bg-[var(--surface-soft)] py-1.5"
      >
        <Container className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
          <p className="text-[var(--accent)]">
            <span className="font-semibold">Fire or water damage?</span> Call to talk through the damage and our availability.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex min-h-8 items-center font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
              aria-label={`Call ${siteConfig.phoneDisplay} to discuss restoration availability`}
            >
              <span className="md:hidden">Call {siteConfig.phoneDisplay}</span>
              <span className="hidden md:inline">Call now</span>
            </a>
            <Link
              href="/fire-water-damage-restoration"
              className="inline-flex min-h-8 items-center font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
            >
              Restoration help
            </Link>
          </div>
        </Container>
      </aside>
    );
  }

  // On all other pages: slim, demoted utility link
  return (
    <aside
      aria-label="Emergency damage contact"
      className="border-b border-[var(--border)] bg-[var(--surface-soft)] py-0.5"
    >
      <Container className="flex items-center justify-end gap-3 text-xs text-[var(--muted)]">
        <span className="hidden sm:inline">Emergency damage?</span>
        <a
          href={siteConfig.phoneHref}
          className="inline-flex min-h-7 items-center whitespace-nowrap font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
        >
          Call {siteConfig.phoneDisplay}
        </a>
        <Link
          href="/fire-water-damage-restoration"
          className="inline-flex min-h-7 items-center font-semibold underline-offset-2 hover:underline"
        >
          Restoration help
        </Link>
      </Container>
    </aside>
  );
}

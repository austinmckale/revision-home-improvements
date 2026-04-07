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

  const isRestorationPage = RESTORATION_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  // On restoration pages: full emergency banner
  if (isRestorationPage) {
    return (
      <div className="border-b border-[var(--border)] bg-[var(--surface-soft)] py-2">
        <Container className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className="text-[var(--accent)]">
            <span className="font-semibold">Fire or water damage?</span> Call first for priority scheduling.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.phoneHref}
              className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
              aria-label={`Call ${siteConfig.phoneDisplay} for priority restoration scheduling`}
            >
              <span className="md:hidden">Call {siteConfig.phoneDisplay}</span>
              <span className="hidden md:inline">Call now</span>
            </a>
            <Link
              href="/fire-water-damage-restoration"
              className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
            >
              Restoration help
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // On all other pages: slim, demoted utility link
  return (
    <div className="border-b border-[var(--border)] bg-[var(--surface-soft)] py-1.5">
      <Container className="flex items-center justify-end gap-3 text-xs text-[var(--muted)]">
        <span>Emergency damage?</span>
        <a
          href={siteConfig.phoneHref}
          className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
        >
          Call {siteConfig.phoneDisplay}
        </a>
        <Link
          href="/fire-water-damage-restoration"
          className="font-semibold underline-offset-2 hover:underline"
        >
          Restoration help
        </Link>
      </Container>
    </div>
  );
}

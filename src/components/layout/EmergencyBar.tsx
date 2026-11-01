"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import Container from "@/components/ui/Container";

/** Fire and water damage pages, the only pages that show this banner */
const RESTORATION_PATHS = [
  "/fire-water-damage-restoration",
  "/services/fire-damage-restoration",
  "/services/water-damage-restoration",
  "/insurance-claims",
];

export default function EmergencyBar() {
  const pathname = usePathname();

  const isRestorationPage = RESTORATION_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (isRestorationPage) {
    return (
      <aside
        aria-label="Fire and water damage help"
        className="border-b border-[var(--border)] bg-[var(--surface-soft)] py-1.5"
      >
        <Container className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
          <p className="text-[var(--accent)]">
            <span className="font-semibold">Fire or water damage?</span> We rebuild once the house is safe and dry.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex min-h-8 items-center font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
              aria-label={`Call ${siteConfig.phoneDisplay} about a damage rebuild`}
            >
              Call {siteConfig.phoneDisplay}
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

  // RHI Pros does not offer emergency service, so other pages carry no damage banner.
  return null;
}

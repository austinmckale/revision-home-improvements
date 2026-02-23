import Link from "next/link";
import { siteConfig } from "@/content/site";
import Container from "@/components/ui/Container";

export default function EmergencyBar() {
  return (
    <div className="border-b border-[var(--border)] bg-[var(--surface-soft)] py-2">
      <Container className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="text-[var(--accent)]">
          <span className="font-semibold">Fire or water damage?</span> Call first for priority scheduling.
        </p>
        <div className="flex items-center gap-3">
          <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)]">
            Call {siteConfig.phoneDisplay}
          </a>
          <Link href="/fire-water-damage-restoration" className="font-semibold text-[var(--accent)]">
            Restoration Help
          </Link>
        </div>
      </Container>
    </div>
  );
}

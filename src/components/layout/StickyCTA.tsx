import { siteConfig } from "@/content/site";
import Button from "@/components/ui/Button";

export default function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-white p-3 shadow-lg md:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-2">
        <Button href="/request-a-quote" className="py-3 text-center text-sm">
          Request a Quote
        </Button>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[var(--muted)]">
          <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)]">
            Call {siteConfig.phoneDisplay}
          </a>
          <span className="text-[var(--border)]">•</span>
          <a href={`mailto:${siteConfig.primaryEmail}`} className="font-semibold text-[var(--brand)]">
            Email {siteConfig.primaryEmail}
          </a>
        </div>
      </div>
    </div>
  );
}

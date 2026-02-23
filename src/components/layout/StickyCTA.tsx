import { siteConfig } from "@/content/site";
import Button from "@/components/ui/Button";

export default function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-white p-3 shadow-lg md:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-2">
        <a
          href={siteConfig.phoneHref}
          className="flex-1 rounded-full bg-[var(--brand)] px-4 py-3 text-center text-sm font-semibold text-white"
        >
          Call for Quote
        </a>
        <Button href="/request-a-quote" variant="secondary" className="flex-1 py-3 text-center text-sm">
          Get Estimate
        </Button>
      </div>
    </div>
  );
}

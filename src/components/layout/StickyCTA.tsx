"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import Button from "@/components/ui/Button";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 240);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible || pathname === "/request-a-quote") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-white px-3 pb-[env(safe-area-inset-bottom,8px)] pt-2.5 shadow-lg md:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-1.5">
        <Button href="/request-a-quote" className="py-2.5 text-center text-sm">
          Request a Quote
        </Button>
        <p className="text-center text-xs text-[var(--muted)]">
          or{" "}
          <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)]">
            call {siteConfig.phoneDisplay}
          </a>
        </p>
      </div>
    </div>
  );
}

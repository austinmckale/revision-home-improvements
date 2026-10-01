import Container from "@/components/ui/Container";

type PageJumpLinksProps = {
  items: { href: string; label: string }[];
};

export default function PageJumpLinks({ items }: PageJumpLinksProps) {
  return (
    <nav aria-label="On this page" className="border-b border-[var(--border)] bg-[var(--surface)]">
      <Container className="flex flex-wrap items-center gap-x-5 gap-y-1 py-3 sm:gap-x-7">
        <span className="w-full text-[0.65rem] font-semibold uppercase tracking-[.14em] text-[var(--muted)] sm:w-auto">
          On this page
        </span>
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--brand)]"
          >
            {item.label}{" "}
            <span className="text-xs text-[var(--brand)]" aria-hidden="true">
              ↓
            </span>
          </a>
        ))}
      </Container>
    </nav>
  );
}

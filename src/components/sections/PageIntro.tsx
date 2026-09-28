import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

export default function PageIntro({ eyebrow, title, children }: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface-soft)] py-12 sm:py-20">
      <Container>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="heading-serif mt-5 max-w-4xl text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.06] tracking-[-.025em] text-[var(--accent)]">{title}</h1>
        {children && <div className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">{children}</div>}
      </Container>
    </section>
  );
}

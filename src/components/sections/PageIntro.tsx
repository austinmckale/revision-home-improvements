import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

const titleClass =
  "heading-serif mt-5 max-w-4xl text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.06] tracking-[-.025em] text-[var(--accent)]";

export default function PageIntro({
  eyebrow,
  title,
  eyebrowInHeading = false,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Include a descriptive eyebrow in the h1 when the display title alone does not name the topic. */
  eyebrowInHeading?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="drafting-grid border-b border-[var(--border)] bg-[var(--surface-soft)] py-12 sm:py-20">
      <Container>
        {eyebrowInHeading ? (
          <h1>
            <span className="eyebrow">{eyebrow}</span> <span className={`${titleClass} block`}>{title}</span>
          </h1>
        ) : (
          <>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className={titleClass}>{title}</h1>
          </>
        )}
        {children && (
          <div className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">{children}</div>
        )}
      </Container>
    </section>
  );
}

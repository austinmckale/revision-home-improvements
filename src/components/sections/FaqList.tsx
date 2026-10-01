import JsonLd from "@/components/JsonLd";
import { getFaqJsonLd } from "@/lib/structuredData";
import { ServiceFaq } from "@/content/services";

type FaqListProps = {
  id?: string;
  title: string;
  items: ServiceFaq[];
};

export default function FaqList({ id, title, items }: FaqListProps) {
  return (
    <section id={id} className="mt-10">
      <JsonLd data={getFaqJsonLd(items)} />
      <h3 className="heading-serif text-3xl text-[var(--accent)]">{title}</h3>
      <div className="mt-4 border-y border-[var(--border)]">
        {items.map((item) => (
          <details key={item.q} className="group border-b border-[var(--border)] py-4 last:border-b-0">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-sm font-semibold text-[var(--accent)] marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)] [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                className="shrink-0 text-xl font-normal text-[var(--brand)] transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-4xl pr-8 text-sm leading-relaxed text-[var(--muted)]">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

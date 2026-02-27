import JsonLd from "@/components/JsonLd";
import { getFaqJsonLd } from "@/lib/structuredData";
import { ServiceFaq } from "@/content/services";

type FaqListProps = {
  title: string;
  items: ServiceFaq[];
};

export default function FaqList({ title, items }: FaqListProps) {
  return (
    <section className="mt-10">
      <JsonLd data={getFaqJsonLd(items)} />
      <h3 className="text-2xl font-bold text-[var(--accent)]">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <details key={item.q} className="surface rounded-lg p-4">
            <summary className="cursor-pointer text-sm font-semibold">{item.q}</summary>
            <p className="mt-2 text-sm text-[var(--muted)]">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

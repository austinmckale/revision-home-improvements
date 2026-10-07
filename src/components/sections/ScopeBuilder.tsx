"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { quoteTimelines } from "@/lib/quoteSchema";
import { siteConfig } from "@/content/site";
import { SCOPE_STARTER_STORAGE_KEY } from "@/lib/scopeStarter";

export type ScopeBuilderService = {
  slug: string;
  name: string;
  label: string;
  whatIncluded: string[];
  pricingFactors: string[];
  qualityFactors: string[];
};

function emit(name: string, detail: Record<string, unknown>) {
  window.dispatchEvent(new CustomEvent(`rhi:${name}`, { detail }));
}

export default function ScopeBuilder({ services }: { services: ScopeBuilderService[] }) {
  const router = useRouter();
  const id = useId();
  const [serviceSlug, setServiceSlug] = useState(services[0]?.slug ?? "");
  const [priorities, setPriorities] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);

  const service = services.find((item) => item.slug === serviceSlug) ?? services[0];

  if (!service) return null;

  const summary = `${service.name} scope starter: ${priorities.length} ${
    priorities.length === 1 ? "priority" : "priorities"
  } selected${timeline ? `, timing ${timeline}` : ""}.`;

  const chooseService = (slug: string) => {
    setServiceSlug(slug);
    setPriorities([]);
  };

  const togglePriority = (item: string) => {
    setPriorities((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]));
  };

  const send = () => {
    const lines = [
      `Scope starter from rhipros.com: ${service.name}`,
      priorities.length ? `Priorities:\n${priorities.map((item) => `• ${item}`).join("\n")}` : "",
      notes.trim() ? `Notes: ${notes.trim()}` : "",
    ].filter(Boolean);
    try {
      window.sessionStorage.setItem(
        SCOPE_STARTER_STORAGE_KEY,
        JSON.stringify({ service: service.slug, details: lines.join("\n\n").slice(0, 2000), timeline, savedAt: Date.now() }),
      );
    } catch {
      // Storage can be unavailable in private browsing; the service still carries through the URL.
    }
    emit("scope_builder_send", { service: service.slug, priorities: priorities.length, timeline: timeline || "none" });
    setSending(true);
    router.push(`/request-a-quote?service=${encodeURIComponent(service.slug)}#quote-form-section`);
  };

  const print = () => {
    emit("scope_builder_print", { service: service.slug });
    const sheet = document.getElementById(`${id}-sheet`);
    if (!sheet) return window.print();
    // Print a static copy of just the sheet, so the rest of the page adds no blank pages.
    const root = document.createElement("div");
    root.className = "scope-print-root";
    const copy = sheet.cloneNode(true) as HTMLElement;
    copy.removeAttribute("id");
    copy.querySelectorAll("[id]").forEach((node) => node.removeAttribute("id"));
    root.appendChild(copy);
    document.body.appendChild(root);
    document.body.classList.add("printing-scope");
    const cleanUp = () => {
      document.body.classList.remove("printing-scope");
      root.remove();
    };
    window.addEventListener("afterprint", cleanUp, { once: true });
    window.print();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div className="min-w-0 space-y-9">
        <fieldset>
          <legend className="annotation text-[var(--brand)]">01 · Choose a space</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {services.map((item) => (
              <label key={item.slug} className="scope-choice cursor-pointer">
                <input
                  type="radio"
                  name={`${id}-service`}
                  value={item.slug}
                  checked={item.slug === service.slug}
                  onChange={() => chooseService(item.slug)}
                  className="sr-only"
                />
                <span className="inline-flex min-h-11 items-center border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--accent)] transition-colors hover:border-[var(--accent)]">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="annotation text-[var(--brand)]">02 · What is on your list?</legend>
          <div className="mt-4 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {service.whatIncluded.map((item) => {
              const checked = priorities.includes(item);
              return (
                <label
                  key={item}
                  className="flex min-h-12 cursor-pointer items-start gap-3 py-3 text-sm leading-snug text-[var(--foreground)]"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => togglePriority(item)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--accent)]"
                  />
                  <span>{item}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="annotation text-[var(--brand)]">03 · When would you like to start?</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {quoteTimelines.map((item) => (
              <label key={item} className="scope-choice cursor-pointer">
                <input
                  type="radio"
                  name={`${id}-timeline`}
                  value={item}
                  checked={timeline === item}
                  onChange={() => setTimeline(item)}
                  className="sr-only"
                />
                <span className="inline-flex min-h-10 items-center border border-[var(--border)] bg-[var(--surface)] px-3.5 text-sm text-[var(--accent)] transition-colors hover:border-[var(--accent)]">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor={`${id}-notes`} className="annotation text-[var(--brand)]">
            04 · Anything else? <span className="normal-case tracking-normal text-[var(--muted)]">(optional)</span>
          </label>
          <textarea
            id={`${id}-notes`}
            value={notes}
            maxLength={300}
            rows={3}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Room size, what is not working today, finishes you love…"
            className="form-control mt-3 w-full resize-y"
          />
        </div>
      </div>

      <article id={`${id}-sheet`} className="paper-sheet min-w-0 p-6 sm:p-10" aria-labelledby={`${id}-sheet-title`}>
        <p className="sr-only" aria-live="polite">
          {summary}
        </p>
        <header className="grid gap-4 border-b border-[var(--accent)] pb-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="annotation text-[var(--muted)]">Scope starter · Sheet SS-01</p>
            <h3 id={`${id}-sheet-title`} className="heading-serif mt-2 text-3xl leading-tight text-[var(--accent)] sm:text-4xl">
              {service.name}
            </h3>
          </div>
          <p className="sheet-tag w-fit self-start text-[var(--accent)] sm:self-end">Rev. A · Planning aid</p>
        </header>

        <dl className="mt-6 space-y-6 text-sm leading-relaxed">
          <div className="grid gap-2 sm:grid-cols-[10.5rem_1fr] sm:gap-6">
            <dt className="annotation pt-0.5 text-[var(--brand)]">01 Priorities</dt>
            <dd>
              {priorities.length ? (
                <ul className="space-y-1.5">
                  {priorities.map((item) => (
                    <li key={item} className="flex gap-2 text-[var(--foreground)]">
                      <span className="text-[var(--brand)]" aria-hidden="true">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="border border-dashed border-[var(--border)] px-3 py-2 text-[var(--muted)]">
                  Tick what is on your list and it will be drawn up here.
                </p>
              )}
            </dd>
          </div>
          <div className="grid gap-2 sm:grid-cols-[10.5rem_1fr] sm:gap-6">
            <dt className="annotation pt-0.5 text-[var(--brand)]">02 Price drivers</dt>
            <dd>
              <ul className="space-y-1.5 text-[var(--muted)]">
                {service.pricingFactors.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="grid gap-2 sm:grid-cols-[10.5rem_1fr] sm:gap-6">
            <dt className="annotation pt-0.5 text-[var(--brand)]">03 Details to discuss</dt>
            <dd>
              <ul className="space-y-1.5 text-[var(--muted)]">
                {service.qualityFactors.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="grid gap-2 sm:grid-cols-[10.5rem_1fr] sm:gap-6">
            <dt className="annotation pt-0.5 text-[var(--brand)]">04 Timing</dt>
            <dd className="text-[var(--foreground)]">{timeline || "Not decided yet"}</dd>
          </div>
          {notes.trim() ? (
            <div className="grid gap-2 sm:grid-cols-[10.5rem_1fr] sm:gap-6">
              <dt className="annotation pt-0.5 text-[var(--brand)]">05 Notes</dt>
              <dd className="whitespace-pre-line break-words text-[var(--foreground)]">{notes.trim()}</dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-8 grid grid-cols-2 border border-[var(--accent)] text-[0.7rem] sm:grid-cols-4">
          {[
            ["Prepared with", "rhipros.com"],
            ["Registration", siteConfig.hicLabel],
            ["Contact", siteConfig.phoneDisplay],
            ["Status", "Not an estimate"],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`border-[var(--accent)] p-2.5 ${index % 2 === 1 ? "border-l" : ""} ${index > 1 ? "border-t sm:border-t-0" : ""} ${index === 2 ? "sm:border-l" : ""}`}
            >
              <p className="annotation text-[0.58rem] text-[var(--muted)]">{label}</p>
              <p className="mt-1 font-semibold text-[var(--accent)]">{value}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">
          A planning aid built from our service checklists. Your written proposal will reflect your home, priorities and
          existing conditions.
        </p>

        <div className="mt-6 flex flex-wrap gap-3" data-print-hide>
          <button
            type="button"
            onClick={send}
            disabled={sending}
            className="inline-flex min-h-12 items-center justify-center gap-3 bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)] disabled:opacity-70"
          >
            {sending ? "Opening your quote request…" : "Send this to RHI Pros"} <span aria-hidden="true">↗</span>
          </button>
          <button
            type="button"
            onClick={print}
            className="inline-flex min-h-12 items-center justify-center border border-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--surface-soft)]"
          >
            Print or save as PDF
          </button>
        </div>
      </article>
    </div>
  );
}

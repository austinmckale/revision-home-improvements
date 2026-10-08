"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { quoteTimelines, scopeContactSchema } from "@/lib/quoteSchema";
import { getFirstTouchAttribution } from "@/lib/leadAttribution";
import { siteConfig } from "@/content/site";
import PhotoPicker, { photosForRequest, type QuotePhoto } from "@/components/forms/PhotoPicker";
import TurnstileWidget, { turnstileEnabled } from "@/components/forms/TurnstileWidget";

export type ScopeBuilderService = {
  slug: string;
  name: string;
  label: string;
  whatIncluded: string[];
  pricingFactors: string[];
  qualityFactors: string[];
};

type ContactFields = { name: string; phone: string; email: string; city: string; zip: string };
type FieldErrors = Partial<Record<keyof ContactFields, string[]>>;

const emptyContact: ContactFields = { name: "", phone: "", email: "", city: "", zip: "" };
const contactInputs: Array<{ name: keyof ContactFields; label: string; type: string; autoComplete: string; wide?: boolean }> = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", wide: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "city", label: "City", type: "text", autoComplete: "address-level2" },
  { name: "zip", label: "ZIP", type: "text", autoComplete: "postal-code" },
];
/** The quote API requires timing; an undecided sheet is sent as the matching quote-form option. */
const UNDECIDED_TIMELINE = "Exploring options";

function emit(name: string, detail: Record<string, unknown>) {
  window.dispatchEvent(new CustomEvent(`rhi:${name}`, { detail }));
}

export default function ScopeBuilder({ services }: { services: ScopeBuilderService[] }) {
  const id = useId();
  const [serviceSlug, setServiceSlug] = useState(services[0]?.slug ?? "");
  const [priorities, setPriorities] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [notes, setNotes] = useState("");
  const [stage, setStage] = useState<"build" | "contact" | "sent">("build");
  const [contact, setContact] = useState<ContactFields>(emptyContact);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [photos, setPhotos] = useState<QuotePhoto[]>([]);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const submissionIdRef = useRef<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const sentHeadingRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (stage === "contact") firstFieldRef.current?.focus();
    if (stage === "sent") sentHeadingRef.current?.focus();
  }, [stage]);

  const service = services.find((item) => item.slug === serviceSlug) ?? services[0];

  if (!service) return null;

  const summary = `${service.name} plan: ${priorities.length} ${
    priorities.length === 1 ? "priority" : "priorities"
  } selected${timeline ? `, timing ${timeline}` : ""}.`;

  const chooseService = (slug: string) => {
    setServiceSlug(slug);
    setPriorities([]);
  };

  const togglePriority = (item: string) => {
    setPriorities((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]));
  };

  const scopeDetails = () =>
    [
      `Scope starter from rhipros.com: ${service.name}`,
      priorities.length ? `Priorities:\n${priorities.map((item) => `• ${item}`).join("\n")}` : "",
      notes.trim() ? `Notes: ${notes.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n\n")
      .slice(0, 2000);

  const openContact = () => {
    emit("scope_builder_send", { service: service.slug, priorities: priorities.length, timeline: timeline || "none" });
    setStage("contact");
  };

  const updateContact = (name: keyof ContactFields, value: string) => {
    setContact((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    const parsed = scopeContactSchema.safeParse(contact);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      setMessage("Please check the highlighted details.");
      requestAnimationFrame(() => messageRef.current?.focus());
      return;
    }
    if (turnstileEnabled && !turnstileToken) {
      setMessage("One moment: the security check is still finishing. Please send again.");
      requestAnimationFrame(() => messageRef.current?.focus());
      return;
    }
    const honeypot = new FormData(event.currentTarget).get("website");
    setErrors({});
    setMessage("");
    setSending(true);
    emit("quote_submit_attempt", { service: service.name, source: "scope_builder" });
    const submissionId = submissionIdRef.current ?? (crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`);
    submissionIdRef.current = submissionId;
    const firstTouch = getFirstTouchAttribution();
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          service: service.name,
          timeline: timeline || UNDECIDED_TIMELINE,
          details: scopeDetails(),
          website: typeof honeypot === "string" ? honeypot : "",
          ...firstTouch,
          landing_path: firstTouch.landing_page,
          campaign: firstTouch.utm_campaign,
          submission_page: window.location.pathname,
          form_source: "scope_builder",
          turnstile_token: turnstileToken,
          photos: photosForRequest(photos),
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: FieldErrors };
      if (response.ok && data.ok) {
        emit("generate_lead", { submissionId });
        setStage("sent");
        return;
      }
      submissionIdRef.current = null;
      setTurnstileReset((count) => count + 1);
      setErrors(data.errors || {});
      setMessage(data.message || `We could not send your plan. Please try again or call ${siteConfig.phoneDisplay}.`);
      emit("quote_submit_error", { fields: Object.keys(data.errors || {}).join(","), source: "scope_builder" });
      requestAnimationFrame(() => messageRef.current?.focus());
    } catch {
      submissionIdRef.current = null;
      setTurnstileReset((count) => count + 1);
      setMessage(`We could not send your plan. Your details are still here. Please try again or call ${siteConfig.phoneDisplay}.`);
      requestAnimationFrame(() => messageRef.current?.focus());
    } finally {
      setSending(false);
    }
  };

  const startOver = () => {
    setStage("build");
    setPriorities([]);
    setTimeline("");
    setNotes("");
    setContact(emptyContact);
    photos.forEach((photo) => URL.revokeObjectURL(photo.preview));
    setPhotos([]);
    submissionIdRef.current = null;
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
        <fieldset disabled={stage === "sent"}>
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

        <fieldset disabled={stage === "sent"}>
          <legend className="annotation text-[var(--brand)]">02 · What is on your list?</legend>
          <div className="mt-4 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {service.whatIncluded.map((item) => (
              <label
                key={item}
                className="flex min-h-12 cursor-pointer items-start gap-3 py-3 text-sm leading-snug text-[var(--foreground)]"
              >
                <input
                  type="checkbox"
                  checked={priorities.includes(item)}
                  onChange={() => togglePriority(item)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--accent)]"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset disabled={stage === "sent"}>
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
            disabled={stage === "sent"}
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
            <p className="annotation text-[var(--muted)]">Project planner</p>
            <h3 id={`${id}-sheet-title`} className="heading-serif mt-2 text-3xl leading-tight text-[var(--accent)] sm:text-4xl">
              {service.name}
            </h3>
          </div>
          <p className="sheet-tag w-fit self-start text-[var(--accent)] sm:self-end">Planning aid</p>
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
                  Check off what is on your list and it will appear here.
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
            ["Status", stage === "sent" ? "Sent to RHI Pros" : "Not an estimate"],
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

        {stage === "build" ? (
          <div className="mt-6 flex flex-wrap gap-3" data-print-hide>
            <button
              type="button"
              onClick={openContact}
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)]"
            >
              Send this to RHI Pros <span aria-hidden="true">↗</span>
            </button>
            <button
              type="button"
              onClick={print}
              className="inline-flex min-h-12 items-center justify-center border border-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--surface-soft)]"
            >
              Print or save as PDF
            </button>
            <p className="w-full text-xs text-[var(--muted)]">Next: your contact details, plus up to 4 photos if you have them.</p>
          </div>
        ) : null}

        {stage === "contact" ? (
          <form onSubmit={submit} noValidate className="mt-8 border-t border-[var(--accent)] pt-6" data-print-hide>
            <p className="annotation text-[var(--brand)]">Last step · Where should we reach you?</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              We will send this sheet with your details and follow up by phone or email. All fields are required.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {contactInputs.map((field, index) => {
                const fieldId = `${id}-${field.name}`;
                const error = errors[field.name]?.[0];
                return (
                  <div key={field.name} className={field.wide ? "sm:col-span-2" : ""}>
                    <label htmlFor={fieldId} className="block text-sm font-semibold text-[var(--accent)]">
                      {field.label}
                    </label>
                    <input
                      ref={index === 0 ? firstFieldRef : undefined}
                      id={fieldId}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      inputMode={field.name === "zip" ? "numeric" : undefined}
                      value={contact[field.name]}
                      onChange={(event) => updateContact(field.name, event.target.value)}
                      disabled={sending}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? `${fieldId}-error` : undefined}
                      className="form-control mt-1.5 w-full"
                    />
                    {error ? (
                      <span id={`${fieldId}-error`} className="mt-1 block text-xs text-red-700">
                        {error}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="mt-5">
              <PhotoPicker photos={photos} onChange={setPhotos} disabled={sending} />
            </div>
            <TurnstileWidget onToken={setTurnstileToken} resetKey={turnstileReset} />
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            {message ? (
              <p ref={messageRef} tabIndex={-1} role="alert" className="mt-4 text-sm font-semibold text-red-700 outline-none">
                {message}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)] disabled:opacity-70"
              >
                {sending ? "Sending…" : "Send my plan"} <span aria-hidden="true">↗</span>
              </button>
              <button
                type="button"
                onClick={() => setStage("build")}
                disabled={sending}
                className="inline-flex min-h-12 items-center px-2 text-sm font-semibold text-[var(--accent)] underline underline-offset-4"
              >
                Keep editing
              </button>
            </div>
            <p className="mt-3 text-xs text-[var(--muted)]">
              No obligation. See our{" "}
              <Link href="/privacy" className="underline underline-offset-4">
                privacy policy
              </Link>
              .
            </p>
          </form>
        ) : null}

        {stage === "sent" ? (
          <div className="mt-8 border-t border-[var(--accent)] pt-6" data-print-hide>
            <h4 ref={sentHeadingRef} tabIndex={-1} className="heading-serif text-2xl text-[var(--accent)] outline-none">
              <span aria-hidden="true">✓ </span>Sent to RHI Pros.
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Your project plan and contact details are on their way. We will review your project and follow up by phone
              or email to discuss next steps.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={print}
                className="inline-flex min-h-12 items-center justify-center border border-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--surface-soft)]"
              >
                Print or save a copy
              </button>
              <button
                type="button"
                onClick={startOver}
                className="inline-flex min-h-12 items-center px-2 text-sm font-semibold text-[var(--accent)] underline underline-offset-4"
              >
                Start another plan
              </button>
            </div>
          </div>
        ) : null}
      </article>
    </div>
  );
}

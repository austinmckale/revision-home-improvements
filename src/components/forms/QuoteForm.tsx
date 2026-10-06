"use client";

import { FormEvent, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { primaryServices } from "@/content/services";
import { siteConfig } from "@/content/site";
import { getFirstTouchAttribution, type LeadAttribution } from "@/lib/leadAttribution";
import { SCOPE_STARTER_STORAGE_KEY } from "@/lib/scopeStarter";
import { quoteContactSchema, quoteProjectSchema, quoteTimelines } from "@/lib/quoteSchema";

type QuoteFormProps = { defaultService?: string };
type FormState = { ok: boolean; message?: string; errors?: Record<string, string[]> };
type ContactData = { name: string; phone: string; email: string; service: string };
type ProjectData = { city: string; zip: string; timeline: string; details: string };
type AttributionData = LeadAttribution & { landing_path: string; campaign: string };

const emptyContact: ContactData = { name: "", phone: "", email: "", service: "" };
const emptyProject: ProjectData = { city: "", zip: "", timeline: "", details: "" };
const subscribeToReadiness = () => () => {};
const getClientReadiness = () => true;
const getServerReadiness = () => false;
const contactFields = ["name", "phone", "email", "service"] as const;
const serviceOptions = [
  ...primaryServices.map(({ slug, name }) => ({ slug, name })),
  { slug: "whole-home-remodeling", name: "Whole-Home Remodeling" },
  { slug: "insurance-claims", name: "Insurance Claims Assistance" },
];
const timelines = quoteTimelines;
const detailHints: Record<string, string> = {
  "Kitchen Remodeling": "Tell us what you would change about the layout, cabinets, counters, or finishes.",
  "Bathroom Remodeling": "Tell us about the bathroom, shower or tub, and the changes you have in mind.",
  "Basement Finishing":
    "How would you like to use the basement? Include its current condition and any moisture concerns.",
  "Paver Installation": "Tell us about the outdoor space, approximate size, and how you want to use it.",
  "Whole-Home Remodeling": "Which rooms would you like to change, and what needs to work better together?",
};

function track(name: string, detail: Record<string, unknown> = {}) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

/** Scope Builder handoff: stored for this tab only, used once, then cleared. */
function takeScopeStarter(): { service?: string; details?: string; timeline?: string } | null {
  try {
    const raw = window.sessionStorage.getItem(SCOPE_STARTER_STORAGE_KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(SCOPE_STARTER_STORAGE_KEY);
    const parsed = JSON.parse(raw) as { service?: string; details?: string; timeline?: string; savedAt?: number };
    if (!parsed.savedAt || Date.now() - parsed.savedAt > 2 * 60 * 60 * 1000) return null;
    return parsed;
  } catch {
    return null;
  }
}

function resolveService(value?: string | null) {
  const requested = value?.trim().toLowerCase();
  return serviceOptions.find((item) => item.slug === requested || item.name.toLowerCase() === requested)?.name || "";
}

export default function QuoteForm({ defaultService }: QuoteFormProps) {
  const ready = useSyncExternalStore(subscribeToReadiness, getClientReadiness, getServerReadiness);
  const [state, setState] = useState<FormState>({ ok: false });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [contact, setContact] = useState<ContactData>({ ...emptyContact, service: resolveService(defaultService) });
  const [project, setProject] = useState<ProjectData>(emptyProject);
  const [attribution, setAttribution] = useState<AttributionData | null>(null);
  const [scopeStarterApplied, setScopeStarterApplied] = useState(false);
  const submissionIdRef = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const focusStepRef = useRef(false);
  const focusErrorRef = useRef(false);
  const submittingRef = useRef(false);
  const formStartedRef = useRef(false);
  const formId = useId();
  const isEmergency = contact.service.toLowerCase().includes("damage");

  useEffect(() => {
    const firstTouch = getFirstTouchAttribution();
    setAttribution({ ...firstTouch, landing_path: firstTouch.landing_page, campaign: firstTouch.utm_campaign });
    const requested = new URLSearchParams(window.location.search).get("service");
    const starter = takeScopeStarter();
    const detected = resolveService(defaultService) || resolveService(requested) || resolveService(starter?.service);
    if (detected) setContact((previous) => ({ ...previous, service: detected }));
    if (starter?.details) {
      const timeline = timelines.find((item) => item === starter.timeline) ?? "";
      setProject((previous) => ({
        ...previous,
        details: previous.details || starter.details!.slice(0, 2000),
        timeline: previous.timeline || timeline,
      }));
      setScopeStarterApplied(true);
    }
  }, [defaultService]);

  useEffect(() => {
    if (focusStepRef.current) {
      focusStepRef.current = false;
      headingRef.current?.focus();
    }
  }, [step, submitted]);

  useEffect(() => {
    if (!focusErrorRef.current) return;
    focusErrorRef.current = false;
    const visibleFields: readonly string[] = step === 1 ? contactFields : ["city", "zip", "timeline", "details"];
    const firstError = visibleFields.find((name) => state.errors?.[name]?.length);
    const field = firstError && formRef.current?.elements.namedItem(firstError);
    if (field instanceof HTMLElement) field.focus();
    else messageRef.current?.focus();
  }, [state, step]);

  const errorId = (name: string) => `${formId}-${name}-error`;
  const fieldProps = (name: string, descriptionId?: string) => ({
    id: `${formId}-${name}`,
    disabled: !ready || loading,
    "aria-labelledby": `${formId}-${name}-label`,
    "aria-invalid": Boolean(state.errors?.[name]?.length),
    "aria-describedby":
      [descriptionId, state.errors?.[name]?.length ? errorId(name) : undefined].filter(Boolean).join(" ") || undefined,
  });
  const errorFor = (name: string) =>
    state.errors?.[name]?.[0] ? (
      <span id={errorId(name)} className="mt-1 block text-xs text-red-700">
        {state.errors[name][0]}
      </span>
    ) : null;

  function updateFieldError(name: string, errors?: string[]) {
    setState((previous) => {
      const remaining = { ...previous.errors };
      if (errors?.length) remaining[name] = errors;
      else delete remaining[name];
      return {
        ...previous,
        errors: remaining,
        message: Object.values(remaining).some((messages) => messages.length) ? previous.message : undefined,
      };
    });
  }
  function updateContact(name: keyof ContactData, value: string) {
    const next = { ...contact, [name]: value };
    setContact(next);
    if (state.errors?.[name]?.length) {
      const parsed = quoteContactSchema.safeParse(next);
      updateFieldError(name, parsed.success ? undefined : parsed.error.flatten().fieldErrors[name]);
    }
  }
  function updateProject(name: keyof ProjectData, value: string) {
    const next = { ...project, [name]: value };
    setProject(next);
    if (state.errors?.[name]?.length) {
      const parsed = quoteProjectSchema.safeParse(next);
      updateFieldError(name, parsed.success ? undefined : parsed.error.flatten().fieldErrors[name]);
    }
  }
  function changeStep(next: 1 | 2) {
    focusStepRef.current = true;
    setStep(next);
  }
  function resetForm() {
    setState({ ok: false });
    setContact({ ...emptyContact, service: resolveService(defaultService) || contact.service });
    setProject(emptyProject);
    setSubmitted(false);
    changeStep(1);
    submissionIdRef.current = null;
    submittingRef.current = false;
    formStartedRef.current = false;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || submittingRef.current) return;

    // Enter and the Continue button must both advance, never submit step one.
    if (step === 1) {
      const parsed = quoteContactSchema.safeParse(contact);
      if (!parsed.success) {
        focusErrorRef.current = true;
        setState({
          ok: false,
          message: "Please check the highlighted details.",
          errors: parsed.error.flatten().fieldErrors,
        });
        return;
      }
      setContact(parsed.data);
      setState({ ok: false });
      changeStep(2);
      track("rhi:quote_step_1_complete", { service: contact.service });
      if (isEmergency) track("rhi:quote_emergency_selected", { service: contact.service });
      return;
    }

    const parsed = quoteProjectSchema.safeParse(project);
    if (!parsed.success) {
      focusErrorRef.current = true;
      setState({
        ok: false,
        message: "Please check the highlighted project details.",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }
    const honeypot = new FormData(event.currentTarget).get("website");
    submittingRef.current = true;
    setLoading(true);
    setState({ ok: false });
    track("rhi:quote_submit_attempt", { service: contact.service });
    const submissionId = submissionIdRef.current ?? (crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`);
    submissionIdRef.current = submissionId;
    const firstTouch = attribution || getFirstTouchAttribution();
    const payload = {
      ...contact,
      ...parsed.data,
      website: typeof honeypot === "string" ? honeypot : "",
      ...firstTouch,
      landing_path: firstTouch.landing_page,
      campaign: firstTouch.utm_campaign,
      submission_page: window.location.pathname,
    };
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as FormState;
      if (response.ok && data.ok) {
        window.dispatchEvent(new CustomEvent("rhi:generate_lead", { detail: { submissionId } }));
        focusStepRef.current = true;
        setSubmitted(true);
        return;
      }
      focusErrorRef.current = true;
      setState({
        ...data,
        ok: false,
        message: data.message || "We could not send your request. Please try again or call us.",
      });
      submissionIdRef.current = null;
      track("rhi:quote_submit_error", { fields: Object.keys(data.errors || {}).join(","), step });
      if (contactFields.some((field) => data.errors?.[field]?.length)) changeStep(1);
    } catch {
      submissionIdRef.current = null;
      focusErrorRef.current = true;
      setState({
        ok: false,
        message: "We could not send your request. Your details are still here. Please try again or call us directly.",
      });
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  }

  if (submitted)
    return (
      <div id="quote-form-section" className="quote-form-shell text-center">
        <span
          className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--surface-soft)] text-2xl text-[var(--accent)]"
          aria-hidden="true"
        >
          ✓
        </span>
        <h2 ref={headingRef} tabIndex={-1} className="heading-serif mt-5 text-3xl text-[var(--accent)] outline-none">
          Your next chapter starts here.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          Your request has been received. We will review your project and follow up by phone or email to discuss the
          next steps.
        </p>
        <a
          href={siteConfig.phoneHref}
          className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--brand)]"
        >
          Call {siteConfig.phoneDisplay}
        </a>
        <button
          type="button"
          onClick={resetForm}
          className="mx-auto mt-4 block min-h-11 text-sm font-semibold text-[var(--accent)] underline underline-offset-4"
        >
          Start another request
        </button>
      </div>
    );

  return (
    <form
      ref={formRef}
      id="quote-form-section"
      onSubmit={onSubmit}
      method="post"
      action="/api/quote"
      noValidate
      aria-busy={!ready || loading}
      className="quote-form-shell"
      onFocusCapture={() => {
        if (!formStartedRef.current) {
          formStartedRef.current = true;
          track("rhi:form_start", { page: window.location.pathname });
        }
      }}
    >
      <div className="flex items-center justify-between gap-3 text-[.65rem] font-semibold uppercase tracking-[.14em] text-[var(--brand)]">
        <span>Request your quote</span>
        <span>Step {step} of 2</span>
      </div>
      <div
        className="quote-progress mt-3"
        role="progressbar"
        aria-label="Quote request progress"
        aria-valuemin={1}
        aria-valuemax={2}
        aria-valuenow={step}
        aria-valuetext={step === 1 ? "Your contact details" : "Your project details"}
      >
        <span className={step === 1 ? "w-1/2" : "w-full"} />
      </div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="heading-serif mt-5 text-2xl leading-tight text-[var(--accent)] outline-none sm:text-3xl"
      >
        {step === 1 ? "First, a little about you." : "Now, tell us about your space."}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
        {step === 1
          ? "A few details so we can get in touch about your project."
          : "An early idea is enough. Share what you know and we will work through the details together."}
      </p>
      <p className="mt-3 text-xs text-[var(--muted)]">All fields are required.</p>
      {scopeStarterApplied && (
        <p className="mt-3 border-l-2 border-[var(--brand)] bg-[var(--surface-soft)] px-3 py-2 text-xs leading-relaxed text-[var(--accent)]">
          Your scope starter is attached. You will find it in the project details on the next step, ready to edit.
        </p>
      )}

      {!ready && (
        <p className="mt-4 text-sm text-[var(--muted)]" role="status">
          Loading the quote form. You can also{" "}
          <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)] underline underline-offset-4">
            call {siteConfig.phoneDisplay}
          </a>{" "}
          to discuss your project.
        </p>
      )}
      <noscript>
        <p className="mt-3 text-sm text-[var(--muted)]">
          This form needs JavaScript to send a request. Please call us using the link above.
        </p>
      </noscript>

      {step === 1 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            <span id={`${formId}-name-label`}>Name</span>
            <input
              {...fieldProps("name")}
              className="form-control mt-1 w-full"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              value={contact.name}
              onChange={(e) => updateContact("name", e.target.value)}
            />
            {errorFor("name")}
          </label>
          <label className="text-sm">
            <span id={`${formId}-phone-label`}>Phone</span>
            <input
              {...fieldProps("phone")}
              className="form-control mt-1 w-full"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              maxLength={25}
              value={contact.phone}
              onChange={(e) => updateContact("phone", e.target.value)}
            />
            {errorFor("phone")}
          </label>
          <label className="text-sm">
            <span id={`${formId}-email-label`}>Email</span>
            <input
              {...fieldProps("email")}
              className="form-control mt-1 w-full"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={contact.email}
              onChange={(e) => updateContact("email", e.target.value)}
            />
            {errorFor("email")}
          </label>
          <label className="min-w-0 text-sm">
            <span id={`${formId}-service-label`}>Service</span>
            <select
              {...fieldProps("service")}
              className="form-control mt-1 w-full"
              name="service"
              required
              value={contact.service}
              onChange={(e) => {
                updateContact("service", e.target.value);
                track("rhi:quote_service_selected", { service: e.target.value });
              }}
            >
              <option value="" disabled>
                Select service
              </option>
              {serviceOptions.map((item) => (
                <option key={item.slug} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {errorFor("service")}
          </label>
        </div>
      ) : (
        <div className="mt-5">
          <div className="flex items-center justify-between gap-3 border-y border-[var(--border)] py-3 text-sm">
            <span className="font-semibold text-[var(--accent)]">{contact.service}</span>
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setState({ ok: false });
                changeStep(1);
                track("rhi:quote_step_back");
              }}
              className="min-h-11 shrink-0 px-2 font-semibold text-[var(--brand)] underline underline-offset-4"
            >
              Edit contact details
            </button>
          </div>
          <p className="mt-3 break-words text-xs leading-relaxed text-[var(--muted)]">
            Contact for this request: <span className="font-semibold">{contact.name}</span>
            <br />
            {contact.email} · {contact.phone}
          </p>
          {isEmergency && (
            <p className="mt-4 border-l-2 border-[var(--brand)] bg-[var(--surface-soft)] p-3 text-sm leading-relaxed">
              Urgent fire or water damage?{" "}
              <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)] underline underline-offset-4">
                Call {siteConfig.phoneDisplay}
              </a>{" "}
              to discuss availability.
            </p>
          )}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span id={`${formId}-city-label`}>City</span>
              <input
                {...fieldProps("city")}
                className="form-control mt-1 w-full"
                name="city"
                autoComplete="address-level2"
                placeholder="e.g. Allentown"
                required
                maxLength={100}
                value={project.city}
                onChange={(e) => updateProject("city", e.target.value)}
              />
              {errorFor("city")}
            </label>
            <label className="text-sm">
              <span id={`${formId}-zip-label`}>ZIP code</span>
              <input
                {...fieldProps("zip")}
                className="form-control mt-1 w-full"
                name="zip"
                autoComplete="postal-code"
                inputMode="numeric"
                required
                maxLength={10}
                value={project.zip}
                onChange={(e) => updateProject("zip", e.target.value)}
              />
              {errorFor("zip")}
            </label>
          </div>
          <label className="mt-4 block text-sm">
            <span id={`${formId}-timeline-label`}>Preferred timing</span>
            <select
              {...fieldProps("timeline")}
              className="form-control mt-1 w-full"
              name="timeline"
              required
              value={project.timeline}
              onChange={(e) => updateProject("timeline", e.target.value)}
            >
              <option value="" disabled>
                Choose a timeframe
              </option>
              {timelines.map((timeline) => (
                <option key={timeline} value={timeline}>
                  {timeline}
                </option>
              ))}
            </select>
            {errorFor("timeline")}
          </label>
          <label className="mt-4 block text-sm">
            <span id={`${formId}-details-label`}>What would you like to change?</span>
            <textarea
              {...fieldProps("details", `${formId}-details-help`)}
              className="form-control mt-1 min-h-36 w-full"
              name="details"
              placeholder={
                detailHints[contact.service] ||
                "Tell us about the space, its current condition, and what you have in mind."
              }
              required
              minLength={10}
              maxLength={2000}
              value={project.details}
              onChange={(e) => updateProject("details", e.target.value)}
            />
            <span className="mt-1 flex justify-between gap-3 text-xs text-[var(--muted)]">
              <span id={`${formId}-details-help`}>Include at least 10 characters about your project.</span>
              <span className="shrink-0" aria-label={`${project.details.length} of 2,000 characters`}>
                {project.details.length}/2,000
              </span>
            </span>
            {errorFor("details")}
          </label>
        </div>
      )}

      <input
        type="text"
        name="website"
        disabled={!ready || loading}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      {state.message && (
        <p
          ref={messageRef}
          tabIndex={-1}
          role="alert"
          className="mt-4 border-l-2 border-red-700 bg-red-50 p-3 text-sm text-red-800 outline-none"
        >
          {state.message}
          {!Object.values(state.errors || {}).some((messages) => messages.length) && (
            <>
              {" "}
              <a href={siteConfig.phoneHref} className="font-semibold underline underline-offset-4">
                Call {siteConfig.phoneDisplay}
              </a>
              .
            </>
          )}
        </p>
      )}
      <div className="mt-5 grid gap-3">
        <button
          type="submit"
          disabled={!ready || loading}
          className="inline-flex min-h-12 items-center justify-center gap-3 bg-[var(--brand)] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)] disabled:opacity-60"
        >
          {!ready
            ? "Loading form…"
            : step === 1
              ? "Continue to your project"
              : loading
                ? "Sending your request…"
                : "Send my project request"}
          <span aria-hidden="true">{loading ? "" : "↗"}</span>
        </button>
      </div>
      <p className="mt-4 text-center text-xs leading-relaxed text-[var(--muted)]">
        No obligation. Clear next steps.{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-[var(--brand)]">
          Privacy policy
        </Link>
      </p>
    </form>
  );
}

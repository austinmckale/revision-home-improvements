"use client";

import { FormEvent, MouseEvent, useState } from "react";
import Script from "next/script";
import { primaryServices } from "@/content/services";
import { locations } from "@/content/locations";
import { siteConfig } from "@/content/site";

type FormState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

const initialState: FormState = { ok: false };
const stepOneFields = ["name", "phone", "email", "service"] as const;

function track(name: string, detail: Record<string, unknown> = {}) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

export default function QuoteForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedService, setSelectedService] = useState("");
  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const fieldError = (name: string) => state.errors?.[name]?.[0];
  const isEmergencySelection = selectedService.toLowerCase().includes("damage");

  function isStepOneValid(form: HTMLFormElement) {
    return stepOneFields.every((fieldName) => {
      const field = form.elements.namedItem(fieldName);
      if (!field || !(field instanceof HTMLElement) || !("reportValidity" in field)) {
        return true;
      }
      return (field as HTMLInputElement | HTMLSelectElement).reportValidity();
    });
  }

  function goToStepTwo(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const form = event.currentTarget.form;
    if (!form) return;
    if (!isStepOneValid(form)) return;
    setStep(2);
    track("rhi:quote_step_1_complete", { service: selectedService || "unknown" });
    if (isEmergencySelection) {
      track("rhi:quote_emergency_selected", { service: selectedService });
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    track("rhi:quote_submit_attempt", { service: selectedService || "unknown" });
    setLoading(true);
    setState(initialState);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as FormState;
    setState(data);
    setLoading(false);

    if (data.ok) {
      event.currentTarget.reset();
      setStep(1);
      setSelectedService("");
      window.dispatchEvent(new CustomEvent("rhi:generate_lead"));
      return;
    }

    const errorFields = Object.keys(data.errors || {});
    track("rhi:quote_submit_error", { fields: errorFields.join(","), step });

    const hasStepOneError = stepOneFields.some((field) => data.errors?.[field]?.length);
    if (hasStepOneError) {
      setStep(1);
    }
  }

  return (
    <form onSubmit={onSubmit} className="surface rounded-2xl p-6" noValidate>
      {turnstileKey && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      )}

      <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
        <span>Request Your Quote</span>
        <span>Step {step} of 2</span>
      </div>

      <p className="mt-1 text-sm text-[var(--muted)]">
        Tell us about your project and we will follow up quickly.
      </p>

      {step === 1 && (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <label className="text-sm">
            Name
            <input className="mt-1 w-full rounded-md border border-[var(--border)] p-2" name="name" required />
            {fieldError("name") && <span className="mt-1 block text-xs text-red-700">{fieldError("name")}</span>}
          </label>
          <label className="text-sm">
            Phone
            <input className="mt-1 w-full rounded-md border border-[var(--border)] p-2" name="phone" required />
            {fieldError("phone") && <span className="mt-1 block text-xs text-red-700">{fieldError("phone")}</span>}
          </label>
          <label className="text-sm">
            Email
            <input className="mt-1 w-full rounded-md border border-[var(--border)] p-2" name="email" required />
            {fieldError("email") && <span className="mt-1 block text-xs text-red-700">{fieldError("email")}</span>}
          </label>
          <label className="text-sm">
            Service
            <select
              className="mt-1 w-full rounded-md border border-[var(--border)] p-2"
              name="service"
              defaultValue=""
              required
              onChange={(event) => {
                const serviceValue = event.target.value;
                setSelectedService(serviceValue);
                track("rhi:quote_service_selected", { service: serviceValue });
              }}
            >
              <option value="" disabled>
                Select service
              </option>
              {primaryServices.map((service) => (
                <option key={service.slug} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
            {fieldError("service") && <span className="mt-1 block text-xs text-red-700">{fieldError("service")}</span>}
          </label>
        </div>
      )}

      {step === 2 && (
        <>
          {isEmergencySelection && (
            <div className="mt-5 rounded-lg border border-[var(--brand)] bg-[var(--surface-soft)] p-3 text-sm">
              <p className="font-semibold text-[var(--accent)]">Urgent fire or water damage project?</p>
              <p className="mt-1 text-[var(--muted)]">For fastest scheduling, call us now at {siteConfig.phoneDisplay}.</p>
            </div>
          )}
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <label className="text-sm">
              City
              <select className="mt-1 w-full rounded-md border border-[var(--border)] p-2" name="city" defaultValue="" required>
                <option value="" disabled>
                  Select city
                </option>
                {locations.map((location) => (
                  <option key={location.slug} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
              {fieldError("city") && <span className="mt-1 block text-xs text-red-700">{fieldError("city")}</span>}
            </label>
            <label className="text-sm">
              ZIP
              <input className="mt-1 w-full rounded-md border border-[var(--border)] p-2" name="zip" required />
              {fieldError("zip") && <span className="mt-1 block text-xs text-red-700">{fieldError("zip")}</span>}
            </label>
          </div>
          <label className="mt-3 block text-sm">
            Timeline
            <input className="mt-1 w-full rounded-md border border-[var(--border)] p-2" name="timeline" required />
            {fieldError("timeline") && <span className="mt-1 block text-xs text-red-700">{fieldError("timeline")}</span>}
          </label>
          <label className="mt-3 block text-sm">
            Project details
            <textarea
              className="mt-1 min-h-30 w-full rounded-md border border-[var(--border)] p-2"
              name="details"
              placeholder="Share scope, rooms, and goals (at least 10 characters)"
              required
            />
            <span className="mt-1 block text-xs text-[var(--muted)]">Include a few details so we can scope your quote accurately.</span>
            {fieldError("details") && <span className="mt-1 block text-xs text-red-700">{fieldError("details")}</span>}
          </label>
          {turnstileKey && (
            <div className="mt-4">
              <div className="cf-turnstile" data-sitekey={turnstileKey} data-theme="light" />
            </div>
          )}
        </>
      )}

      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="mt-5 flex flex-wrap gap-3">
        {step === 1 ? (
          <button
            type="button"
            onClick={goToStepTwo}
            className="rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white"
          >
            Continue
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                track("rhi:quote_step_back");
              }}
              className="rounded-full border border-[var(--brand)] bg-white px-5 py-3 text-sm font-semibold text-[var(--brand)]"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Sending..." : "Submit Request"}
            </button>
          </>
        )}
      </div>

      {state.ok && state.message && (
        <p className="mt-3 rounded-md bg-green-100 p-2 text-sm text-green-700">{state.message}</p>
      )}
      {!state.ok && state.message && (
        <p className="mt-3 rounded-md bg-red-100 p-2 text-sm text-red-700">{state.message}</p>
      )}
    </form>
  );
}

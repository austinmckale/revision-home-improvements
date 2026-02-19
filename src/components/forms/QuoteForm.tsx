"use client";

import { FormEvent, useState } from "react";
import Script from "next/script";
import { primaryServices } from "@/content/services";
import { locations } from "@/content/locations";

type FormState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

const initialState: FormState = { ok: false };

export default function QuoteForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const fieldError = (name: string) => state.errors?.[name]?.[0];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      window.dispatchEvent(new CustomEvent("rhi:generate_lead"));
    }
  }

  return (
    <form onSubmit={onSubmit} className="surface rounded-2xl p-6" noValidate>
      {turnstileKey && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      )}
      <h2 className="text-xl font-semibold text-[var(--accent)]">Request Your Quote</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Tell us about your project and we will follow up quickly.
      </p>
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
          ZIP
          <input className="mt-1 w-full rounded-md border border-[var(--border)] p-2" name="zip" required />
          {fieldError("zip") && <span className="mt-1 block text-xs text-red-700">{fieldError("zip")}</span>}
        </label>
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
          Service
          <select className="mt-1 w-full rounded-md border border-[var(--border)] p-2" name="service" defaultValue="" required>
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
          required
        />
        {fieldError("details") && <span className="mt-1 block text-xs text-red-700">{fieldError("details")}</span>}
      </label>
      {turnstileKey && (
        <div className="mt-4">
          <div className="cf-turnstile" data-sitekey={turnstileKey} data-theme="light" />
        </div>
      )}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <button
        type="submit"
        disabled={loading}
        className="mt-4 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Sending..." : "Submit Request"}
      </button>
      {state.ok && state.message && (
        <p className="mt-3 rounded-md bg-green-100 p-2 text-sm text-green-700">{state.message}</p>
      )}
      {!state.ok && state.message && (
        <p className="mt-3 rounded-md bg-red-100 p-2 text-sm text-red-700">{state.message}</p>
      )}
    </form>
  );
}

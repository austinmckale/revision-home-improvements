import { z } from "zod";

/** Timing choices shared by the quote form and the scope builder. */
export const quoteTimelines = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 3–6 months",
  "More than 6 months",
  "Exploring options",
] as const;

/** Photos travel inside the JSON request, so the browser resizes them to stay under Vercel's 4.5 MB body limit. */
export const MAX_QUOTE_PHOTOS = 4;
export const MAX_QUOTE_PHOTO_BYTES = 900_000;
export const MAX_QUOTE_PHOTOS_TOTAL_BYTES = 2_800_000;
export const quotePhotoTypes = ["image/jpeg", "image/png", "image/webp"] as const;

const asText = z.preprocess((value) => (typeof value === "string" ? value : ""), z.string().trim());

const quotePhotoSchema = z.object({
  name: asText.pipe(z.string().max(120)),
  type: z.enum(quotePhotoTypes),
  data: z
    .string()
    .min(1)
    .max(Math.ceil(MAX_QUOTE_PHOTO_BYTES / 3) * 4, "A photo is too large")
    .regex(/^[A-Za-z0-9+/]+={0,2}$/, "A photo could not be read"),
});

export const quoteSchema = z.object({
  name: asText.pipe(z.string().min(2, "Name is required").max(100, "Name is too long")),
  phone: asText.pipe(
    z
      .string()
      .min(7, "Phone is required")
      .max(25, "Phone is too long")
      .regex(/^[\d\s\-().+]{7,}$/, "Enter a valid phone number")
      .refine((value) => {
        const digitCount = value.replace(/\D/g, "").length;
        return digitCount >= 7 && digitCount <= 15;
      }, "Enter a phone number with 7–15 digits"),
  ),
  email: asText.pipe(z.string().min(1, "Email is required").max(254, "Email is too long").email("Enter a valid email")),
  city: asText.pipe(z.string().min(2, "City is required").max(100, "City is too long")),
  zip: asText.pipe(z.string().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code")),
  service: asText.pipe(z.string().min(2, "Service is required").max(80, "Service is too long")),
  details: asText.pipe(z.string().min(10, "Please add project details").max(2000, "Details are too long")),
  timeline: asText.pipe(z.string().min(2, "Timeline is required").max(80, "Timeline is too long")),
  website: z.string().max(0).optional(),
  traffic_source: asText.pipe(z.string().max(100)),
  traffic_medium: asText.pipe(z.string().max(100)),
  landing_page: asText.pipe(z.string().max(500)),
  submission_page: asText.pipe(z.string().max(500)),
  referrer: asText.pipe(z.string().max(500)),
  campaign: asText.pipe(z.string().max(200)),
  utm_source: asText.pipe(z.string().max(200)),
  utm_medium: asText.pipe(z.string().max(200)),
  utm_campaign: asText.pipe(z.string().max(200)),
  utm_content: asText.pipe(z.string().max(500)),
  utm_term: asText.pipe(z.string().max(500)),
  gclid: asText.pipe(z.string().max(500)),
  fbclid: asText.pipe(z.string().max(500)),
  landing_path: asText.pipe(z.string().max(500)),
  /** Which on-site form sent the lead: "quote_form" or "scope_builder". */
  form_source: asText.pipe(z.string().max(40)),
  turnstile_token: asText.pipe(z.string().max(4096)),
  photos: z.preprocess(
    (value) => (Array.isArray(value) ? value : []),
    z
      .array(quotePhotoSchema)
      .max(MAX_QUOTE_PHOTOS, `Add up to ${MAX_QUOTE_PHOTOS} photos`)
      .refine(
        (photos) => photos.reduce((total, photo) => total + (photo.data.length * 3) / 4, 0) <= MAX_QUOTE_PHOTOS_TOTAL_BYTES,
        "Photos are too large together",
      ),
  ),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

// Keep the two browser steps aligned with the API's validation rules.
export const quoteContactSchema = quoteSchema.pick({ name: true, phone: true, email: true, service: true });
export const quoteProjectSchema = quoteSchema.pick({ city: true, zip: true, timeline: true, details: true });
// The scope builder collects service, timing and details on its sheet, then asks only for contact details.
export const scopeContactSchema = quoteSchema.pick({ name: true, phone: true, email: true, city: true, zip: true });

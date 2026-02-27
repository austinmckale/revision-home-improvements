import { z } from "zod";

const asText = z.preprocess((value) => (typeof value === "string" ? value : ""), z.string().trim());

export const quoteSchema = z.object({
  name: asText.pipe(z.string().min(2, "Name is required")),
  phone: asText.pipe(z.string().min(7, "Phone is required").regex(/^[\d\s\-().+]{7,}$/, "Enter a valid phone number")),
  email: asText.pipe(z.string().min(1, "Email is required").email("Enter a valid email")),
  city: asText.pipe(z.string().min(2, "City is required")),
  zip: asText.pipe(z.string().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code")),
  service: asText.pipe(z.string().min(2, "Service is required")),
  details: asText.pipe(z.string().min(10, "Please add project details")),
  timeline: asText.pipe(z.string().min(2, "Timeline is required")),
  website: z.string().max(0).optional(),
  "cf-turnstile-response": z.string().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

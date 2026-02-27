import { z } from "zod";

const asText = z.preprocess((value) => (typeof value === "string" ? value : ""), z.string().trim());

export const quoteSchema = z.object({
  name: asText.pipe(z.string().min(2, "Name is required").max(100, "Name is too long")),
  phone: asText.pipe(
    z
      .string()
      .min(7, "Phone is required")
      .max(25, "Phone is too long")
      .regex(/^[\d\s\-().+]{7,}$/, "Enter a valid phone number"),
  ),
  email: asText.pipe(z.string().min(1, "Email is required").max(254, "Email is too long").email("Enter a valid email")),
  city: asText.pipe(z.string().min(2, "City is required").max(100, "City is too long")),
  zip: asText.pipe(z.string().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code")),
  service: asText.pipe(z.string().min(2, "Service is required").max(80, "Service is too long")),
  details: asText.pipe(z.string().min(10, "Please add project details").max(2000, "Details are too long")),
  timeline: asText.pipe(z.string().min(2, "Timeline is required").max(80, "Timeline is too long")),
  website: z.string().max(0).optional(),
  "cf-turnstile-response": z.string().max(2048).optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

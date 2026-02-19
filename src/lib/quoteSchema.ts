import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  phone: z.string().trim().min(7, "Phone is required"),
  email: z.email("Enter a valid email"),
  city: z.string().trim().min(2, "City is required"),
  zip: z.string().trim().min(5, "ZIP is required"),
  service: z.string().trim().min(2, "Service is required"),
  details: z.string().trim().min(10, "Please add project details"),
  timeline: z.string().trim().min(2, "Timeline is required"),
  website: z.string().max(0).optional(),
  "cf-turnstile-response": z.string().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

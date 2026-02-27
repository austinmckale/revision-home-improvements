export type Testimonial = {
  quote: string;
  name: string;
  context: string;
  rating: number;
  source?: string;
  locationSlug?: string;
  serviceSlug?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Ryan’s customer service was great from beginning to end. I highly recommend the family owned business! Very professional work and service!",
    name: "Curin R.",
    context: "Interior painting (1–2 rooms)",
    rating: 5,
    source: "Angi Review · Feb 2025",
    locationSlug: "reading-pa",
    serviceSlug: "painting",
  },
  {
    quote:
      "Very pleased! Fast response, professional, very nice, and easy to work with. Fixed my lighting problem. Fair price, great job!",
    name: "Alice H.",
    context: "Lighting repair",
    rating: 5,
    source: "Angi Review · Aug 2024",
    locationSlug: "berks-county-pa",
    serviceSlug: "electrical",
  },
  {
    quote:
      "Very professional, excellent workmanship, very thorough.",
    name: "Walter M.",
    context: "General contractor service",
    rating: 5,
    source: "Angi Review · Aug 2024",
    locationSlug: "berks-county-pa",
    serviceSlug: "general-contractor",
  },
  {
    quote:
      "The crew was professional, easy to talk with, and kept a clean work area. The project was completed as requested. I would recommend them.",
    name: "Elsie M.",
    context: "Demo + pool removal + landscaping",
    rating: 5,
    source: "Angi Review · Aug 2024",
    locationSlug: "berks-county-pa",
    serviceSlug: "general-contractor",
  },
  {
    quote:
      "Would recommend these guys to anyone looking to have painting or home improvement work done. The crew is very respectful and highly skilled.",
    name: "David H.",
    context: "Painting + home improvement",
    rating: 5,
    source: "Angi Review · Jul 2024",
    locationSlug: "lehigh-valley-pa",
    serviceSlug: "painting",
  },
  {
    quote:
      "This company has the experience and know-how to do almost any work you need. Their work is impeccable and communication was consistent.",
    name: "Richard K.",
    context: "Bathroom remodel",
    rating: 5,
    source: "Angi Review · Jun 2024",
    locationSlug: "berks-county-pa",
    serviceSlug: "bathroom-remodeling",
  },
  {
    quote:
      "Very professional and clean. Everything we asked for and more. They went above and beyond and everything came out perfect.",
    name: "Paul C.",
    context: "Major home repair",
    rating: 5,
    source: "Angi Review · Mar 2024",
    locationSlug: "berks-county-pa",
  },
  {
    quote:
      "Honest, detail oriented, and great communication throughout the project.",
    name: "Albert S.",
    context: "Kitchen remodel",
    rating: 5,
    source: "Angi Review · Mar 2024",
    locationSlug: "berks-county-pa",
    serviceSlug: "kitchen-remodeling",
  },
  {
    quote:
      "Excellent work, courteous, punctual, and knowledgeable.",
    name: "Ron K.",
    context: "Fixture repair",
    rating: 5,
    source: "Angi Review · Feb 2024",
    locationSlug: "berks-county-pa",
  },
];

export function getTestimonialsByLocation(locationSlug: string) {
  return testimonials.filter((t) => t.locationSlug === locationSlug);
}

export function getTestimonialsByService(serviceSlug: string) {
  return testimonials.filter((t) => t.serviceSlug === serviceSlug);
}

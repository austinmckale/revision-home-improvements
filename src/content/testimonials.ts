import { company } from "@/content/company";

type LegacyTestimonial = {
  quote: string;
  name: string;
  context: string;
  rating: number;
  source?: string;
  locationSlug?: string;
  serviceSlug?: string;
};

/** Historical marketing records, retained for evidence review only. Never render this array. */
const legacyTestimonials: LegacyTestimonial[] = [
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
    quote: "Very professional, excellent workmanship, very thorough.",
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
    quote: "Honest, detail oriented, and great communication throughout the project.",
    name: "Albert S.",
    context: "Kitchen remodel",
    rating: 5,
    source: "Angi Review · Mar 2024",
    locationSlug: "berks-county-pa",
    serviceSlug: "kitchen-remodeling",
  },
  {
    quote: "Excellent work, courteous, punctual, and knowledgeable.",
    name: "Ron K.",
    context: "Fixture repair",
    rating: 5,
    source: "Angi Review · Feb 2024",
    locationSlug: "berks-county-pa",
  },
  // Historical Google-labeled records; this is not a current rating/count feed.
  {
    quote:
      "Had our bathroom remodeled by them and overall I'm really happy with how it came out. It looks so much cleaner and updated now. The crew was easy to deal with and I appreciated that they cleaned up at the end of each day.",
    name: "Janus R.",
    context: "Bathroom remodel",
    rating: 5,
    source: "Google Review · Apr 2026",
    locationSlug: "lehigh-valley-pa",
    serviceSlug: "bathroom-remodeling",
  },
  {
    quote:
      "Ryan and his team did an awesome job on our pool patio renovation. The area looks completely transformed and the quality of the work really shows. Great crew, professional work, and a beautiful final result. Highly recommend.",
    name: "Sara M.",
    context: "Pool patio renovation",
    rating: 5,
    source: "Google Review · Apr 2026",
    locationSlug: "lehigh-valley-pa",
    serviceSlug: "paver-installation",
  },
  {
    quote:
      "Went above and beyond in our basement remodel. Very professional and always easy to reach. The quality of the finished product was fantastic.",
    name: "Shawn C.",
    context: "Basement remodel",
    rating: 5,
    source: "Google Review · 2025",
    locationSlug: "lehigh-valley-pa",
    serviceSlug: "basement-finishing",
  },
  {
    quote:
      "Ryan was great to work with from start to finish. Very honest, up front about timelines and costs, and his crew does quality work. Would hire again without hesitation.",
    name: "Bruce T.",
    context: "Deck restoration",
    rating: 5,
    source: "Google Review · 2025",
    locationSlug: "lehigh-valley-pa",
  },
  {
    quote:
      "Excellent communication throughout the entire project. The crew showed up on time every day and the finished bathroom exceeded our expectations.",
    name: "Michelle D.",
    context: "Bathroom remodel",
    rating: 5,
    source: "Google Review · 2025",
    locationSlug: "berks-county-pa",
    serviceSlug: "bathroom-remodeling",
  },
  {
    quote:
      "Professional, clean, and detail-oriented. They handled our kitchen update perfectly and left the house spotless every day.",
    name: "Tom W.",
    context: "Kitchen update",
    rating: 5,
    source: "Google Review · 2025",
    locationSlug: "lehigh-valley-pa",
    serviceSlug: "kitchen-remodeling",
  },
];

export type Testimonial = LegacyTestimonial & {
  verification: {
    status: "source-checked";
    platform: "Angi" | "Google";
    url: string;
    checkedAt: string;
    /** Year-month for Angi; year only for Google, which shows reviews as "N weeks ago". */
    publishedMonth: string;
    /** "project" only when the review's own photos show that project. */
    association: "company-only" | "project";
    projectSlug?: string;
  };
};

type WithheldTestimonial = LegacyTestimonial & {
  verification: {
    status: "withheld";
    reason: string;
    evidenceUrl?: string;
  };
};

const angiReviewUrl = "https://www.angi.com/companylist/us/pa/temple/rhi-solutions-llc-reviews-1.htm";
const googleReviewUrl = company.social.googleBusinessProfile;

/**
 * Exact excerpts from the owner's Google Business Profile reviews (screenshots supplied October 15, 2026).
 * Only complete sentences visible before Google's "View full review" cut-off are used. Rating-only reviews,
 * screen-name reviewers and reviews from people involved with the business are not published.
 */
const googleReview = (
  name: string,
  quote: string,
  association: Testimonial["verification"]["association"] = "company-only",
  projectSlug?: string,
): Testimonial => ({
  quote,
  name,
  context: "Company review",
  rating: 5,
  source: "Google review · 2026",
  verification: {
    status: "source-checked",
    platform: "Google",
    url: googleReviewUrl,
    checkedAt: "2026-10-15",
    publishedMonth: "2026",
    association,
    projectSlug,
  },
});

/** No legacy record has a verified customer-to-project or city association. */
export const withheldTestimonials: WithheldTestimonial[] = legacyTestimonials.map((item) => ({
  ...item,
  verification: {
    status: "withheld",
    reason: item.source?.startsWith("Angi")
      ? "Reviewer, rating and month found on Angi; legacy text/context/tags were not preserved as an authenticated quotation. Use the source-checked excerpts below."
      : "Original Google review was not retrieved; stored source label and job/location tags alone do not establish the quote or association.",
    evidenceUrl: item.source?.startsWith("Angi") ? angiReviewUrl : undefined,
  },
}));

/** Exact excerpts from Google (2026) and Angi (2024); no city link, and a project link only when proven. */
export const testimonials: Testimonial[] = [
  googleReview(
    "Elizabeth S.",
    "Their work is amazing—very high quality, and their presence in the home is professional, reliable, and safe.",
  ),
  googleReview(
    "Larry W.",
    "The cost estimate was reasonable, but most importantly, the work was done on time (actually a little ahead of schedule), and the quality was excellent.",
  ),
  googleReview(
    "Karla S.",
    "Ryan took the time to listen to my concerns and my transformation of my Dining room and Kitchen came out perfect.",
  ),
  googleReview(
    "Devon M.",
    "Super easy to work with. Ryan is great at understanding what we needed for our house and getting it done.",
  ),
  googleReview("Maryann T.", "Ryan and his crew were very efficient and knowledgeable about their work."),
  googleReview(
    "Janus R.",
    "The crew was easy to deal with and I appreciated that they cleaned up at the end of each day. A couple little things needed touched up after but they handled it right away.",
  ),
  googleReview("Tammy Y.", "I would recommend them for great work that they did."),
  // Her review photos show this pool before and after, so the review is linked to the project.
  googleReview(
    "Sara M.",
    "Ryan and his team did an awesome job on our pool patio renovation.",
    "project",
    "bethlehem-pool-patio-renovation",
  ),
  {
    quote: "Fair price, great job!",
    name: "Alice H.",
    context: "Company review",
    rating: 5,
    source: "Angi review · Aug 2024",
    verification: {
      status: "source-checked",
      platform: "Angi",
      url: angiReviewUrl,
      checkedAt: "2026-09-30",
      publishedMonth: "2024-08",
      association: "company-only",
    },
  },
  {
    quote: "Honest and very detail oriented and great communication throughout the project",
    name: "Albert S.",
    context: "Company review",
    rating: 5,
    source: "Angi review · Mar 2024",
    verification: {
      status: "source-checked",
      platform: "Angi",
      url: angiReviewUrl,
      checkedAt: "2026-09-30",
      publishedMonth: "2024-03",
      association: "company-only",
    },
  },
  {
    quote: "Excellent work, courteous, punctual, knowledgeable.",
    name: "Ron K.",
    context: "Company review",
    rating: 5,
    source: "Angi review · Feb 2024",
    verification: {
      status: "source-checked",
      platform: "Angi",
      url: angiReviewUrl,
      checkedAt: "2026-09-30",
      publishedMonth: "2024-02",
      association: "company-only",
    },
  },
];

/** Company reviews, not proof of a featured project or a particular service area. Shown in this order. */
export const FEATURED_TESTIMONIAL_KEYS = [
  { name: "Elizabeth S.", context: "Company review" },
  { name: "Larry W.", context: "Company review" },
  { name: "Devon M.", context: "Company review" },
] as const;

export function isSourceCheckedTestimonial(item: Testimonial): boolean {
  const { verification } = item;
  if (verification?.status !== "source-checked") return false;
  const traceable =
    verification.platform === "Google"
      ? verification.url === googleReviewUrl
      : verification.url.startsWith("https://www.angi.com/");
  const associated =
    verification.association === "company-only" ||
    (verification.association === "project" && Boolean(verification.projectSlug));
  return traceable && associated;
}

/** A review whose own photos show this project. */
export function getProjectTestimonial(projectSlug: string) {
  return testimonials.find(
    (item) => isSourceCheckedTestimonial(item) && item.verification.projectSlug === projectSlug,
  );
}

export function getFeaturedTestimonials(): Testimonial[] {
  return FEATURED_TESTIMONIAL_KEYS.flatMap((key) => {
    const match = testimonials.find(
      (item) => item.name === key.name && item.context === key.context && isSourceCheckedTestimonial(item),
    );
    return match ? [match] : [];
  });
}

export function getTestimonialsByLocation(locationSlug: string) {
  return testimonials.filter((item) => isSourceCheckedTestimonial(item) && item.locationSlug === locationSlug);
}

export function getTestimonialsByService(serviceSlug: string) {
  return testimonials.filter((item) => isSourceCheckedTestimonial(item) && item.serviceSlug === serviceSlug);
}

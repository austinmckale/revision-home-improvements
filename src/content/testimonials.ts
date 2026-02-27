export type Testimonial = {
  quote: string;
  name: string;
  context: string;
  rating: number;
  locationSlug?: string;
  serviceSlug?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Communication was clear from estimate through final walkthrough. The project stayed organized and the finish quality was excellent.",
    name: "Sarah M.",
    context: "Kitchen remodel in Reading, PA",
    rating: 5,
    locationSlug: "reading-pa",
    serviceSlug: "kitchen-remodeling",
  },
  {
    quote:
      "We needed repairs quickly after damage and the team helped us understand each step. Fast response and very professional.",
    name: "David R.",
    context: "Restoration project in Berks County, PA",
    rating: 5,
    locationSlug: "berks-county-pa",
    serviceSlug: "water-damage-restoration",
  },
  {
    quote:
      "The quote process was straightforward and we knew what to expect before work started. Great experience overall.",
    name: "Jennifer L.",
    context: "Bathroom renovation in Lehigh Valley, PA",
    rating: 5,
    locationSlug: "lehigh-valley-pa",
    serviceSlug: "bathroom-remodeling",
  },
  {
    quote:
      "They took a blank basement and turned it into a space our family actually uses every day. Could not be happier with the result.",
    name: "Michael T.",
    context: "Basement finishing in Berks County, PA",
    rating: 5,
    locationSlug: "berks-county-pa",
    serviceSlug: "basement-finishing",
  },
  {
    quote:
      "The patio feels like a complete extension of the home now. Great planning and finish quality.",
    name: "Karen W.",
    context: "Paver patio in Reading, PA",
    rating: 5,
    locationSlug: "reading-pa",
    serviceSlug: "paver-installation",
  },
  {
    quote:
      "Fast response and clear next steps made a stressful situation manageable. The rebuild quality exceeded what we had before.",
    name: "Tom H.",
    context: "Water damage restoration in Lehigh Valley, PA",
    rating: 5,
    locationSlug: "lehigh-valley-pa",
    serviceSlug: "water-damage-restoration",
  },
  {
    quote:
      "The repaired walls blended in perfectly and saved us from a bigger remodel. Very detail-oriented crew.",
    name: "Angela P.",
    context: "Drywall repair in Bethlehem, PA",
    rating: 5,
    locationSlug: "bethlehem-pa",
    serviceSlug: "drywall-installation-repair",
  },
  {
    quote:
      "The floor feels solid and the finishing details made a big difference in the final look. Highly recommend.",
    name: "Chris B.",
    context: "Flooring installation in Allentown, PA",
    rating: 5,
    locationSlug: "allentown-pa",
    serviceSlug: "flooring-installation",
  },
  {
    quote:
      "They brought structure to a chaotic situation and delivered quality work from start to finish. Could not ask for more.",
    name: "Lisa G.",
    context: "Fire damage restoration in Berks County, PA",
    rating: 5,
    locationSlug: "berks-county-pa",
    serviceSlug: "fire-damage-restoration",
  },
  {
    quote:
      "Our kitchen turned out better than we imagined. The team was respectful of our home and kept us informed the whole time.",
    name: "Mark D.",
    context: "Kitchen remodel in Wyomissing, PA",
    rating: 5,
    locationSlug: "wyomissing-pa",
    serviceSlug: "kitchen-remodeling",
  },
];

export function getTestimonialsByLocation(locationSlug: string) {
  return testimonials.filter((t) => t.locationSlug === locationSlug);
}

export function getTestimonialsByService(serviceSlug: string) {
  return testimonials.filter((t) => t.serviceSlug === serviceSlug);
}

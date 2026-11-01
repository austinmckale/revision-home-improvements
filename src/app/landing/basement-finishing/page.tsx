import type { Metadata } from "next";
import AdLandingPage from "@/components/sections/AdLandingPage";
import { getServiceTestimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Basement Finishing — Get a Quote | Lehigh Valley & Berks County",
  description:
    "Request a basement finishing quote from RHI Pros, PA HIC PA185945. A detailed written proposal before work begins. Serving Allentown, Bethlehem, the Lehigh Valley, Reading and Berks County.",
  robots: { index: false, follow: false },
};

const faqs = [
  {
    q: "How much does it cost to finish a basement?",
    a: "It depends on the size of the space, its condition and what goes in it, such as a bathroom or a media wall. Your written proposal spells out the price, allowances and exclusions before work starts.",
  },
  {
    q: "What about moisture or water in the basement?",
    a: "Moisture gets a close look before anything is finished. Active water problems must be fixed first, and the plan accounts for ventilation and materials suited to below-grade rooms.",
  },
  {
    q: "Can I add a bathroom in the basement?",
    a: "Often, yes. An existing rough-in makes it simpler; without one, we walk through the options and cost during the estimate.",
  },
  {
    q: "Do you install epoxy floors?",
    a: "Yes. Epoxy is seamless and easy to clean, which suits a basement. We check the slab for moisture first, because epoxy needs a dry, sound surface to bond to. Our basement media room has a patterned epoxy floor.",
  },
];

// The basement media room (Lehigh Valley); descriptions come from the project's photo records.
const galleryImages = [
  {
    src: "/images/projects/lehigh-valley-basement-theater/after/media-room-big-screen.jpg",
    alt: "Basement media wall with a large screen, linear fireplace, and glossy patterned epoxy floor.",
  },
  {
    src: "/images/projects/lehigh-valley-basement-theater/after/epoxy-floor-big-screen.jpg",
    alt: "Wide basement view showing the media wall, columns, ceiling lights, and glossy patterned epoxy floor.",
  },
];

export default function BasementLandingPage() {
  return (
    <AdLandingPage
      serviceName="Basement Finishing"
      path="/landing/basement-finishing"
      eyebrow="Basement finishing · Lehigh Valley & Berks County"
      title="The best room in the house, one floor down."
      intro="Family rooms, media rooms, offices and guest space, with moisture, ceilings and lighting worked out before anything is finished."
      heroImage={galleryImages[0]}
      ctaLabel="Request a basement quote"
      firstStepTitle="Tell us about your basement"
      reviews={getServiceTestimonials("basement-finishing")}
      gallery={{
        title: "Basement details, up close",
        intro: "The media wall, fireplace and epoxy floor in one of our basements.",
        label: "Basement photos",
        images: galleryImages,
      }}
      faqs={faqs}
      closingTitle="Ready to finish your basement?"
    />
  );
}

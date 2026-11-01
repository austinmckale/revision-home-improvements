import type { Metadata } from "next";
import AdLandingPage from "@/components/sections/AdLandingPage";
import { getFeaturedTestimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Bathroom Remodeling — Get a Quote | Lehigh Valley & Berks County",
  description:
    "Request a bathroom remodeling quote from RHI Pros, PA HIC PA185945. A detailed written proposal before work begins. Serving Allentown, Bethlehem, the Lehigh Valley, Reading and Berks County.",
  robots: { index: false, follow: false },
};

const faqs = [
  {
    q: "How much does a bathroom remodel cost?",
    a: "It depends on the size of the room, your materials and what is behind the walls. A refresh and a full rebuild are very different projects. Your written proposal spells out the price, allowances and exclusions before work starts.",
  },
  {
    q: "How long does a typical bathroom remodel take?",
    a: "It depends on the work, material availability and existing conditions. Your proposal includes the schedule before work begins.",
  },
  {
    q: "Can you work with my existing plumbing layout?",
    a: "Often, yes, depending on its condition and your new fixtures. Moving drains or supply lines adds cost and time, so we compare both options with you.",
  },
  {
    q: "Do you handle waterproofing?",
    a: "Yes. The waterproofing system for your shower and wet areas is chosen during planning and named in your proposal.",
  },
  {
    q: "What does a full bathroom gut include?",
    a: "It depends on the room. A full gut usually covers demolition, plumbing and electrical work, ventilation, shower preparation, fixtures, surfaces and finishes. Hidden damage is assessed once walls are open rather than assumed.",
  },
];

const galleryImages = [
  {
    src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-shower.jpg",
    alt: "Finished shower with glass doors and matte black fixtures",
  },
  {
    src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-after-vanity.jpg",
    alt: "Updated vanity with matte black fixtures, modern mirror, and new lighting",
  },
  {
    src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-finished-shower-detail.jpg",
    alt: "Close-up of finished shower enclosure and fixtures",
  },
  {
    src: "/images/projects/bethlehem-bathroom-refresh/after/bathroom-door-open.jpg",
    alt: "Bathroom doorway with a sliding door, gray vanity and black-framed shower enclosure",
  },
];

export default function BathroomLandingPage() {
  return (
    <AdLandingPage
      serviceName="Bathroom Remodeling"
      path="/landing/bathroom-remodeling"
      eyebrow="Bathroom remodeling · Lehigh Valley & Berks County"
      title="A bathroom, thoughtfully rebuilt."
      intro="Tile, fixtures, waterproofing and finishes, planned together in a bathroom built around the way you use it."
      heroImage={galleryImages[0]}
      ctaLabel="Request a bathroom quote"
      firstStepTitle="Tell us about your bathroom"
      reviews={getFeaturedTestimonials()}
      gallery={{
        title: "Bathroom details, up close",
        intro: "Shower, vanity and finish details.",
        label: "Bathroom photos",
        images: galleryImages,
      }}
      faqs={faqs}
      closingTitle="Ready to start your bathroom project?"
    />
  );
}

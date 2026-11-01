import type { Metadata } from "next";
import AdLandingPage from "@/components/sections/AdLandingPage";
import { getServiceTestimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Kitchen Remodeling — Get a Quote | Lehigh Valley & Berks County",
  description:
    "Request a kitchen remodeling or cabinet refacing quote from RHI Pros, PA HIC PA185945. A detailed written proposal before work begins. Serving Allentown, Bethlehem, the Lehigh Valley, Reading and Berks County.",
  robots: { index: false, follow: false },
};

const faqs = [
  {
    q: "How much does a kitchen remodel cost?",
    a: "It depends on the size of the room, the cabinets and counters you choose and whether the layout changes. Refacing, new cabinets and a full remodel are very different projects. Your written proposal spells out the price, allowances and exclusions before work starts.",
  },
  {
    q: "Do you reface cabinets?",
    a: "Yes. Refacing keeps your cabinet boxes and replaces what you see: doors, drawer fronts, hardware and the exposed frames and sides. It works when the layout suits you and the boxes are solid. If you want to move the sink or appliances, new cabinets make more sense.",
  },
  {
    q: "Do you replace countertops on their own?",
    a: "Yes. We replace countertops on their own, or together with refaced or new cabinets as part of a bigger kitchen update.",
  },
  {
    q: "Can you remodel my kitchen in phases?",
    a: "Yes. A kitchen can be done in stages, such as cabinets and countertops first and flooring or lighting later, to spread out the cost and the disruption.",
  },
  {
    q: "Will I still be able to use my kitchen during the remodel?",
    a: "It depends on the project. A full remodel usually means a temporary kitchen setup for a few weeks; smaller updates often leave part of the room usable. We plan this with you before work starts.",
  },
];

// The navy kitchen (Lehigh Valley); descriptions come from the project's photo records.
const galleryImages = [
  {
    src: "/images/projects/blue-kitchen-cabinet-counters/after/02-blue-kitchen-after_.jpg",
    alt: "Wide view of blue cabinets, patterned countertops and backsplash, a sink and faucet, microwave, and beverage cooler.",
  },
  {
    src: "/images/projects/blue-kitchen-cabinet-counters/after/05-blue-kitchen-cabinets-finished-2.jpg",
    alt: "Kitchen with blue cabinets, patterned countertops and backsplash, a microwave, and a sink with a wood board and slatted rack.",
  },
  {
    src: "/images/projects/blue-kitchen-cabinet-counters/process/01-blue-kitchen-cabinets-counter-top-install.jpg",
    alt: "Close-up of patterned countertop and backsplash beside blue cabinetry, with a faucet and microwave above.",
  },
];

export default function KitchenLandingPage() {
  return (
    <AdLandingPage
      serviceName="Kitchen Remodeling"
      path="/landing/kitchen-remodeling"
      eyebrow="Kitchen remodeling · Lehigh Valley & Berks County"
      title="A kitchen worth gathering in."
      intro="Full remodels, new cabinets or cabinet refacing, planned around how you cook and gather."
      heroImage={galleryImages[0]}
      ctaLabel="Request a kitchen quote"
      firstStepTitle="Tell us about your kitchen"
      reviews={getServiceTestimonials("kitchen-remodeling")}
      gallery={{
        title: "Kitchen details, up close",
        intro: "Cabinets, counters and backsplash from one of our kitchens.",
        label: "Kitchen photos",
        images: galleryImages,
      }}
      faqs={faqs}
      closingTitle="Ready to start your kitchen project?"
    />
  );
}

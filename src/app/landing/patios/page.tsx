import type { Metadata } from "next";
import AdLandingPage from "@/components/sections/AdLandingPage";
import { getServiceTestimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Paver Patios & Pavilions — Get a Quote | Lehigh Valley & Berks County",
  description:
    "Request a paver patio, patio repair or pavilion quote from RHI Pros, PA HIC PA185945. A detailed written proposal before work begins. Serving Allentown, Bethlehem, the Lehigh Valley, Reading and Berks County.",
  robots: { index: false, follow: false },
};

const faqs = [
  {
    q: "How much does a paver patio cost?",
    a: "It depends on the size, the pavers you choose, the base and drainage work and access to the yard. A repair and a new patio with a pavilion are very different projects. Your written proposal spells out the price, allowances and exclusions before work starts.",
  },
  {
    q: "What makes a paver patio last?",
    a: "What is underneath it. Base preparation, drainage, grading and edge restraint decide how a patio holds up, so we review them before the layout is final.",
  },
  {
    q: "Do you repair existing patios?",
    a: "Yes. We reset sunken or loose pavers, replace cracked ones, refill washed-out joints and rebuild failing edges. We look for the cause first: usually the base, the edge restraint or drainage.",
  },
  {
    q: "Do you build pavilions or covered patios?",
    a: "Yes. We build gable-roof pavilions with the patio, so the footings, posts, roof framing, ceiling and lighting are planned together with the layout and drainage.",
  },
];

// The patio and pavilion (Reading), plus the pool deck (Bethlehem) that the patio review is about.
// Descriptions come from each project's photo records.
const heroImage = {
  src: "/images/projects/frontier-patio-gable-roof/after/finished-overview.jpg",
  alt: "Patio and gable-roof pavilion with garden edges beside a house.",
};
const galleryImages = [
  {
    src: "/images/projects/frontier-patio-gable-roof/after/angle-1.jpg",
    alt: "Front view of the gable-roof pavilion, support posts, and patio surface.",
  },
  {
    src: "/images/projects/frontier-patio-gable-roof/after/angle-2.jpg",
    alt: "Pavilion wood ceiling and roof framing viewed from below.",
  },
  {
    src: "/images/projects/frontier-patio-gable-roof/after/finished-alt.jpg",
    alt: "Side view beneath the pavilion roof showing posts, patio edges, and garden planting.",
  },
  {
    src: "/images/projects/bethlehem-pool-patio/after/pool-patio-overview.jpg",
    alt: "Curved pool surround with a gray textured surface and a light stone-pattern border.",
  },
];

export default function PatioLandingPage() {
  return (
    <AdLandingPage
      serviceName="Paver Installation"
      path="/landing/patios"
      eyebrow="Patios & outdoor living · Lehigh Valley & Berks County"
      title="A patio worth staying out for."
      intro="New paver patios, patio repairs and gable-roof pavilions, built on a solid base."
      heroImage={heroImage}
      ctaLabel="Request a patio quote"
      firstStepTitle="Tell us about your patio"
      reviews={getServiceTestimonials("paver-installation")}
      gallery={{
        title: "Patio details, up close",
        intro: "A patio with a gable-roof pavilion, and a new pool deck.",
        label: "Patio photos",
        images: galleryImages,
      }}
      faqs={faqs}
      closingTitle="Ready to start your patio project?"
    />
  );
}

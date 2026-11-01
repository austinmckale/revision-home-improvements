import Image from "next/image";
import ServiceHero from "@/components/sections/ServiceHero";
import Container from "@/components/ui/Container";
import QuoteForm from "@/components/forms/QuoteForm";
import JsonLd from "@/components/JsonLd";
import TestimonialStrip from "@/components/sections/TestimonialStrip";
import FaqList from "@/components/sections/FaqList";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site";
import { getProjectImageProps } from "@/content/projectImagePreviews";
import { getImageFocalClass } from "@/content/imageFocalPoints";
import { curatePhotos } from "@/content/photoCuration";
import type { Testimonial } from "@/content/testimonials";
import { absoluteUrl } from "@/lib/url";
import { getServiceJsonLd } from "@/lib/structuredData";

type LandingImage = { src: string; alt: string };

export type AdLandingPageProps = {
  /** Service name as the quote form and structured data know it, e.g. "Kitchen Remodeling". */
  serviceName: string;
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: LandingImage;
  ctaLabel: string;
  /** First "What happens next" step, e.g. "Tell us about your kitchen". */
  firstStepTitle: string;
  reviews: Testimonial[];
  gallery: { title: string; intro: string; label: string; images: LandingImage[] };
  faqs: { q: string; a: string }[];
  closingTitle: string;
};

/**
 * Ad landing page (noindex, set by each route): hero, the quote form near the top, what happens
 * next, reviews, photos, questions and one closing call. The header drops the site menu on
 * /landing/* so ad visitors stay on the page. Leads record the landing path and ad source.
 */
export default function AdLandingPage({
  serviceName,
  path,
  eyebrow,
  title,
  intro,
  heroImage,
  ctaLabel,
  firstStepTitle,
  reviews,
  gallery,
  faqs,
  closingTitle,
}: AdLandingPageProps) {
  const jsonLd = getServiceJsonLd(
    serviceName,
    absoluteUrl(path),
    "Allentown, Bethlehem, Lehigh Valley, Reading, Wyomissing, Berks County",
  );
  // Hidden photos (clutter, repeat angles) never show, even if a page lists one.
  const photos = curatePhotos(gallery.images);
  const columns = Math.min(photos.length, 4);
  const columnClass = ["", "md:grid-cols-1", "md:grid-cols-2", "md:grid-cols-3", "md:grid-cols-4"][columns];
  const tileHeight = columns <= 2 ? "md:h-80" : columns === 3 ? "md:h-64" : "md:h-52";
  const processSteps = [
    { num: "1", title: firstStepTitle, desc: "Share your location, priorities and the changes you have in mind." },
    {
      num: "2",
      title: "We call to talk it through",
      desc: "We discuss your priorities, location and timing, and set up a visit.",
    },
    {
      num: "3",
      title: "You get a written proposal",
      desc: "Review the work, price and timing before anything starts. Any change is approved by you first.",
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <ServiceHero
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        image={heroImage}
        primaryHref="#landing-quote-form"
        primaryLabel={ctaLabel}
        secondaryHref={siteConfig.phoneHref}
        secondaryLabel={`Call ${siteConfig.phoneDisplay}`}
      />

      <section id="landing-quote-form" className="py-10 md:py-16">
        <Container className="mx-auto max-w-xl">
          <QuoteForm defaultService={serviceName} />
        </Container>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface-soft)] py-10 md:py-14">
        <Container className="mx-auto max-w-2xl">
          <h2 className="heading-serif text-center text-2xl text-[var(--accent)]">What happens next</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {processSteps.map((s) => (
              <div key={s.num} className="text-center md:text-left">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">
                  {s.num}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-[var(--accent)]">{s.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 md:py-14">
        <Container className="mx-auto max-w-5xl">
          <TestimonialStrip items={reviews} />
        </Container>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface-soft)] py-10 md:py-14">
        <Container>
          <h2 className="heading-serif text-center text-2xl text-[var(--accent)] md:text-left">{gallery.title}</h2>
          <p className="mt-1 text-center text-sm text-[var(--muted)] md:text-left">{gallery.intro}</p>
          <div
            className={`mt-5 flex gap-3 overflow-x-auto pb-2 md:grid md:overflow-visible ${columnClass}`}
            tabIndex={0}
            role="region"
            aria-label={gallery.label}
          >
            {photos.map((img) => (
              <div key={img.src} className="w-64 flex-shrink-0 overflow-hidden rounded-xl bg-white md:w-auto">
                <Image
                  {...getProjectImageProps(img)}
                  alt={img.alt}
                  width={600}
                  height={400}
                  sizes={`(max-width: 768px) 256px, ${Math.round(100 / Math.max(columns, 1))}vw`}
                  className={`h-44 w-full object-cover ${tileHeight} ${getImageFocalClass(img.src)}`}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-10 md:pb-14">
        <Container className="mx-auto max-w-2xl">
          <FaqList title="Common questions" items={faqs} />
        </Container>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface-soft)] py-10 md:py-14">
        <Container className="mx-auto max-w-xl text-center">
          <h2 className="heading-serif text-2xl text-[var(--accent)]">{closingTitle}</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">No obligation. A written proposal before any work begins.</p>
          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="#landing-quote-form">Request a quote</Button>
            <Button href={siteConfig.phoneHref} variant="secondary">
              Call {siteConfig.phoneDisplay}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

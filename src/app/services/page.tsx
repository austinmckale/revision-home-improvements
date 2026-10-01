import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import ServiceExplorer from "@/components/sections/ServiceExplorer";
import BottomCTA from "@/components/sections/BottomCTA";
import ConfidenceSection from "@/components/sections/ConfidenceSection";
import { primaryServices } from "@/content/services";
import { getProjectImageProps } from "@/content/projectImagePreviews";
import { getCaseStudyBySlug } from "@/content/caseStudies";
import { getProjectPresentation } from "@/content/projectShowcase";
import { siteConfig } from "@/content/site";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  title: "Remodeling & Restoration Services",
  description:
    "Explore kitchen, bathroom, basement and outdoor remodeling, plus fire and water damage restoration in the Lehigh Valley and Berks County. Explore photo collections and planning guidance.",
  path: "/services",
});

const remodelingOrder = [
  "kitchen-remodeling",
  "bathroom-remodeling",
  "basement-finishing",
  "paver-installation",
  "flooring-installation",
  "exterior-remodeling",
  "drywall-installation-repair",
];
const remodeling = remodelingOrder.flatMap((slug) => primaryServices.filter((service) => service.slug === slug));
const restoration = primaryServices.filter(
  (service) => service.slug === "fire-damage-restoration" || service.slug === "water-damage-restoration",
);
const explorerItems = [
  {
    label: "Kitchens",
    slug: "allentown-kitchen-layout-upgrade",
    description:
      "More room to gather. Better flow for the everyday. Bring layout, cabinetry, surfaces, and finishing details together in one considered plan.",
  },
  {
    label: "Bathrooms",
    slug: "bethlehem-bathroom-refresh",
    description:
      "A better beginning and end to your day. Plan the shower, tile, fixtures, storage, and the details behind the finished surface.",
  },
  {
    label: "Basements",
    slug: "lehigh-valley-basement-finish-and-detail",
    description:
      "Make room for movie nights, family time, or a quieter corner. Start with the existing conditions and shape a space you will actually use.",
  },
  {
    label: "Outdoor living",
    slug: "reading-paver-patio-buildout",
    description:
      "Give home a little more breathing room. Connect patios, gathering areas, and substantial outdoor improvements with a plan that works together.",
  },
].flatMap((item) => {
  const study = getCaseStudyBySlug(item.slug);
  if (!study) return [];
  const { title, image } = getProjectPresentation(study);
  if (!image) return [];
  return [
    {
      label: item.label,
      description: item.description,
      serviceSlug: study.serviceSlug,
      projectSlug: study.slug,
      projectTitle: title,
      location: study.locationName,
      image: { ...getProjectImageProps(image), alt: image.alt },
    },
  ];
});

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ])}
      />
      <ServiceExplorer items={explorerItems} />
      <section id="remodeling" className="scroll-mt-24 py-12 sm:py-20">
        <Container>
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Make room for possibility</p>
              <h2 className="heading-serif mt-3 text-3xl text-[var(--accent)] sm:text-4xl">
                Your home. Your next chapter.
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-[var(--brand)]"
            >
              Explore photo collections <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {remodeling.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="home-service-card group min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-soft)]">
                  <Image
                    {...getProjectImageProps(service.image)}
                    alt={service.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="home-service-image object-cover"
                  />
                  <span className="absolute left-4 top-4 bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 pt-5">
                  <h3 className="heading-serif text-2xl text-[var(--accent)] sm:text-3xl">
                    {service.slug === "paver-installation" ? "Patios & outdoor living" : service.name}
                  </h3>
                  <span aria-hidden="true" className="pt-1 text-xl text-[var(--brand)]">
                    ↗
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{service.short}</p>
              </Link>
            ))}
            <article className="flex min-w-0 flex-col justify-between bg-[var(--accent)] p-6 text-white sm:p-9 lg:col-span-2">
              <div>
                <p className="eyebrow eyebrow-light">One connected plan</p>
                <h3 className="heading-serif mt-5 max-w-xl text-3xl sm:text-4xl">
                  Several rooms. One thoughtful renovation.
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80">
                  When kitchens, bathrooms, floors, and finishes overlap, a coordinated scope keeps the decisions and
                  the work moving together.
                </p>
              </div>
              <Link
                href="/services/whole-home-remodeling"
                className="mt-8 inline-flex min-h-12 items-center justify-between gap-4 border-t border-white/30 pt-4 text-sm font-semibold"
              >
                Explore whole-home remodeling <span aria-hidden="true">↗</span>
              </Link>
            </article>
          </div>
          <div className="mt-12 border-y border-[var(--border)] py-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h3 className="heading-serif text-2xl text-[var(--accent)]">Starting with the cabinets?</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Explore cabinet replacement and installation as part of a coordinated kitchen project.
              </p>
            </div>
            <Link
              href="/berks-county-pa/kitchen-cabinet-installation"
              className="mt-3 inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-[var(--brand)] sm:mt-0"
            >
              Cabinet installation in Berks County ↗
            </Link>
          </div>
        </Container>
      </section>
      <section id="restoration" className="scroll-mt-24 bg-[var(--surface-soft)] py-12 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <p className="eyebrow">When the unexpected happens</p>
              <h2 className="heading-serif mt-4 text-3xl text-[var(--accent)] sm:text-4xl">
                A clearer path to recovery.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
                Fire and water damage call for careful assessment, practical rebuild planning, and steady communication.
              </p>
              <Button href={siteConfig.phoneHref} className="mt-6">
                Call {siteConfig.phoneDisplay}
              </Button>
              <Link
                href="/fire-water-damage-restoration"
                className="mt-4 flex min-h-11 items-center text-sm font-semibold text-[var(--brand)]"
              >
                Emergency restoration guidance ↗
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {restoration.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col justify-between border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--brand)]"
                >
                  <span className="heading-serif text-5xl text-[var(--brand)]">0{index + 1}</span>
                  <div>
                    <h3 className="heading-serif mt-8 text-3xl text-[var(--accent)]">{service.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{service.short}</p>
                    <span className="mt-6 block text-sm font-semibold text-[var(--brand)]">
                      Explore restoration support ↗
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="py-12 sm:py-20">
        <Container>
          <ConfidenceSection
            title="Good work starts with clear expectations."
            intro="Across every service: a written scope, steady communication, and a considered finish."
          />
        </Container>
      </section>
      <BottomCTA
        title="What do you have in mind?"
        description="Tell us what you want to change. We will help you find the right starting point."
        showFinancing={false}
      />
    </>
  );
}

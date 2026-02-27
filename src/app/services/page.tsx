import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import ConfidenceSection from "@/components/sections/ConfidenceSection";
import { primaryServices } from "@/content/services";
import { siteConfig } from "@/content/site";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Remodeling & Restoration Services | Reading PA & Lehigh Valley",
  description:
    "Kitchen, bathroom, basement, flooring, drywall, pavers, and fire/water restoration services across Reading, Berks County, and the Lehigh Valley.",
  alternates: { canonical: "/services" },
};

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }])} />

      <section className="py-14">
        <Container>
          <h1 className="text-4xl font-extrabold text-[var(--accent)]">Our Services</h1>
          <p className="mt-3 max-w-3xl text-[var(--muted)]">
            From kitchens and bathrooms to emergency restoration, every project gets a written scope, a clear timeline, and a team that communicates.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="/request-a-quote">Request a Quote</Button>
            <Button href={siteConfig.phoneHref} variant="secondary">
              Call {siteConfig.phoneDisplay}
            </Button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {primaryServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="surface group overflow-hidden rounded-xl transition hover:border-[var(--brand)]"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    width={900}
                    height={500}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-[var(--accent)]">{service.name}</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">{service.short}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-[var(--brand)]">
                    Learn more &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <ConfidenceSection
            className="mt-10"
            title="What Stays Consistent Across Every Service"
            intro="No matter the project type, we run the same standards for scope clarity, communication, and closeout quality."
          />
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="surface rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[var(--accent)]">Not sure which service fits your project?</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-[var(--muted)]">
              Tell us what you are planning and we will point you in the right direction.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button href="/request-a-quote">Describe Your Project</Button>
              <Button href="/projects" variant="secondary">See Our Work</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

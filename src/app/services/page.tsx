import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/JsonLd";
import ConfidenceSection from "@/components/sections/ConfidenceSection";
import { primaryServices } from "@/content/services";
import { siteConfig } from "@/content/site";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Remodeling & Restoration Services",
  description:
    "Kitchen, bathroom, basement, flooring, drywall, exterior, paver, and fire/water restoration services across Allentown, Bethlehem, the Lehigh Valley, Reading, and Berks County.",
  alternates: { canonical: "/services" },
};

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }])} />

      <section className="py-14 md:py-24">
        <Container>
          <FadeIn>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
              Lehigh Valley &amp; Berks County
            </p>
            <h1 className="heading-serif mt-2 text-4xl text-[var(--accent)] md:text-5xl">Our Services</h1>
            <p className="mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-[var(--muted)] md:text-base">
              From kitchens and bathrooms to emergency restoration, every project gets a written scope, a clear timeline, and a team that communicates.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/request-a-quote">Request a Quote</Button>
              <Button href={siteConfig.phoneHref} variant="secondary">
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2">
              {primaryServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="surface group overflow-hidden rounded-2xl transition hover:ring-1 hover:ring-[var(--brand)]"
                >
                  {service.image.src && (
                    <div className="relative h-56 overflow-hidden md:h-64">
                      <Image
                        src={service.image.src}
                        alt={service.image.alt}
                        width={900}
                        height={500}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5 md:p-6">
                    <h2 className="heading-serif text-xl text-[var(--accent)] md:text-2xl">{service.name}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{service.short}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-[var(--brand)] transition-transform group-hover:translate-x-1">
                      Learn more &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ConfidenceSection
              className="mt-14 md:mt-20"
              title="What Stays Consistent Across Every Service"
              intro="No matter the project type, we run the same standards for scope clarity, communication, and closeout quality."
            />
          </FadeIn>
        </Container>
      </section>

      <section className="surface-soft py-14 md:py-20">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="heading-serif text-2xl text-[var(--accent)] md:text-3xl">Not sure which service fits your project?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
                Tell us what you are planning and we will point you in the right direction.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href="/request-a-quote">Describe Your Project</Button>
                <Button href="/projects" variant="secondary">See Our Work</Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}

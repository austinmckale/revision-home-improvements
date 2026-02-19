import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { primaryServices } from "@/content/services";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Home Improvement Services",
  description:
    "Explore kitchen remodeling, bathroom remodeling, basement finishing, flooring, drywall, paver installation, and restoration services.",
};

export default function ServicesHubPage() {
  return (
    <section className="py-14">
      <Container>
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">Home Improvement Services</h1>
        <p className="mt-3 max-w-3xl text-[var(--muted)]">
          Choose a service to see scope, project flow, and local service-area details.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="/request-a-quote">Request a Quote</Button>
          <Button href={siteConfig.phoneHref} variant="secondary">
            Call {siteConfig.phoneDisplay}
          </Button>
        </div>
        <section className="surface mt-7 rounded-xl p-5">
          <h2 className="text-xl font-semibold text-[var(--accent)]">What you will find on each service page</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            You will see what the service includes, how projects are handled, common questions, and direct links to your city page.
            For emergency restoration work, we lead with call-first options.
          </p>
          <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
            We focus on strong value for the price and can discuss current 0% interest offers for qualified projects.
          </p>
        </section>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {primaryServices.map((service) => (
            <article key={service.slug} className="surface rounded-xl p-6">
              <h2 className="text-xl font-semibold">{service.name}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{service.description}</p>
              <ul className="mt-3 list-disc pl-5 text-sm text-[var(--muted)]">
                {service.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <Link href={`/services/${service.slug}`} className="mt-4 inline-block text-sm font-semibold text-[var(--brand)]">
                View {service.name}
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

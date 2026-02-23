import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { locations } from "@/content/locations";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Revision Home Improvements serves Reading, Wyomissing, Berks County, Allentown, Bethlehem, and Lehigh Valley.",
};

export default function ServiceAreasPage() {
  return (
    <section className="py-14">
      <Container>
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">Service Areas</h1>
        <p className="mt-3 text-[var(--muted)]">
          Explore area-specific service pages with project examples and quote options.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="/request-a-quote">Request a Quote</Button>
          <Button href={siteConfig.phoneHref} variant="secondary">
            Call {siteConfig.phoneDisplay}
          </Button>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {locations.map((location) => (
            <Link key={location.slug} href={`/${location.slug}`} className="surface rounded-xl p-6 hover:border-[var(--brand)]">
              <h2 className="text-xl font-semibold">{location.name}</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">{location.region}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

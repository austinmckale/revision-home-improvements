import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import BottomCTA from "@/components/sections/BottomCTA";
import BeforeAfterToggle from "@/components/sections/BeforeAfterToggle";
import { caseStudies, getCaseStudyBySlug } from "@/content/caseStudies";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/url";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";

type Params = { slug: string };

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return {};
  return {
    title: `${caseStudy.title} | Project Case Study`,
    description: `${caseStudy.summary} ${caseStudy.locationName}.`,
    alternates: { canonical: `/projects/${caseStudy.slug}` },
  };
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.title,
    description: caseStudy.summary,
    url: absoluteUrl(`/projects/${caseStudy.slug}`),
    about: caseStudy.serviceName,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phoneDisplay,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }, { name: caseStudy.title, href: "/projects/" + caseStudy.slug }])} />
      <section className="hero-band py-14">
        <Container className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Project Case Study</p>
            <h1 className="mt-2 text-4xl font-extrabold text-[var(--accent)]">{caseStudy.title}</h1>
            <p className="mt-3 text-[var(--muted)]">{caseStudy.summary}</p>
            <div className="mt-5 grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
              <p className="surface rounded-lg px-3 py-2">Location: {caseStudy.locationName}</p>
              <p className="surface rounded-lg px-3 py-2">Service: {caseStudy.serviceName}</p>
              <p className="surface rounded-lg px-3 py-2">Timeline: {caseStudy.timeline}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/request-a-quote">Request a Similar Quote</Button>
              <Button href={siteConfig.phoneHref} variant="secondary">
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
          </div>
          <div className="surface overflow-hidden rounded-2xl">
            <Image
              src={caseStudy.images[0].src}
              alt={caseStudy.images[0].alt}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold text-[var(--accent)]">Project Scope</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
              {caseStudy.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="mt-8 text-xl font-semibold text-[var(--accent)]">Challenge</h3>
            <p className="mt-2 text-[var(--muted)]">{caseStudy.challenge}</p>

            <h3 className="mt-8 text-xl font-semibold text-[var(--accent)]">Our Approach</h3>
            <p className="mt-2 text-[var(--muted)]">{caseStudy.solution}</p>

            <h3 className="mt-8 text-xl font-semibold text-[var(--accent)]">Outcome</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-[var(--muted)]">
              {caseStudy.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {caseStudy.beforeImages?.length && caseStudy.afterImages?.length ? (
              <BeforeAfterToggle
                beforeImages={caseStudy.beforeImages}
                afterImages={caseStudy.afterImages}
              />
            ) : null}

            <blockquote className="surface mt-8 rounded-xl p-5">
              <p className="text-[var(--muted)]">&ldquo;{caseStudy.testimonial.quote}&rdquo;</p>
              <p className="mt-2 text-sm font-semibold text-[var(--accent)]">{caseStudy.testimonial.author}</p>
            </blockquote>

            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              <Link href={`/services/${caseStudy.serviceSlug}`} className="surface rounded-lg p-3 text-sm hover:border-[var(--brand)]">
                View {caseStudy.serviceName}
              </Link>
              <Link href={`/${caseStudy.locationSlug}/${caseStudy.serviceSlug}`} className="surface rounded-lg p-3 text-sm hover:border-[var(--brand)]">
                View local page for {caseStudy.locationName}
              </Link>
            </div>
          </div>

          <aside>
            <div className="surface rounded-xl p-5">
              <h3 className="text-lg font-semibold text-[var(--accent)]">Project Photos</h3>
              <div className="mt-4 grid gap-3">
                {caseStudy.images.map((image) => (
                  <figure key={image.src} className="overflow-hidden rounded-lg border border-[var(--border)]">
                    <Image src={image.src} alt={image.alt} width={900} height={600} className="h-40 w-full object-cover" />
                  </figure>
                ))}
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <BottomCTA
        title={`Want a similar ${caseStudy.serviceName.toLowerCase()} project?`}
        description={`We serve homeowners across ${caseStudy.locationName} and surrounding areas. Tell us about your project to get started.`}
        links={[{ href: "/services/" + caseStudy.serviceSlug, label: "View " + caseStudy.serviceName }, { href: "/projects", label: "More Projects" }]}
      />
    </>
  );
}

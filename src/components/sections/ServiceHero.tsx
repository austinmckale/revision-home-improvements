import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { getProjectImageProps } from "@/content/projectImagePreviews";

type ServiceHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  image?: { src: string; alt: string };
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  notice?: string;
};

export default function ServiceHero({
  eyebrow,
  title,
  intro,
  image,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  notice,
}: ServiceHeroProps) {
  return (
    <section className="relative isolate flex min-h-[min(700px,78svh)] overflow-hidden bg-[#202823] py-12 text-white sm:py-16">
      {image?.src ? (
        <Image
          {...getProjectImageProps(image)}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover"
        />
      ) : (
        <div className="media-placeholder absolute inset-0 -z-20" aria-hidden="true" />
      )}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,23,20,.9)_0%,rgba(18,23,20,.62)_55%,rgba(18,23,20,.18)_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(18,23,20,.4)_0%,transparent_60%)]" aria-hidden="true" />
      <Container className="relative z-10 flex flex-1 flex-col justify-end pt-20">
        <div className="max-w-4xl">
          <p className="eyebrow eyebrow-light">{eyebrow}</p>
          <h1 className="heading-serif mt-5 max-w-4xl text-4xl leading-[1.04] tracking-[-.03em] text-white sm:text-5xl lg:text-7xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">{intro}</p>
          {notice ? (
            <p className="mt-4 inline-flex items-center gap-3 border-l-2 border-[var(--brand)] bg-black/20 px-4 py-3 text-sm text-white/90">
              <span className="font-semibold text-white">Urgent project?</span> {notice}
            </p>
          ) : null}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={primaryHref} className="inline-flex min-h-12 items-center justify-center gap-3 bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              {primaryLabel} <span aria-hidden="true">↗</span>
            </Link>
            <a href={secondaryHref} className="inline-flex min-h-12 items-center justify-center border border-white/55 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              {secondaryLabel}
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/25 pt-4 text-[0.65rem] font-semibold uppercase tracking-[.14em] text-white/65 sm:mt-16 sm:text-xs">
          <span>PA HIC registered</span>
          <span>Insured</span>
          <span>Written scope before work begins</span>
          <Link href="/licenses-and-insurance" className="underline decoration-white/40 underline-offset-4 transition-colors hover:text-white">Licenses &amp; insurance</Link>
        </div>
      </Container>
    </section>
  );
}

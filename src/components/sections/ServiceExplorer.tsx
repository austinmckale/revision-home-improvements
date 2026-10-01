"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export type ServiceExplorerItem = {
  label: string;
  serviceSlug: string;
  description: string;
  projectSlug: string;
  projectTitle: string;
  location: string;
  image: { src: string; alt: string; unoptimized: boolean };
};

export default function ServiceExplorer({ items }: { items: ServiceExplorerItem[] }) {
  const [selected, setSelected] = useState(0);
  const groupId = useId();
  const active = items[selected];
  if (!active) return null;

  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface-soft)] py-9 sm:py-14 lg:py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr] lg:gap-x-14 lg:gap-y-5">
          <div className="order-1 min-w-0 lg:self-end">
            <p className="eyebrow">Lehigh Valley &amp; Berks County</p>
            <h1 className="heading-serif mt-5 text-[2.65rem] leading-[1.04] tracking-[-.03em] text-[var(--accent)] sm:text-6xl lg:text-[4.25rem]">
              Remodeling,
              <br />
              made personal.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--muted)]">
              Remodeling and restoration, thoughtfully planned around the way you live. Where would you like to begin?
            </p>
            <fieldset className="mt-7">
              <legend className="mb-3 text-xs font-semibold uppercase tracking-[.13em] text-[var(--accent)]">
                Choose a space to explore
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {items.map((item, index) => (
                  <label key={item.serviceSlug} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name={groupId}
                      value={item.serviceSlug}
                      checked={selected === index}
                      onChange={() => setSelected(index)}
                      className="peer sr-only"
                    />
                    <span className="flex min-h-12 items-center justify-between gap-2 border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--accent)] transition-colors hover:border-[var(--accent)] peer-checked:border-[var(--accent)] peer-checked:bg-[var(--accent)] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--brand)]">
                      {item.label}
                      <span aria-hidden="true">{selected === index ? "↗" : "+"}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="order-3 min-w-0 lg:col-start-1 lg:row-start-2 lg:self-start">
            <div aria-live="polite" aria-atomic="true">
              <p className="min-h-[4.5rem] text-sm leading-6 text-[var(--muted)]">{active.description}</p>
            </div>
            <div className="mt-3 grid gap-3 sm:flex sm:flex-wrap">
              <Button href={`/services/${active.serviceSlug}`}>
                Explore {active.label.toLowerCase()}{" "}
                <span className="ml-3" aria-hidden="true">
                  ↗
                </span>
              </Button>
              <Link
                href={`/request-a-quote?service=${active.serviceSlug}`}
                className="inline-flex min-h-12 items-center justify-center border-b border-[var(--accent)] px-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--brand)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]"
              >
                Plan your project
              </Link>
            </div>
          </div>
          <figure className="order-2 min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--accent)] lg:aspect-[4/5]">
              <Image
                key={active.image.src}
                {...active.image}
                alt={active.image.alt}
                fill
                priority={selected === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 bg-[var(--surface)] px-3 py-2 text-[.65rem] font-semibold uppercase tracking-[.12em] text-[var(--accent)]">
                Ideas for your space
              </span>
              <div
                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[.12em] text-white/80">{active.location}</p>
                <Link
                  href={`/projects/${active.projectSlug}`}
                  className="group mt-3 flex items-end justify-between gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span>
                    <span className="heading-serif block text-3xl leading-tight sm:text-4xl">
                      {active.projectTitle}
                    </span>
                    <span className="mt-3 block text-xs font-semibold underline underline-offset-4">
                      Explore the photos
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="mb-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/60 text-xl transition-colors group-hover:bg-[var(--brand)]"
                  >
                    ↗
                  </span>
                </Link>
              </figcaption>
            </div>
          </figure>
        </div>
        <nav
          aria-label="More services"
          className="mt-8 flex flex-col gap-3 border-t border-[var(--border)] pt-5 text-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <a
            href="#remodeling"
            className="inline-flex min-h-11 items-center gap-3 font-semibold text-[var(--accent)] hover:text-[var(--brand)]"
          >
            Explore all remodeling services <span aria-hidden="true">↓</span>
          </a>
          <Link
            href="/fire-water-damage-restoration"
            className="inline-flex min-h-11 items-center gap-3 font-semibold text-[var(--brand)]"
          >
            Fire or water damage? Start here <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </Container>
    </section>
  );
}

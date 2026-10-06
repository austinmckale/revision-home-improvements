"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getImageFocalClass } from "@/content/imageFocalPoints";

export type ServiceExplorerItem = {
  label: string;
  serviceSlug: string;
  description: string;
  projectSlug: string;
  projectTitle: string;
  location: string;
  image: { src: string; alt: string };
};

type PhotoSelection = { index: number; attempt: number };
const photoSrc = (item: ServiceExplorerItem, attempt: number) =>
  `${item.image.src}${attempt ? `${item.image.src.includes("?") ? "&" : "?"}photo_retry=${attempt}` : ""}`;

export default function ServiceExplorer({ items }: { items: ServiceExplorerItem[] }) {
  const [requested, setRequested] = useState<PhotoSelection>({ index: 0, attempt: 0 });
  const [displayed, setDisplayed] = useState<PhotoSelection>({ index: 0, attempt: 0 });
  const [previous, setPrevious] = useState<PhotoSelection | null>(null);
  const [loadState, setLoadState] = useState<{ key: string; status: "idle" | "loading" | "ready" | "error" }>({
    key: "",
    status: "idle",
  });
  const [failedSrc, setFailedSrc] = useState("");
  const displayedRef = useRef(displayed);
  const requestedRef = useRef(requested);
  const attemptRef = useRef(0);
  const transitionRef = useRef<Animation | null>(null);
  const groupId = useId();
  const selected = requested.index;
  const active = items[selected];
  const displayedItem = items[displayed.index];
  const previousItem = previous ? items[previous.index] : undefined;
  const requestedSrc = active ? photoSrc(active, requested.attempt) : "";
  const displayedSrc = displayedItem ? photoSrc(displayedItem, displayed.attempt) : "";

  useEffect(() => {
    const next = items[requested.index];
    if (!next) return;
    let cancelled = false;
    const src = photoSrc(next, requested.attempt);
    const props = getImageProps({ ...next.image, src, fill: true, sizes: "(max-width: 1024px) 100vw, 50vw" }).props;
    const loader = new window.Image();
    loader.decoding = "async";
    const fail = () => {
      if (!cancelled && requestedRef.current === requested) setLoadState({ key: src, status: "error" });
    };
    loader.onload = async () => {
      try {
        await loader.decode();
        if (cancelled || requestedRef.current !== requested) return;
        const current = displayedRef.current;
        if (current.index !== requested.index || current.attempt !== requested.attempt) {
          setPrevious(current);
          displayedRef.current = requested;
          setDisplayed(requested);
        }
        setLoadState({ key: src, status: "ready" });
      } catch {
        fail();
      }
    };
    loader.onerror = fail;
    if (props.srcSet) loader.srcset = props.srcSet;
    if (props.sizes) loader.sizes = props.sizes;
    loader.src = props.src;
    return () => {
      cancelled = true;
      loader.onload = null;
      loader.onerror = null;
    };
  }, [items, requested]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handlePreference = () => {
      if (!preference.matches) return;
      transitionRef.current?.cancel();
      setPrevious(null);
    };
    preference.addEventListener("change", handlePreference);
    return () => {
      preference.removeEventListener("change", handlePreference);
      transitionRef.current?.cancel();
    };
  }, []);

  function requestPhoto(index: number, retry = false) {
    const next = { index, attempt: retry ? ++attemptRef.current : 0 };
    requestedRef.current = next;
    setRequested(next);
    setLoadState({ key: photoSrc(items[index], next.attempt), status: "loading" });
  }

  function finishPhotoLoad(element: HTMLImageElement) {
    if (!displayedItem || displayedRef.current !== displayed) return;
    if (failedSrc === displayedSrc) setFailedSrc("");
    if (requestedRef.current.index === displayed.index && requestedRef.current.attempt === displayed.attempt) {
      setLoadState({ key: displayedSrc, status: "ready" });
    }
    transitionRef.current?.cancel();
    if (!previous || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !element.animate) {
      setPrevious(null);
      return;
    }
    const animation = element.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 220,
      easing: "ease-out",
      fill: "forwards",
    });
    transitionRef.current = animation;
    animation.onfinish = () => {
      if (displayedRef.current === displayed) setPrevious(null);
    };
  }

  function failDisplayedPhoto() {
    if (displayedRef.current !== displayed) return;
    transitionRef.current?.cancel();
    setFailedSrc(displayedSrc);
    if (requestedRef.current.index === displayed.index && requestedRef.current.attempt === displayed.attempt) {
      setLoadState({ key: displayedSrc, status: "error" });
    }
    if (previous) {
      displayedRef.current = previous;
      setDisplayed(previous);
      setPrevious(null);
    }
  }

  if (!active) return null;

  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface-soft)] py-9 sm:py-14 lg:py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr] lg:gap-x-14 lg:gap-y-5">
          <div className="order-1 min-w-0 lg:self-end">
            <h1>
              <span className="eyebrow text-balance">
                Remodeling &amp; restoration services · Lehigh Valley &amp; Berks County
              </span>{" "}
              <span className="heading-serif mt-5 block text-[2.65rem] leading-[1.04] tracking-[-.03em] text-[var(--accent)] sm:text-6xl lg:text-[4.25rem]">
                Remodeling,{" "}
                <br />
                made personal.
              </span>
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
                      onChange={() => requestPhoto(index)}
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
              {previousItem && previous ? (
                <Image
                  {...previousItem.image}
                  src={photoSrc(previousItem, previous.attempt)}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover ${getImageFocalClass(previousItem.image.src)}`}
                />
              ) : null}
              {displayedItem ? (
                <Image
                  key={displayedSrc}
                  {...displayedItem.image}
                  src={displayedSrc}
                  alt={displayedItem.image.alt}
                  fill
                  priority={displayed.index === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onLoad={(event) => finishPhotoLoad(event.currentTarget)}
                  onError={failDisplayedPhoto}
                  style={{ opacity: previous ? 0 : undefined }}
                  className={`object-cover ${getImageFocalClass(displayedItem.image.src)} ${failedSrc === displayedSrc ? "opacity-0" : ""}`}
                />
              ) : null}
              <span className="absolute left-4 top-4 bg-[var(--surface)] px-3 py-2 text-[.65rem] font-semibold uppercase tracking-[.12em] text-[var(--accent)]">
                Ideas for your space
              </span>
              <div
                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[.12em] text-white/80">
                  {displayedItem?.location}
                </p>
                <Link
                  href={`/projects/${displayedItem?.projectSlug ?? active.projectSlug}`}
                  className="group mt-3 flex items-end justify-between gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span>
                    <span className="heading-serif block text-3xl leading-tight sm:text-4xl">
                      {displayedItem?.projectTitle}
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
            <div
              className="mt-3 min-h-6 text-sm text-[var(--muted)]"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {loadState.key === requestedSrc && loadState.status === "loading" ? (
                <p>Loading {active.label.toLowerCase()} photo…</p>
              ) : loadState.key === requestedSrc && loadState.status === "error" ? (
                <div>
                  <p>That photo could not load. You can try again or explore the service.</p>
                  <button
                    type="button"
                    onClick={() => requestPhoto(selected, true)}
                    className="mt-1 inline-flex min-h-11 items-center font-semibold text-[var(--brand)] underline underline-offset-4"
                  >
                    Try photo again
                  </button>
                </div>
              ) : null}
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

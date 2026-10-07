"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MAX_QUOTE_PHOTOS, MAX_QUOTE_PHOTO_BYTES, MAX_QUOTE_PHOTOS_TOTAL_BYTES } from "@/lib/quoteSchema";

export type QuotePhoto = { name: string; type: "image/jpeg"; data: string; bytes: number; preview: string };

const MAX_EDGE = 1600;
// Aim well under the per-photo cap so four photos fit the shared request budget.
const TARGET_BYTES = Math.min(MAX_QUOTE_PHOTO_BYTES, Math.floor(MAX_QUOTE_PHOTOS_TOTAL_BYTES / MAX_QUOTE_PHOTOS));

function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/** Resize in the browser and re-encode as JPEG, which also drops location metadata. */
async function preparePhoto(file: File): Promise<QuotePhoto> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  let edge = MAX_EDGE;
  let quality = 0.82;
  for (let attempt = 0; attempt < 6; attempt++) {
    const scale = Math.min(1, edge / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    if (blob && (blob.size <= TARGET_BYTES || attempt === 5)) {
      bitmap.close();
      if (blob.size > MAX_QUOTE_PHOTO_BYTES) throw new Error("too large");
      return {
        name: file.name.slice(0, 100) || "photo.jpg",
        type: "image/jpeg",
        data: await blobToBase64(blob),
        bytes: blob.size,
        preview: URL.createObjectURL(blob),
      };
    }
    quality = Math.max(0.55, quality - 0.1);
    edge = Math.round(edge * 0.82);
  }
  bitmap.close();
  throw new Error("too large");
}

/** Optional project photos (up to four), resized on the device before they are sent. */
export default function PhotoPicker({
  photos,
  onChange,
  disabled = false,
}: {
  photos: QuotePhoto[];
  onChange: (photos: QuotePhoto[]) => void;
  disabled?: boolean;
}) {
  const id = useId();
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // When the focused control disappears (Add tile at the limit, or a removed photo), keep focus in the picker.
  const restoreFocus = () =>
    requestAnimationFrame(() => {
      if (inputRef.current?.isConnected) inputRef.current.focus();
      else listRef.current?.querySelector<HTMLButtonElement>("li:last-of-type button")?.focus();
    });
  const [error, setError] = useState("");
  const photosRef = useRef(photos);

  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  // Release preview memory when the picker goes away.
  useEffect(() => () => photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.preview)), []);

  const addFiles = async (files: FileList | null) => {
    if (!files?.length || busyRef.current) return;
    const hadFocus = document.activeElement === inputRef.current;
    setError("");
    const room = MAX_QUOTE_PHOTOS - photos.length;
    const selected = Array.from(files).slice(0, room);
    if (files.length > room) setError(`You can add up to ${MAX_QUOTE_PHOTOS} photos.`);
    // Keep the input enabled while processing so keyboard focus stays in place.
    busyRef.current = true;
    setBusy(true);
    const added: QuotePhoto[] = [];
    let unreadable = 0;
    for (const file of selected) {
      try {
        added.push(await preparePhoto(file));
      } catch {
        unreadable++;
      }
    }
    busyRef.current = false;
    setBusy(false);
    const next = [...photos];
    for (const photo of added) {
      const total = next.reduce((sum, item) => sum + item.bytes, 0) + photo.bytes;
      if (total > MAX_QUOTE_PHOTOS_TOTAL_BYTES) {
        URL.revokeObjectURL(photo.preview);
        setError("Those photos are too large together. Try fewer photos.");
        continue;
      }
      next.push(photo);
    }
    if (unreadable) setError("A photo could not be read. Try a JPG or PNG from your camera roll.");
    onChange(next);
    if (hadFocus) restoreFocus();
  };

  const remove = (index: number) => {
    URL.revokeObjectURL(photos[index].preview);
    onChange(photos.filter((_, position) => position !== index));
    restoreFocus();
  };

  return (
    <div className="text-left">
      <p id={`${id}-label`} className="text-sm font-semibold text-[var(--accent)]">
        Photos <span className="font-normal text-[var(--muted)]">(optional, up to {MAX_QUOTE_PHOTOS})</span>
      </p>
      <p id={`${id}-help`} className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
        A few photos of the space help us prepare. They are resized on your device and sent only with this request.
      </p>
      <ul ref={listRef} className="mt-3 flex flex-wrap gap-2" aria-labelledby={`${id}-label`}>
        {photos.map((photo, index) => (
          <li key={photo.preview} className="relative h-20 w-20 overflow-hidden border border-[var(--border)]">
            {/* Local blob previews cannot go through next/image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.preview} alt={`Selected photo ${index + 1}`} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => remove(index)}
              disabled={disabled}
              aria-label={`Remove photo ${index + 1}`}
              className="absolute right-0.5 top-0.5 grid h-7 w-7 place-items-center rounded-full bg-black/70 text-sm text-white"
            >
              ×
            </button>
          </li>
        ))}
        {photos.length < MAX_QUOTE_PHOTOS ? (
          <li>
            <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center border border-dashed border-[var(--accent)]/40 text-xs font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--surface-soft)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--brand)]">
              <span className="text-xl leading-none" aria-hidden="true">
                +
              </span>
              {busy ? "Adding…" : "Add"}
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                disabled={disabled}
                aria-describedby={`${id}-help`}
                aria-label="Add photos"
                className="sr-only"
                onChange={(event) => {
                  void addFiles(event.target.files);
                  event.target.value = "";
                }}
              />
            </label>
          </li>
        ) : null}
      </ul>
      <p className="sr-only" aria-live="polite">
        {busy ? "Preparing photos" : `${photos.length} ${photos.length === 1 ? "photo" : "photos"} added`}
      </p>
      {error ? (
        <p role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Shape photos for the quote API (drops browser-only preview fields). */
export function photosForRequest(photos: QuotePhoto[]) {
  return photos.map(({ name, type, data }) => ({ name, type, data }));
}

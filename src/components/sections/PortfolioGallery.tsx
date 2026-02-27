import Image from "next/image";
import type { PortfolioImage } from "@/lib/portfolio";

type Props = {
  images: PortfolioImage[];
  title?: string;
  showStageLabels?: boolean;
};

const stageLabel: Record<string, string> = {
  BEFORE: "Before",
  DURING: "In Progress",
  AFTER: "After",
};

export default function PortfolioGallery({
  images,
  title = "Recent Work",
  showStageLabels = true,
}: Props) {
  if (images.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-[var(--accent)]">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <figure key={img.id} className="surface group relative overflow-hidden rounded-lg">
            <Image
              src={img.thumbnail || img.url}
              alt={img.alt}
              width={700}
              height={500}
              className="h-48 w-full object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {showStageLabels && img.stage && (
              <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs font-semibold text-white">
                {stageLabel[img.stage] ?? img.stage}
              </span>
            )}
            {img.jobName && (
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-6">
                <p className="text-sm font-medium text-white">{img.jobName}</p>
                {img.area && <p className="text-xs text-white/70">{img.area}</p>}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}

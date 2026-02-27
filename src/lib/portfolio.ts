import { unstable_cache } from "next/cache";
import { supabase } from "./supabase";

export type PortfolioImage = {
  id: string;
  url: string;
  thumbnail: string;
  alt: string;
  stage: "BEFORE" | "DURING" | "AFTER" | null;
  area: string | null;
  tags: string[];
  jobName: string;
  takenAt: string | null;
};

const bucket = process.env.PORTFOLIO_STORAGE_BUCKET ?? "site-public";

/**
 * Build a public CDN URL for a portfolio image.
 * Uses Supabase image transforms (width param) which also strips EXIF
 * metadata -- preventing GPS coordinates from leaking to site visitors.
 */
function publicUrl(storageKey: string, width = 1200): string {
  const base = `${process.env.PORTFOLIO_SUPABASE_URL}/storage/v1/object/public/${bucket}/${storageKey}`;
  return `${base}?width=${width}&quality=80`;
}

function thumbnailUrl(storageKey: string): string {
  return publicUrl(storageKey, 480);
}

async function fetchPortfolioImages(options?: {
  serviceTags?: string[];
  stage?: "BEFORE" | "DURING" | "AFTER";
  limit?: number;
}): Promise<PortfolioImage[]> {
  if (!supabase) return [];

  try {
    let query = supabase
      .from("FileAsset")
      .select(
        `id, storageKey, fileName, stage, area, tags, description, takenAt,
         Job:jobId ( jobName, categoryTags )`,
      )
      .eq("isPortfolio", true)
      .eq("type", "PHOTO")
      .order("takenAt", { ascending: false });

    if (options?.stage) {
      query = query.eq("stage", options.stage);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error || !data) return [];

    return (data as any[])
      .filter((row) => {
        if (!options?.serviceTags?.length) return true;
        const jobTags: string[] = row.Job?.categoryTags ?? [];
        return options.serviceTags.some((tag) =>
          jobTags.some((jt) => jt.toLowerCase().includes(tag.toLowerCase())),
        );
      })
      .map((row) => ({
        id: row.id,
        url: publicUrl(row.storageKey),
        thumbnail: thumbnailUrl(row.storageKey),
        alt: row.description || row.fileName || "Project photo",
        stage: row.stage,
        area: row.area,
        tags: row.tags ?? [],
        jobName: row.Job?.jobName ?? "",
        takenAt: row.takenAt,
      }));
  } catch {
    return [];
  }
}

/**
 * Fetch portfolio-flagged photos from the Manager App's Supabase.
 * Falls back to an empty array when Supabase is not configured.
 * Results are cached and tagged "portfolio" -- call revalidateTag("portfolio")
 * to bust the cache instantly when new photos are published.
 */
export const getPortfolioImages = unstable_cache(
  fetchPortfolioImages,
  ["portfolio-images"],
  { tags: ["portfolio"], revalidate: 3600 },
);

/**
 * Grouped before/during/after for a single project showcase.
 */
export async function getPortfolioByStage(serviceTags?: string[]) {
  const all = await getPortfolioImages({ serviceTags, limit: 50 });
  return {
    before: all.filter((img) => img.stage === "BEFORE"),
    during: all.filter((img) => img.stage === "DURING"),
    after: all.filter((img) => img.stage === "AFTER"),
    ungrouped: all.filter((img) => !img.stage),
  };
}

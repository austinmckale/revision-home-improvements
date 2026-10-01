import type { Metadata } from "next";
import { company } from "@/content/company";

type PageMetadataOptions = {
  title: string | { absolute: string };
  description: string;
  path: string;
  image?: { url: string; alt: string; width?: number; height?: number };
  robots?: Metadata["robots"];
};

/** Keep informational-page previews aligned with the document title and canonical URL. */
export function getPageMetadata({ title, description, path, image: pageImage, robots }: PageMetadataOptions): Metadata {
  const shareTitle = typeof title === "string" ? `${title} | ${company.name}` : title.absolute;
  const defaultImage = {
    url: `${company.domain}/images/brand/rhi-pros-share.png`,
    width: 1200,
    height: 630,
    alt: "RHI Pros · rhipros.com",
  };
  const image = pageImage ? { ...pageImage, url: new URL(pageImage.url, company.domain).toString() } : defaultImage;

  return {
    title,
    description,
    alternates: { canonical: path },
    ...(robots ? { robots } : {}),
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: company.name,
      title: shareTitle,
      description,
      url: new URL(path, company.domain).toString(),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image],
    },
  };
}

import { siteConfig } from "@/content/site";

export function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.domain}${normalized}`;
}

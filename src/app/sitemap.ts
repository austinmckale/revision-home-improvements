import { MetadataRoute } from "next";
import { locations } from "@/content/locations";
import { services, primaryServices } from "@/content/services";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/service-areas",
    "/request-a-quote",
    "/projects",
    "/about",
    "/financing",
    "/insurance-claims",
    "/privacy",
  ];

  const serviceRoutes = primaryServices.map((service) => `/services/${service.slug}`);
  const cityRoutes = locations.map((location) => `/${location.slug}`);
  const cityServiceRoutes = locations.flatMap((location) =>
    services.map((service) => `/${location.slug}/${service.slug}`),
  );

  return [...staticRoutes, ...serviceRoutes, ...cityRoutes, ...cityServiceRoutes].map((route) => ({
    url: `${siteConfig.domain}${route || "/"}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}

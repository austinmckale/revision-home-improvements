import { MetadataRoute } from "next";
import { locations } from "@/content/locations";
import { services, primaryServices } from "@/content/services";
import { caseStudies } from "@/content/caseStudies";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/service-areas",
    "/request-a-quote",
    "/projects",
    "/about",
    "/our-process",
    "/warranty",
    "/licenses-and-insurance",
    "/financing",
    "/financing-terms",
    "/insurance-claims",
    "/fire-water-damage-restoration",
    "/privacy",
  ];

  const serviceRoutes = primaryServices.map((service) => `/services/${service.slug}`);
  const cityRoutes = locations.map((location) => `/${location.slug}`);
  const caseStudyRoutes = caseStudies.map((item) => `/projects/${item.slug}`);
  const cityServiceRoutes = locations.flatMap((location) =>
    services.map((service) => `/${location.slug}/${service.slug}`),
  );

  return [...staticRoutes, ...serviceRoutes, ...cityRoutes, ...caseStudyRoutes, ...cityServiceRoutes].map((route) => ({
    url: `${siteConfig.domain}${route || "/"}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}

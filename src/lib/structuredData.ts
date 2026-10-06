import { company } from "@/content/company";
import { siteConfig } from "@/content/site";
import { primaryServices } from "@/content/services";

export const businessEntityId = `${company.domain}/#business`;

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: `${siteConfig.domain}/`,
    inLanguage: "en-US",
    publisher: { "@id": businessEntityId },
  };
}

/** Service-area places only; the business has no verified public street address. */
const regionAreaTypes: Record<string, string> = {
  "Berks County, PA": "AdministrativeArea",
  "Lehigh Valley, PA": "Place",
};

function getAreaServedJsonLd() {
  return company.serviceAreaList.map((name) => ({ "@type": regionAreaTypes[name] ?? "City", name }));
}

export function getLocalBusinessJsonLd() {
  const sameAs = [
    company.social.googleBusinessProfile,
    company.social.facebook,
    company.social.angi,
    company.social.houzz,
    company.social.yelp,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": businessEntityId,
    name: company.name,
    legalName: company.legalName,
    url: company.domain,
    telephone: company.phone.e164,
    email: company.email,
    image: `${company.domain}${company.assets.ogImage}`,
    logo: `${company.domain}${company.assets.logo}`,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    identifier: {
      "@type": "PropertyValue",
      name: "Pennsylvania Home Improvement Contractor Registration",
      value: company.license.hic,
    },
    areaServed: getAreaServedJsonLd(),
    // The configured market label is a service area, not a verified public business address.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Remodeling and restoration services",
      itemListElement: primaryServices.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          url: `${company.domain}/services/${service.slug}`,
        },
      })),
    },
  };
}

export function getServiceJsonLd(serviceName: string, url: string, areaServed: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    provider: {
      "@id": businessEntityId,
    },
    areaServed,
    url,
  };
}

export function getFaqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function getBreadcrumbJsonLd(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.domain}${item.href}`,
    })),
  };
}

export function getHowToJsonLd(name: string, steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text,
    })),
  };
}

export function getCityServiceJsonLd({
  businessName,
  cityName,
  serviceName,
  url,
  image,
}: {
  businessName: string;
  cityName: string;
  serviceName: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${serviceName} in ${cityName}`,
        serviceType: serviceName,
        ...(image ? { image } : {}),
        areaServed: {
          "@type": "Place",
          name: cityName,
        },
        provider: {
          "@id": businessEntityId,
          name: businessName,
        },
        url,
      },
    ],
  };
}

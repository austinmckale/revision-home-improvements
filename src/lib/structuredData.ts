import { company } from "@/content/company";
import { siteConfig } from "@/content/site";

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: `${siteConfig.domain}/`,
  };
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
    areaServed: [...company.serviceAreaList],
    address: {
      "@type": "PostalAddress",
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      addressCountry: company.address.country,
    },
  };
}

export function getServiceJsonLd(serviceName: string, url: string, areaServed: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    provider: {
      "@type": "GeneralContractor",
      name: company.name,
      legalName: company.legalName,
      telephone: company.phone.e164,
      url: company.domain,
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
        areaServed: {
          "@type": "City",
          name: cityName,
        },
        provider: {
          "@type": "GeneralContractor",
          name: businessName,
          legalName: company.legalName,
          telephone: company.phone.e164,
          url: company.domain,
        },
        url,
      },
      {
        "@type": "HomeAndConstructionBusiness",
        name: `${businessName} - ${serviceName}`,
        ...(image ? { image } : {}),
        url,
        telephone: company.phone.e164,
        areaServed: {
          "@type": "City",
          name: cityName,
        },
      },
    ],
  };
}

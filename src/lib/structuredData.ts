import { siteConfig } from "@/content/site";

export function getLocalBusinessJsonLd() {
  const sameAs = [siteConfig.googleBusinessProfileUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: siteConfig.name,
    url: siteConfig.domain,
    telephone: "+1-484-706-9229",
    email: siteConfig.primaryEmail,
    image: `${siteConfig.domain}${siteConfig.ogImage}`,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    areaServed: [
      "Reading, PA",
      "Wyomissing, PA",
      "Berks County, PA",
      "Allentown, PA",
      "Bethlehem, PA",
      "Lehigh Valley, PA",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    priceRange: "$$",
  };
}

export function getServiceJsonLd(serviceName: string, url: string, areaServed: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    provider: {
      "@type": "GeneralContractor",
      name: siteConfig.name,
      telephone: "+1-484-706-9229",
      url: siteConfig.domain,
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

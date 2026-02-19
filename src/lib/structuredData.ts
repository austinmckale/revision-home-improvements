import { siteConfig } from "@/content/site";

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: siteConfig.name,
    url: siteConfig.domain,
    telephone: "+1-484-509-6567",
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
      telephone: "+1-484-509-6567",
    },
    areaServed,
    url,
  };
}

import { company } from "@/content/company";

/** @deprecated Prefer `company` for new code. Kept for existing imports. */
export const siteConfig = {
  name: company.name,
  legalName: company.legalName,
  domain: company.domain,
  phoneDisplay: company.phone.display,
  phoneHref: company.phone.href,
  primaryEmail: company.email,
  googleBusinessProfileUrl: company.social.googleBusinessProfile,
  facebookPageUrl: company.social.facebook,
  angiUrl: company.social.angi,
  houzzUrl: company.social.houzz,
  yelpUrl: company.social.yelp,
  serviceAreas: company.serviceAreas,
  address: company.address,
  ogImage: company.assets.ogImage,
  logo: company.assets.logo,
  hicNumber: company.license.hic,
  hicLabel: company.license.label,
  insuranceCarrier: company.insuranceCarrier,
  financing: company.financing,
};

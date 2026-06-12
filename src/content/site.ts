import { company } from "@/content/company";

/** @deprecated Prefer `company` for new code. Kept for existing imports. */
export const siteConfig = {
  name: company.name,
  domain: company.domain,
  phoneDisplay: company.phone.display,
  phoneHref: company.phone.href,
  primaryEmail: company.email,
  googleBusinessProfileUrl: company.social.googleBusinessProfile,
  facebookPageUrl: company.social.facebook,
  serviceAreas: company.serviceAreas,
  address: company.address,
  ogImage: company.assets.ogImage,
  logo: company.assets.logo,
  hicNumber: company.license.hic,
  insuranceCarrier: company.insuranceCarrier,
  financing: company.financing,
};

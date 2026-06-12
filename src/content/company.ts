/**
 * Single source of truth for business identity, contact, and brand references.
 * Import `company` for new code; `siteConfig` in site.ts re-exports the same values.
 */
export const company = {
  name: "RHI Pros",
  /** Legal entity name when it matches public branding. Update if the registered name differs. */
  legalName: "RHI Pros",
  /** Older public listings still in circulation (e.g. legacy social profiles). */
  formerNames: ["Revision Home Improvement"] as const,
  domain: "https://www.rhipros.com",
  phone: {
    display: "(484) 706-9229",
    e164: "+1-484-706-9229",
    href: "tel:+14847069229",
  },
  email: "quotes@rhipros.com",
  license: {
    hic: "PA185945",
    label: "PA HIC #PA185945",
  },
  serviceAreas:
    "Allentown, Bethlehem, the Lehigh Valley, Reading, Wyomissing, and Berks County",
  serviceAreaList: [
    "Reading, PA",
    "Wyomissing, PA",
    "Berks County, PA",
    "Allentown, PA",
    "Bethlehem, PA",
    "Lehigh Valley, PA",
  ] as const,
  address: {
    street: "Lehigh Valley, PA",
    city: "Lehigh Valley",
    region: "PA",
    postalCode: "18101",
    country: "US",
  },
  social: {
    googleBusinessProfile:
      "https://www.google.com/maps/place/RHI+Pros/@40.565969,-77.5904957,8z/data=!4m8!3m7!1s0xaacdc9559cf13b27:0xa432cdb7cf5eefa0!8m2!3d40.565969!4d-77.5904957!9m1!1b1!16s%2Fg%2F11x27867dk",
    facebook: "https://www.facebook.com/people/Revision-Home-Improvement/61550081845634/",
  },
  assets: {
    logo: "/images/brand/rhi-logo.png",
    ogImage: "/images/projects/frontier-patio-gable-roof/after/finished-overview.jpg",
  },
  insuranceCarrier: "Provided upon request during estimate review",
  financing: {
    teaser: "0% promotional financing may be available for qualified customers.",
    shortDisclosure: "Subject to lender approval. Terms vary.",
    disclosure:
      "Financing offers are subject to lender approval. Program availability, rates, and term length vary by borrower profile and project scope.",
  },
} as const;

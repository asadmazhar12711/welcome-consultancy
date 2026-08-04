/** Brand illustration registry — soft-3D editorial navy/gold language */

export const ILLUSTRATIONS = {
  hero: {
    src: "/illustrations/hero-global-trade.webp",
    alt: "Cinematic night port with gold-accented containers and cargo ship — global export logistics",
    width: 1376,
    height: 768,
  },
  process: {
    src: "/illustrations/process-workflow.webp",
    alt: "Three-stage advisory workflow: diagnose eligibility, file with precision, realize incentives",
    width: 1376,
    height: 768,
  },
  incentives: {
    src: "/illustrations/incentives-flow.webp",
    alt: "Infographic flow from government schemes through business to export incentive realization",
    width: 1376,
    height: 768,
  },
  consultancy: {
    src: "/illustrations/consultancy-advisory.webp",
    alt: "Abstract advisory architecture assembling compliance strategy into a golden core",
    width: 1376,
    height: 768,
  },
  contact: {
    src: "/illustrations/contact-workspace.webp",
    alt: "Premium advisory workspace with holographic trade dashboard overlooking a dusk port city",
    width: 1376,
    height: 1024,
  },
  about: {
    src: "/illustrations/about-timeline.webp",
    alt: "Timeline from founding through PAN India expansion to a modern advisory hub",
    width: 1376,
    height: 768,
  },
  faq: {
    src: "/illustrations/faq-clarity.webp",
    alt: "Prism of clarity casting gold light through fog of paperwork into ordered answers",
    width: 1376,
    height: 1024,
  },
  testimonials: {
    src: "/illustrations/testimonials-trust.webp",
    alt: "Verified exporter trust constellation with gold badges and industry emblems",
    width: 1376,
    height: 768,
  },
  cta: {
    src: "/illustrations/cta-horizon.webp",
    alt: "Dawn trade horizon with gold shipping lane toward global ports",
    width: 1376,
    height: 768,
  },
  decoRoutes: {
    src: "/illustrations/deco-trade-routes.webp",
    alt: "",
    width: 1376,
    height: 768,
  },
  services: {
    rodtep: {
      src: "/illustrations/service-rodtep.webp",
      alt: "Customs cargo and tax remission visualization for RoDTEP claims",
    },
    epcg: {
      src: "/illustrations/service-epcg.webp",
      alt: "Capital goods machinery with duty-exemption shield for EPCG",
    },
    iec: {
      src: "/illustrations/service-iec.webp",
      alt: "Digital trade identity crystal for IEC registration",
    },
    dgft: {
      src: "/illustrations/service-dgft.webp",
      alt: "DGFT government workflow portal with licensing stages",
    },
    compliance: {
      src: "/illustrations/service-compliance.webp",
      alt: "Secure sealed document vault for trade compliance",
    },
    advanceLicence: {
      src: "/illustrations/service-advance-licence.webp",
      alt: "Duty-free input materials transforming through Advance Licence portal",
    },
    exportHouse: {
      src: "/illustrations/service-export-house.webp",
      alt: "Star Export House prestige emblem and status tiers",
    },
    coo: {
      src: "/illustrations/service-coo.webp",
      alt: "Certificate of Origin seal with luminous trade route",
    },
    aeo: {
      src: "/illustrations/service-aeo.webp",
      alt: "AEO trusted-trader shield and customs fast lane",
    },
    dsc: {
      src: "/illustrations/service-dsc.webp",
      alt: "Digital signature token sealing encrypted trade documents",
    },
    icegate: {
      src: "/illustrations/service-icegate.webp",
      alt: "ICEGATE customs gateway with bill of entry holograms",
    },
    fssai: {
      src: "/illustrations/service-fssai.webp",
      alt: "FSSAI food export safety certification visualization",
    },
    rcmc: {
      src: "/illustrations/service-rcmc.webp",
      alt: "RCMC chamber membership seal and affiliation network",
    },
  },
} as const;

export type ServiceIllustrationKey = keyof typeof ILLUSTRATIONS.services;

const SLUG_TO_ILLUSTRATION: Record<string, ServiceIllustrationKey> = {
  "iec-code-import-export-code": "iec",
  "export-incentives": "rodtep",
  "epcg-license": "epcg",
  "advance-licence": "advanceLicence",
  "export-house-certificate": "exportHouse",
  "rcmc-application": "rcmc",
  "c-o-o-certificate-of-origin": "coo",
  "digital-signature": "dsc",
  "ad-code-registration": "icegate",
  fssai: "fssai",
  "aeo-registration": "aeo",
  "sims-registration": "compliance",
  "health-certificate": "fssai",
  "interest-equalization": "rodtep",
  "rex-registration": "coo",
  "icegate-registration": "icegate",
};

export function illustrationForService(slug: string) {
  const key = SLUG_TO_ILLUSTRATION[slug] ?? "dgft";
  return ILLUSTRATIONS.services[key];
}

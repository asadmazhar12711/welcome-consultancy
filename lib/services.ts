import { getServiceExtras } from "@/lib/service-extras";

export type ServiceFaq = { q: string; a: string };

export type ServiceRecord = {
  slug: string;
  navTitle: string;
  title: string;
  category: string;
  shortDesc: string;
  turnaround: string;
  heroSubtitle: string;
  answerSummary: string;
  body: string[];
  checklist: string[];
  faqs: ServiceFaq[];
  benefits?: string[];
  documents?: string[];
};

export type ServiceDetail = ServiceRecord & {
  benefits: string[];
  documents: string[];
  pageDescription: string;
};

export const SERVICES: ServiceRecord[] = [
  {
    slug: "iec-code-import-export-code",
    navTitle: "IEC Code Registration",
    title: "Import – Export Code (IEC) Registration",
    category: "Core Licensing",
    shortDesc:
      "Fast-track Import Export Code registration and modifications issued by DGFT for international trade.",
    turnaround: "1 – 2 Business Days",
    heroSubtitle: "Instant DGFT IEC issuance & modification advisory across India.",
    answerSummary:
      "IEC Code Registration is a mandatory 10-digit DGFT licence that every Indian importer and exporter needs before clearing customs. Welcome Consultancy completes IEC issuance and modification in 1–2 business days.",
    body: [
      "An Import Export Code (IEC) is a 10-digit mandatory registration issued by the Directorate General of Foreign Trade (DGFT) for any business expanding into international trade.",
      "Without a valid IEC, you cannot clear goods through Indian Customs, claim export incentives, or open foreign remittance channels. Welcome Consultancy handles new IEC applications, modifications, annual updates, and surrender filings end-to-end.",
      "We prepare PAN-linked documentation, digital filings on the DGFT portal, and ensure your IEC remains active for continuous EXIM operations.",
    ],
    checklist: [
      "PAN Card of Business Entity & Proprietor / Directors",
      "Aadhaar Card / Passport / Voter ID of Applicant",
      "Proof of Business Premises (Rent Agreement / Electricity Bill)",
      "Cancelled Cheque / Bank Certificate with pre-printed account name",
    ],
    faqs: [
      {
        q: "Is IEC registration mandatory for EXIM operations?",
        a: "Yes, IEC is mandatory for all importers and exporters clearing customs in India, except for specific government exempt categories.",
      },
      {
        q: "Does IEC require annual renewal?",
        a: "DGFT requires annual online updating of IEC details between April and June every year.",
      },
    ],
  },
  {
    slug: "export-incentives",
    navTitle: "Export Incentives",
    title: "Export Incentives (RoDTEP / RoSCTL / Duty Drawback)",
    category: "Export Incentives",
    shortDesc:
      "Maximize government rebate claims on duties, taxes, and levies embedded in export production.",
    turnaround: "3 – 5 Business Days",
    heroSubtitle:
      "Recover embedded taxes and maximize export profitability through DGFT incentive schemes.",
    answerSummary:
      "RoDTEP, RoSCTL, and Duty Drawback refund embedded central, state, and local taxes on exported goods. Welcome Consultancy optimizes claims and ICEGATE credit so exporters recover maximum cashback.",
    body: [
      "Export incentive schemes such as RoDTEP, RoSCTL, Duty Drawback, and legacy MEIS/SEIS help exporters recover taxes and duties embedded in the export value chain.",
      "We as Export Consultants update clients about the latest Government Incentive Schemes and help them obtain benefits on a regular basis. Many exporters lose incentives simply due to lack of awareness or incomplete documentation.",
      "Welcome Consultancy validates HS eligibility, reconciles shipping bills with e-BRCs, and follows up with DGFT and Customs so pending or stuck claims are realized into your account.",
    ],
    checklist: [
      "Shipping Bills & Airway Bills / Bills of Lading",
      "e-BRC / Electronic Bank Realization Certificates",
      "Copy of IEC & RCMC Certificates",
      "ICEGATE Registration Details",
    ],
    faqs: [
      {
        q: "What is the RoDTEP Scheme?",
        a: "Remission of Duties and Taxes on Exported Products (RoDTEP) refunds central, state, and local duties not rebated under other mechanisms.",
      },
      {
        q: "How are duty drawback scrips credited?",
        a: "Duty Drawback & RoDTEP scrips are directly transferred electronically to the exporter's Customs Ledger via ICEGATE.",
      },
    ],
  },
  {
    slug: "epcg-license",
    navTitle: "EPCG License Scheme",
    title: "Export Promotion Capital Goods (EPCG) Scheme",
    category: "Core Licensing",
    shortDesc:
      "Import capital machinery at 0% customs duty subject to fulfilling export obligation parameters.",
    turnaround: "5 – 7 Business Days",
    heroSubtitle:
      "Import zero-duty machinery and upgrade production infrastructure seamlessly.",
    answerSummary:
      "The EPCG Scheme lets exporters import capital goods at 0% customs duty against an export obligation of 6 times the duty saved over 6 years. Welcome Consultancy handles EPCG licence filing end-to-end.",
    body: [
      "This is Scheme which enables an Importer/Exporter (being an export-oriented business) to import capital goods at zero rates of customs duty.",
      "Export Promotion Capital Goods are capital goods used in the production of goods which are exported to other countries. It includes machinery as well as spares. Hence, to qualify under this scheme, the commodity manufactured in India must be exported outside India.",
      "Further, Second-hand capital goods may also be imported without any restrictions on age under the EPCG scheme. EPCG is intended for promoting exports and the Indian government with the help of this scheme offers incentives and financial support to the exporters.",
    ],
    checklist: [
      "Proforma Invoice & Machine Technical Specifications",
      "Chartered Engineer Certificate of Manufacturing Capacity",
      "Valid IEC & RCMC Certificates",
      "Past 3 Years Export Turnover Audit Statement",
    ],
    faqs: [
      {
        q: "What is the export obligation under EPCG?",
        a: "Exporters must achieve export value equal to 6 times the duty saved over a period of 6 years.",
      },
      {
        q: "Can existing machinery be replaced under EPCG?",
        a: "Yes, EPCG supports modernizing existing manufacturing lines with zero-duty capital imports.",
      },
    ],
  },
  {
    slug: "advance-licence",
    navTitle: "Advance Licence Scheme",
    title: "Advance Authorization / Licence Scheme",
    category: "Core Licensing",
    shortDesc:
      "Duty-free import of raw materials and inputs physically incorporated into export products.",
    turnaround: "4 – 6 Business Days",
    heroSubtitle:
      "Import raw materials without payment of Basic Customs Duty & IGST.",
    answerSummary:
      "Advance Authorization enables duty-free import of inputs physically incorporated into export products under SION norms. Welcome Consultancy prepares DGFT filings and Chartered Engineer ratios.",
    body: [
      "Under Advance License Scheme, Exporter can import raw materials and related inputs under 100% duty exemption schemes.",
      "The importer has to approach DGFT who is the licensing authority under this category. Government fixes value addition as per the standard input – output norms.",
      "Once you fulfil the export obligation with the licensing authority, you can sell the manufactured products in domestic market.",
    ],
    checklist: [
      "SION / Standard Input Output Norms details",
      "Export Order / Purchase Order from Foreign Buyer",
      "Chartered Engineer Input-Output Ratio Certificate",
      "IEC & RCMC Registration copies",
    ],
    faqs: [
      {
        q: "What is the validity period of Advance License?",
        a: "Authorization for import is valid for 12 months, with export obligation completion required within 18 months.",
      },
    ],
  },
  {
    slug: "export-house-certificate",
    navTitle: "Export House Certificate",
    title: "Export House Certificate / Star Export House Status",
    category: "Status Recognition",
    shortDesc:
      "Gain prestigious Star Exporter status (1 to 5 Star) with priority customs clearance and DGFT benefits.",
    turnaround: "3 – 5 Business Days",
    heroSubtitle:
      "Elevate your international brand prestige with official DGFT Star Exporter Recognition.",
    answerSummary:
      "Star Export House status (1–5 Star) is DGFT recognition for exporters meeting FOB turnover thresholds, unlocking priority customs clearance and FTP benefits.",
    body: [
      "Export House / Star Export House Certificate recognizes exporter firms as Business Leaders who have excelled in International Trade and successfully contributed to the country's Foreign Trade.",
      "Status holders receive priority customs clearance, preferential treatment under Foreign Trade Policy, and stronger credibility with overseas buyers and banks.",
      "Welcome Consultancy prepares audited FOB turnover statements and files Star House applications (1-Star through 5-Star) based on your export performance.",
    ],
    checklist: [
      "Audited Export Turnover Statement certified by CA",
      "FOB Export Data for past 3 financial years",
      "IEC & RCMC details",
      "Copy of GST & PAN Registration",
    ],
    faqs: [
      {
        q: "What is the threshold for 1-Star Export House status?",
        a: "Exporters reaching $3 Million FOB export performance in 3 out of 4 financial years qualify for 1-Star status.",
      },
    ],
  },
  {
    slug: "rcmc-application",
    navTitle: "RCMC Application",
    title: "RCMC Application (Export Promotion Councils)",
    category: "Core Licensing",
    shortDesc:
      "Registration-cum-Membership Certificate required to claim DGFT benefits and export council assistance.",
    turnaround: "2 – 4 Business Days",
    heroSubtitle:
      "Join relevant Export Promotion Councils (FIEO, EEPC, APEDA, Pharmexcil) effortlessly.",
    answerSummary:
      "RCMC is the Registration-cum-Membership Certificate from Export Promotion Councils required to claim DGFT export benefits and council support.",
    body: [
      "Registration-cum-Membership Certificate (RCMC) is issued by Export Promotion Councils and is essential for claiming benefits under Foreign Trade Policy schemes.",
      "Depending on your product category, RCMC may be obtained from FIEO, EEPC, APEDA, Pharmexcil, or other commodity boards.",
      "Welcome Consultancy identifies the correct council, prepares documentation, and completes membership so you can unlock DGFT incentives without delays.",
    ],
    checklist: [
      "Copy of Import Export Code (IEC)",
      "Digital Signature Certificate (Class 3)",
      "Company Constitution documents",
      "Factory / Business Premises Proof",
    ],
    faqs: [
      {
        q: "Why is RCMC mandatory?",
        a: "RCMC is essential for obtaining export benefits under FTP schemes and participating in international trade fairs.",
      },
    ],
  },
  {
    slug: "c-o-o-certificate-of-origin",
    navTitle: "C.O.O. (Certificate of Origin)",
    title: "Certificate of Origin (C.O.O.) — Preferential & Non-Preferential",
    category: "Specialized Compliance",
    shortDesc:
      "Official certification verifying cargo origin for international customs tariff concessions.",
    turnaround: "Same Day Processing",
    heroSubtitle: "Digital & physical Certificate of Origin issuance via DGFT portal.",
    answerSummary:
      "A Certificate of Origin verifies goods' country of origin for customs and FTA tariff concessions. Welcome Consultancy issues preferential and non-preferential COOs via the DGFT portal.",
    body: [
      "Certificate of Origin is one of the required documents for import customs clearance in most of the importing countries. Certificate of origin is the document, certifying the origin of country where in the export goods are procured and manufactured originally.",
      "Preferential Certificate of Origin is given towards goods subject to preferential tariff treatment (reduction or complete exemption). Schemes include GSP, GSTP, SAPTA, APTA, ISFTA, IAFTA, India-Japan CEPA, India-UAE CEPA, and India-Korea CEPA.",
      "Non-preferential Certificate of Origin applies where goods are not given preferential tariff treatment and due duties must be levied.",
    ],
    checklist: [
      "Commercial Invoice & Packing List",
      "Bill of Lading / Airway Bill",
      "Manufacturer Invoice / Raw Material Purchase Proof",
      "Digital Signature of Authorized Signatory",
    ],
    faqs: [
      {
        q: "What is the difference between Preferential and Non-Preferential COO?",
        a: "Preferential COO provides duty concessions under FTAs/PTAs, while Non-Preferential COO satisfies standard customs verification.",
      },
    ],
  },
  {
    slug: "digital-signature",
    navTitle: "Digital Signature",
    title: "Digital Signature Certificate (Class 3 EXIM DSC)",
    category: "Specialized Compliance",
    shortDesc:
      "Encrypted Class 3 Digital Signature Certificate for DGFT portal filings, ICEGATE, & e-Tendering.",
    turnaround: "2 Hours (Instant)",
    heroSubtitle:
      "Secure e-Token DSC for DGFT, ICEGATE, and Customs electronic filings.",
    answerSummary:
      "Class 3 EXIM DSC is required for secure DGFT, ICEGATE, and customs electronic filings. Welcome Consultancy delivers organization-embedded tokens in as little as 2 hours.",
    body: [
      "A Class 3 Digital Signature Certificate with organization name embedded is mandatory for DGFT online filings, ICEGATE submissions, and most customs e-documentation.",
      "Welcome Consultancy issues EXIM-ready DSC tokens with rapid KYC, token programming, and portal registration support so your filings are never blocked for signature issues.",
    ],
    checklist: [
      "Applicant PAN Card & Aadhaar Card",
      "Passport size photo",
      "Mobile Number & Email verification",
      "Company Authorization Letter",
    ],
    faqs: [
      {
        q: "Is Class 3 DSC required for DGFT applications?",
        a: "Yes, DGFT requires Class 3 DSC with Organization name embedded for secure online authorization.",
      },
    ],
  },
  {
    slug: "ad-code-registration",
    navTitle: "AD Code Registration",
    title: "AD Code Registration Services",
    category: "Customs Compliance",
    shortDesc:
      "Authorized Dealer (AD) Code registration across all Indian sea ports, airports, and ICDs.",
    turnaround: "1 – 2 Business Days",
    heroSubtitle:
      "Enable seamless port customs clearance and online BRC generation.",
    answerSummary:
      "AD Code registration links your bank account to ICEGATE ports so exporters can clear cargo and generate e-BRCs. Welcome Consultancy registers AD Codes across sea, air, and ICD locations.",
    body: [
      "AD (Authorized Dealer Code) is a 14 Digit Numerical Code provided by bank.",
      "You will need to Register an AD Code at Custom Port from where your goods are cleared by Customs. At the time of custom clearance, your Custom House Agent will ask you to provide AD code for that particular Port.",
      "A registered AD Code for export is essential for custom clearance. If you do not have the AD Code then you will not able to generate Shipping Bill Number which is compulsory for custom clearance. Also if you are eligible for Government benefits, an AD Code registration with Custom will enable you to get the credit directly into your account.",
    ],
    checklist: [
      "Bank AD Code Authorization Letter (Original on Bank Letterhead)",
      "Cancelled Cheque of Company Bank Account",
      "IEC & PAN Card copies",
      "GST Registration Certificate",
    ],
    faqs: [
      {
        q: "Can an AD Code be registered at multiple ports?",
        a: "Yes, an AD Code issued by your bank can be registered across multiple ICEGATE port locations.",
      },
    ],
  },
  {
    slug: "fssai",
    navTitle: "FSSAI (Export & Import)",
    title: "FSSAI License for Import & Export",
    category: "Specialized Compliance",
    shortDesc:
      "Central FSSAI License mandatory for importing or exporting food products and agricultural commodities.",
    turnaround: "5 – 7 Business Days",
    heroSubtitle:
      "Ensure 100% food safety regulatory compliance for international cargo.",
    answerSummary:
      "Central FSSAI Licence is mandatory for food importers and exporters regardless of turnover. Welcome Consultancy manages FSSAI EXIM licensing and documentation.",
    body: [
      "Food Safety and Standards Authority of India (FSSAI) requires a Central License for businesses importing or exporting food products, irrespective of turnover.",
      "Welcome Consultancy manages FSSAI EXIM licensing, product category mapping, premises documentation, and NOC coordination so food shipments clear without regulatory holds.",
    ],
    checklist: [
      "Premises Layout Plan & List of Food Categories",
      "List of Directors / Partners with identity proofs",
      "NOC / Electricity bill of business site",
      "Water Analysis Test Report (for food manufacturing/processing)",
    ],
    faqs: [
      {
        q: "Is a Central FSSAI License mandatory for exporters?",
        a: "Yes, all food importers and exporters must hold a Central FSSAI License regardless of turnover.",
      },
    ],
  },
  {
    slug: "aeo-registration",
    navTitle: "AEO Registration",
    title: "Authorized Economic Operator (AEO) Registration Services",
    category: "Customs Compliance",
    shortDesc:
      "Customs security & compliance accreditation granting fast-track green channel clearance.",
    turnaround: "7 – 10 Business Days",
    heroSubtitle:
      "Join the elite accredited trade supply chain with priority customs clearance.",
    answerSummary:
      "AEO T1/T2/T3 certification is a Customs accreditation that grants faster clearance, reduced inspections, and supply-chain trust benefits for compliant traders.",
    body: [
      "AEO is a trade facilitation scheme for ease of doing business in light of international development, holder of this certificate is entitled for privilege, benefits, exemption and relaxation on account of import and export.",
      "Business entities who are involved in the international supply chain that undertakes Customs related activity in India can apply for AEO status… irrespective of its size of the business.",
      "Examples: Importers, Exporters, Custom House Agent (CHA), Custodians or Terminal Operators, etc.",
    ],
    checklist: [
      "Past 3 years audited financial accounts",
      "Customs compliance & error-free declaration record",
      "Site security & supply chain audit documentation",
      "Internal control system manual",
    ],
    faqs: [
      {
        q: "What benefits does AEO T1 certification provide?",
        a: "AEO holders enjoy faster customs release, reduced inspection checks, and direct port delivery privileges.",
      },
    ],
  },
  {
    slug: "sims-registration",
    navTitle: "SIMS Registration",
    title: "SIMS Registration Services",
    category: "Specialized Compliance",
    shortDesc:
      "Steel Import Monitoring System (SIMS), CHIMS, NFMIMS, & PIMS compulsory advance registration.",
    turnaround: "Same Day",
    heroSubtitle:
      "Mandatory advance import declarations for steel, aluminum, copper, and paper cargo.",
    answerSummary:
      "SIMS, CHIMS, NFMIMS, and PIMS require advance import registration for steel, aluminium, copper, and paper. Welcome Consultancy files same-day monitoring registrations.",
    body: [
      "Steel Import Monitoring System (SIMS) and related monitoring systems require advance registration before importing specified steel, aluminium, copper, and paper products.",
      "Welcome Consultancy files SIMS and allied monitoring registrations same-day so cargo arrival is never blocked for missing declarations.",
    ],
    checklist: [
      "Import Invoice & Purchase Order details",
      "Technical specification & HS Code details",
      "IEC Code copy",
      "ICEGATE login access",
    ],
    faqs: [
      {
        q: "When should SIMS registration be submitted?",
        a: "SIMS registration must be filed between 60 days and 15 days prior to expected cargo arrival.",
      },
    ],
  },
  {
    slug: "health-certificate",
    navTitle: "Health Certificate",
    title: "Health Certificate & Sanitary Clearance",
    category: "Specialized Compliance",
    shortDesc:
      "Health and Phytosanitary certificates required for agricultural, animal, and food export shipments.",
    turnaround: "2 – 3 Business Days",
    heroSubtitle:
      "Fulfill destination country health inspection and quarantine requirements.",
    answerSummary:
      "Health and phytosanitary certificates satisfy destination-country quarantine rules for agri, animal, and food exports. Welcome Consultancy coordinates lab reports and certificate issuance.",
    body: [
      "Health Certificates and sanitary / phytosanitary clearances are often mandatory for agricultural, animal, dairy, and food export shipments.",
      "Welcome Consultancy coordinates laboratory testing, inspection reports, and certificate issuance so destination-country quarantine requirements are met on schedule.",
    ],
    checklist: [
      "Export Invoice & Packing List",
      "Laboratory Test & Inspection Report",
      "Exporter Details & Consignee Destination Address",
      "FSSAI / APEDA registration",
    ],
    faqs: [
      {
        q: "Which commodities require a Health Certificate?",
        a: "Processed foods, agricultural produce, meat, dairy, and seafood shipments require health certificates.",
      },
    ],
  },
  {
    slug: "interest-equalization",
    navTitle: "Interest Equalization",
    title: "Interest Equalization Scheme (IES) Advisory",
    category: "Export Incentives",
    shortDesc:
      "Interest subvention on pre & post-shipment export credit for eligible manufacturing exporters & MSMEs.",
    turnaround: "2 – 3 Business Days",
    heroSubtitle:
      "Reduce export credit interest rates by up to 3% through bank subvention.",
    answerSummary:
      "The Interest Equalization Scheme provides up to 3% interest subvention on export credit for eligible MSME manufacturer-exporters. Welcome Consultancy validates HS eligibility and bank paperwork.",
    body: [
      "The Interest Equalization Scheme provides interest subvention on pre-shipment and post-shipment export credit for eligible manufacturer exporters and MSMEs.",
      "Welcome Consultancy validates HS Code eligibility, prepares bank documentation, and coordinates with lenders so you receive the correct subvention rate without claim leakage.",
    ],
    checklist: [
      "MSME / Udyam Registration Certificate",
      "Bank Export Credit sanction letter",
      "IEC Certificate",
      "HS Code validation for eligible tariff lines",
    ],
    faqs: [
      {
        q: "What is the rate of interest subvention under IES?",
        a: "Eligible MSME manufacturer exporters receive 3% subvention, while non-MSME manufacturer exporters receive 2%.",
      },
    ],
  },
  {
    slug: "rex-registration",
    navTitle: "REX Registration",
    title: "Registered Exporter System (REX) Registration Services",
    category: "Specialized Compliance",
    shortDesc:
      "System of self-certification of origin for exports to EU, UK, Switzerland, and Norway under GSP schemes.",
    turnaround: "2 – 4 Business Days",
    heroSubtitle:
      "Self-certify origin of goods for European Union and UK trade destinations.",
    answerSummary:
      "REX registration enables self-certification of origin for GSP exports to the EU, UK, Switzerland, and Norway without recurring COO fees.",
    body: [
      "Registered Exporter System (REX) allows exporters to self-certify origin of goods for preferential exports to the EU, UK, Switzerland, and Norway under GSP schemes.",
      "Once registered, exporters can issue statements of origin without repeatedly obtaining preferential Certificates of Origin — reducing cost and clearance delays.",
    ],
    checklist: [
      "IEC Certificate & PAN Card copy",
      "GST & Business Address Proof",
      "Registration details with Export Promotion Council",
      "Authorized Signatory Details",
    ],
    faqs: [
      {
        q: "Does REX registration expire?",
        a: "No, REX registration does not expire unless revoked or surrendered by the exporter.",
      },
    ],
  },
  {
    slug: "icegate-registration",
    navTitle: "ICEGATE Registration",
    title: "ICEGATE Registration Services",
    category: "Customs Compliance",
    shortDesc:
      "Customs automated electronic portal onboarding for online shipping bill tracking and duty payments.",
    turnaround: "1 Business Day",
    heroSubtitle:
      "Complete ICEGATE ID creation, e-SANCHIT enablement, & AD Code binding.",
    answerSummary:
      "ICEGATE is Customs' electronic portal for shipping bills, duty payment, and e-SANCHIT. Welcome Consultancy completes ICEGATE ID creation, port tagging, and AD Code binding in one business day.",
    body: [
      "ICEGATE helps Exporters, Custom Agents and other individuals of the Customs Department to trace the location of the material and status of the bills.",
      "ICEGATE Registration is required in order to enable for filling Online Shipping Bills and Bill of Entries and other documents and for this process one needs to have a registered ICEGATE ID.",
    ],
    checklist: [
      "Class 3 Digital Signature Certificate (DSC)",
      "IEC & PAN Card of business entity",
      "Mobile Number linked with Aadhaar & Bank",
      "Bank Account details for e-Payment",
    ],
    faqs: [
      {
        q: "What is e-SANCHIT on ICEGATE?",
        a: "e-SANCHIT allows paperless customs clearance by uploading supporting trade documents digitally.",
      },
    ],
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export function getService(slug: string): ServiceRecord | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  const service = getService(slug);
  if (!service) return undefined;
  const extras = getServiceExtras(slug);
  return {
    ...service,
    benefits: extras?.benefits ?? [],
    documents: extras?.documents ?? service.checklist,
    pageDescription: extras?.pageDescription ?? service.shortDesc,
  };
}

export function serviceInquiryHref(slug: string): string {
  return `/contact-us?service=${encodeURIComponent(slug)}`;
}

/** Group services for mega-menu / bento featured cells */
export const SERVICE_CATEGORIES = [
  "Core Licensing",
  "Export Incentives",
  "Customs Compliance",
  "Specialized Compliance",
  "Status Recognition",
] as const;

export function servicesByCategory(category: string): ServiceRecord[] {
  return SERVICES.filter((s) => s.category === category);
}

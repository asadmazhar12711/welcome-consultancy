export type ServiceExtras = {
  benefits: string[];
  documents: string[];
  pageDescription: string;
};

export const SERVICE_EXTRAS: Record<string, ServiceExtras> = {
  "iec-code-import-export-code": {
    "benefits": [
      "Lifetime Validity: No renewal required.",
      "Global Reach: Unlock international markets for your products.",
      "No Return Filings: IEC does not require the filing of any returns.",
      "Government Incentives: Required for claiming RoDTEP, EPCG, and other DGFT benefits."
    ],
    "documents": [
      "Copy of PAN Card of individual/firm/company",
      "Canceled cheque or Bank Certificate",
      "Address proof (Electricity bill, Rent agreement, etc.)",
      "Aadhar card or Passport copy of the applicant"
    ],
    "pageDescription": "The Import Export Code (IEC) is a key business identification number which is mandatory for Exports or Imports. We provide rapid end-to-end IEC registration services, modifications, and linkage with DGFT and Customs portals."
  },
  "export-incentives": {
    "benefits": [
      "Increase Profit Margins: Convert hidden costs into direct capital refunds.",
      "Competitive Pricing: Lower your international pricing by factoring in incentives.",
      "End-to-End Processing: We handle the entire documentation and DGFT liaison.",
      "Dispute Resolution: We unlock stuck, pending, or rejected claims."
    ],
    "documents": [
      "Shipping Bills (Let Export Date)",
      "Bank Realization Certificate (e-BRC)",
      "Commercial Invoice and Packing List",
      "Valid RCMC and IEC"
    ],
    "pageDescription": "Maximize your export profitability. We specialize in identifying, calculating, and claiming all applicable export incentives under the Foreign Trade Policy (FTP), including RoDTEP, RoSCTL, Duty Drawback, and MAI."
  },
  "epcg-license": {
    "benefits": [
      "Zero Customs Duty: Save massive upfront capital costs on imported machinery.",
      "Technology Upgradation: Access world-class equipment without the tax burden.",
      "Flexible Export Obligation: Fulfill the obligation over a period of 6 years.",
      "Indigenous Procurement: Benefits also apply to domestically sourced capital goods."
    ],
    "documents": [
      "Proforma Invoice of the machinery to be imported",
      "Chartered Engineer Certificate (Nexus Certificate)",
      "Past 3 years export performance data",
      "MSME / Udyam Registration Certificate"
    ],
    "pageDescription": "The Export Promotion Capital Goods (EPCG) Scheme allows the import of capital goods (machinery, equipment) at zero customs duty for pre-production, production, and post-production. We assist with issuance, amendment, and redemption of EPCG licenses."
  },
  "advance-licence": {
    "benefits": [
      "Duty-Free Inputs: Exempt from Basic Customs Duty, Education Cess, and IGST.",
      "Working Capital Relief: No need to lock funds in duties to be refunded later.",
      "Value Addition: Ensure minimum 15% value addition as per FTP.",
      "Invalidation Letters: Source duty-free inputs from domestic suppliers."
    ],
    "documents": [
      "Detailed recipe or Bill of Materials (BOM)",
      "Chartered Engineer Certificate for consumption norms",
      "Valid RCMC from relevant Export Promotion Council",
      "Digital Signature Certificate"
    ],
    "pageDescription": "Advance Authorization is issued to allow duty-free import of input materials, which are physically incorporated in the export product. We help manufacturers calculate Standard Input Output Norms (SION) and secure licenses."
  },
  "export-house-certificate": {
    "benefits": [
      "Self-Declaration Clearance: Faster customs clearance on self-declaration basis.",
      "Exemption from Bank Guarantees: Huge savings on working capital limits.",
      "Priority Processing: Preferential treatment in all DGFT and Customs matters.",
      "Establish Trust: Enhance credibility with international buyers and banks."
    ],
    "documents": [
      "CA Certified Export Performance (FOB Value) for last 3-4 years",
      "Valid IEC and RCMC",
      "Copy of PAN and GST Registration",
      "Declaration of no pending investigations"
    ],
    "pageDescription": "Status Holder Certification recognizes exporter firms as business leaders who have excelled in international trade. We help you achieve One Star to Five Star Export House status based on your FOB export performance."
  },
  "rcmc-application": {
    "benefits": [
      "Mandatory for Incentives: Cannot claim RoDTEP, Advance Authorization, or EPCG without it.",
      "Market Intelligence: Get access to trade delegations and international fairs.",
      "Networking: Connect with industry peers and government bodies.",
      "MDA Support: Eligible for Market Development Assistance for export promotion."
    ],
    "documents": [
      "Copy of IEC Code",
      "Partnership Deed, Memorandum of Association (MOA), or Trust Deed",
      "SSI/MSME/Udyam Registration Certificate (for manufacturer exporter)",
      "CA Certificate certifying the main line of business"
    ],
    "pageDescription": "A Registration-Cum-Membership Certificate (RCMC) is mandatory for claiming export incentives and authorizations. We identify the correct Export Promotion Council (FIEO, EEPC, APEDA, etc.) and process your registration."
  },
  "c-o-o-certificate-of-origin": {
    "benefits": [
      "Duty Concessions: Buyers get reduced import duties under Free Trade Agreements.",
      "Market Access: Mandatory for clearing customs in the destination country.",
      "Letter of Credit: Often a mandatory document for LC negotiation at banks.",
      "Traceability: Certifies the authentic origin of the shipped goods."
    ],
    "documents": [
      "Commercial Invoice of the shipment",
      "Packing List",
      "Bill of Lading or Airway Bill",
      "Cost sheet for value addition (for Preferential COO)"
    ],
    "pageDescription": "A Certificate of Origin proves that the export goods are wholly obtained or manufactured in India. We assist in obtaining both Preferential (FTA/PTA) and Non-Preferential certificates from authorized agencies."
  },
  "digital-signature": {
    "benefits": [
      "Mandatory Compliance: Required for all online DGFT and Customs submissions.",
      "Secure Transactions: High-grade encryption ensures data integrity.",
      "Paperless Processing: Eliminates the need for physical signatures and couriers.",
      "Time Saving: Instant authentication and authorization."
    ],
    "documents": [
      "Applicant PAN Card and Aadhar Card",
      "Recent passport size photograph",
      "Authorization letter from the company",
      "GST Registration Certificate"
    ],
    "pageDescription": "Class 3 Digital Signature Certificates (DSC) with IEC linkage are mandatory for filing applications on the DGFT and ICEGATE portals. We issue and configure secure token-based DSCs for seamless compliance."
  },
  "ad-code-registration": {
    "benefits": [
      "Mandatory for Shipping Bills: Cannot generate shipping bills without an AD Code.",
      "Direct Bank Credits: Ensures export incentives (like Drawback) hit your bank account.",
      "EDPMS Compliance: Required for RBI export data processing and monitoring.",
      "Multi-Port Linkage: We can register your code across all major sea and air ports."
    ],
    "documents": [
      "AD Code Authorization Letter from the Bank (Annexure A)",
      "Bank statement or canceled cheque",
      "IEC Certificate and PAN Card",
      "Class 3 Digital Signature Certificate (DSC)"
    ],
    "pageDescription": "An Authorized Dealer (AD) Code must be registered at every customs port from where goods are exported. We handle the entire ICEGATE registration and port linkage process for your bank’s AD Code."
  },
  "fssai": {
    "benefits": [
      "Legal Compliance: Mandatory for importing or exporting food products in India.",
      "Fast Customs Clearance: Avoid demurrage charges at ports due to food safety holds.",
      "Global Trust: Assures international buyers of stringent food safety standards.",
      "Labeling Compliance: We assist with FSSAI packaging and labeling regulations."
    ],
    "documents": [
      "List of Directors/Partners with ID and Address Proof",
      "Blueprint/Layout plan of the processing unit",
      "List of food categories to be imported/exported",
      "IE Code and Recall Plan"
    ],
    "pageDescription": "We secure FSSAI Central Licenses for 100% Export Oriented Units (EOUs) and Importers. Food safety clearance is critical for customs processing, and we ensure compliance with FICS (Food Import Clearance System)."
  },
  "aeo-registration": {
    "benefits": [
      "Direct Port Delivery (DPD): Faster movement of cargo, bypassing CFS.",
      "Deferred Duty Payment: Delink duty payment and customs clearance.",
      "Fewer Physical Inspections: Significant reduction in customs examination.",
      "Global Recognition: Benefits at foreign ports under Mutual Recognition Agreements."
    ],
    "documents": [
      "Process manual for supply chain security",
      "Financial solvency certificate from CA",
      "Site plan and premises security documentation",
      "Details of business partners and cargo handling processes"
    ],
    "pageDescription": "The Authorized Economic Operator (AEO) program is a global supply chain security initiative. We assist tier 1, 2, and 3 exporters and logistics providers in obtaining AEO certification (T1, T2, T3, LO) from Indian Customs."
  },
  "sims-registration": {
    "benefits": [
      "Avoid Penalties: Non-registration leads to heavy fines and shipment holds.",
      "Smooth Clearance: Registration number must be provided in the Bill of Entry.",
      "Data Analytics: Helps the government monitor steel import trends.",
      "Advance Planning: Must be applied 15 to 60 days before cargo arrival."
    ],
    "documents": [
      "Proforma Invoice or Purchase Order",
      "HS Code classification of the steel product",
      "Details of the manufacturer and exporter country",
      "Port of discharge and expected date of arrival"
    ],
    "pageDescription": "The Steel Import Monitoring System (SIMS) requires mandatory advance registration for specific steel products before arrival. We ensure timely filing to generate SIMS Registration Numbers and avoid customs penalties."
  },
  "health-certificate": {
    "benefits": [
      "Destination Compliance: Strictly required by health authorities of importing nations.",
      "Prevents Rejection: Avoid costly cargo destruction or return at foreign ports.",
      "Quality Assurance: Certifies that manufacturing meets sanitary and phytosanitary standards.",
      "Commercial Necessity: Often required for LC negotiation."
    ],
    "documents": [
      "Laboratory Test Report from an NABL accredited lab",
      "Commercial Invoice and Packing List",
      "Valid FSSAI Central License",
      "Product specifications and ingredients list"
    ],
    "pageDescription": "Mandatory for the export of food, marine, meat, and pharmaceutical products, a Health Certificate ensures products are fit for human consumption. We liaise with EIA, MPEDA, and APEDA for issuance."
  },
  "interest-equalization": {
    "benefits": [
      "Lower Financing Costs: Significantly reduces the interest burden on export credit.",
      "Improved Cash Flow: Frees up working capital for manufacturing and sourcing.",
      "MSME Advantage: Special 3% subvention available for all MSME manufacturers.",
      "Global Competitiveness: Helps exporters offer better credit terms to foreign buyers."
    ],
    "documents": [
      "Udyam Registration Certificate (for MSMEs)",
      "Export order / Letter of Credit",
      "CA Certificate verifying export performance",
      "Bank realization documents"
    ],
    "pageDescription": "The Interest Equalization Scheme provides pre and post-shipment export credit at subsidized interest rates. We help MSMEs and merchant exporters claim the 2% to 3% interest subvention through their banks."
  },
  "rex-registration": {
    "benefits": [
      "Self-Certification: No need to apply for a COO from agencies for every EU shipment.",
      "Cost Savings: Eliminates the per-shipment fee for Certificate of Origin.",
      "Faster Operations: Statements on Origin can be printed directly on the invoice.",
      "EU Market Access: Crucial for maintaining competitive pricing in European markets."
    ],
    "documents": [
      "IEC and PAN Copy",
      "Application Form signed by authorized signatory",
      "Digital Signature Certificate",
      "List of HS Codes of products exported to the EU"
    ],
    "pageDescription": "The Registered Exporter (REX) system allows exporters to self-certify the origin of goods to the European Union (EU) and Switzerland under the GSP scheme. We process the application with local nodes and DGFT."
  },
  "icegate-registration": {
    "benefits": [
      "Paperless Customs: E-filing of Shipping Bills and Bills of Entry.",
      "Real-Time Tracking: Track IGST refunds, duty drawback, and container status.",
      "E-Sanchit Uploads: Digitally upload supporting documents for customs assessment.",
      "Duty Payments: Pay customs duties online seamlessly."
    ],
    "documents": [
      "Class 3 Digital Signature Certificate",
      "IEC and GST Registration",
      "Authorization letter on company letterhead",
      "Aadhar and PAN of the authorized person"
    ],
    "pageDescription": "ICEGATE is the national portal of Indian Customs for e-filing. We set up comprehensive ICEGATE profiles, link AD codes, register DSCs, and ensure your e-Sanchit facility is fully operational."
  }
};

export function getServiceExtras(slug: string): ServiceExtras | undefined {
  return SERVICE_EXTRAS[slug];
}

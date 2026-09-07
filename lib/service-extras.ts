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
  },
  "rodtep-rosctl-application": {
    "benefits": [
      "Substantial Cash Remission: Directly refund embedded duties, fuel taxes, and local levies.",
      "ICEGATE Electronic Scrips: Freely transferable in customs ledger for duty payment or market sale.",
      "PAN-India Shipping Bill Audit: Recover stuck or pending scroll generation across all customs ports.",
      "Optimized Tariff Mapping: Ensure your product HSN qualifies for the maximum notified incentive rate."
    ],
    "documents": [
      "Shipping Bills (Let Export Copy)",
      "Bank Realization Certificates (e-BRC / IRM)",
      "Active ICEGATE User ID and Digital Signature Certificate",
      "Valid RCMC and IEC copies"
    ],
    "pageDescription": "Maximize your export profitability with RoDTEP and RoSCTL. We validate HSN eligibility, reconcile shipping bills, and ensure fast scrip generation into your transferable customs ledger."
  },
  "sale-purchase-duty-credit-scrips": {
    "benefits": [
      "Immediate Liquidity for Exporters: Convert digital scrips into instant cash at premium market rates.",
      "Duty Cost Reduction for Importers: Save 2% to 4% on Basic Customs Duty through discounted scrips.",
      "Zero Counterparty Risk: 100% verified ledger-to-ledger transfers with same-day RTGS escrow settlement.",
      "Full Compliance Clearance: Verification of valid scrip issuance and non-encumbrance on ICEGATE."
    ],
    "documents": [
      "ICEGATE User Credentials with active Credit Ledger",
      "Issued RoDTEP / RoSCTL Scrip details (Scrip number, date, and face value)",
      "Company PAN, GSTIN, and cancelled cheque for payment transfer",
      "Board Resolution / Authorization Letter"
    ],
    "pageDescription": "Welcome Consultancy operates an institutional scrip desk for buying and selling RoDTEP, RoSCTL, and MEIS duty credit scrips with immediate settlement and verified ICEGATE transfers."
  },
  "epcg-advance-license-closures": {
    "benefits": [
      "0% Customs Duty on Capital Goods: Save upfront duty on imported production machinery.",
      "Duty-Free Raw Material Import: Exemption from BCD and IGST for inputs under Advance Authorisation.",
      "Export Obligation Redemption (EODC): Timely redemption to discharge bank guarantees and legal undertakings.",
      "Clubbing & Amendment Assistance: Restructure shortfalls and extend obligation periods with DGFT approval."
    ],
    "documents": [
      "Proforma Invoice of capital goods / raw materials to be imported",
      "Chartered Engineer Nexus Certificate",
      "Past 3 years FOB export performance figures",
      "Shipping Bills and e-BRCs for EODC redemption filing"
    ],
    "pageDescription": "End-to-end management of EPCG and Advance Authorisation schemes from issuance to final redemption (EODC) and customs bond cancellation."
  },
  "scomet-license": {
    "benefits": [
      "Legal Export Authorization: Mandatory clearance for dual-use high-technology and chemical items.",
      "Inter-Ministerial Liaison: Seamless representation before DGFT, Defense, MEA, and DAE committees.",
      "Penalty & Seizure Prevention: Avoid catastrophic blacklisting and export holds at customs ports.",
      "Global Tier-1 Credibility: Reassure international defense and industrial buyers of export legitimacy."
    ],
    "documents": [
      "End-User Certificate (EUC) in Appendix 2S / 2T DGFT prescribed format",
      "Technical datasheets, chemical analysis reports, and industrial blueprints",
      "Foreign buyer purchase order and bilateral supply contract",
      "Company Internal Compliance Programme (ICP) overview"
    ],
    "pageDescription": "Specialized DGFT and Inter-Ministerial Working Group (IMWG) licensing for Special Chemicals, Organisms, Materials, Equipment and Technologies (SCOMET)."
  },
  "dfia-license-transferable": {
    "benefits": [
      "Duty-Free Import of Production Inputs: Exempt from Basic Customs Duty under SION norms.",
      "Transferable Endorsement: Freely sell the DFIA license in the domestic market post-export.",
      "Working Capital Flexibility: Monetize raw material import quotas without actual user restrictions.",
      "Full Customs Acceptance: Recognized across all Indian customs EDI sea, air, and ICD ports."
    ],
    "documents": [
      "Export Shipping Bills with explicit DFIA claim declaration",
      "Bank Realization Certificates (e-BRCs)",
      "Standard Input-Output Norms (SION) reference documentation",
      "Valid IEC and Digital Signature"
    ],
    "pageDescription": "Duty Free Import Authorisation (DFIA) application, norm management, and post-export transferable endorsement for optimum commercial return."
  },
  "iec-code-registration": {
    "benefits": [
      "Lifetime Primary Trade Identity: Required for all import, export, and foreign remittance operations.",
      "Instant DGFT Activation: Online linkage with PAN and automated customs EDI synchronization.",
      "Annual Profile Validation: Timely April–June updates preventing IEC suspension.",
      "Pan-India Validity: Unified registration across all Indian ports and customs stations."
    ],
    "documents": [
      "PAN Card copy of entity and directors / partners / proprietor",
      "Aadhaar / Passport copy of authorized signatory",
      "Premises ownership proof (Electricity bill, Rent Agreement, or Tax receipt)",
      "Cancelled Cheque or Bank Certificate with entity name pre-printed"
    ],
    "pageDescription": "Fast-track 10-digit Import Export Code generation, profile modifications, annual renewals, and DGFT portal linkage for cross-border businesses."
  },
  "rcmc-registration-renewal": {
    "benefits": [
      "Mandatory for DGFT Schemes: Essential for claiming RoDTEP, EPCG, and Advance Licenses.",
      "Export Promotion Council Access: Trade leads, international delegations, and market intelligence.",
      "Subsidized Trade Fair Participation: Market Access Initiative (MAI) financial grants.",
      "Multiple Council Coverage: FIEO, EEPC, APEDA, Pharmexcil, Chemexcil, and 37 specialized boards."
    ],
    "documents": [
      "Valid Import Export Code (IEC)",
      "Company Incorporation Certificate / Partnership Deed / Shop Act",
      "CA Certified export turnover certificate (for past 3 years)",
      "Manufacturing / Factory License (for manufacturer exporters)"
    ],
    "pageDescription": "Registration-cum-Membership Certificate (RCMC) application, annual renewal, and category endorsements across all Indian export promotion councils."
  },
  "certificate-of-origin": {
    "benefits": [
      "Preferential Tariff Savings: Zero or reduced import duty for foreign buyers under FTAs.",
      "24-Hour Digital Issuance: Online application on DGFT e-COO common digital platform.",
      "Broad Bilateral Agreement Coverage: CEPA (UAE), ECTA (Australia), SAFTA, ASEAN, IJCEPA, and FORM A1.",
      "Chamber of Commerce Attestation: Non-preferential COOs certified by recognized trade chambers."
    ],
    "documents": [
      "Commercial Invoice and Packing List",
      "Bill of Lading or Airway Bill copy",
      "Indigenous value-addition cost sheet certified by CA (for preferential COO)",
      "Raw material purchase invoices proving domestic origin"
    ],
    "pageDescription": "Rapid electronic Certificate of Origin (COO) issuance for preferential FTA trade and non-preferential general customs clearance worldwide."
  },
  "star-export-house": {
    "benefits": [
      "Prestige Recognition: Institutional branding as a verified 1-Star to 5-Star Indian Export House.",
      "Bank Guarantee Exemption: Complete waiver of bank guarantees under FTP schemes.",
      "Self-Certification of Origin: Freedom to self-certify export documents under bilateral agreements.",
      "Priority Customs Fast-Track: Accelerated green-channel clearance at ports."
    ],
    "documents": [
      "FOB export performance statements in US Dollars for past financial years",
      "CA / CMA certified turnover certificate",
      "Valid IEC, GST, and RCMC registration",
      "Director identification and authorized signatory digital signature"
    ],
    "pageDescription": "Status Holder Star Export House certification under Foreign Trade Policy 2023 based on realized FOB export performance."
  },
  "fssai-central-registration": {
    "benefits": [
      "Mandatory for Food EXIM: Required for clearing food, beverage, and agricultural cargo at customs.",
      "FoSCoS Central Verification: Direct EDI integration with ICEGATE for seamless clearance.",
      "Consumer Trust & Global Compliance: Assures international importers of statutory food hygiene standards.",
      "Multi-Category Coverage: Processed food, nutraceuticals, dairy, spices, and agri-commodities."
    ],
    "documents": [
      "Facility layout blueprint and equipment list",
      "NOC from local municipality / industrial authority",
      "Food Safety Management System (FSMS) plan",
      "Water analysis test report and product category specifications"
    ],
    "pageDescription": "Central FSSAI licensing for food importers, exporters, repackagers, and cross-border distribution facilities."
  },
  "free-sale-certificate": {
    "benefits": [
      "Overcomes Overseas Regulatory Barriers: Required by foreign ministries for product registration.",
      "DGFT & FDA Endorsement: Official certification that goods are freely sold in Indian domestic trade.",
      "Broad International Acceptance: Widely mandated across Latin America, Africa, and Southeast Asia.",
      "Rapid Turnaround: Document preparation and online application completed in 3–5 working days."
    ],
    "documents": [
      "Manufacturing license or municipal industrial registration",
      "Copies of domestic sales tax invoices proving active Indian market sales",
      "Product specification sheets, packaging artwork, and brochures",
      "Valid IEC and DGFT portal profile"
    ],
    "pageDescription": "Free Sale and Commerce Certificate issuance from DGFT and statutory authorities for overseas product registration."
  },
  "legalization-of-export-documents": {
    "benefits": [
      "Ensures Destination Customs Clearance: Mandatory in the UAE, Saudi Arabia, Qatar, and Latin America.",
      "Three-Tier Authentication: Chamber of Commerce → MEA Apostille → Embassy / Consular Stamping.",
      "Fast-Track Processing: Dedicated courier and diplomatic liaison preventing vessel demurrage.",
      "Legal Enforceability: Validates power of attorney, contracts, and commercial invoices abroad."
    ],
    "documents": [
      "Original commercial invoices, packing lists, and certificates of origin on company letterhead",
      "Power of Attorney / Agency Agreement (where applicable)",
      "Passport copies of authorized signatories",
      "Target embassy consular application vouchers"
    ],
    "pageDescription": "Chamber of Commerce attestation, Ministry of External Affairs (MEA) apostille, and embassy legalization for international trade documents."
  },
  "pending-duty-drawback": {
    "benefits": [
      "Unlocks Trapped Working Capital: Recover pending drawback funds under Section 74 and Section 75.",
      "ICEGATE Error Resolution: Resolve error codes SB001, SB002, SB005, and missing EGM issues.",
      "Direct Customs House Liaison: Active representation at Mumbai, Nhava Sheva, Mundra, Chennai, and Delhi ports.",
      "Historical Claim Audits: Reconcile years of pending shipping bills for full refund credit."
    ],
    "documents": [
      "Copies of export shipping bills with drawback claim declaration",
      "Export General Manifest (EGM) details from shipping line",
      "Customs EDI bank account registration proof (AD code linkage)",
      "ICEGATE track-and-trace query screenshot"
    ],
    "pageDescription": "Specialized resolution and recovery of stuck, queried, or uncredited duty drawback claims directly with Indian Customs."
  },
  "igst-refund-claim": {
    "benefits": [
      "Resolves GSTN & ICEGATE Mismatches: Clear errors SB005 (invoice mismatch) and SB001 (port code mismatch).",
      "Accelerates Cash Flow: Ensure automatic IGST refund scrolls generate and credit to your bank account.",
      "Concordance Table Filing: Technical reconciliation between Table 6A of GSTR-1 and shipping bills.",
      "Customs EDI & PFMS Reconciliation: Rectify bank account validation errors on the PFMS portal."
    ],
    "documents": [
      "GSTR-1, GSTR-3B filings and Table 6A export invoice details",
      "Shipping Bill (Let Export Copy) with IGST payment details",
      "Port of export clearance and ICEGATE error code log",
      "Bank account details linked with PFMS for electronic refund credit"
    ],
    "pageDescription": "Resolution of export IGST refund mismatches between GST portal filings and Customs ICEGATE shipping bills for immediate liquidity."
  },
  "digital-signature-certificate": {
    "benefits": [
      "Government-Approved Class 3 DSC: Signing and Encryption certificates for DGFT and ICEGATE.",
      "Paperless e-KYC Verification: Quick Aadhaar/PAN based video verification within 2 hours.",
      "Cryptographic USB Token: FIPS-compliant secure hardware token pre-configured for your browser.",
      "IEC Organization Embedded: Specifically configured for corporate trade filings and e-SANCHIT."
    ],
    "documents": [
      "Aadhaar Card and PAN Card of authorized applicant",
      "Company registration certificate, GST, and IEC copy",
      "Board Resolution / Authorization Letter on company letterhead",
      "Mobile number and email for video e-KYC verification"
    ],
    "pageDescription": "DGFT and ICEGATE compliant Class 3 Digital Signature Certificates (Signing + Encryption) with immediate cryptographic USB token dispatch."
  },
  "export-consultancy-services": {
    "benefits": [
      "Strategic FTP Advisory: Optimize your business model to leverage maximum government incentive schemes.",
      "Tariff & HSN Code Optimization: Ensure accurate classification preventing customs penalties and maximizing refunds.",
      "Foreign Trade Agreement (FTA) Utilization: Structure export logistics to exploit zero-duty destination benefits.",
      "Ongoing Regulatory Defense: Immediate legal representation for audit queries and customs inspections."
    ],
    "documents": [
      "Product technical datasheets, chemical compositions, and HSN codes",
      "Current annual export turnover and destination port breakdown",
      "Existing registrations (IEC, RCMC, GST, ICEGATE)",
      "Overview of active compliance bottlenecks or dispute history"
    ],
    "pageDescription": "Institutional EXIM consultancy, Foreign Trade Policy advisory, and incentive optimization from certified DGFT specialists active since 2011."
  },
  "export-documentation-services": {
    "benefits": [
      "Zero-Discrepancy Documentation: Complete alignment between commercial invoices, shipping bills, and e-BRCs.",
      "Faster Customs Cargo Clearance: Error-free checklists preventing port demurrage and appraiser queries.",
      "e-BRC Reconciliation: Automated banking realization tracking ensuring timely incentive filing.",
      "CHA Coordination: Seamless liaison with your customs house agents and freight forwarders."
    ],
    "documents": [
      "Buyer Purchase Order (PO) and Sales Contract",
      "Proforma Invoice and Packing Specifications",
      "Shipping Line booking and Container Load Plan",
      "Letter of Credit (LC) copy (where applicable)"
    ],
    "pageDescription": "Professional pre-shipment and post-shipment export documentation desk ensuring absolute regulatory concordance and speedy incentive claims."
  },
  "reply-customs-dgft-notices": {
    "benefits": [
      "Strategic Legal Representation: Rigorous defense before DGFT Regional Authorities and Customs Commissioners.",
      "Show Cause Notice (SCN) Defense: Evidence-backed replies citing Foreign Trade Policy clauses and tribunal precedents.",
      "Compounding & Amnesty Applications: Negotiate penalty reductions and settle pending export obligation disputes.",
      "IEC Protection: Prevent suspension or blacklisting of your primary international business identity."
    ],
    "documents": [
      "Copy of the Show Cause Notice / Demand memo / DRI query",
      "Historical shipping bills, licenses, and e-BRCs under examination",
      "Previous correspondence with the issuing authority",
      "Company legal authorization letter"
    ],
    "pageDescription": "Legal and regulatory defense, Show Cause Notice (SCN) drafting, and representation before DGFT and Customs adjudicating authorities."
  },
  "epr-registration": {
    "benefits": [
      "Statutory CPCB Compliance: Mandatory environmental registration for plastic, battery, and e-waste importers.",
      "Customs Clearance NOC: Required by Indian Customs before releasing consignments with plastic packaging.",
      "Authorized Recycling Credits: Facilitate tie-ups with registered recyclers to fulfill annual EPR targets.",
      "Annual Returns Filing: Complete portal reporting preventing environmental compensation penalties."
    ],
    "documents": [
      "Company PAN, GST, and IEC certificates",
      "Annual import volume breakdown by plastic polymer or electronic waste category",
      "Recycler agreement / collection mechanism proof",
      "Authorized signatory DSC and identity documentation"
    ],
    "pageDescription": "Central Pollution Control Board (CPCB) Extended Producer Responsibility (EPR) registration, target fulfillment, and statutory returns."
  }
};

export function getServiceExtras(slug: string): ServiceExtras | undefined {
  return SERVICE_EXTRAS[slug];
}

import { getServiceExtras } from "@/lib/service-extras";

export type ServiceFaq = { q: string; a: string };

export type ServiceRecord = {
  slug: string;
  navTitle: string;
  title: string;
  category: "Licensing Services" | "Registration Services" | "Certification Services" | "Other Export Related Work";
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
  // ── 1. Licensing Services (5) ──────────────────────────────
  {
    slug: "rodtep-rosctl-application",
    navTitle: "RoDTEP / RoSCTL Application",
    title: "RoDTEP & RoSCTL Scheme Application & Recovery",
    category: "Licensing Services",
    shortDesc:
      "Maximize government rebate claims on duties, taxes, and levies embedded in export manufacturing with direct ICEGATE credit.",
    turnaround: "2 – 4 Business Days",
    heroSubtitle:
      "End-to-end RoDTEP & RoSCTL filing, scroll generation, and duty remission realization on ICEGATE.",
    answerSummary:
      "RoDTEP and RoSCTL refund embedded central, state, and local taxes on exported products. Welcome Consultancy validates HSN eligibility, reconciles shipping bills, and ensures fast scrip generation in your customs ledger.",
    body: [
      "The Remission of Duties and Taxes on Exported Products (RoDTEP) and Rebate of State and Central Taxes and Levies (RoSCTL) schemes refund embedded levies not rebated under other mechanisms.",
      "Many exporters lose out on substantial cashback due to minor shipping bill declaration mismatches or lack of active ICEGATE credit ledger follow-up.",
      "Welcome Consultancy audits your export shipments against notified RoDTEP tariff lines, monitors electronic scroll generation, and recovers stuck or pending remissions directly into your transferable ledger.",
    ],
    checklist: [
      "Shipping Bills & Airway Bills / Bills of Lading (Let Export Copy)",
      "Bank Realization Certificates (e-BRC / IRM)",
      "Valid IEC & ICEGATE Registration Details",
      "HSN Code verification and manufacturer declaration",
    ],
    faqs: [
      {
        q: "What is the primary benefit of RoDTEP and RoSCTL?",
        a: "They refund embedded duties and taxes (such as VAT on fuel, electricity duty, mandi tax) as freely transferable electronic scrips.",
      },
      {
        q: "Can RoDTEP scrips be sold or transferred?",
        a: "Yes, once scrips are credited to your ICEGATE ledger, they can be utilized for payment of Basic Customs Duty or sold in the open market.",
      },
    ],
  },
  {
    slug: "sale-purchase-duty-credit-scrips",
    navTitle: "Sale & Purchase of Scrips",
    title: "Sale & Purchase of All Types of Duty Credit Scrips",
    category: "Licensing Services",
    shortDesc:
      "Institutional marketplace for buying and selling RoDTEP, RoSCTL, and Duty Drawback scrips at maximum market realization rates.",
    turnaround: "Same Day / Immediate",
    heroSubtitle:
      "Instant liquidity for exporters and direct customs duty savings for importers with secure ICEGATE ledger transfers.",
    answerSummary:
      "Welcome Consultancy facilitates transparent, legally verified buying and selling of duty credit scrips. Importers save on Basic Customs Duty while exporters monetize credits instantly with same-day escrow settlement.",
    body: [
      "Duty credit scrips issued under RoDTEP, RoSCTL, and MEIS are freely transferable electronic financial instruments recognized by Indian Customs.",
      "Exporters looking to liquidate credits can obtain immediate cash liquidity at prevailing market premiums, while importers utilize scrips to offset Basic Customs Duty (BCD) at discounted rates.",
      "Welcome Consultancy provides verified counterparty matching, ICEGATE transfer verification, and strict settlement protocols to eliminate transaction risk.",
    ],
    checklist: [
      "ICEGATE User ID & Password with active Credit Ledger",
      "Copy of issued RoDTEP / RoSCTL Scrips with Scrip Number and Date",
      "GSTIN & PAN Details of Seller / Buyer",
      "Bank Account Verification for instant RTGS settlement",
    ],
    faqs: [
      {
        q: "How does buying scrips benefit an importer?",
        a: "Importers purchase transferable scrips at a market discount (e.g. 96%–98% of face value) and redeem them at 100% face value against customs duty, reducing cash outflow.",
      },
      {
        q: "How long does the scrip transfer process take on ICEGATE?",
        a: "Online transfer between exporter and buyer ICEGATE ledgers typically completes within 15 to 30 minutes once approved.",
      },
    ],
  },
  {
    slug: "epcg-advance-license-closures",
    navTitle: "EPCG & Advance License & Closures",
    title: "EPCG & Advance License Application & Closure Process (EODC)",
    category: "Licensing Services",
    shortDesc:
      "Duty-free capital goods and raw materials import licensing along with complete export obligation redemption (EODC) and bond cancellation.",
    turnaround: "3 – 5 Business Days",
    heroSubtitle:
      "Fast-track issuance, amendment, and redemption of EPCG and Advance Authorisation schemes under Foreign Trade Policy.",
    answerSummary:
      "Import machinery at zero customs duty under EPCG or raw materials duty-free under Advance Authorisation. Welcome Consultancy manages applications, annual export obligation monitoring, and closure filings (EODC) with DGFT and Customs.",
    body: [
      "The Export Promotion Capital Goods (EPCG) scheme allows import of capital goods at 0% customs duty subject to an export obligation equivalent to 6 times the duty saved over 6 years.",
      "Advance Authorisation allows duty-free import of manufacturing inputs physically incorporated into export products, providing immediate working capital relief.",
      "We assist with project nexus certification, proforma scrutiny, customs registration, clubbing of licenses, and final redemption certification (EODC) to discharge legal undertakings and bank guarantees.",
    ],
    checklist: [
      "Proforma Invoice & Nexus Certificate from Chartered Engineer",
      "Past 3 years export performance details",
      "Udyam / MSME Registration & Industrial License",
      "Shipping Bills & e-BRCs for Export Obligation Discharge Certificate (EODC)",
    ],
    faqs: [
      {
        q: "What is an EODC and why is it essential?",
        a: "Export Obligation Discharge Certificate (EODC) is issued by DGFT upon satisfying obligations, releasing your customs bond and bank guarantee.",
      },
      {
        q: "Can EPCG licenses be extended if export obligations fall short?",
        a: "Yes, DGFT permits extension of export obligation periods upon payment of composition fees under Foreign Trade Policy guidelines.",
      },
    ],
  },
  {
    slug: "scomet-license",
    navTitle: "SCOMET License",
    title: "SCOMET Licensing & Dual-Use Export Authorization",
    category: "Licensing Services",
    shortDesc:
      "Strategic export authorization for Special Chemicals, Organisms, Materials, Equipment and Technologies with inter-ministerial clearance.",
    turnaround: "7 – 15 Business Days",
    heroSubtitle:
      "Comprehensive DGFT and inter-ministerial liaison for dual-use high-technology and industrial export authorizations.",
    answerSummary:
      "SCOMET items require mandatory export authorization from DGFT and the Inter-Ministerial Working Group (IMWG). Welcome Consultancy prepares technical dossiers, end-user certificates, and coordinates approvals across defense, atomic energy, and external affairs.",
    body: [
      "SCOMET (Special Chemicals, Organisms, Materials, Equipment and Technologies) items have potential civilian as well as military applications, falling under stringent national export control regimes.",
      "Exporting items listed under SCOMET Categories 0 through 8 without explicit authorization invites severe penalties, confiscation, and blacklisting.",
      "We assist high-tech exporters, chemical manufacturers, and engineering firms in classifying products, drafting End-User Verification (EUC) documentation, and securing timely DGFT permissions.",
    ],
    checklist: [
      "End-User Certificate (EUC) in DGFT prescribed format",
      "Technical specifications, datasheets, and chemical analysis reports",
      "Purchase Order and Contract with foreign buyer",
      "Company profile and Internal Compliance Programme (ICP) overview",
    ],
    faqs: [
      {
        q: "What happens if a product is mistakenly classified as dual-use?",
        a: "Welcome Consultancy conducts technical parameter checks against Appendix 3 of FTP to establish whether your item requires SCOMET licensing or an exemption certificate.",
      },
    ],
  },
  {
    slug: "dfia-license-transferable",
    navTitle: "DFIA License & Transfer",
    title: "DFIA License Application & DFIA Transferable Application",
    category: "Licensing Services",
    shortDesc:
      "Duty Free Import Authorisation (DFIA) issuance and post-export transferable endorsement for zero customs duty procurement.",
    turnaround: "5 – 7 Business Days",
    heroSubtitle:
      "Procure duty-free inputs or monetize transferable DFIA authorisations across Indian manufacturing sectors.",
    answerSummary:
      "DFIA permits duty-free import of inputs under Standard Input-Output Norms (SION). Once export obligations are fulfilled, Welcome Consultancy secures transferable endorsement from DGFT so the license can be freely sold.",
    body: [
      "Duty Free Import Authorisation (DFIA) is an incentive scheme issued to allow duty-free import of inputs, fuel, and packaging materials required for export production.",
      "Unlike Advance Authorisation, DFIA becomes freely transferable in the domestic market after completion of exports and realization of foreign exchange.",
      "Welcome Consultancy handles pre-export DFIA issuance, SION norm mapping, customs port registration, and post-export transferable endorsement for optimum commercial return.",
    ],
    checklist: [
      "Export Shipping Bills with explicit DFIA declaration",
      "e-BRCs / Bank realization certificates",
      "SION Norm reference or ad-hoc norm approval",
      "IEC, GST, and ICEGATE registration credentials",
    ],
    faqs: [
      {
        q: "What is the difference between DFIA and Advance License?",
        a: "Advance Authorisation has actual user condition and is non-transferable. DFIA allows transferable endorsement post-export, allowing you to sell the license.",
      },
    ],
  },

  // ── 2. Registration Services (7) ───────────────────────────
  {
    slug: "iec-code-registration",
    navTitle: "IEC Code Registration & Updation",
    title: "IEC Code Updation & New Application",
    category: "Registration Services",
    shortDesc:
      "Fast-track 10-digit Import Export Code generation, annual profile renewal, and DGFT portal linkage for international trade.",
    turnaround: "1 – 2 Business Days",
    heroSubtitle: "Instant DGFT IEC issuance, modification, and annual renewal advisory across India.",
    answerSummary:
      "IEC is the mandatory 10-digit primary identity issued by DGFT for every Indian importer and exporter. Welcome Consultancy completes new registrations, annual validations, and modifications in 1–2 business days.",
    body: [
      "An Import Export Code (IEC) is a 10-digit mandatory registration issued by the Directorate General of Foreign Trade (DGFT) for any business engaging in global trade.",
      "Without a valid IEC, businesses cannot clear customs, claim export incentives, or receive foreign trade remittances.",
      "DGFT mandates that all IEC holders update their business profile annually between April and June. We ensure active status, PAN-linkage, and prompt modifications for director or address changes.",
    ],
    checklist: [
      "PAN Card of Business Entity & Proprietor / Partners / Directors",
      "Aadhaar Card / Passport of authorized signatory",
      "Proof of Business Premises (Electricity Bill, Rent Agreement, or Municipal Tax Receipt)",
      "Cancelled Cheque / Bank Certificate with pre-printed account name",
    ],
    faqs: [
      {
        q: "Does IEC registration expire?",
        a: "IEC has lifetime validity, but DGFT requires annual online profile confirmation between April and June each financial year.",
      },
      {
        q: "Can an individual apply for IEC?",
        a: "Yes, individuals and sole proprietorships can obtain an IEC using their personal PAN and bank account details.",
      },
    ],
  },
  {
    slug: "ad-code-registration",
    navTitle: "AD Code Registration",
    title: "AD Code Registration or Modification (EDAC)",
    category: "Registration Services",
    shortDesc:
      "Authorized Dealer (AD) code registration at Customs ports for electronic shipping bill clearance and automated EDPMS reconciliation.",
    turnaround: "1 – 2 Business Days",
    heroSubtitle:
      "Customs EDI registration of Bank Authorized Dealer Code across all Indian sea, air, and ICD ports.",
    answerSummary:
      "AD Code registration links your bank account with Indian Customs at specific discharge ports. Welcome Consultancy completes online e-SANCHIT filing and port approval so shipping bills generate without holds.",
    body: [
      "An Authorized Dealer (AD) Code is a 14-digit code issued by your foreign exchange dealer bank on letterhead, required by Customs for export clearances.",
      "Without registering your AD code at the specific customs port of export (e.g. Nhava Sheva, Chennai, Mundra, Delhi Air Cargo), shipping bills cannot be finalized electronically.",
      "We prepare the customs portal application, upload bank-signed documentation via e-SANCHIT, and coordinate with the port appraiser for prompt activation.",
    ],
    checklist: [
      "Original AD Code Letter from Bank in Customs prescribed format",
      "Cancelled Cheque of the Export Account",
      "Company PAN, GST, and IEC Copy",
      "Class 3 Digital Signature Certificate",
    ],
    faqs: [
      {
        q: "Do I need separate AD code registrations for different ports?",
        a: "The AD Code itself is issued once by your bank, but it must be registered separately at each customs port from which you ship cargo.",
      },
    ],
  },
  {
    slug: "sims-registration",
    navTitle: "SIMS Registration for Steel Import",
    title: "SIMS Registration for Steel Import (DGFT Mandate)",
    category: "Registration Services",
    shortDesc:
      "Mandatory Steel Import Monitoring System (SIMS) registration under DGFT before customs arrival for zero clearance delays.",
    turnaround: "1 – 2 Business Days",
    heroSubtitle:
      "Advance electronic registration and unique registration number (URN) generation for steel imports.",
    answerSummary:
      "SIMS registration is mandatory for specified steel products under Chapters 72, 73, and 84. Welcome Consultancy files advance import parameters to obtain your URN before your cargo arrives at port.",
    body: [
      "The Steel Import Monitoring System (SIMS) mandates advance registration for steel consignments not earlier than 60 days and not later than 15 days before the expected arrival date.",
      "The generated Unique Registration Number (URN) must be entered in the Bill of Entry for smooth electronic customs assessment.",
      "We review your mill test certificates, HS classifications, and invoice details to secure instant SIMS generation without compliance penalties.",
    ],
    checklist: [
      "Commercial Invoice and Packing List",
      "Bill of Lading or Airway Bill copy",
      "Mill Test Certificate (MTC) / Technical grade specs",
      "Active IEC and DGFT portal credentials",
    ],
    faqs: [
      {
        q: "What happens if steel arrives without a SIMS URN?",
        a: "Customs will place a hold on the Bill of Entry, causing port demurrage charges until SIMS registration is completed.",
      },
    ],
  },
  {
    slug: "icegate-registration",
    navTitle: "ICEGATE Registration",
    title: "ICEGATE Registration & Digital Profile Setup",
    category: "Registration Services",
    shortDesc:
      "Official Indian Customs EDI gateway registration, e-Sanchit profile enablement, and DSC integration for paperless clearance.",
    turnaround: "1 – 2 Business Days",
    heroSubtitle:
      "Customs gateway account registration, e-SANCHIT enablement, and digital signature binding.",
    answerSummary:
      "ICEGATE is Indian Customs' official gateway for e-filing of shipping bills and bills of entry. Welcome Consultancy handles registration, port linking, e-SANCHIT document upload setup, and DSC binding.",
    body: [
      "ICEGATE (Indian Customs Electronic Commerce Gateway) enables exporters, importers, and customs brokers to submit and track trade documents online.",
      "A verified ICEGATE profile is required to monitor IGST refund status, check RoDTEP scrip ledgers, and upload e-SANCHIT documents.",
      "We guide you through the entire identity verification, bank mandate validation, and digital certificate mapping process.",
    ],
    checklist: [
      "Class 3 Digital Signature Certificate (Signing + Encryption)",
      "Valid IEC and GST registration certificate",
      "PAN Card and Aadhaar of authorized signatory",
      "Active business bank account details",
    ],
    faqs: [
      {
        q: "What is e-SANCHIT on ICEGATE?",
        a: "e-SANCHIT allows paperless customs clearance by uploading supporting trade documents digitally with digital signatures.",
      },
    ],
  },
  {
    slug: "rcmc-registration-renewal",
    navTitle: "Various Council (RCMC) Registration",
    title: "Various Council (RCMC) Registration and Renewal",
    category: "Registration Services",
    shortDesc:
      "Registration-cum-Membership Certificate (RCMC) across FIEO, EEPC, APEDA, Pharmexcil, and all 37 export promotion councils.",
    turnaround: "3 – 5 Business Days",
    heroSubtitle:
      "Statutory Export Promotion Council membership to unlock Foreign Trade Policy incentives.",
    answerSummary:
      "RCMC is mandatory to claim DGFT export benefits, RoDTEP scrips, and EPCG licenses. Welcome Consultancy maps your export product to the right council, files online applications, and manages annual renewals.",
    body: [
      "A Registration-cum-Membership Certificate (RCMC) issued by an Export Promotion Council (EPC) or Commodity Board certifies that an exporter is registered with the relevant trade body.",
      "Under Foreign Trade Policy, RCMC is mandatory for obtaining authorizations to import or export goods on concessional duty and claiming export incentives.",
      "Whether you export engineering goods (EEPC), agricultural products (APEDA), chemicals (CHEMEXCIL), or multi-product lines (FIEO), we handle the complete process.",
    ],
    checklist: [
      "Valid Import Export Code (IEC)",
      "Company Incorporation Certificate / Partnership Deed",
      "Past 3 years export turnover / CA certificate (for manufacturer exporters)",
      "Factory License / Udyam / Pollution Control clearance (where applicable)",
    ],
    faqs: [
      {
        q: "Which council should multi-product exporters choose?",
        a: "Exporters whose products are not covered by any specialized council can obtain membership with the Federation of Indian Export Organisations (FIEO).",
      },
    ],
  },
  {
    slug: "rex-registration",
    navTitle: "REX Registration Services",
    title: "Registered Exporter (REX) System Registration",
    category: "Registration Services",
    shortDesc:
      "Self-certification system for preferential origin exports to the European Union (EU), United Kingdom, and GSP countries.",
    turnaround: "2 – 4 Business Days",
    heroSubtitle:
      "DGFT and EU-recognized REX number generation for duty-free and preferential tariff access.",
    answerSummary:
      "The REX system allows Indian exporters to self-certify the origin of goods on commercial invoices for shipments to the EU, Switzerland, and Norway, eliminating physical COO stamping.",
    body: [
      "Under the Registered Exporter system, exporters registered in the REX database can make Statements on Origin directly on commercial invoices for shipments valued over €6,000.",
      "This system replaces conventional Generalized System of Preferences (GSP) Form A certificates, saving per-shipment verification costs and delays.",
      "Welcome Consultancy files the DGFT pre-registration, coordinates with the nominated local agency, and secures your permanent REX number.",
    ],
    checklist: [
      "Valid IEC & Digital Signature",
      "Company PAN and GST details",
      "Detailed list of HS Codes of export products shipped to Europe",
      "Address proof of registered manufacturing facility",
    ],
    faqs: [
      {
        q: "Is REX registration valid for lifetime?",
        a: "Yes, REX registration does not require renewal as long as company details and export product lines remain accurate.",
      },
    ],
  },
  {
    slug: "epr-registration",
    navTitle: "EPR Registration Services",
    title: "Extended Producer Responsibility (EPR) Registration",
    category: "Registration Services",
    shortDesc:
      "Central Pollution Control Board (CPCB) statutory environmental compliance for plastic packaging, e-waste, and battery importers.",
    turnaround: "5 – 10 Business Days",
    heroSubtitle:
      "CPCB portal registration, recycling target fulfillment, and statutory environmental returns.",
    answerSummary:
      "Importers and brand owners using plastic packaging or trading electronics must obtain EPR registration from CPCB. Welcome Consultancy ensures smooth portal documentation and recycling target auditing.",
    body: [
      "Extended Producer Responsibility (EPR) is a legal mandate under the Ministry of Environment, Forest and Climate Change (MoEFCC) requiring importers to manage post-consumer waste.",
      "Customs authorities now verify EPR portal certificates before clearing imported consignments involving plastic packaging, batteries, or electronic equipment.",
      "We prepare your material flow sheets, file CPCB portal applications, and assist with authorized recycling partner tie-ups.",
    ],
    checklist: [
      "Company PAN, GST, and IEC copies",
      "Estimated annual import volume breakdown by plastic polymer or waste category",
      "Proof of collection / recycling tie-up agreements",
      "Authorized signatory DSC and identity proofs",
    ],
    faqs: [
      {
        q: "Does EPR apply to companies that only import finished goods with plastic packaging?",
        a: "Yes, importers of finished goods containing plastic packaging are classified as 'Importers' under Plastic Waste Management rules and must register.",
      },
    ],
  },

  // ── 3. Certification Services (8) ─────────────────────────
  {
    slug: "certificate-of-origin",
    navTitle: "Certificate of Origin (Preferential / Non-Pref)",
    title: "Certificate of Origin - Preferential & Non-Preferential COO",
    category: "Certification Services",
    shortDesc:
      "Official COO issuance under CEPA, ISAFTA, SAFTA, FORM A1, IUCEPA, IJCEPA, and Chamber of Commerce non-preferential routes.",
    turnaround: "24 – 48 Hours",
    heroSubtitle:
      "Rapid electronic Certificate of Origin generation on the DGFT e-COO common digital platform.",
    answerSummary:
      "A Certificate of Origin proves the country where export goods were manufactured. Welcome Consultancy obtains preferential COOs for zero/lower import duties in buyer countries and non-preferential COOs within 24 hours.",
    body: [
      "A Certificate of Origin (COO) is a critical international trade instrument proving that exported merchandise originates in India as per agreed rules of origin.",
      "Preferential COOs are issued under Free Trade Agreements (FTAs) like India-UAE CEPA, India-Australia ECTA, ASEAN, SAFTA, and Japan/Korea CEPA, allowing foreign buyers to pay zero or concessional customs duty.",
      "Non-preferential COOs certify origin for trade quotas and general customs entry. We handle digital signing, value-addition calculation, and chamber liaison.",
    ],
    checklist: [
      "Commercial Invoice and Packing List",
      "Bill of Lading / Airway Bill (or Draft Copy)",
      "Cost sheet proving indigenous value addition (for preferential COOs)",
      "Purchase bills of domestic raw materials",
    ],
    faqs: [
      {
        q: "How does a preferential COO benefit my overseas buyer?",
        a: "Your overseas buyer pays substantially lower or zero import tariffs in their country under the relevant bilateral FTA.",
      },
      {
        q: "Can COO be issued after the vessel sails?",
        a: "Yes, retrospective Certificates of Origin can be issued under specific FTA rules with necessary customs declarations.",
      },
    ],
  },
  {
    slug: "health-certificate",
    navTitle: "Health Certificate",
    title: "Health Certificate for Food & Agricultural Exports",
    category: "Certification Services",
    shortDesc:
      "Statutory health and sanitary certification from Export Inspection Agency (EIA), APEDA, and veterinary inspection councils.",
    turnaround: "3 – 5 Business Days",
    heroSubtitle:
      "Export Inspection Council (EIC) and statutory agency sanitary clearance for agricultural, marine, and food shipments.",
    answerSummary:
      "Food, marine, poultry, and agricultural exports require official health clearance certifying safety for human consumption. Welcome Consultancy coordinates laboratory tests and inspection approvals for prompt issuance.",
    body: [
      "Health and sanitary certificates certify that consignments comply with microbiological, chemical residue, and safety standards demanded by importing countries.",
      "Shipments of spices, rice, processed food, meat, and seafood without an official Health Certificate face immediate quarantine or rejection at foreign ports.",
      "We prepare product dossiers, coordinate authorized laboratory test reports, and liaison with EIA / APEDA / FSSAI inspection desks.",
    ],
    checklist: [
      "Commercial Invoice and Batch Packing List",
      "NABL-accredited laboratory test report",
      "FSSAI / APEDA / EIA registration certificate",
      "Health Certificate application form on official portal",
    ],
    faqs: [
      {
        q: "Who issues the Health Certificate in India?",
        a: "Depending on the commodity, it is issued by the Export Inspection Agency (EIA), APEDA, Spices Board, or the Animal Quarantine and Certification Services (AQCS).",
      },
    ],
  },
  {
    slug: "interest-equalization-scheme",
    navTitle: "Interest Equalization Scheme",
    title: "Interest Equalization Scheme (IES) for Export Credit",
    category: "Certification Services",
    shortDesc:
      "Subsidized 2% to 3% interest subvention on pre- and post-shipment export credit for MSMEs and manufacturer exporters.",
    turnaround: "2 – 3 Business Days",
    heroSubtitle:
      "Working capital relief through government subsidized export credit subvention on DGFT portal.",
    answerSummary:
      "The Interest Equalization Scheme (IES) reduces the interest burden on rupee export credit. Welcome Consultancy validates your Udyam eligibility, generates DGFT unique authorization numbers (UIN), and coordinates bank credit.",
    body: [
      "The Interest Equalization Scheme provides interest subvention of 3% for MSME manufacturer exporters and 2% for identified non-MSME manufacturer exporters.",
      "Exporters must obtain a Unique Identification Number (UIN) from the DGFT portal before approaching their authorized foreign exchange lending banks.",
      "We calculate your eligible credit limits, file DGFT subvention applications, and ensure smooth interest rate reduction on your packing credit and post-shipment bill discounting.",
    ],
    checklist: [
      "Valid IEC and active DGFT login",
      "Udyam Registration Certificate (with manufacturing activity)",
      "Bank sanction letter for pre/post shipment export credit",
      "CA certificate verifying export turnover",
    ],
    faqs: [
      {
        q: "Is the Interest Equalization Scheme available for merchant exporters?",
        a: "Currently, the scheme primarily targets manufacturer exporters and MSME manufacturers across specified tariff lines.",
      },
    ],
  },
  {
    slug: "aeo-registration",
    navTitle: "AEO Registration Services",
    title: "Authorized Economic Operator (AEO) Registration Services",
    category: "Certification Services",
    shortDesc:
      "Direct Port Delivery (DPD), deferred customs duty payment, and international green-channel cargo clearance under CBIC.",
    turnaround: "15 – 30 Business Days",
    heroSubtitle:
      "Institutional security compliance and Tier 1 / Tier 2 AEO certification for frictionless international trade.",
    answerSummary:
      "AEO certification by Indian Customs provides trusted-trader status with benefits like Direct Port Delivery, reduced bank guarantee requirements, and priority clearance under Mutual Recognition Arrangements (MRAs).",
    body: [
      "The Authorized Economic Operator (AEO) program is a globally recognized accreditation under the World Customs Organization (WCO) SAFE Framework.",
      "AEO Tier 1 (T1) and Tier 2 (T2) holders enjoy significant operational cost savings, including waiver of physical cargo examination, deferred duty payment, and faster customs refunds.",
      "Welcome Consultancy conducts internal site security audits, compiles financial solvency reports, drafts legal compliance dossiers, and coordinates on-site customs inspections.",
    ],
    checklist: [
      "Audited Financial Statements for the last 3 financial years",
      "Clean track record certificate with no major customs offenses",
      "Site security, access control, and cargo handling SOPs",
      "CBIC Annexure A, B, and C compliance forms",
    ],
    faqs: [
      {
        q: "What is the primary benefit of AEO Tier 1 (T1)?",
        a: "AEO-T1 provides Direct Port Delivery (DPD) for imports, higher facilitation rates (faster green-channel clearance), and waiver of bank guarantees.",
      },
    ],
  },
  {
    slug: "star-export-house",
    navTitle: "Status Holder Certificate",
    title: "Export House Certificate or Status Holder Certificate (1 to 5 Star)",
    category: "Certification Services",
    shortDesc:
      "DGFT prestige recognition as 1-Star to 5-Star Export House based on foreign exchange earnings with priority treatment.",
    turnaround: "5 – 7 Business Days",
    heroSubtitle:
      "Recognition as a Star Export House under Foreign Trade Policy 2023 with VIP customs and licensing privileges.",
    answerSummary:
      "Status Holder recognition is granted by DGFT to exporters achieving specified FOB export thresholds (from $3 Million for 1-Star up to $800 Million for 5-Star). Welcome Consultancy audits export turnover and secures the certificate.",
    body: [
      "Star Export House status marks an export enterprise as a recognized business leader in Indian Foreign Trade, boosting international buyer credibility.",
      "Privileges include self-certification of origin, exemptions from bank guarantees under FTP schemes, priority custom clearance, and preferential treatment in international trade delegations.",
      "We analyze your shipping bill FOB values across the current and preceding financial years to secure maximum star tier recognition.",
    ],
    checklist: [
      "FOB export performance statements in US Dollars for past years",
      "CA / CMA / CS certificate certifying export turnover",
      "Valid IEC & RCMC",
      "DGFT online profile with electronic signature",
    ],
    faqs: [
      {
        q: "What is the threshold for a 1-Star Export House under FTP 2023?",
        a: "The threshold for 1-Star status is US $3 Million FOB/FOR export performance across 3 out of 4 financial years (or $1.5M for MSME/special categories).",
      },
    ],
  },
  {
    slug: "fssai-central-registration",
    navTitle: "FSSAI Central Registration",
    title: "FSSAI Certificate Central Registration for Import & Export",
    category: "Certification Services",
    shortDesc:
      "Mandatory Central FSSAI License for food product import-export, repackaging, and international supply chain distribution.",
    turnaround: "7 – 12 Business Days",
    heroSubtitle:
      "Statutory food safety licensing from the Central Food Safety and Standards Authority of India (FSSAI).",
    answerSummary:
      "Any business importing or exporting food products must hold an active FSSAI Central License. Welcome Consultancy handles FoSCoS portal applications, product categorization, and statutory compliance.",
    body: [
      "Under the Food Safety and Standards Act, trading, manufacturing, or handling food items for cross-border trade requires Central FSSAI licensing.",
      "Customs ports integrate FSSAI clearance directly with ICEGATE, and consignments lacking a verified central license are denied entry or export clearance.",
      "We assist food processors, FMCG brand owners, and agricultural traders in preparing facility layout blueprints, FSMS plans, and product compliance dossiers.",
    ],
    checklist: [
      "Facility layout plan and machinery equipment list",
      "NOC / Authorization from local municipality",
      "Food Safety Management System (FSMS) plan",
      "List of food categories and products with composition details",
    ],
    faqs: [
      {
        q: "Is a State FSSAI license sufficient for export of food goods?",
        a: "No. 100% export-oriented units and all import-export operations mandatorily require a Central FSSAI License.",
      },
    ],
  },
  {
    slug: "free-sale-certificate",
    navTitle: "Free Sale Certificate",
    title: "Free Sale Certificate from DGFT / Statutory Authorities",
    category: "Certification Services",
    shortDesc:
      "DGFT certification proving products are freely sold in the domestic Indian market without restriction for international registration.",
    turnaround: "3 – 5 Business Days",
    heroSubtitle:
      "Official certificate of free sale and commerce for export registration in target overseas markets.",
    answerSummary:
      "Foreign governments often require proof that goods intended for import are manufactured and freely sold in India. Welcome Consultancy obtains Free Sale Certificates from DGFT, State FDAs, and specialized authorities.",
    body: [
      "A Free Sale and Commerce Certificate is required by regulatory authorities in Latin America, Southeast Asia, the Middle East, and Africa before granting product registration.",
      "It certifies that items such as cosmetics, medical devices, engineering products, and consumer goods are legally sold in India.",
      "We prepare the statutory declarations, coordinate state regulatory endorsements where required, and secure the final certificate through DGFT.",
    ],
    checklist: [
      "Manufacturing License or Industrial Registration",
      "Domestic invoices proving active sales in the Indian market",
      "Product technical labels and brochures",
      "Valid IEC and DGFT portal credentials",
    ],
    faqs: [
      {
        q: "Which agency issues Free Sale Certificates in India?",
        a: "DGFT issues Free Sale Certificates for general merchandise and engineering goods, while State FDAs and CDSCO issue them for drugs and medical devices.",
      },
    ],
  },
  {
    slug: "legalization-of-export-documents",
    navTitle: "Legalization of Export Documents",
    title: "Legalization & Attestation of Export Documents",
    category: "Certification Services",
    shortDesc:
      "Chamber of Commerce attestation, MEA apostille, and Embassy/Consulate legalization for Middle East and worldwide trade.",
    turnaround: "3 – 5 Business Days",
    heroSubtitle:
      "Comprehensive document legalization for invoices, contracts, certificates of origin, and power of attorney.",
    answerSummary:
      "Many destination countries (particularly in the Middle East and Latin America) mandate consular legalization of trade documents before customs entry. Welcome Consultancy handles Chamber attestation, MEA apostille, and embassy stamping.",
    body: [
      "Consular legalization verifies the authenticity of signatures and official seals on export documentation, ensuring legal validity in the destination country.",
      "Documents frequently requiring legalization include Commercial Invoices, Packing Lists, Certificates of Origin, Agency Agreements, and Phytosanitary Certificates.",
      "We manage the step-by-step pipeline: Local Chamber of Commerce attestation → Ministry of External Affairs (MEA) verification / Apostille → Embassy or Consulate submission.",
    ],
    checklist: [
      "Original documents printed on company letterhead with authorized signature",
      "Certificate of Origin and Commercial Invoice copies",
      "Passport copy of the authorized signatory",
      "Embassy-specific requisition forms",
    ],
    faqs: [
      {
        q: "What is the difference between Apostille and Embassy Legalization?",
        a: "Apostille applies to member countries of the Hague Apostille Convention. For non-Hague countries (such as the UAE, Saudi Arabia, Kuwait), full embassy legalization is required.",
      },
    ],
  },

  // ── 4. Other Export Related Work (6) ──────────────────────
  {
    slug: "pending-duty-drawback",
    navTitle: "Pending Duty Drawback Follow-up",
    title: "Follow-up for Pending Drawback Matters (Customs)",
    category: "Other Export Related Work",
    shortDesc:
      "Resolution and clearance of stuck, scroll-generated, and query-raised Section 74 & 75 duty drawback claims across Customs ports.",
    turnaround: "Active Liaison",
    heroSubtitle:
      "Recover stuck capital through direct customs appraiser liaison and electronic EDI queue clearance.",
    answerSummary:
      "Exporters often have substantial capital locked in pending duty drawback claims due to error codes or missing electronic scrolls. Welcome Consultancy audits shipping bills and resolves queries directly with customs houses.",
    body: [
      "Duty Drawback refunds Customs and Central Excise duties paid on imported inputs used in export production under Section 74 and Section 75 of the Customs Act.",
      "Millions in drawback remain stuck in Customs EDI queues due to bank account validation mismatches, query raising by appraisers, or missing EGM confirmations.",
      "Our team directly liaises with custom port drawback departments across Mumbai, Nhava Sheva, Chennai, Mundra, and Delhi to unlock funds into your account.",
    ],
    checklist: [
      "Shipping Bill copies with drawback claim declaration",
      "Electronic Export General Manifest (EGM) details",
      "Bank Account details registered with Customs EDI",
      "Details of pending query or error code from ICEGATE",
    ],
    faqs: [
      {
        q: "Why do Duty Drawback claims get stuck on ICEGATE?",
        a: "Common causes include error codes (such as SB005, bank account mismatch), delayed EGM filing by shipping lines, or outstanding customs queries.",
      },
    ],
  },
  {
    slug: "igst-refund-claim",
    navTitle: "IGST Refund Claim & Error Resolution",
    title: "IGST Refund Claim & Port Error Resolution",
    category: "Other Export Related Work",
    shortDesc:
      "Resolving GSTR-1 / GSTR-3B vs ICEGATE shipping bill mismatches (Errors SB001, SB005, PFMS) for fast capital credit.",
    turnaround: "3 – 7 Business Days",
    heroSubtitle:
      "Specialized resolution of export IGST refund discrepancies between GSTN and Indian Customs portals.",
    answerSummary:
      "When exports are made on payment of IGST, refunds should process automatically. Discrepancies between GST portal filings and ICEGATE shipping bills cause prolonged holds. Welcome Consultancy rectifies error codes and unlocks refunds.",
    body: [
      "Exporting goods with payment of Integrated Goods and Services Tax (IGST) is a common route for Indian exporters to maintain cash flow via automatic customs refunds.",
      "However, minor invoice number typos, mismatch in taxable values between Table 6A of GSTR-1 and shipping bills, or PFMS rejection can delay refunds for months.",
      "We reconcile invoice-level GST data, file concordance tables, liaise with custom EDI officers, and secure scroll generation to credit refunds to your bank.",
    ],
    checklist: [
      "GSTR-1, GSTR-3B, and Table 6A export filing records",
      "Shipping Bills and Port of Export clearance copies",
      "ICEGATE error status screenshot (e.g. SB001, SB002, SB005, SB006)",
      "Validated Bank Account Details registered with PFMS",
    ],
    faqs: [
      {
        q: "What is error code SB005 on ICEGATE?",
        a: "Error SB005 indicates an invoice number or port code mismatch between Table 6A of GSTR-1 and the shipping bill filed in customs.",
      },
    ],
  },
  {
    slug: "digital-signature-certificate",
    navTitle: "Digital Signature (Class 3 / IEC)",
    title: "Digital Signature (IEC Based or Class 3 with Encryption)",
    category: "Other Export Related Work",
    shortDesc:
      "DGFT portal and ICEGATE compliant Class 3 Signing & Encryption USB tokens with immediate activation.",
    turnaround: "2 – 4 Hours",
    heroSubtitle:
      "Government-approved Class 3 Digital Signature Certificates with encryption tokens for foreign trade compliance.",
    answerSummary:
      "All DGFT filings, ICEGATE e-SANCHIT uploads, and Customs EDI operations require a valid Class 3 Digital Signature Certificate (DSC). Welcome Consultancy issues cryptographic USB tokens with instant verification.",
    body: [
      "A Class 3 Digital Signature Certificate (DSC) provides the highest level of assurance in Indian electronic governance, legally valid under the Information Technology Act.",
      "For international trade, exporters require a DSC with both Signing and Encryption certificates, frequently configured with the organization's IEC details.",
      "We handle video verification, paperless Aadhaar/PAN e-KYC, token configuration, and browser security setup so you can sign filings immediately.",
    ],
    checklist: [
      "Aadhaar Card and PAN Card of authorized signatory",
      "Company Registration Certificate & Board Resolution",
      "Mobile number and email for video e-KYC verification",
      "IEC copy (for IEC-based organization DSC)",
    ],
    faqs: [
      {
        q: "Can I use an individual DSC for company DGFT filings?",
        a: "An Organization Class 3 DSC embedded with company name and IEC is recommended for corporate DGFT and ICEGATE transactions.",
      },
    ],
  },
  {
    slug: "export-consultancy-services",
    navTitle: "Export Consultancy Services",
    title: "Comprehensive Export Consultancy & Scheme Mapping",
    category: "Other Export Related Work",
    shortDesc:
      "Strategic advisory on Foreign Trade Policy, duty optimization, tariff classifications, and export market compliance.",
    turnaround: "Dedicated Advisory",
    heroSubtitle:
      "Institutional EXIM guidance from certified DGFT consultants with over a decade of domain leadership.",
    answerSummary:
      "Navigating India's Foreign Trade Policy requires proactive regulatory guidance. Welcome Consultancy acts as your ongoing EXIM advisor, analyzing product eligibility, FTAs, and compliance risks to maximize export margins.",
    body: [
      "Welcome Consultancy Mumbai is a leading consulting firm in the area of Export Incentives and Formalities, active in the marketplace since 2011.",
      "We partner with manufacturing exporters, merchant trading houses, and multinational corporations across India to design tax-efficient export strategies.",
      "Our services encompass tariff classification, bilateral trade agreement utilization, duty drawback optimization, and regulatory audit defense.",
    ],
    checklist: [
      "Product description, HSN codes, and technical datasheets",
      "Current export volume and primary destination countries",
      "Existing registrations (IEC, RCMC, GST)",
      "Overview of existing compliance friction or pending claims",
    ],
    faqs: [
      {
        q: "Why should an exporter retain an ongoing DGFT consultant?",
        a: "DGFT circulars, incentive caps, and customs procedures change frequently. An experienced consultant safeguards margins and recovers millions in eligible government subsidies.",
      },
    ],
  },
  {
    slug: "export-documentation-services",
    navTitle: "Export Documentation Services",
    title: "End-to-End Export Documentation & Post-Shipment Filing",
    category: "Other Export Related Work",
    shortDesc:
      "Commercial invoices, packing lists, e-BRC reconciliation, shipping bill drafting, and customs broker coordination.",
    turnaround: "Real-time Support",
    heroSubtitle:
      "Error-free trade documentation desk covering pre-shipment preparation to post-shipment incentive realization.",
    answerSummary:
      "Accurate export documentation is the bedrock of fast customs clearance and incentive claims. Welcome Consultancy drafts and audits all shipping documents to ensure complete regulatory concordance.",
    body: [
      "Discrepancies between commercial invoices, shipping bills, and bank realization certificates cause severe incentive delays and customs queries.",
      "We manage the complete trade documentation desk: generating proforma invoices, packing lists, SDF declarations, e-BRC reconciliations, and regulatory compliance reports.",
      "Our documentation specialists ensure that every mandatory declaration for RoDTEP, Drawback, and Free Trade Agreements is correctly formatted.",
    ],
    checklist: [
      "Buyer Purchase Order or Sales Contract",
      "Proforma Invoice and Packing Specifications",
      "Shipping Line / Freight Forwarder Booking details",
      "Letter of Credit (LC) copy (where applicable)",
    ],
    faqs: [
      {
        q: "Can Welcome Consultancy coordinate directly with our customs house agent (CHA)?",
        a: "Yes, we work closely with your appointed CHA to ensure shipping bill checklists are verified before export cargo arrives at port.",
      },
    ],
  },
  {
    slug: "reply-customs-dgft-notices",
    navTitle: "Reply to Customs & DGFT Notices",
    title: "Legal & Regulatory Reply to Customs & DGFT Notices",
    category: "Other Export Related Work",
    shortDesc:
      "Drafting expert replies, show cause notice (SCN) representation, and compounding applications before DGFT & Customs.",
    turnaround: "Priority Handling",
    heroSubtitle:
      "Strategic regulatory defense and dispute resolution for exporters facing customs queries or DGFT notices.",
    answerSummary:
      "Receiving a Show Cause Notice or audit query from DGFT or Customs requires precise legal and technical responses. Welcome Consultancy drafts thorough replies citing Foreign Trade Policy provisions and precedent cases.",
    body: [
      "Exporters frequently receive notices regarding unfulfilled export obligations, misclassification of HSN codes, excess drawback drawls, or DRI audit queries.",
      "A poorly drafted reply can lead to fiscal penalties, suspension of IEC, or recovery proceedings under the Customs Act.",
      "Our senior advisors formulate rigorous, evidence-backed replies, compile reconciliation statements, and represent clients during personal hearings before regional authorities.",
    ],
    checklist: [
      "Copy of the Show Cause Notice / Query memo received from DGFT or Customs",
      "Historical shipping bills, licenses, and e-BRCs related to the matter",
      "Correspondence history with the issuing authority",
      "Company legal representation authorization",
    ],
    faqs: [
      {
        q: "What should I do immediately after receiving a DGFT demand notice?",
        a: "Do not delay or ignore the notice. Contact Welcome Consultancy immediately to audit the claimed discrepancy and draft a stay or compliance response within the stipulated deadline.",
      },
    ],
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

/** Legacy slug aliases for backwards compatibility */
const SLUG_ALIASES: Record<string, string> = {
  "iec-code-import-export-code": "iec-code-registration",
  "export-incentives": "rodtep-rosctl-application",
  "epcg-license": "epcg-advance-license-closures",
  "advance-licence": "epcg-advance-license-closures",
  "export-house-certificate": "star-export-house",
  "rcmc-application": "rcmc-registration-renewal",
  "c-o-o-certificate-of-origin": "certificate-of-origin",
  "digital-signature": "digital-signature-certificate",
  "fssai": "fssai-central-registration",
  "interest-equalization": "interest-equalization-scheme",
};

export function getService(slug: string): ServiceRecord | undefined {
  const canonical = SLUG_ALIASES[slug] ?? slug;
  return SERVICES.find((s) => s.slug === canonical) ?? SERVICES.find((s) => s.slug === slug);
}

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  const service = getService(slug);
  if (!service) return undefined;
  const canonicalSlug = SLUG_ALIASES[slug] ?? service.slug;
  const extras = getServiceExtras(canonicalSlug) ?? getServiceExtras(slug);
  return {
    ...service,
    benefits: extras?.benefits ?? [
      "Institutional expertise with over a decade of DGFT domain authority.",
      "Fast-track processing with dedicated tracking and regular milestone updates.",
      "Zero regulatory friction and end-to-end documentation audit.",
      "Guaranteed compliance with Foreign Trade Policy and Indian Customs regulations.",
    ],
    documents: extras?.documents ?? service.checklist,
    pageDescription: extras?.pageDescription ?? service.shortDesc,
  };
}

export function serviceInquiryHref(slug: string): string {
  return `/contact-us?service=${encodeURIComponent(slug)}`;
}

/** 4 Official Categories matching client specifications */
export const SERVICE_CATEGORIES = [
  "Licensing Services",
  "Registration Services",
  "Certification Services",
  "Other Export Related Work",
] as const;

export function servicesByCategory(category: string): ServiceRecord[] {
  return SERVICES.filter((s) => s.category === category);
}

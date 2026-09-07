-- Seed all 16 EXIM services into the services table
INSERT OR REPLACE INTO services (
  id, title, slug, short_description, content_json, faqs_json, benefits_json, documents_json, body_json, image_url, status, seo_title, meta_description
) VALUES
(
  'srv-iec', 'Import – Export Code (IEC) Registration', 'iec-code-import-export-code',
  'Fast-track Import Export Code registration and modifications issued by DGFT for international trade.',
  '{"category":"Core Licensing","turnaround":"1 – 2 Business Days","heroSubtitle":"Instant DGFT IEC issuance & modification advisory across India.","answerSummary":"IEC Code Registration is a mandatory 10-digit DGFT licence that every Indian importer and exporter needs before clearing customs. Welcome Consultancy completes IEC issuance and modification in 1–2 business days."}',
  '[{"q":"Is IEC registration mandatory for EXIM operations?","a":"Yes, IEC is mandatory for all importers and exporters clearing customs in India, except for specific government exempt categories."},{"q":"Does IEC require annual renewal?","a":"DGFT requires annual online updating of IEC details between April and June every year."}]',
  '["Lifetime Validity: No renewal required.","Global Reach: Unlock international markets for your products.","No Return Filings: IEC does not require the filing of any returns.","Government Incentives: Required for claiming RoDTEP, EPCG, and other DGFT benefits."]',
  '["Copy of PAN Card of individual/firm/company","Canceled cheque or Bank Certificate","Address proof (Electricity bill, Rent agreement, etc.)","Aadhar card or Passport copy of the applicant"]',
  '["An Import Export Code (IEC) is a 10-digit mandatory registration issued by the Directorate General of Foreign Trade (DGFT) for any business expanding into international trade.","Without a valid IEC, you cannot clear goods through Indian Customs, claim export incentives, or open foreign remittance channels. Welcome Consultancy handles new IEC applications, modifications, annual updates, and surrender filings end-to-end.","We prepare PAN-linked documentation, digital filings on the DGFT portal, and ensure your IEC remains active for continuous EXIM operations."]',
  '/illustrations/service-iec.webp', 'Published', 'IEC Code Registration | DGFT Import Export Code Mumbai', 'Fast-track IEC Code registration & modification issued by DGFT.'
),
(
  'srv-rodtep', 'Export Incentives (RoDTEP / RoSCTL / Duty Drawback)', 'export-incentives',
  'Maximize government rebate claims on duties, taxes, and levies embedded in export production.',
  '{"category":"Export Incentives","turnaround":"3 – 5 Business Days","heroSubtitle":"Recover embedded taxes and maximize export profitability through DGFT incentive schemes.","answerSummary":"RoDTEP, RoSCTL, and Duty Drawback refund embedded central, state, and local taxes on exported goods. Welcome Consultancy optimizes claims and ICEGATE credit so exporters recover maximum cashback."}',
  '[{"q":"What is the RoDTEP Scheme?","a":"Remission of Duties and Taxes on Exported Products (RoDTEP) refunds central, state, and local duties not rebated under other mechanisms."},{"q":"How are duty drawback scrips credited?","a":"Duty Drawback & RoDTEP scrips are directly transferred electronically to the exporter''s Customs Ledger via ICEGATE."}]',
  '["Increase Profit Margins: Convert hidden costs into direct capital refunds.","Competitive Pricing: Lower your international pricing by factoring in incentives.","End-to-End Processing: We handle the entire documentation and DGFT liaison.","Dispute Resolution: We unlock stuck, pending, or rejected claims."]',
  '["Shipping Bills (Let Export Date)","Bank Realization Certificate (e-BRC)","Commercial Invoice and Packing List","Valid RCMC and IEC"]',
  '["Export incentive schemes such as RoDTEP, RoSCTL, Duty Drawback, and legacy MEIS/SEIS help exporters recover taxes and duties embedded in the export value chain.","We as Export Consultants update clients about the latest Government Incentive Schemes and help them obtain benefits on a regular basis.","Welcome Consultancy validates HS eligibility, reconciles shipping bills with e-BRCs, and follows up with DGFT and Customs."]',
  '/illustrations/service-rodtep.webp', 'Published', 'Export Incentives Claims | RoDTEP RoSCTL Duty Drawback Advisory', 'Maximize government rebate claims on duties, taxes, and levies.'
),
(
  'srv-epcg', 'Export Promotion Capital Goods (EPCG) Scheme', 'epcg-license',
  'Import capital machinery at 0% customs duty subject to fulfilling export obligation parameters.',
  '{"category":"Core Licensing","turnaround":"5 – 7 Business Days","heroSubtitle":"Import zero-duty machinery and upgrade production infrastructure seamlessly.","answerSummary":"The EPCG Scheme lets exporters import capital goods at 0% customs duty against an export obligation of 6 times the duty saved over 6 years. Welcome Consultancy handles EPCG licence filing end-to-end."}',
  '[{"q":"What is the export obligation under EPCG?","a":"Exporters must achieve export value equal to 6 times the duty saved over a period of 6 years."},{"q":"Can existing machinery be replaced under EPCG?","a":"Yes, EPCG supports modernizing existing manufacturing lines with zero-duty capital imports."}]',
  '["Zero Customs Duty: Save massive upfront capital costs on imported machinery.","Technology Upgradation: Access world-class equipment without the tax burden.","Flexible Export Obligation: Fulfill the obligation over a period of 6 years.","Indigenous Procurement: Benefits also apply to domestically sourced capital goods."]',
  '["Proforma Invoice of the machinery to be imported","Chartered Engineer Certificate (Nexus Certificate)","Past 3 years export performance data","MSME / Udyam Registration Certificate"]',
  '["This is Scheme which enables an Importer/Exporter to import capital goods at zero rates of customs duty.","Export Promotion Capital Goods are capital goods used in the production of goods which are exported to other countries.","Welcome Consultancy structures EPCG applications and monitors export obligation timelines."]',
  '/illustrations/service-epcg.webp', 'Published', 'EPCG License Scheme | Zero Customs Duty Capital Goods Import', 'Import capital machinery at 0% customs duty with EPCG scheme.'
),
(
  'srv-advance', 'Advance Authorization / Licence Scheme', 'advance-licence',
  'Duty-free import of raw materials and inputs physically incorporated into export products.',
  '{"category":"Core Licensing","turnaround":"4 – 6 Business Days","heroSubtitle":"Import raw materials without payment of Basic Customs Duty & IGST.","answerSummary":"Advance Authorization enables duty-free import of inputs physically incorporated into export products under SION norms. Welcome Consultancy prepares DGFT filings and Chartered Engineer ratios."}',
  '[{"q":"What is the validity period of Advance License?","a":"Authorization for import is valid for 12 months, with export obligation completion required within 18 months."}]',
  '["Duty-Free Inputs: Exempt from Basic Customs Duty, Education Cess, and IGST.","Working Capital Relief: No need to lock funds in duties to be refunded later.","Value Addition: Ensure minimum 15% value addition as per FTP.","Invalidation Letters: Source duty-free inputs from domestic suppliers."]',
  '["Detailed recipe or Bill of Materials (BOM)","Chartered Engineer Certificate for consumption norms","Valid RCMC from relevant Export Promotion Council","Digital Signature Certificate"]',
  '["Under Advance License Scheme, Exporter can import raw materials and related inputs under 100% duty exemption schemes.","Government fixes value addition as per standard input output norms."]',
  '/illustrations/service-advance-licence.webp', 'Published', 'Advance Licence Scheme | Duty-Free Raw Material Import DGFT', 'Duty-free import of raw materials incorporated into export products.'
),
(
  'srv-export-house', 'Export House Certificate / Star Export House Status', 'export-house-certificate',
  'Gain prestigious Star Exporter status (1 to 5 Star) with priority customs clearance and DGFT benefits.',
  '{"category":"Status Recognition","turnaround":"3 – 5 Business Days","heroSubtitle":"Elevate your international brand prestige with official DGFT Star Exporter Recognition.","answerSummary":"Star Export House status (1–5 Star) is DGFT recognition for exporters meeting FOB turnover thresholds, unlocking priority customs clearance and FTP benefits."}',
  '[{"q":"What is the threshold for 1-Star Export House status?","a":"Exporters reaching $3 Million FOB export performance in 3 out of 4 financial years qualify for 1-Star status."}]',
  '["Self-Declaration Clearance: Faster customs clearance on self-declaration basis.","Exemption from Bank Guarantees: Huge savings on working capital limits.","Priority Processing: Preferential treatment in all DGFT and Customs matters.","Establish Trust: Enhance credibility with international buyers and banks."]',
  '["CA Certified Export Performance (FOB Value) for last 3-4 years","Valid IEC and RCMC","Copy of PAN and GST Registration","Declaration of no pending investigations"]',
  '["Export House / Star Export House Certificate recognizes exporter firms as Business Leaders who have excelled in International Trade.","Status holders receive priority customs clearance and preferential treatment under Foreign Trade Policy."]',
  '/illustrations/service-export-house.webp', 'Published', 'Star Export House Status Certificate | DGFT Exporter Recognition', 'Gain 1-Star to 5-Star Export House status with priority customs clearance.'
),
(
  'srv-rcmc', 'RCMC Application (Export Promotion Councils)', 'rcmc-application',
  'Registration-cum-Membership Certificate required to claim DGFT benefits and export council assistance.',
  '{"category":"Core Licensing","turnaround":"2 – 4 Business Days","heroSubtitle":"Join relevant Export Promotion Councils (FIEO, EEPC, APEDA, Pharmexcil) effortlessly.","answerSummary":"RCMC is the Registration-cum-Membership Certificate from Export Promotion Councils required to claim DGFT export benefits and council support."}',
  '[{"q":"Why is RCMC mandatory?","a":"RCMC is essential for obtaining export benefits under FTP schemes and participating in international trade fairs."}]',
  '["Mandatory for Incentives: Cannot claim RoDTEP, Advance Authorization, or EPCG without it.","Market Intelligence: Get access to trade delegations and international fairs.","Networking: Connect with industry peers and government bodies.","MDA Support: Eligible for Market Development Assistance for export promotion."]',
  '["Copy of IEC Code","Partnership Deed, MOA, or Trust Deed","SSI/MSME/Udyam Registration Certificate","CA Certificate certifying main line of business"]',
  '["Registration-cum-Membership Certificate (RCMC) is issued by Export Promotion Councils and is essential for claiming benefits under Foreign Trade Policy schemes."]',
  '/illustrations/service-rcmc.webp', 'Published', 'RCMC Certificate Application | Export Promotion Council FIEO EEPC', 'Secure your Registration-cum-Membership Certificate for DGFT incentives.'
),
(
  'srv-coo', 'Certificate of Origin (C.O.O.) — Preferential & Non-Preferential', 'c-o-o-certificate-of-origin',
  'Official certification verifying cargo origin for international customs tariff concessions.',
  '{"category":"Specialized Compliance","turnaround":"Same Day Processing","heroSubtitle":"Digital & physical Certificate of Origin issuance via DGFT portal.","answerSummary":"A Certificate of Origin verifies goods country of origin for customs and FTA tariff concessions. Welcome Consultancy issues preferential and non-preferential COOs via the DGFT portal."}',
  '[{"q":"What is the difference between Preferential and Non-Preferential COO?","a":"Preferential COO provides duty concessions under FTAs/PTAs, while Non-Preferential COO satisfies standard customs verification."}]',
  '["Duty Concessions: Buyers get reduced import duties under Free Trade Agreements.","Market Access: Mandatory for clearing customs in the destination country.","Letter of Credit: Often a mandatory document for LC negotiation at banks.","Traceability: Certifies the authentic origin of the shipped goods."]',
  '["Commercial Invoice of the shipment","Packing List","Bill of Lading or Airway Bill","Cost sheet for value addition (for Preferential COO)"]',
  '["Certificate of Origin is one of the required documents for import customs clearance in most importing countries.","Preferential COO is given towards goods subject to preferential tariff treatment."]',
  '/illustrations/service-coo.webp', 'Published', 'Certificate of Origin (C.O.O.) Issuance | Preferential & Non-Preferential', 'Issue digital & physical Certificate of Origin via DGFT portal.'
),
(
  'srv-dsc', 'Digital Signature Certificate (Class 3 EXIM DSC)', 'digital-signature',
  'Encrypted Class 3 Digital Signature Certificate for DGFT portal filings, ICEGATE, & e-Tendering.',
  '{"category":"Specialized Compliance","turnaround":"2 Hours (Instant)","heroSubtitle":"Secure e-Token DSC for DGFT, ICEGATE, and Customs electronic filings.","answerSummary":"Class 3 EXIM DSC is required for secure DGFT, ICEGATE, and customs electronic filings. Welcome Consultancy delivers organization-embedded tokens in as little as 2 hours."}',
  '[{"q":"Is Class 3 DSC required for DGFT applications?","a":"Yes, DGFT requires Class 3 DSC with Organization name embedded for secure online authorization."}]',
  '["Mandatory Compliance: Required for all online DGFT and Customs submissions.","Secure Transactions: High-grade encryption ensures data integrity.","Paperless Processing: Eliminates physical signatures and couriers.","Time Saving: Instant authentication and authorization."]',
  '["Applicant PAN Card and Aadhar Card","Recent passport size photograph","Authorization letter from the company","GST Registration Certificate"]',
  '["A Class 3 Digital Signature Certificate with organization name embedded is mandatory for DGFT online filings and ICEGATE submissions."]',
  '/illustrations/service-dsc.webp', 'Published', 'Class 3 EXIM Digital Signature Certificate (DSC) | DGFT & ICEGATE Token', 'Get encrypted Class 3 DSC tokens for DGFT and ICEGATE filings.'
),
(
  'srv-ad-code', 'AD Code Registration Services', 'ad-code-registration',
  'Authorized Dealer (AD) Code registration across all Indian sea ports, airports, and ICDs.',
  '{"category":"Customs Compliance","turnaround":"1 – 2 Business Days","heroSubtitle":"Enable seamless port customs clearance and online BRC generation.","answerSummary":"AD Code registration links your bank account to ICEGATE ports so exporters can clear cargo and generate e-BRCs. Welcome Consultancy registers AD Codes across sea, air, and ICD locations."}',
  '[{"q":"Can an AD Code be registered at multiple ports?","a":"Yes, an AD Code issued by your bank can be registered across multiple ICEGATE port locations."}]',
  '["Mandatory for Shipping Bills: Cannot generate shipping bills without an AD Code.","Direct Bank Credits: Ensures export incentives hit your bank account.","EDPMS Compliance: Required for RBI export data processing.","Multi-Port Linkage: Register across all major sea and air ports."]',
  '["AD Code Authorization Letter from Bank (Annexure A)","Bank statement or canceled cheque","IEC Certificate and PAN Card","Class 3 Digital Signature Certificate (DSC)"]',
  '["AD Code is a 14 Digit Numerical Code provided by bank. You will need to Register an AD Code at Custom Port from where your goods are cleared by Customs."]',
  '/illustrations/service-icegate.webp', 'Published', 'AD Code Registration Port Customs | ICEGATE Bank Linkage', 'Register AD Code at sea ports, airports, and ICDs for customs clearance.'
),
(
  'srv-fssai', 'FSSAI License for Import & Export', 'fssai',
  'Central FSSAI License mandatory for importing or exporting food products and agricultural commodities.',
  '{"category":"Specialized Compliance","turnaround":"5 – 7 Business Days","heroSubtitle":"Ensure 100% food safety regulatory compliance for international cargo.","answerSummary":"Central FSSAI Licence is mandatory for food importers and exporters regardless of turnover. Welcome Consultancy manages FSSAI EXIM licensing and documentation."}',
  '[{"q":"Is a Central FSSAI License mandatory for exporters?","a":"Yes, all food importers and exporters must hold a Central FSSAI License regardless of turnover."}]',
  '["Legal Compliance: Mandatory for importing or exporting food products in India.","Fast Customs Clearance: Avoid demurrage charges due to food safety holds.","Global Trust: Assures international buyers of food safety standards.","Labeling Compliance: FSSAI packaging and labeling regulations."]',
  '["List of Directors/Partners with ID Proof","Blueprint/Layout plan of processing unit","List of food categories to be imported/exported","IE Code and Recall Plan"]',
  '["Food Safety and Standards Authority of India (FSSAI) requires a Central License for businesses importing or exporting food products, irrespective of turnover."]',
  '/illustrations/service-fssai.webp', 'Published', 'FSSAI License for Import Export | Central Food License Exporters', 'Secure Central FSSAI License for food import and export cargo.'
),
(
  'srv-aeo', 'Authorized Economic Operator (AEO) Registration Services', 'aeo-registration',
  'Customs security & compliance accreditation granting fast-track green channel clearance.',
  '{"category":"Customs Compliance","turnaround":"7 – 10 Business Days","heroSubtitle":"Join the elite accredited trade supply chain with priority customs clearance.","answerSummary":"AEO T1/T2/T3 certification is a Customs accreditation that grants faster clearance, reduced inspections, and supply-chain trust benefits for compliant traders."}',
  '[{"q":"What benefits does AEO T1 certification provide?","a":"AEO holders enjoy faster customs release, reduced inspection checks, and direct port delivery privileges."}]',
  '["Direct Port Delivery (DPD): Faster movement of cargo, bypassing CFS.","Deferred Duty Payment: Delink duty payment and customs clearance.","Fewer Physical Inspections: Significant reduction in customs examination.","Global Recognition: Benefits at foreign ports under MRAs."]',
  '["Process manual for supply chain security","Financial solvency certificate from CA","Site plan and premises security documentation","Details of business partners"]',
  '["AEO is a trade facilitation scheme for ease of doing business. Holder of this certificate is entitled for privilege, benefits, exemption and relaxation on account of import and export."]',
  '/illustrations/service-aeo.webp', 'Published', 'AEO Certification T1 T2 T3 | Authorized Economic Operator India Customs', 'Get Authorized Economic Operator (AEO) customs fast-track accreditation.'
),
(
  'srv-sims', 'SIMS Registration Services', 'sims-registration',
  'Steel Import Monitoring System (SIMS), CHIMS, NFMIMS, & PIMS compulsory advance registration.',
  '{"category":"Specialized Compliance","turnaround":"Same Day","heroSubtitle":"Mandatory advance import declarations for steel, aluminum, copper, and paper cargo.","answerSummary":"SIMS, CHIMS, NFMIMS, and PIMS require advance import registration for steel, aluminium, copper, and paper. Welcome Consultancy files same-day monitoring registrations."}',
  '[{"q":"When should SIMS registration be submitted?","a":"SIMS registration must be filed between 60 days and 15 days prior to expected cargo arrival."}]',
  '["Avoid Penalties: Non-registration leads to heavy fines and shipment holds.","Smooth Clearance: Registration number must be provided in Bill of Entry.","Data Analytics: Helps government monitor steel import trends.","Advance Planning: Must be applied 15 to 60 days before cargo arrival."]',
  '["Proforma Invoice or Purchase Order","HS Code classification of steel product","Details of manufacturer and exporter country","Port of discharge and expected date of arrival"]',
  '["Steel Import Monitoring System (SIMS) and related monitoring systems require advance registration before importing specified steel, aluminium, copper, and paper products."]',
  '/illustrations/service-compliance.webp', 'Published', 'SIMS Steel Import Monitoring System Registration | DGFT Advance Filing', 'Compulsory SIMS, CHIMS, NFMIMS & PIMS advance import registration.'
),
(
  'srv-health', 'Health Certificate & Sanitary Clearance', 'health-certificate',
  'Health and Phytosanitary certificates required for agricultural, animal, and food export shipments.',
  '{"category":"Specialized Compliance","turnaround":"2 – 3 Business Days","heroSubtitle":"Fulfill destination country health inspection and quarantine requirements.","answerSummary":"Health and phytosanitary certificates satisfy destination-country quarantine rules for agri, animal, and food exports. Welcome Consultancy coordinates lab reports and certificate issuance."}',
  '[{"q":"Which commodities require a Health Certificate?","a":"Processed foods, agricultural produce, meat, dairy, and seafood shipments require health certificates."}]',
  '["Destination Compliance: Strictly required by health authorities of importing nations.","Prevents Rejection: Avoid cargo destruction or return at foreign ports.","Quality Assurance: Certifies manufacturing meets sanitary standards.","Commercial Necessity: Required for LC negotiation."]',
  '["Laboratory Test Report from NABL lab","Commercial Invoice and Packing List","Valid FSSAI Central License","Product specifications and ingredients list"]',
  '["Health Certificates and sanitary / phytosanitary clearances are mandatory for agricultural, animal, dairy, and food export shipments."]',
  '/illustrations/service-fssai.webp', 'Published', 'Health Certificate for Food Agri Export | Phytosanitary Clearance', 'Sanitary & Phytosanitary Health Certificates for agricultural & food exports.'
),
(
  'srv-ies', 'Interest Equalization Scheme (IES) Advisory', 'interest-equalization',
  'Interest subvention on pre & post-shipment export credit for eligible manufacturing exporters & MSMEs.',
  '{"category":"Export Incentives","turnaround":"2 – 3 Business Days","heroSubtitle":"Reduce export credit interest rates by up to 3% through bank subvention.","answerSummary":"The Interest Equalization Scheme provides up to 3% interest subvention on export credit for eligible MSME manufacturer-exporters. Welcome Consultancy validates HS eligibility and bank paperwork."}',
  '[{"q":"What is the rate of interest subvention under IES?","a":"Eligible MSME manufacturer exporters receive 3% subvention, while non-MSME manufacturer exporters receive 2%."}]',
  '["Lower Financing Costs: Significantly reduces interest burden on export credit.","Improved Cash Flow: Frees up working capital for manufacturing and sourcing.","MSME Advantage: Special 3% subvention available for all MSME manufacturers.","Global Competitiveness: Helps exporters offer better credit terms to foreign buyers."]',
  '["Udyam Registration Certificate (for MSMEs)","Export order / Letter of Credit","CA Certificate verifying export performance","Bank realization documents"]',
  '["The Interest Equalization Scheme provides interest subvention on pre-shipment and post-shipment export credit for eligible manufacturer exporters and MSMEs."]',
  '/illustrations/service-rodtep.webp', 'Published', 'Interest Equalization Scheme (IES) | 3% Interest Subvention Export Credit', 'Interest rate subvention on pre & post-shipment export credit.'
),
(
  'srv-rex', 'Registered Exporter System (REX) Registration Services', 'rex-registration',
  'System of self-certification of origin for exports to EU, UK, Switzerland, and Norway under GSP schemes.',
  '{"category":"Specialized Compliance","turnaround":"2 – 4 Business Days","heroSubtitle":"Self-certify origin of goods for European Union and UK trade destinations.","answerSummary":"REX registration enables self-certification of origin for GSP exports to the EU, UK, Switzerland, and Norway without recurring COO fees."}',
  '[{"q":"Does REX registration expire?","a":"No, REX registration does not expire unless revoked or surrendered by the exporter."}]',
  '["Self-Certification: No need to apply for COO from agencies for every EU shipment.","Cost Savings: Eliminates per-shipment fee for Certificate of Origin.","Faster Operations: Statements on Origin printed directly on invoice.","EU Market Access: Crucial for maintaining competitive pricing in European markets."]',
  '["IEC and PAN Copy","Application Form signed by authorized signatory","Digital Signature Certificate","List of HS Codes of products exported to EU"]',
  '["Registered Exporter System (REX) allows exporters to self-certify origin of goods for preferential exports to the EU, UK, Switzerland, and Norway under GSP schemes."]',
  '/illustrations/service-coo.webp', 'Published', 'REX System Registration EU GSP | Registered Exporter Self-Certification', 'Self-certify origin of goods for EU, UK & European trade destinations.'
),
(
  'srv-icegate', 'ICEGATE Registration Services', 'icegate-registration',
  'Customs automated electronic portal onboarding for online shipping bill tracking and duty payments.',
  '{"category":"Customs Compliance","turnaround":"1 Business Day","heroSubtitle":"Complete ICEGATE ID creation, e-SANCHIT enablement, & AD Code binding.","answerSummary":"ICEGATE is Customs electronic portal for shipping bills, duty payment, and e-SANCHIT. Welcome Consultancy completes ICEGATE ID creation, port tagging, and AD Code binding in one business day."}',
  '[{"q":"What is e-SANCHIT on ICEGATE?","a":"e-SANCHIT allows paperless customs clearance by uploading supporting trade documents digitally."}]',
  '["Paperless Customs: E-filing of Shipping Bills and Bills of Entry.","Real-Time Tracking: Track IGST refunds, duty drawback, and container status.","E-Sanchit Uploads: Digitally upload supporting documents for customs assessment.","Duty Payments: Pay customs duties online seamlessly."]',
  '["Class 3 Digital Signature Certificate","IEC and GST Registration","Authorization letter on company letterhead","Aadhar and PAN of authorized person"]',
  '["ICEGATE helps Exporters and Custom Agents to trace the location of material and status of shipping bills. Registration is required for e-filing Shipping Bills and Bill of Entries."]',
  '/illustrations/service-icegate.webp', 'Published', 'ICEGATE Registration Portal Onboarding | Customs e-SANCHIT AD Code Linkage', 'ICEGATE user ID creation, e-SANCHIT enablement & customs port registration.'
);

-- Seed Media library with all brand illustration assets
INSERT OR REPLACE INTO media (id, filename, url, alt_text) VALUES
('med-hero', 'hero-global-trade.webp', '/illustrations/hero-global-trade.webp', 'Cinematic night port with gold-accented containers and cargo ship — global export logistics'),
('med-process', 'process-workflow.webp', '/illustrations/process-workflow.webp', 'Three-stage advisory workflow: diagnose eligibility, file with precision, realize incentives'),
('med-incentives', 'incentives-flow.webp', '/illustrations/incentives-flow.webp', 'Infographic flow from government schemes through business to export incentive realization'),
('med-consultancy', 'consultancy-advisory.webp', '/illustrations/consultancy-advisory.webp', 'Abstract advisory architecture assembling compliance strategy into a golden core'),
('med-contact', 'contact-workspace.webp', '/illustrations/contact-workspace.webp', 'Premium advisory workspace with holographic trade dashboard overlooking a dusk port city'),
('med-about', 'about-timeline.webp', '/illustrations/about-timeline.webp', 'Timeline from founding through PAN India expansion to a modern advisory hub'),
('med-faq', 'faq-clarity.webp', '/illustrations/faq-clarity.webp', 'Prism of clarity casting gold light through fog of paperwork into ordered answers'),
('med-testimonials', 'testimonials-trust.webp', '/illustrations/testimonials-trust.webp', 'Verified exporter trust constellation with gold badges and industry emblems'),
('med-cta', 'cta-horizon.webp', '/illustrations/cta-horizon.webp', 'Dawn trade horizon with gold shipping lane toward global ports'),
('med-routes', 'deco-trade-routes.webp', '/illustrations/deco-trade-routes.webp', 'Global trade routes map overlay'),
('med-s-iec', 'service-iec.webp', '/illustrations/service-iec.webp', 'Digital trade identity crystal for IEC registration'),
('med-s-rodtep', 'service-rodtep.webp', '/illustrations/service-rodtep.webp', 'Customs cargo and tax remission visualization for RoDTEP claims'),
('med-s-epcg', 'service-epcg.webp', '/illustrations/service-epcg.webp', 'Capital goods machinery with duty-exemption shield for EPCG'),
('med-s-advance', 'service-advance-licence.webp', '/illustrations/service-advance-licence.webp', 'Duty-free input materials transforming through Advance Licence portal'),
('med-s-exphouse', 'service-export-house.webp', '/illustrations/service-export-house.webp', 'Star Export House prestige emblem and status tiers'),
('med-s-rcmc', 'service-rcmc.webp', '/illustrations/service-rcmc.webp', 'RCMC chamber membership seal and affiliation network'),
('med-s-coo', 'service-coo.webp', '/illustrations/service-coo.webp', 'Certificate of Origin seal with luminous trade route'),
('med-s-dsc', 'service-dsc.webp', '/illustrations/service-dsc.webp', 'Digital signature token sealing encrypted trade documents'),
('med-s-icegate', 'service-icegate.webp', '/illustrations/service-icegate.webp', 'ICEGATE customs gateway with bill of entry holograms'),
('med-s-fssai', 'service-fssai.webp', '/illustrations/service-fssai.webp', 'FSSAI food export safety certification visualization'),
('med-s-aeo', 'service-aeo.webp', '/illustrations/service-aeo.webp', 'AEO trusted-trader shield and customs fast lane'),
('med-s-compliance', 'service-compliance.webp', '/illustrations/service-compliance.webp', 'Secure sealed document vault for trade compliance'),
('med-founder', 'founder-nandkumar.png', '/images/founder-nandkumar.png', 'Mr. Nandkumar - Founder & Principal DGFT Advisor');

-- Seed Static Pages into pages table
INSERT OR REPLACE INTO pages (id, title, slug, content_json, status, seo_title, meta_description) VALUES
(
  'page-home', 'Home', 'home',
  '{"hero_image":"/illustrations/hero-global-trade.webp","hero_title":"Welcome Consultancy","hero_subtitle":"Maximize export incentives with absolute precision — DGFT licensing, customs compliance, and government benefit claims."}',
  'Published', 'DGFT & EXIM Advisory Mumbai | Welcome Consultancy', 'Leading Export Incentives & DGFT Consultants in Mumbai since 2011. Specialized in IEC, RoDTEP, EPCG, Advance License & Customs Advisory.'
),
(
  'page-about', 'About Us', 'about-us',
  '{"hero_image":"/illustrations/about-timeline.webp","hero_title":"About Welcome Consultancy","hero_subtitle":"A decade of shaping India''s foreign trade compliance with uncompromised integrity."}',
  'Published', 'About Us | Welcome Consultancy Mumbai DGFT Advisory', 'Learn about Welcome Consultancy history, 10+ years of experience, 1000+ active exporters served PAN India, and our leadership team.'
),
(
  'page-contact', 'Contact Us', 'contact-us',
  '{"hero_image":"/illustrations/contact-workspace.webp","hero_title":"Contact Advisory Desk","hero_subtitle":"Get in touch with our DGFT experts for instant assistance on export incentives, licensing, and customs clearance."}',
  'Published', 'Contact Welcome Consultancy | DGFT & EXIM Advisory Desk', 'Reach Welcome Consultancy at Malad West, Mumbai. Call +91 98671 73397 or book a free 1-on-1 consultation slot online.'
),
(
  'page-services', 'Services', 'services',
  '{"hero_image":"/illustrations/consultancy-advisory.webp","hero_title":"16 Specialized EXIM Services","hero_subtitle":"End-to-end DGFT licensing, incentives claims, and customs facilitation."}',
  'Published', 'All 16 DGFT & EXIM Services | Welcome Consultancy Mumbai', 'Explore our 16 specialized Foreign Trade services including RoDTEP claims, EPCG licensing, IEC code, AEO certification & RCMC applications.'
),
(
  'page-tools', 'Tools', 'tools',
  '{"hero_image":"/illustrations/deco-trade-routes.webp","hero_title":"EXIM Intelligence Tools","hero_subtitle":"Interactive RoDTEP calculators, EPCG estimators, and instant document checklist generators."}',
  'Published', 'Interactive EXIM Tools | RoDTEP & EPCG Calculators', 'Model your export incentive savings with our live RoDTEP calculator and EPCG duty estimator widgets.'
),
(
  'page-blogs', 'Blogs & Insights', 'blogs',
  '{"hero_image":"/illustrations/hero-global-trade.webp","hero_title":"Regulatory Updates & Insights","hero_subtitle":"Latest DGFT circulars, customs policy shifts, and incentive policy analysis."}',
  'Published', 'DGFT & Foreign Trade Blogs | Regulatory Updates', 'Read expert insights on Foreign Trade Policy 2023, DGFT updates, RoDTEP rates, and customs compliance advice.'
);

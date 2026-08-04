/**
 * Source of benefits/documents/page descriptions for each DGFT service.
 * Live pages use app/service/[slug]/page.tsx + lib/services.ts + lib/service-extras.ts.
 * Sync extras with: node scripts/sync-service-extras.mjs
 * Do NOT regenerate static app/service/<slug>/ folders.
 */
import fs from 'fs';
import path from 'path';

const services = [
  {
    slug: 'iec-code-import-export-code',
    title: 'IEC Code Registration',
    icon: 'fa-barcode',
    description: 'The Import Export Code (IEC) is a key business identification number which is mandatory for Exports or Imports. We provide rapid end-to-end IEC registration services, modifications, and linkage with DGFT and Customs portals.',
    benefits: [
      'Lifetime Validity: No renewal required.',
      'Global Reach: Unlock international markets for your products.',
      'No Return Filings: IEC does not require the filing of any returns.',
      'Government Incentives: Required for claiming RoDTEP, EPCG, and other DGFT benefits.',
    ],
    documents: [
      'Copy of PAN Card of individual/firm/company',
      'Canceled cheque or Bank Certificate',
      'Address proof (Electricity bill, Rent agreement, etc.)',
      'Aadhar card or Passport copy of the applicant',
    ],
  },
  {
    slug: 'export-incentives',
    title: 'Export Incentives & Schemes',
    icon: 'flaticon-bar-graph',
    description: 'Maximize your export profitability. We specialize in identifying, calculating, and claiming all applicable export incentives under the Foreign Trade Policy (FTP), including RoDTEP, RoSCTL, Duty Drawback, and MAI.',
    benefits: [
      'Increase Profit Margins: Convert hidden costs into direct capital refunds.',
      'Competitive Pricing: Lower your international pricing by factoring in incentives.',
      'End-to-End Processing: We handle the entire documentation and DGFT liaison.',
      'Dispute Resolution: We unlock stuck, pending, or rejected claims.',
    ],
    documents: [
      'Shipping Bills (Let Export Date)',
      'Bank Realization Certificate (e-BRC)',
      'Commercial Invoice and Packing List',
      'Valid RCMC and IEC',
    ],
  },
  {
    slug: 'epcg-license',
    title: 'EPCG License Scheme',
    icon: 'flaticon-chart-1',
    description: 'The Export Promotion Capital Goods (EPCG) Scheme allows the import of capital goods (machinery, equipment) at zero customs duty for pre-production, production, and post-production. We assist with issuance, amendment, and redemption of EPCG licenses.',
    benefits: [
      'Zero Customs Duty: Save massive upfront capital costs on imported machinery.',
      'Technology Upgradation: Access world-class equipment without the tax burden.',
      'Flexible Export Obligation: Fulfill the obligation over a period of 6 years.',
      'Indigenous Procurement: Benefits also apply to domestically sourced capital goods.',
    ],
    documents: [
      'Proforma Invoice of the machinery to be imported',
      'Chartered Engineer Certificate (Nexus Certificate)',
      'Past 3 years export performance data',
      'MSME / Udyam Registration Certificate',
    ],
  },
  {
    slug: 'advance-licence',
    title: 'Advance Licence Scheme',
    icon: 'flaticon-stats',
    description: 'Advance Authorization is issued to allow duty-free import of input materials, which are physically incorporated in the export product. We help manufacturers calculate Standard Input Output Norms (SION) and secure licenses.',
    benefits: [
      'Duty-Free Inputs: Exempt from Basic Customs Duty, Education Cess, and IGST.',
      'Working Capital Relief: No need to lock funds in duties to be refunded later.',
      'Value Addition: Ensure minimum 15% value addition as per FTP.',
      'Invalidation Letters: Source duty-free inputs from domestic suppliers.',
    ],
    documents: [
      'Detailed recipe or Bill of Materials (BOM)',
      'Chartered Engineer Certificate for consumption norms',
      'Valid RCMC from relevant Export Promotion Council',
      'Digital Signature Certificate',
    ],
  },
  {
    slug: 'export-house-certificate',
    title: 'Export House Certificate (Status Holder)',
    icon: 'fa-file-text-o',
    description: 'Status Holder Certification recognizes exporter firms as business leaders who have excelled in international trade. We help you achieve One Star to Five Star Export House status based on your FOB export performance.',
    benefits: [
      'Self-Declaration Clearance: Faster customs clearance on self-declaration basis.',
      'Exemption from Bank Guarantees: Huge savings on working capital limits.',
      'Priority Processing: Preferential treatment in all DGFT and Customs matters.',
      'Establish Trust: Enhance credibility with international buyers and banks.',
    ],
    documents: [
      'CA Certified Export Performance (FOB Value) for last 3-4 years',
      'Valid IEC and RCMC',
      'Copy of PAN and GST Registration',
      'Declaration of no pending investigations',
    ],
  },
  {
    slug: 'rcmc-application',
    title: 'RCMC Application',
    icon: 'flaticon-puzzle',
    description: 'A Registration-Cum-Membership Certificate (RCMC) is mandatory for claiming export incentives and authorizations. We identify the correct Export Promotion Council (FIEO, EEPC, APEDA, etc.) and process your registration.',
    benefits: [
      'Mandatory for Incentives: Cannot claim RoDTEP, Advance Authorization, or EPCG without it.',
      'Market Intelligence: Get access to trade delegations and international fairs.',
      'Networking: Connect with industry peers and government bodies.',
      'MDA Support: Eligible for Market Development Assistance for export promotion.',
    ],
    documents: [
      'Copy of IEC Code',
      'Partnership Deed, Memorandum of Association (MOA), or Trust Deed',
      'SSI/MSME/Udyam Registration Certificate (for manufacturer exporter)',
      'CA Certificate certifying the main line of business',
    ],
  },
  {
    slug: 'c-o-o-certificate-of-origin',
    title: 'C.O.O. (Certificate of Origin)',
    icon: 'flaticon-setting-spanner',
    description: 'A Certificate of Origin proves that the export goods are wholly obtained or manufactured in India. We assist in obtaining both Preferential (FTA/PTA) and Non-Preferential certificates from authorized agencies.',
    benefits: [
      'Duty Concessions: Buyers get reduced import duties under Free Trade Agreements.',
      'Market Access: Mandatory for clearing customs in the destination country.',
      'Letter of Credit: Often a mandatory document for LC negotiation at banks.',
      'Traceability: Certifies the authentic origin of the shipped goods.',
    ],
    documents: [
      'Commercial Invoice of the shipment',
      'Packing List',
      'Bill of Lading or Airway Bill',
      'Cost sheet for value addition (for Preferential COO)',
    ],
  },
  {
    slug: 'digital-signature',
    title: 'Digital Signature for DGFT',
    icon: 'fa-sign-in',
    description: 'Class 3 Digital Signature Certificates (DSC) with IEC linkage are mandatory for filing applications on the DGFT and ICEGATE portals. We issue and configure secure token-based DSCs for seamless compliance.',
    benefits: [
      'Mandatory Compliance: Required for all online DGFT and Customs submissions.',
      'Secure Transactions: High-grade encryption ensures data integrity.',
      'Paperless Processing: Eliminates the need for physical signatures and couriers.',
      'Time Saving: Instant authentication and authorization.',
    ],
    documents: [
      'Applicant PAN Card and Aadhar Card',
      'Recent passport size photograph',
      'Authorization letter from the company',
      'GST Registration Certificate',
    ],
  },
  {
    slug: 'ad-code-registration',
    title: 'AD Code Registration',
    icon: 'flaticon-strategy',
    description: 'An Authorized Dealer (AD) Code must be registered at every customs port from where goods are exported. We handle the entire ICEGATE registration and port linkage process for your bank’s AD Code.',
    benefits: [
      'Mandatory for Shipping Bills: Cannot generate shipping bills without an AD Code.',
      'Direct Bank Credits: Ensures export incentives (like Drawback) hit your bank account.',
      'EDPMS Compliance: Required for RBI export data processing and monitoring.',
      'Multi-Port Linkage: We can register your code across all major sea and air ports.',
    ],
    documents: [
      'AD Code Authorization Letter from the Bank (Annexure A)',
      'Bank statement or canceled cheque',
      'IEC Certificate and PAN Card',
      'Class 3 Digital Signature Certificate (DSC)',
    ],
  },
  {
    slug: 'fssai',
    title: 'FSSAI (For Export & Import)',
    icon: 'fa-cutlery',
    description: 'We secure FSSAI Central Licenses for 100% Export Oriented Units (EOUs) and Importers. Food safety clearance is critical for customs processing, and we ensure compliance with FICS (Food Import Clearance System).',
    benefits: [
      'Legal Compliance: Mandatory for importing or exporting food products in India.',
      'Fast Customs Clearance: Avoid demurrage charges at ports due to food safety holds.',
      'Global Trust: Assures international buyers of stringent food safety standards.',
      'Labeling Compliance: We assist with FSSAI packaging and labeling regulations.',
    ],
    documents: [
      'List of Directors/Partners with ID and Address Proof',
      'Blueprint/Layout plan of the processing unit',
      'List of food categories to be imported/exported',
      'IE Code and Recall Plan',
    ],
  },
  {
    slug: 'aeo-registration',
    title: 'AEO Registration Services',
    icon: 'fa-globe',
    description: 'The Authorized Economic Operator (AEO) program is a global supply chain security initiative. We assist tier 1, 2, and 3 exporters and logistics providers in obtaining AEO certification (T1, T2, T3, LO) from Indian Customs.',
    benefits: [
      'Direct Port Delivery (DPD): Faster movement of cargo, bypassing CFS.',
      'Deferred Duty Payment: Delink duty payment and customs clearance.',
      'Fewer Physical Inspections: Significant reduction in customs examination.',
      'Global Recognition: Benefits at foreign ports under Mutual Recognition Agreements.',
    ],
    documents: [
      'Process manual for supply chain security',
      'Financial solvency certificate from CA',
      'Site plan and premises security documentation',
      'Details of business partners and cargo handling processes',
    ],
  },
  {
    slug: 'sims-registration',
    title: 'SIMS Registration Services',
    icon: 'flaticon-tools',
    description: 'The Steel Import Monitoring System (SIMS) requires mandatory advance registration for specific steel products before arrival. We ensure timely filing to generate SIMS Registration Numbers and avoid customs penalties.',
    benefits: [
      'Avoid Penalties: Non-registration leads to heavy fines and shipment holds.',
      'Smooth Clearance: Registration number must be provided in the Bill of Entry.',
      'Data Analytics: Helps the government monitor steel import trends.',
      'Advance Planning: Must be applied 15 to 60 days before cargo arrival.',
    ],
    documents: [
      'Proforma Invoice or Purchase Order',
      'HS Code classification of the steel product',
      'Details of the manufacturer and exporter country',
      'Port of discharge and expected date of arrival',
    ],
  },
  {
    slug: 'health-certificate',
    title: 'Health Certificate',
    icon: 'fa-medkit',
    description: 'Mandatory for the export of food, marine, meat, and pharmaceutical products, a Health Certificate ensures products are fit for human consumption. We liaise with EIA, MPEDA, and APEDA for issuance.',
    benefits: [
      'Destination Compliance: Strictly required by health authorities of importing nations.',
      'Prevents Rejection: Avoid costly cargo destruction or return at foreign ports.',
      'Quality Assurance: Certifies that manufacturing meets sanitary and phytosanitary standards.',
      'Commercial Necessity: Often required for LC negotiation.',
    ],
    documents: [
      'Laboratory Test Report from an NABL accredited lab',
      'Commercial Invoice and Packing List',
      'Valid FSSAI Central License',
      'Product specifications and ingredients list',
    ],
  },
  {
    slug: 'interest-equalization',
    title: 'Interest Equalization Scheme',
    icon: 'flaticonv5-money-back-guarantee',
    description: 'The Interest Equalization Scheme provides pre and post-shipment export credit at subsidized interest rates. We help MSMEs and merchant exporters claim the 2% to 3% interest subvention through their banks.',
    benefits: [
      'Lower Financing Costs: Significantly reduces the interest burden on export credit.',
      'Improved Cash Flow: Frees up working capital for manufacturing and sourcing.',
      'MSME Advantage: Special 3% subvention available for all MSME manufacturers.',
      'Global Competitiveness: Helps exporters offer better credit terms to foreign buyers.',
    ],
    documents: [
      'Udyam Registration Certificate (for MSMEs)',
      'Export order / Letter of Credit',
      'CA Certificate verifying export performance',
      'Bank realization documents',
    ],
  },
  {
    slug: 'rex-registration',
    title: 'REX Registration Services',
    icon: 'flaticonv5-user-profile',
    description: 'The Registered Exporter (REX) system allows exporters to self-certify the origin of goods to the European Union (EU) and Switzerland under the GSP scheme. We process the application with local nodes and DGFT.',
    benefits: [
      'Self-Certification: No need to apply for a COO from agencies for every EU shipment.',
      'Cost Savings: Eliminates the per-shipment fee for Certificate of Origin.',
      'Faster Operations: Statements on Origin can be printed directly on the invoice.',
      'EU Market Access: Crucial for maintaining competitive pricing in European markets.',
    ],
    documents: [
      'IEC and PAN Copy',
      'Application Form signed by authorized signatory',
      'Digital Signature Certificate',
      'List of HS Codes of products exported to the EU',
    ],
  },
  {
    slug: 'icegate-registration',
    title: 'ICEGATE Registration Services',
    icon: 'fa-ship',
    description: 'ICEGATE is the national portal of Indian Customs for e-filing. We set up comprehensive ICEGATE profiles, link AD codes, register DSCs, and ensure your e-Sanchit facility is fully operational.',
    benefits: [
      'Paperless Customs: E-filing of Shipping Bills and Bills of Entry.',
      'Real-Time Tracking: Track IGST refunds, duty drawback, and container status.',
      'E-Sanchit Uploads: Digitally upload supporting documents for customs assessment.',
      'Duty Payments: Pay customs duties online seamlessly.',
    ],
    documents: [
      'Class 3 Digital Signature Certificate',
      'IEC and GST Registration',
      'Authorization letter on company letterhead',
      'Aadhar and PAN of the authorized person',
    ],
  },
];

async function generateServicePages() {
  console.warn(
    "Static per-slug service pages are deprecated. Run: node scripts/sync-service-extras.mjs",
  );
  process.exit(0);

  const rootDir = process.cwd();
  
  for (const service of services) {
    const serviceDir = path.join(rootDir, 'app', 'service', service.slug);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(serviceDir)) {
      fs.mkdirSync(serviceDir, { recursive: true });
    }

    const pageContent = \`"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, FileText, Phone, Settings, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServicePage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b-0 border-white/5 rounded-none">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
                <span className="text-obsidian font-bold tracking-tighter">W</span>
             </div>
             <span className="text-lg font-bold tracking-tight text-foreground">Welcome Consultancy</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-semibold text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/about-us" className="hover:text-foreground transition-colors">About Us</Link>
            <Link href="/#services" className="hover:text-foreground transition-colors">Services</Link>
          </nav>
          <Button asChild className="bg-primary text-primary-foreground font-semibold">
            <Link href="/contact-us">Book Consultation</Link>
          </Button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative pt-24 pb-20 px-6 bg-obsidian text-white overflow-hidden">
        <div className="absolute inset-0 bg-gold-gradient opacity-5" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
             <div className="flex items-center gap-2 text-gold-500 text-sm font-bold mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
                <ChevronRight className="w-4 h-4" />
                <span>\${service.title}</span>
             </div>
             <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
               \${service.title}
             </h1>
             <p className="text-lg text-slate-300 font-medium max-w-xl leading-relaxed mb-8">
               \${service.description}
             </p>
             <div className="flex gap-4">
                <Button size="lg" asChild className="bg-gold-500 hover:bg-gold-600 text-obsidian font-bold">
                  <Link href="/contact-us">Get Started Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 font-bold">
                  <a href="tel:9833062670"><Phone className="w-4 h-4 mr-2" /> Call Expert</a>
                </Button>
             </div>
          </div>
          <div className="hidden md:flex w-72 h-72 rounded-2xl glass-panel border-white/10 items-center justify-center relative">
             <div className="absolute inset-0 bg-gold-gradient opacity-10 rounded-2xl" />
             <Settings className="w-24 h-24 text-gold-500 opacity-80" />
          </div>
        </div>
      </section>

      {/* Main Content Split Layout */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2 space-y-16">
             {/* Description Section */}
             <div>
                <h2 className="text-3xl font-black tracking-tight mb-6">Overview & Strategic Value</h2>
                <div className="prose prose-lg text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground max-w-none leading-relaxed">
                   <p>\${service.description}</p>
                   <p>Navigating the exact compliance requirements and DGFT policies requires institutional expertise. At Welcome Consultancy, we don't just file applications; we strategically map your entire EXIM lifecycle to ensure maximum benefit realization and zero regulatory friction.</p>
                </div>
             </div>

             {/* Benefits Section */}
             <div className="glass-panel p-8 rounded-2xl border-primary/20 bg-primary/5">
                <h2 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-3">
                   <ShieldCheck className="w-8 h-8 text-primary" />
                   Key Benefits & Incentives
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   \${service.benefits.map(b => \`
                   <li className="flex items-start gap-3 bg-background p-4 rounded-xl border border-border shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-foreground">\${b}</span>
                   </li>
                   \`).join('')}
                </ul>
             </div>

             {/* Documents Section */}
             <div>
                <h2 className="text-3xl font-black tracking-tight mb-6 flex items-center gap-3">
                   <FileText className="w-8 h-8 text-muted-foreground" />
                   Required Documents
                </h2>
                <div className="bg-card border border-border rounded-2xl p-8">
                  <p className="text-sm text-muted-foreground mb-6 font-medium">Please keep the following documents ready to initiate the processing of \${service.title}:</p>
                  <ul className="space-y-4">
                     \${service.documents.map(d => \`
                     <li className="flex items-center gap-3 text-foreground font-medium pb-4 border-b border-border/50 last:border-0 last:pb-0">
                        <ArrowRight className="w-4 h-4 text-primary" />
                        \${d}
                     </li>
                     \`).join('')}
                  </ul>
                </div>
             </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
             <div className="sticky top-24 glass-panel p-8 rounded-2xl border-border bg-card shadow-lg flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                   <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-3">Expert Consultation</h3>
                <p className="text-sm text-muted-foreground font-medium mb-8">Discuss your specific case requirements directly with our DGFT and Customs licensing experts.</p>
                
                <Button size="lg" className="w-full h-14 bg-primary text-primary-foreground font-bold mb-4" asChild>
                   <Link href="/contact-us">Book Appointment</Link>
                </Button>
                
                <Button size="lg" variant="outline" className="w-full h-14 font-bold border-border" asChild>
                   <a href="tel:9833062670">Call +91 98330 62670</a>
                </Button>
                
                <p className="text-xs text-muted-foreground mt-6 font-medium">Response within 2 hours during business days.</p>
             </div>
          </div>

        </div>
      </section>
    </div>
  );
}
\`;

    fs.writeFileSync(path.join(serviceDir, 'page.tsx'), pageContent, 'utf8');
    console.log(\`Successfully generated content-rich page for: \${service.slug}\`);
  }
}

generateServicePages().catch(console.error);

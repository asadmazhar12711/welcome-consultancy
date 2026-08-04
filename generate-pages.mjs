import fs from 'fs';
import path from 'path';

const servicesDataFile = path.join(process.cwd(), 'services_data.json');
const servicesData = JSON.parse(fs.readFileSync(servicesDataFile, 'utf-8'));

const serviceDir = path.join(process.cwd(), 'app', 'service');
if (!fs.existsSync(serviceDir)) {
  fs.mkdirSync(serviceDir, { recursive: true });
}

const template = (slug, title, paragraphs) => `import React from 'react';
import type { Metadata } from 'next';
import { ArrowLeft, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '${title.replace(/'/g, "\\'")} | Welcome Consultancy',
  description: 'Expert consultation and registration services for ${title.replace(/'/g, "\\'")}',
};

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-obsidian">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8ed716d40a?q=80&w=2940&auto=format&fit=crop" 
            alt="Logistics background" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/#services" className="inline-flex items-center text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              ${title}
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              We provide comprehensive end-to-end consultancy and execution for your ${title} requirements, ensuring total compliance with DGFT and Customs regulations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-obsidian font-semibold" asChild>
                <Link href="/contact-us">
                  Get Free Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="prose prose-lg max-w-none text-foreground">
                ${paragraphs.map(p => `<p className="leading-relaxed text-muted-foreground mb-6">${p.replace(/{/g, '&#123;').replace(/}/g, '&#125;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`).join('\n                ')}
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-8 mt-12 shadow-sm">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <FileText className="w-6 h-6 text-gold-500 mr-3" />
                  Why Choose Us?
                </h3>
                <ul className="space-y-4">
                  {[
                    'Expert guidance on documentation and compliance',
                    'Fast-track application processing and follow-ups',
                    'Transparent communication and status updates',
                    'In-depth knowledge of current EXIM policies'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-obsidian text-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-xl font-semibold mb-4">Need Urgent Assistance?</h3>
                <p className="text-slate-400 mb-6 text-sm">
                  Our trade experts are available to evaluate your specific case and provide immediate guidance.
                </p>
                <Button className="w-full bg-white text-obsidian hover:bg-gray-100" asChild>
                  <Link href="https://wa.me/919867173397" target="_blank">
                    Chat on WhatsApp
                  </Link>
                </Button>
                <div className="mt-4 pt-4 border-t border-slate-800 text-center">
                  <p className="text-sm text-slate-400">Or call us directly:</p>
                  <a href="tel:+919833062670" className="block text-lg font-medium text-gold-400 hover:text-gold-300 mt-1">
                    +91 98330 62670
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
`;

for (const service of servicesData) {
  const dirPath = path.join(serviceDir, service.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const filePath = path.join(dirPath, 'page.tsx');
  const fileContent = template(service.slug, service.title, service.content);
  fs.writeFileSync(filePath, fileContent);
  console.log(`Generated: ${filePath}`);
}

console.log('All service pages successfully generated in parallel.');

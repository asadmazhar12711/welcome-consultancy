import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const oldWebsiteDir = path.join(process.cwd(), 'Old Website');
const outputDataFile = path.join(process.cwd(), 'services_data.json');

const files = fs.readdirSync(oldWebsiteDir).filter(f => /^\d{2}_service_/.test(f) && f.endsWith('.html'));

const servicesData = [];

for (const file of files) {
  const filePath = path.join(oldWebsiteDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);
  
  // The service title is usually an h1 or h2
  let rawTitle = $('h1.pagetitle-title, h1').first().text().trim();
  if (!rawTitle) {
      rawTitle = $('.elementor-heading-title').first().text().trim();
  }
  
  // The content is usually in paragraphs within elementor text editors
  let paragraphs = [];
  $('.elementor-widget-text-editor p, .elementor-text-editor p').each((i, el) => {
    const text = $(el).text().trim();
    if (text) paragraphs.push(text);
  });
  
  // If we couldn't find paragraphs, just grab raw text from the main column
  if (paragraphs.length === 0) {
    const text = $('.elementor-widget-text-editor').text().trim().split('\n').map(t => t.trim()).filter(Boolean);
    paragraphs = Array.from(new Set(text)).slice(0, 5); // Take first 5 unique lines as content
  }

  // Derive a slug from the filename (e.g. 05_service_iec_code.html -> iec-code)
  let slug = file.replace(/^\d+_service_/, '').replace(/\.html$/, '').replace(/_/g, '-');
  
  // Map specific ones to match the old URLs (e.g. iec-code -> iec-code-import-export-code)
  if (slug === 'iec-code') slug = 'iec-code-import-export-code';
  if (file === '11_service_coo_certificate_of_origin.html') slug = 'c-o-o-certificate-of-origin';
  
  // Clean title
  let title = rawTitle || slug.replace(/-/g, ' ').toUpperCase();

  servicesData.push({
    file,
    slug,
    title,
    content: paragraphs,
  });
}

fs.writeFileSync(outputDataFile, JSON.stringify(servicesData, null, 2));
console.log('Extracted data to services_data.json');

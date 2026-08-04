/**
 * Syncs benefits/documents from generate-services-content.mjs source
 * into lib/service-extras.ts. Service pages are rendered via
 * app/service/[slug]/page.tsx — do not regenerate static per-slug folders.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(root, "generate-services-content.mjs"), "utf8");
const m = src.match(/const services = (\[[\s\S]*?\]);\n\nasync/);
if (!m) {
  console.error("Could not parse services array from generate-services-content.mjs");
  process.exit(1);
}
const services = eval(m[1]);
const out = {};
for (const s of services) {
  out[s.slug] = {
    benefits: s.benefits,
    documents: s.documents,
    pageDescription: s.description,
  };
}
const file = `export type ServiceExtras = {
  benefits: string[];
  documents: string[];
  pageDescription: string;
};

export const SERVICE_EXTRAS: Record<string, ServiceExtras> = ${JSON.stringify(out, null, 2)};

export function getServiceExtras(slug: string): ServiceExtras | undefined {
  return SERVICE_EXTRAS[slug];
}
`;
fs.writeFileSync(path.join(root, "lib/service-extras.ts"), file);
console.log(`Synced ${Object.keys(out).length} services → lib/service-extras.ts`);

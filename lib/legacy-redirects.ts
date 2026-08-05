/**
 * Permanent redirects for WordPress legacy URLs and known path aliases.
 * Trailing-slash variants are handled in middleware.
 */
export const LEGACY_REDIRECTS: Record<string, string> = {
  "/contact": "/contact-us",
  "/book": "/tools",
  "/booking": "/tools",
  "/consultation": "/tools",
  "/services/import-export-code": "/service/iec-code-import-export-code",
  "/services/export-incentives": "/service/export-incentives",
  "/services/epcg-license": "/service/epcg-license",
  "/services/advance-licence": "/service/advance-licence",
  "/services/export-house-certificate": "/service/export-house-certificate",
  "/services/rcmc-application": "/service/rcmc-application",
  "/services/certificate-of-origin": "/service/c-o-o-certificate-of-origin",
  "/services/digital-signature": "/service/digital-signature",
  "/services/ad-code-registration": "/service/ad-code-registration",
  "/services/fssai-registration": "/service/fssai",
  "/services/aeo-registration": "/service/aeo-registration",
  "/services/sims-registration": "/service/sims-registration",
  "/services/health-certificate": "/service/health-certificate",
  "/services/interest-equalization-scheme": "/service/interest-equalization",
  "/services/rex-registration": "/service/rex-registration",
  "/services/icegate-registration": "/service/icegate-registration",
  "/service/epcg-license-scheme": "/service/epcg-license",
  "/service/advance-licence-scheme": "/service/advance-licence",
  "/service/fssai-for-export-import": "/service/fssai",
  "/service/aeo-registration-services": "/service/aeo-registration",
  "/service/sims-registration-services": "/service/sims-registration",
  "/service/rex-registration-services": "/service/rex-registration",
  "/service/icegate-registration-services": "/service/icegate-registration",
  "/service/interest-equalization-scheme": "/service/interest-equalization",
};

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const lower = pathname.toLowerCase();
  const trimmed = lower.length > 1 && lower.endsWith("/") ? lower.slice(0, -1) : lower;
  return trimmed || "/";
}

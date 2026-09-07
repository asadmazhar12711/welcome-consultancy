import { SITE, telUrl, whatsappUrl } from "@/lib/site";

export function StickyCtas() {
  return (
    <div className="sticky-ctas" aria-label="Quick contact">
      <a
        className="sticky-cta wa group relative"
        href={whatsappUrl(
          `Hello ${SITE.name}, I need EXIM / DGFT advisory assistance.`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${SITE.phoneDisplay}`}
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden="true">
          <path d="M16.01 2.002c-7.72 0-14 6.28-14 14 0 2.47.65 4.87 1.88 6.99L2 30l7.21-1.85c2.05 1.12 4.37 1.71 6.8 1.71 7.72 0 14-6.28 14-14s-6.28-13.858-14-13.858zm0 25.59c-2.14 0-4.23-.57-6.05-1.65l-.43-.26-4.49 1.15 1.2-4.38-.28-.45c-1.18-1.88-1.81-4.06-1.81-6.29 0-6.44 5.24-11.68 11.68-11.68 6.44 0 11.68 5.24 11.68 11.68s-5.24 11.88-11.5 11.88zm6.41-8.74c-.35-.18-2.07-1.02-2.39-1.14-.32-.12-.55-.18-.78.18-.23.35-.9 1.14-1.1 1.38-.2.23-.41.26-.76.09-.35-.18-1.48-.55-2.82-1.74-1.04-.93-1.74-2.08-1.95-2.43-.2-.35-.02-.54.15-.71.16-.16.35-.41.53-.61.18-.2.23-.35.35-.58.12-.23.06-.44-.03-.61-.09-.18-.78-1.88-1.07-2.58-.28-.68-.57-.59-.78-.6h-.67c-.23 0-.61.09-.93.44-.32.35-1.22 1.19-1.22 2.91 0 1.72 1.25 3.38 1.43 3.61.18.23 2.46 3.76 5.96 5.27.83.36 1.48.58 1.99.74.84.27 1.6.23 2.21.14.67-.1 2.07-.85 2.36-1.66.29-.82.29-1.52.2-1.66-.09-.15-.32-.24-.67-.41z" />
        </svg>
      </a>
      <a
        className="sticky-cta call group relative"
        href={telUrl()}
        aria-label={`Call ${SITE.phoneDisplay}`}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.25 1.02l-2.2 2.19z" />
        </svg>
      </a>
    </div>
  );
}

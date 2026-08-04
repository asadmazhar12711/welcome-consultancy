import { SITE, telUrl, whatsappUrl } from "@/lib/site";

export function StickyCtas() {
  return (
    <div className="sticky-ctas" aria-label="Quick contact">
      <a
        className="sticky-cta wa"
        href={whatsappUrl(
          `Hello ${SITE.name}, I need EXIM / DGFT advisory assistance.`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${SITE.phoneDisplay}`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.5 3.5A11 11 0 0 0 3.2 17.7L2 22l4.4-1.2A11 11 0 1 0 20.5 3.5zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.6.7.7-2.5-.2-.3A9 9 0 1 1 12 20.5zm5-6.7c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.4 11.4 0 0 0 4.4 3.9c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z" />
        </svg>
      </a>
      <a
        className="sticky-cta call"
        href={telUrl()}
        aria-label={`Call ${SITE.phoneDisplay}`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
        </svg>
      </a>
    </div>
  );
}

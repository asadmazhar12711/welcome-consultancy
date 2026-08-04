import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCtas } from "@/components/layout/StickyCtas";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { organizationJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | DGFT & EXIM Advisory`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  keywords: [
    "DGFT consultant Mumbai",
    "IEC registration",
    "EPCG license",
    "RoDTEP claims",
    "export incentives",
    "EXIM advisory",
    "Welcome Consultancy",
  ],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | DGFT & EXIM Advisory`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | DGFT & EXIM Advisory`,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${manrope.variable} ${newsreader.variable} min-h-screen bg-page font-sans text-theme-primary antialiased`}
      >
        <ThemeProvider>
          <JsonLd data={organizationJsonLd()} />
          <Header />
          <main className="relative z-10 flex min-h-screen flex-1 flex-col pt-[88px]">
            {children}
          </main>
          <Footer />
          <StickyCtas />
        </ThemeProvider>
      </body>
    </html>
  );
}

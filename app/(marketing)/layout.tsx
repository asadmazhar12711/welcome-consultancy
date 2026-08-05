import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCtas } from "@/components/layout/StickyCtas";
import { SitePopup } from "@/components/forms/SitePopup";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="relative z-10 flex min-h-screen flex-1 flex-col pt-[88px]">
        {children}
      </main>
      <Footer />
      <StickyCtas />
      <SitePopup />
    </>
  );
}

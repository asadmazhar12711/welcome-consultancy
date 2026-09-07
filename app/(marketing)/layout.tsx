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
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 flex min-h-screen flex-1 flex-col pt-16 sm:pt-20 outline-none w-full max-w-full overflow-x-hidden"
      >
        {children}
      </main>
      <Footer />
      <StickyCtas />
      <SitePopup />
    </>
  );
}

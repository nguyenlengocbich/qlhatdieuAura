import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import Features from "./components/landing/Features";
import Process from "./components/landing/Process";
import Warehouses from "./components/landing/Warehouses";
import Production from "./components/landing/Production";
import InternalTransfer from "./components/landing/InternalTransfer";
import Reports from "./components/landing/Reports";
import Screenshots from "./components/landing/Screenshots";
import CTA from "./components/landing/CTA";
import Footer from "./components/landing/Footer";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();

  const getSection = (key: string) =>
    content.sections.find(
      (section) => section.key === key
    );

  const getItems = (key: string) =>
    getSection(key)?.items ?? [];

  return (
    <>
      <Navbar />

      <main>
        <Hero content={content.hero} />

        <Features section={getSection("features")} items={getItems("features")}
        />

        <Process section={getSection("process")} items={getItems("process")}
        />

        <Warehouses
          section={getSection("warehouses")}
          items={getItems("warehouses")}
        />

        <Production
          section={getSection("production")}
        />

        <InternalTransfer
          section={getSection("internal-transfer")}
        />

        <Reports
          section={getSection("reports")}
          items={getItems("reports")}
        />
        <Screenshots section={getSection("screenshots")} items={getItems("screenshots")}/>
        <CTA content={content.cta}/>
      </main>
      <Footer />
    </>
  );
}
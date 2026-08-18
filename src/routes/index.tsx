import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Quiz } from "@/components/site/Quiz";
import {
  Benefits,
  Faq,
  FinalCta,
  Process,
  Savings,
  Technology,
} from "@/components/site/Sections";

const TITLE = "Análisis de Agua Gratis en New Jersey | Nova Home Services";
const DESC =
  "Test de agua gratis para propietarios en New Jersey. Conoce la calidad de tu agua, tus opciones de filtración y cómo podrías ahorrar en agua embotellada.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Nova Home Services",
          description: DESC,
          telephone: "+1-908-201-8655",
          areaServed: "New Jersey, USA",
          address: { "@type": "PostalAddress", addressRegion: "NJ", addressCountry: "US" },
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Quiz />
        <Process />
        <Savings />
        <Benefits />
        <Technology />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

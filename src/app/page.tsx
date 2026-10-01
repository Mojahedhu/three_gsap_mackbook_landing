import Features from "@/components/Features";

import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";

import NavBar from "@/components/NavBar";
import Performance from "@/components/Performance";

import ProductViewer from "@/components/ProductViewer";
import Showcase from "@/components/Showcase";
import Footer from "@/components/Footer";

/**
 * Renders the landing page with navigation, hero, product viewer, and chip showcase.
 * @returns The main landing page content.
 */
export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Features />
      <Highlights />
      <Footer />
    </main>
  );
}

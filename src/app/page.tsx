import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import ProductViewer from "@/components/ProductViewer";
import Showcase from "@/components/Showcase";

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
    </main>
  );
}

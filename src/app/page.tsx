import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import AiTerminal from "@/components/sections/AiTerminal";
import Footer from "@/components/layout/Footer";
import { AmbientBackground } from "@/components/ui/classy-background";

export default function Home() {
  return (
    <>
      {/* Fixed ambient layer — renders behind everything */}
      <AmbientBackground />

      {/* Top fixed navbar — renders its own 64px spacer div */}
      <Navbar />

      {/* Page sections */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <AiTerminal />
      <Footer />
    </>
  );
}

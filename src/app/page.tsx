import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AnimatedSection from "./components/AnimatedSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <Hero />

      <AnimatedSection>
        <Services />
      </AnimatedSection>

      <AnimatedSection>
        <About />
      </AnimatedSection>

      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>

      <AnimatedSection>
        <Contact />
      </AnimatedSection>

      <Footer />
    </main>
  );
}

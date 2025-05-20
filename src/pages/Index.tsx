
import Hero from "@/components/Hero";
import PromptDemo from "@/components/PromptDemo";
import Benefits from "@/components/Benefits";
import UseCases from "@/components/UseCases";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <PromptDemo />
        <Benefits />
        <UseCases />
        <Testimonials />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

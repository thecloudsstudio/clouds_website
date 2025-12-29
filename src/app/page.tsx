import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import ConsciousFactory from "@/components/sections/ConsciousFactory";
import Results from "@/components/sections/Results";
import Comparison from "@/components/sections/Comparison";
import Features from "@/components/sections/Features";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

export const metadata = {
  title: "ARGIS | Intelligent Manufacturing Guidance",
  description: "Prevent assembly defects before they happen with real-time AI guidance.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-gray-700/30">
      <Hero />
      <Problem />
      <Solution />
      <ConsciousFactory />
      <Results />
      <Comparison />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}

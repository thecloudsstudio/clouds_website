import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Features from "@/components/sections/Features";
import Results from "@/components/sections/Results";
import Comparison from "@/components/sections/Comparison";
import ConsciousFactory from "@/components/sections/ConsciousFactory";
import CTA from "@/components/sections/CTA";
import ROICalculator from "@/components/calculator/ROICalculator";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Intelligence | ARGIS",
    description: "Augmented Reality Guidance & Inspection System - Transform your manufacturing process.",
};

export default function ArgisPage() {
    return (
        <main className="min-h-screen bg-gray-50 selection:bg-gray-200">
            <Hero />
            <Problem />
            <Solution />
            <Features />
            <Results />
            <Comparison />
            <ConsciousFactory />

            <div id="calculator" className="py-24 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">ROI Calculator</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        See exactly how much manual assembly errors are costing you—and what you could save with ARGIS.
                    </p>
                </div>
                <ROICalculator />
            </div>

            <CTA />
            <Footer />
        </main>
    );
}

import ROICalculator from "@/components/calculator/ROICalculator";

import Footer from "@/components/Footer";

export const metadata = {
    title: "ROI Calculator | ARGIS",
    description: "Calculate your potential savings with ARGIS AI guidance system.",
};

export default function ROIPage() {
    return (
        <main className="min-h-screen bg-gray-50 selection:bg-gray-200">

            <div className="py-24 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">ROI Calculator</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        See exactly how much manual assembly errors are costing you—and what you could save with ARGIS.
                    </p>
                </div>

                <ROICalculator />
            </div>

            <Footer />
        </main>
    );
}

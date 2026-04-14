import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Insights',
    description: 'Thoughts on architecture, design, materials, and the built environment from Clouds Studio.',
    openGraph: {
        title: 'Insights | Clouds Studio',
        description: 'Thoughts on architecture, design, materials, and the built environment.',
        url: 'https://thecloudsstudio.com/insights',
    },
    alternates: { canonical: 'https://thecloudsstudio.com/insights' },
};

export default function InsightsPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
            {/* Header */}
            <div className="max-w-2xl mb-24">
                <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-6">
                    Insights
                </h1>
                <p className="text-lg font-light text-gray-500 leading-relaxed">
                    Thoughts on architecture, design, materials, and the way spaces shape how we live and work.
                </p>
            </div>

            {/* Placeholder grid — articles slot in here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Each article card will go here once content is ready */}
                <div className="col-span-full py-24 text-center">
                    <p className="text-sm tracking-widest uppercase text-gray-300">Coming soon</p>
                </div>
            </div>
        </div>
    );
}

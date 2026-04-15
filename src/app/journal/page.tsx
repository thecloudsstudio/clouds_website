import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Journal',
    description: 'Stories, process notes, and narratives from Clouds Studio — the thinking behind the architecture.',
    keywords: ['architecture journal', 'design stories', 'project narratives', 'Clouds Studio blog', 'architecture process India'],
    openGraph: {
        title: 'Journal | Clouds Studio',
        description: 'Stories and narratives from Clouds Studio — the thinking behind the architecture.',
        url: 'https://thecloudsstudio.com/journal',
        images: [{ url: '/bangalore_villa_facade_color_1767792911832.png', width: 1200, height: 630, alt: 'Clouds Studio Journal' }],
    },
    alternates: { canonical: 'https://thecloudsstudio.com/journal' },
};

export default function JournalPage() {
    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header */}
            <div className="pt-40 pb-16 px-6 md:px-12 border-b border-neutral-100">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-light uppercase tracking-tight text-black mb-6">
                        Journal
                    </h1>
                    <p className="text-lg md:text-xl font-light text-neutral-500 max-w-2xl leading-relaxed">
                        Stories, process notes, and narratives from behind the drawings — the thinking that shapes the architecture.
                    </p>
                </div>
            </div>

            {/* Coming soon */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-48">
                <div className="flex flex-col items-start gap-6">
                    <div className="w-16 h-[1px] bg-neutral-300" />
                    <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 font-light">
                        First entry coming soon
                    </p>
                    <p className="text-2xl md:text-4xl font-light text-neutral-200 max-w-3xl leading-relaxed">
                        We are preparing our first stories — deep-dives into the ideas, materials, and decisions behind each project.
                    </p>
                </div>
            </div>
        </div>
    );
}

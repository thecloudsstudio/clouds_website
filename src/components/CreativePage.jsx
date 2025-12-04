import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const services = [
    {
        id: 1,
        title: "Branding & Identity",
        items: ["Logo design", "Brand identity system", "Colour palette + typography", "Brand guidelines", "Business card & stationery design", "Brand refresh / rebranding projects"]
    },
    {
        id: 2,
        title: "Graphic & Marketing Assets",
        items: ["Brochures", "Posters", "Social media creatives", "Pitch deck / presentation design", "Product catalogs", "Event branding materials"]
    },
    {
        id: 3,
        title: "2D Motion & Animation",
        items: ["2D explainer videos", "Motion graphics", "Animated UI/UX demos", "Process / workflow explainer animations", "Logo reveals & intro animations"]
    },
    {
        id: 4,
        title: "3D Animation & Motion",
        items: ["3D product animation", "3D architecture walk-throughs", "Industrial process animations", "Simulation videos", "High-quality cinematic animations"]
    },
    {
        id: 5,
        title: "Rendering & Visualisation",
        items: ["Photo-realistic product renders", "Packaging renders", "Architectural still renders", "Interior & exterior visualisation", "Industrial scene visualisation"]
    },
    {
        id: 6,
        title: "Video Production Support",
        items: ["Script writing", "Storyboarding", "Editing & post-production", "Sound design", "Motion overlays & VFX (light-level)"]
    }
];

export default function CreativePage({ onBack }) {
    return (
        <motion.div
            className="min-h-screen w-full bg-[#f5f5f7] text-[#1d1d1f] font-sans selection:bg-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
                {/* Header */}
                <header className="mb-20 md:mb-32 relative">
                    <button
                        onClick={onBack}
                        className="absolute -top-4 left-0 p-2 hover:bg-black/5 rounded-full transition-colors duration-300"
                        aria-label="Back to Home"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>

                    <div className="flex flex-col items-center text-center mt-12">
                        <motion.h1
                            className="text-6xl md:text-9xl font-light tracking-tighter mb-6"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            Creative
                        </motion.h1>
                        <motion.p
                            className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl leading-relaxed"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Everything visual, animated, branded, and rendered — for marketing, storytelling, and presentations.
                        </motion.p>
                    </div>
                </header>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="flex flex-col"
                        >
                            <span className="text-xs font-medium text-gray-400 mb-4 tracking-widest uppercase">0{service.id}</span>
                            <h2 className="text-2xl md:text-3xl font-normal mb-8 pb-4 border-b border-gray-200">{service.title}</h2>
                            <ul className="space-y-3">
                                {service.items.map((item, i) => (
                                    <li key={i} className="text-gray-600 font-light text-lg leading-relaxed hover:text-black transition-colors duration-300 cursor-default">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Note */}
                <motion.div
                    className="mt-32 pt-12 border-t border-gray-200 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-400 font-light">
                        Your Creative vertical handles all branding, visuals, storytelling, animation, and digital media production.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}

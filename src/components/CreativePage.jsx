import React, { useEffect, useRef } from 'react';
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
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    return (
        <motion.div
            className="h-screen w-full bg-[#f5f5f7] text-[#1d1d1f] font-sans selection:bg-black/10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-[#f5f5f7]/80 backdrop-blur-sm">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors duration-300"
                    aria-label="Back to Home"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={scrollContainerRef}
                className="h-full overflow-x-auto overflow-y-hidden scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div className="flex h-full">
                    {/* Hero Section */}
                    <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-12">
                        <div className="max-w-4xl text-center">
                            <motion.h1
                                className="text-7xl md:text-9xl font-light tracking-tighter mb-8"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Creative
                            </motion.h1>
                            <motion.p
                                className="text-2xl md:text-3xl text-gray-500 font-light leading-relaxed"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                Everything visual, animated, branded, and rendered
                            </motion.p>
                        </div>
                    </div>

                    {/* Service Sections */}
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="flex-shrink-0 w-screen h-full flex items-center justify-center px-12 md:px-24"
                        >
                            <motion.div
                                className="max-w-2xl"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="text-sm font-medium text-gray-400 mb-6 block tracking-widest uppercase">
                                    0{service.id} / 06
                                </span>
                                <h2 className="text-5xl md:text-6xl font-light mb-12 tracking-tight">
                                    {service.title}
                                </h2>
                                <ul className="space-y-4">
                                    {service.items.map((item, i) => (
                                        <li
                                            key={i}
                                            className="text-gray-600 font-light text-xl md:text-2xl leading-relaxed hover:text-black transition-colors duration-300"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    ))}

                    {/* Footer Section */}
                    <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-12">
                        <div className="max-w-2xl text-center">
                            <p className="text-xl text-gray-400 font-light leading-relaxed">
                                Your Creative vertical handles all branding, visuals, storytelling, animation, and digital media production.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hide scrollbar CSS */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </motion.div>
    );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const tabs = [
    {
        id: "design",
        label: "Design",
        url: "engineering.html",
        description: "Industrial design and end-to-end product development from concept to completion."
    },
    {
        id: "structure",
        label: "Structure",
        url: "arch.html",
        description: "Architecture, planning, and construction solutions for commercial and residential spaces."
    },
    {
        id: "creative",
        label: "Creative",
        url: "creative.html",
        description: "Branding, animation, and visual storytelling through 2D, 3D, and high-end renderings."
    },
    {
        id: "intelligence",
        label: "Intelligence",
        url: "automation.html",
        description: "AI-driven automation, computer vision systems, and smart factory technologies."
    },
];

export default function AnimatedTabs({ onNavigate }) {
    const [activeTab, setActiveTab] = useState(null);

    const handleTabClick = (e, tab) => {
        e.preventDefault();
        if (onNavigate) {
            onNavigate(tab.id);
        } else {
            window.location.href = tab.url;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-nowrap justify-center gap-8 md:gap-16 p-2 w-full">
                {tabs.map((tab) => (
                    <div key={tab.id} className="relative flex flex-col items-center group">
                        <a
                            href={tab.url}
                            onClick={(e) => handleTabClick(e, tab)}
                            onMouseEnter={() => setActiveTab(tab.id)}
                            onMouseLeave={() => setActiveTab(null)}
                            className={twMerge(
                                clsx(
                                    "relative px-4 py-2 md:px-6 md:py-3 text-base md:text-xl font-light transition-colors duration-300 no-underline rounded-xl z-10 whitespace-normal text-center leading-tight",
                                    "text-[#666666] hover:text-[#333333] cursor-pointer"
                                )
                            )}
                        >
                            {activeTab === tab.id && (
                                <motion.span
                                    layoutId="bubble"
                                    className="absolute inset-0 z-[-1] bg-white/30 backdrop-blur-md border border-white/40 shadow-sm rounded-xl"
                                    transition={{ type: "spring", stiffness: 130, damping: 30 }}
                                />
                            )}
                            {tab.label}
                        </a>
                        {activeTab === tab.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full mt-4 text-xs md:text-sm text-gray-500 font-light text-center w-64 md:w-80 pointer-events-none bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-white/50"
                            >
                                {tab.description}
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

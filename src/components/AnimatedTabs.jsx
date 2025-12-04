import { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const tabs = [
    { id: "engineering", label: "Design", url: "engineering.html", description: "Product Development" },
    { id: "architecture", label: "Build", url: "arch.html", description: "Architecture" },
    { id: "creative", label: "Creative", url: "creative.html", description: "Creative Studio" },
    { id: "automation", label: "Intelligence", url: "automation.html", description: "AI & Automation" },
];

export default function AnimatedTabs() {
    const [activeTab, setActiveTab] = useState(null);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-nowrap justify-center gap-8 md:gap-16 p-2 w-full">
                {tabs.map((tab) => (
                    <div key={tab.id} className="relative flex flex-col items-center">
                        <a
                            href={tab.url}
                            onMouseEnter={() => setActiveTab(tab.id)}
                            onMouseLeave={() => setActiveTab(null)}
                            className={twMerge(
                                clsx(
                                    "relative px-4 py-2 md:px-6 md:py-3 text-base md:text-xl font-light transition-colors duration-300 no-underline rounded-xl z-10 whitespace-normal text-center leading-tight",
                                    "text-[#666666] hover:text-[#333333]"
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
                                className="absolute top-full mt-2 text-xs md:text-sm text-gray-500 font-light whitespace-nowrap pointer-events-none"
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

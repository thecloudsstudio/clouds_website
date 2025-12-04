import { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const tabs = [
    { id: "automation", label: "AI & Automation", url: "automation.html" },
    { id: "architecture", label: "Architecture", url: "arch.html" },
    { id: "engineering", label: "Product Development", url: "engineering.html" },
    { id: "creative", label: "Creative Studio", url: "creative.html" },
];

export default function AnimatedTabs() {
    const [activeTab, setActiveTab] = useState(null);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-nowrap justify-center gap-4 md:gap-10 p-2 overflow-x-auto max-w-full">
                {tabs.map((tab) => (
                    <a
                        key={tab.id}
                        href={tab.url}
                        onMouseEnter={() => setActiveTab(tab.id)}
                        onMouseLeave={() => setActiveTab(null)}
                        className={twMerge(
                            clsx(
                                "relative px-4 py-2 md:px-6 md:py-3 text-base md:text-xl font-light transition-colors duration-300 no-underline rounded-xl z-10 whitespace-nowrap",
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
                ))}
            </div>
        </div>
    );
}

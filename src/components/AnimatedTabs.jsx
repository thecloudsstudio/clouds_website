import { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const tabs = [
    { id: "automation", label: "AI and Automation", url: "automation.html" },
    { id: "architecture", label: "Architecture", url: "arch.html" },
    { id: "engineering", label: "Product Development", url: "engineering.html" },
    { id: "creative", label: "Creative Studio", url: "creative.html" },
];

export default function AnimatedTabs() {
    const [activeTab, setActiveTab] = useState(null);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-wrap justify-center gap-12 sm:gap-20 p-2">
                {tabs.map((tab) => (
                    <a
                        key={tab.id}
                        href={tab.url}
                        onMouseEnter={() => setActiveTab(tab.id)}
                        onMouseLeave={() => setActiveTab(null)}
                        className={twMerge(
                            clsx(
                                "relative px-8 py-4 text-lg sm:text-xl font-light transition-colors duration-300 no-underline rounded-xl z-10",
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

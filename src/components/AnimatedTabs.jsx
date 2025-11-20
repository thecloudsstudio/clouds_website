import { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const tabs = [
    { id: "automation", label: "Automation", url: "automation.html" },
    { id: "architecture", label: "Architecture", url: "arch.html" },
    { id: "engineering", label: "Engineering", url: "engineering.html" },
];

export default function AnimatedTabs() {
    const [activeTab, setActiveTab] = useState(null);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-2">
                {tabs.map((tab) => (
                    <a
                        key={tab.id}
                        href={tab.url}
                        onMouseEnter={() => setActiveTab(tab.id)}
                        onMouseLeave={() => setActiveTab(null)}
                        className={twMerge(
                            clsx(
                                "relative px-6 py-3 text-lg sm:text-xl font-medium transition-colors duration-300 no-underline rounded-full",
                                "text-[#666666] hover:text-[#333333]"
                            )
                        )}
                    >
                        {activeTab === tab.id && (
                            <motion.span
                                layoutId="bubble"
                                className="absolute inset-0 z-[-1] bg-gray-100 mix-blend-multiply rounded-full"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {tab.label}
                    </a>
                ))}
            </div>
        </div>
    );
}

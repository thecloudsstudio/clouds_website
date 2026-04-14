"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
    {
        id: "design-studio",
        label: "Design Studio",
        sub: "Architecture & Interior Design",
        href: "/arch",
        active: true,
    },
    {
        id: "argis",
        label: "ARGIS",
        sub: "Intelligent Manufacturing Guidance",
        href: null, // under maintenance
        active: false,
    },
];

export default function AnimatedTabs() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-24 md:gap-56 w-full">
            {sections.map((section) => (
                <div
                    key={section.id}
                    className="relative flex flex-col items-center"
                    onMouseEnter={() => setHovered(section.id)}
                    onMouseLeave={() => setHovered(null)}
                >
                    {section.active ? (
                        <Link
                            href={section.href!}
                            className="group flex flex-col items-center gap-2 text-center cursor-pointer"
                        >
                            <motion.span
                                className="text-base md:text-xl font-light text-[#666666] group-hover:text-[#333333] transition-colors duration-300"
                                animate={{ y: hovered === section.id ? -2 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {section.label}
                            </motion.span>
                            <motion.div
                                className="h-px bg-[#333333]"
                                initial={{ width: 0 }}
                                animate={{ width: hovered === section.id ? "100%" : 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                    ) : (
                        <div className="group flex flex-col items-center gap-2 text-center">
                            <motion.span
                                className="text-base md:text-xl font-light text-[#aaaaaa] transition-colors duration-300"
                                animate={{ y: hovered === section.id ? -2 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {section.label}
                            </motion.span>
                            <motion.div
                                className="h-px bg-[#aaaaaa]"
                                initial={{ width: 0 }}
                                animate={{ width: hovered === section.id ? "100%" : 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

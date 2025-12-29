"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import HeroScene from "../3d/HeroScene";
import { Button } from "../ui/Button";

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-[0.03] pointer-events-none" />

            <div className="container mx-auto px-4 z-20 flex flex-col md:flex-row items-center h-full pt-20 md:pt-0">

                {/* Left: Copy */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 text-center md:text-left z-20"
                >
                    <div className="inline-block px-3 py-1 mb-6 rounded-full border border-gray-200 bg-gray-50 backdrop-blur-sm">
                        <span className="text-gray-600 text-sm font-medium tracking-wider uppercase">Future of Manufacturing</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
                        Prevent Assembly <br className="hidden md:block" />
                        <span className="text-gray-500">Defects</span> Before <br className="hidden md:block" />
                        They Happen
                    </h1>

                    <p className="text-gray-600 text-lg md:text-xl max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed">
                        Real-time AI guidance + computer vision for intelligent manufacturing.
                        We watch your assembly and tell operators instantly if something's wrong.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link href="#contact">
                            <Button className="w-full sm:w-auto h-12 text-lg">
                                Book a Demo
                            </Button>
                        </Link>
                        <Link href="#results">
                            <Button variant="outline" className="w-full sm:w-auto h-12 text-lg">
                                View Case Study
                            </Button>
                        </Link>
                    </div>

                    {/* Quick Stats - Mobile Only (Hidden on Desktop, shown in Problem section usually, but adding mini proof here if needed) */}
                    <div className="mt-8 flex gap-6 justify-center md:justify-start text-sm text-gray-500 md:hidden">
                        <div><strong className="text-gray-900 block">67%</strong> Defects Reduced</div>
                        <div><strong className="text-gray-900 block">6.8m</strong> ROI Payback</div>
                    </div>

                </motion.div>

                {/* Right: 3D Scene */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex-1 w-full h-[50vh] md:h-[80vh] flex items-center justify-center relative"
                >
                    <HeroScene />
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 flex flex-col items-center gap-2 cursor-pointer"
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <ArrowDown className="w-4 h-4 text-gray-900" />
            </motion.div>
        </section>
    );
}

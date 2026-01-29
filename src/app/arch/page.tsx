"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const heroSlides = [
    '/hero_slideshow_chennai_minimal_1767686629299.png',
    '/slider_kerala_eco_brutalist_1767686553206.png',
    '/slider_bangalore_fusion_villa_1767686574598.png'
];

export default function ArchHome() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full">
            {/* Hero Section with Slideshow */}
            <section className="relative h-[100vh] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 z-0"
                    >
                        <Image
                            src={heroSlides[currentSlide]}
                            alt="Clouds Architecture Projects"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/30" />
                    </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 z-10 flex flex-col justify-end pb-32 px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="max-w-5xl"
                    >
                        <h1 className="text-6xl md:text-8xl font-thin tracking-tighter text-white mb-8 leading-none uppercase">
                            Architecture <br />
                            <span className="text-gray-400">of Existence</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl leading-relaxed tracking-wide">
                            CLOUDS is a multi-disciplinary sustainable design studio based in Chennai, India.
                            We craft brutalist, eco-conscious spaces across Tamil Nadu, Bangalore, and Kerala.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Intro Grid */}
            <section className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-20">
                {/* Architecture Column */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="aspect-[4/5] bg-neutral-100 mb-8 relative overflow-hidden group w-full">
                        <Image
                            src="/slider_kerala_eco_brutalist_1767686553206.png"
                            alt="Sustainable Architecture"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <h3 className="text-xs font-medium tracking-[0.2em] uppercase mb-4 text-black">Sustainable Design</h3>
                    <p className="text-gray-500 font-light leading-relaxed mb-6 max-w-sm">
                        Blending brutalist concrete forms with traditional Indian aesthetics to create climate-responsive structures.
                    </p>
                    <Link href="/arch/services" className="inline-flex items-center text-xs font-medium text-black hover:text-gray-600 transition-colors group tracking-widest uppercase">
                        Discover <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                {/* Interiors Column - Shifted Down */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="md:mt-32"
                >
                    <div className="aspect-[4/5] bg-neutral-100 mb-8 relative overflow-hidden group w-full">
                        <Image
                            src="/portfolio_chennai_office_sustainable_1767686592674.png"
                            alt="Interior Design"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <h3 className="text-xs font-medium tracking-[0.2em] uppercase mb-4 text-black">Interior & Conservation</h3>
                    <p className="text-gray-500 font-light leading-relaxed mb-6 max-w-sm">
                        Restoring heritage structures in Chettinad and crafting biophilic modern workspaces in the city.
                    </p>
                    <Link href="/arch/services" className="inline-flex items-center text-xs font-medium text-black hover:text-gray-600 transition-colors group tracking-widest uppercase">
                        Discover <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </section>

            {/* Featured Projects Section */}
            <section className="bg-neutral-900 py-32 px-6 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="text-xl font-light tracking-[0.2em] uppercase">Selected Works</h2>
                        <Link href="/arch/portfolio" className="text-xs font-medium tracking-widest text-gray-400 hover:text-white transition-colors uppercase hidden md:block">
                            View All Projects
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Project 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[16/10] bg-neutral-800 mb-6 relative overflow-hidden">
                                <Image
                                    src="/slider_bangalore_fusion_villa_1767686574598.png"
                                    alt="Bangalore Fusion Villa"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            </div>
                            <h3 className="text-lg font-light mb-1 group-hover:text-gray-300 transition-colors">Bangalore Fusion Villa</h3>
                            <p className="text-xs text-gray-500 tracking-widest uppercase">Residential / Bangalore</p>
                        </motion.div>

                        {/* Project 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="group cursor-pointer md:mt-16"
                        >
                            <div className="aspect-[16/10] bg-neutral-800 mb-6 relative overflow-hidden">
                                <Image
                                    src="/portfolio_tamilnadu_heritage_fusion_1767686610582.png"
                                    alt="Heritage Restoration"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            </div>
                            <h3 className="text-lg font-light mb-1 group-hover:text-gray-300 transition-colors">Chettinad Restoration</h3>
                            <p className="text-xs text-gray-500 tracking-widest uppercase">Conservation / Tamil Nadu</p>
                        </motion.div>
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link href="/arch/portfolio" className="text-xs font-medium tracking-widest text-gray-400 hover:text-white transition-colors uppercase">
                            View All Projects
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="bg-neutral-50 py-40 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.blockquote
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-3xl md:text-5xl font-light text-black leading-tight mb-10 italic"
                    >
                        "Architecture depends on its time. It is the crystallization of its inner structure, the slow unfolding of its form."
                    </motion.blockquote>
                    <cite className="text-xs font-medium tracking-[0.2em] uppercase not-italic text-gray-400">
                        - Mies van der Rohe
                    </cite>
                </div>
            </section>
        </div>
    );
}

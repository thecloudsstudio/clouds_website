"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PlanningLanding() {
    return (
        <div className="w-full bg-white min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-light tracking-tight text-black mb-16 uppercase"
                >
                    Planning
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Applications Card */}
                    <Link href="/arch/services/planning/applications" className="group block">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden mb-6">
                                <Image
                                    src="/hero_architecture_wide_1767685176949.png"
                                    alt="Planning Applications"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            </div>
                            <h2 className="text-2xl font-light tracking-wide uppercase group-hover:text-gray-600 transition-colors">Applications</h2>
                            <p className="text-gray-500 font-light mt-2">Permissions & Consents</p>
                        </motion.div>
                    </Link>

                    {/* Feasibility Card */}
                    <Link href="/arch/services/planning/feasibility" className="group block">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden mb-6">
                                <Image
                                    src="/slider_project_bangalore_villa_1767686466204.png"
                                    alt="Feasibility Studies"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            </div>
                            <h2 className="text-2xl font-light tracking-wide uppercase group-hover:text-gray-600 transition-colors">Feasibility</h2>
                            <p className="text-gray-500 font-light mt-2">Strategic Advice & Analysis</p>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

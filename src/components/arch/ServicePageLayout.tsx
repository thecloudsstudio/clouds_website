"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ServicePageLayoutProps {
    title: string;
    subtitle: string;
    description: string;
    details: string[];
    image: string;
}

export default function ServicePageLayout({ title, subtitle, description, details, image }: ServicePageLayoutProps) {
    return (
        <div className="w-full bg-white min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-light tracking-tight text-black mb-6 uppercase"
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-lg md:text-xl text-gray-500 font-light mb-16 tracking-wide"
                >
                    {subtitle}
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden"
                    >
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col justify-center"
                    >
                        <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-black mb-8">Service Overview</h2>
                        <p className="text-gray-600 font-light leading-relaxed mb-12 text-lg">
                            {description}
                        </p>

                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-black mb-6">Key Capabilities</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                            {details.map((detail) => (
                                <li key={detail} className="text-sm text-gray-500 tracking-widest uppercase flex items-center">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mr-3" />
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

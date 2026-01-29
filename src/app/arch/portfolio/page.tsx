"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from './data';

export default function ArchPortfolio() {
    const projectsList = Object.values(projects);

    return (
        <div className="w-full bg-white pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-light tracking-tight text-black mb-16 uppercase"
                >
                    Selected Works
                </motion.h1>

                {/* Filter/Categories (Visual only for now) */}
                <div className="flex flex-wrap gap-8 mb-16 text-sm font-medium tracking-widest uppercase text-gray-400">
                    <span className="text-black cursor-pointer">All</span>
                    <span className="hover:text-black cursor-pointer transition-colors">Residential</span>
                    <span className="hover:text-black cursor-pointer transition-colors">Commercial</span>
                    <span className="hover:text-black cursor-pointer transition-colors">Hospitality</span>
                    <span className="hover:text-black cursor-pointer transition-colors">Conservation</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsList.map((project, index) => (
                        <Link href={`/arch/portfolio/${project.id}`} key={project.id} className={`block group cursor-pointer ${project.size === 'large' ? 'md:row-span-2' : ''} ${project.size === 'wide' ? 'md:col-span-2' : ''}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="h-full"
                            >
                                <div className="relative w-full h-full bg-neutral-100 overflow-hidden aspect-[4/5] object-cover">
                                    <Image
                                        src={project.images[0]}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                                    <div className="absolute bottom-0 left-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <h3 className="text-white text-xl font-light mb-1">{project.title}</h3>
                                        <p className="text-white/80 text-xs tracking-widest uppercase">{project.category} / {project.location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

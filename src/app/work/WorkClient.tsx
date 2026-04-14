"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from './data';

export default function WorkClient() {
    const projectsList = Object.values(projects);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [cursorState, setCursorState] = useState<'static' | 'left' | 'right'>('static');
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let animationFrameId: number;
        let cursorAnimationFrameId: number;
        let scrollSpeed = 0;
        let targetCursorX = 0;
        let targetCursorY = 0;
        let currentCursorX = 0;
        let currentCursorY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            targetCursorX = e.clientX;
            targetCursorY = e.clientY;
            const viewportWidth = window.innerWidth;
            const scrollZone = viewportWidth * 0.375;
            const mouseX = e.clientX;
            if (mouseX < scrollZone) {
                scrollSpeed = -(1 - mouseX / scrollZone) * 25;
                setCursorState('left');
            } else if (mouseX > viewportWidth - scrollZone) {
                scrollSpeed = ((mouseX - (viewportWidth - scrollZone)) / scrollZone) * 25;
                setCursorState('right');
            } else {
                scrollSpeed = 0;
                setCursorState('static');
            }
        };

        const smoothCursorFollow = () => {
            currentCursorX += (targetCursorX - currentCursorX) * 0.15;
            currentCursorY += (targetCursorY - currentCursorY) * 0.15;
            setCursorPosition({ x: currentCursorX, y: currentCursorY });
            cursorAnimationFrameId = requestAnimationFrame(smoothCursorFollow);
        };

        const smoothScroll = () => {
            if (scrollContainerRef.current && scrollSpeed !== 0)
                scrollContainerRef.current.scrollLeft += scrollSpeed;
            animationFrameId = requestAnimationFrame(smoothScroll);
        };

        animationFrameId = requestAnimationFrame(smoothScroll);
        cursorAnimationFrameId = requestAnimationFrame(smoothCursorFollow);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            cancelAnimationFrame(cursorAnimationFrameId);
        };
    }, []);

    return (
        <div className="w-full h-screen bg-white overflow-hidden flex flex-col cursor-none">
            {/* Custom cursor */}
            <div
                className="fixed pointer-events-none z-50 mix-blend-difference cursor-none"
                style={{ left: cursorPosition.x, top: cursorPosition.y, transform: 'translate(-50%, -50%)', willChange: 'transform' }}
            >
                {cursorState === 'static' && <div className="w-12 h-12 bg-white rounded-sm" />}
                {cursorState === 'left' && (
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>
                )}
                {cursorState === 'right' && (
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                    </svg>
                )}
            </div>

            {/* Header */}
            <div className="flex-shrink-0 px-4 sm:px-6 md:px-12 pt-20 sm:pt-24 pb-6 sm:pb-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-black mb-4 sm:mb-6 md:mb-8 uppercase"
                >
                    Selected Works
                </motion.h1>
                <div className="hidden sm:flex flex-wrap gap-4 md:gap-8 text-xs sm:text-sm font-medium tracking-widest uppercase text-gray-400">
                    <span className="text-black">All</span>
                    <span className="hover:text-black transition-colors">Residential</span>
                    <span className="hover:text-black transition-colors">Commercial</span>
                    <span className="hover:text-black transition-colors">Hospitality</span>
                    <span className="hover:text-black transition-colors">Conservation</span>
                </div>
            </div>

            {/* Horizontal scroll */}
            <div className="relative flex-1 flex items-center overflow-hidden">
                <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide h-full flex items-center w-full scroll-smooth cursor-none">
                    <div className="flex gap-4 sm:gap-6 px-4 sm:px-6 md:px-12 h-full items-center">
                        {projectsList.map((project, index) => (
                            <Link href={`/work/${project.id}`} key={project.id} className="block group flex-shrink-0 cursor-none">
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.05 }}
                                >
                                    <div className="relative w-[85vw] h-[50vh] sm:w-[70vw] sm:h-[55vh] md:w-[600px] md:h-[450px] lg:w-[700px] lg:h-[500px] xl:w-[800px] xl:h-[550px] bg-neutral-100 overflow-hidden">
                                        <Image
                                            src={project.images[0]}
                                            alt={`${project.title} — ${project.category} project in ${project.location}`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                        <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <h2 className="text-white text-lg sm:text-xl md:text-2xl font-light mb-1 sm:mb-2">{project.title}</h2>
                                            <p className="text-white/80 text-[10px] sm:text-xs tracking-widest uppercase">{project.category} / {project.location}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

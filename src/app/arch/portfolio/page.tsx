"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from './data';

export default function ArchPortfolio() {
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
            // Store target cursor position
            targetCursorX = e.clientX;
            targetCursorY = e.clientY;

            // Get viewport width
            const viewportWidth = window.innerWidth;

            // Define scroll zones (37.5% on each side = 75% total)
            const scrollZone = viewportWidth * 0.375;
            const mouseX = e.clientX;

            // Calculate scroll speed based on mouse position
            if (mouseX < scrollZone) {
                // Left zone - scroll left
                const intensity = 1 - (mouseX / scrollZone);
                scrollSpeed = -intensity * 25; // Increased speed
                setCursorState('left');
            } else if (mouseX > viewportWidth - scrollZone) {
                // Right zone - scroll right
                const intensity = (mouseX - (viewportWidth - scrollZone)) / scrollZone;
                scrollSpeed = intensity * 25; // Increased speed
                setCursorState('right');
            } else {
                scrollSpeed = 0;
                setCursorState('static');
            }
        };

        const smoothCursorFollow = () => {
            // Smooth interpolation for cursor position (lerp)
            const smoothness = 0.15; // Lower = smoother but more lag
            currentCursorX += (targetCursorX - currentCursorX) * smoothness;
            currentCursorY += (targetCursorY - currentCursorY) * smoothness;

            setCursorPosition({ x: currentCursorX, y: currentCursorY });
            cursorAnimationFrameId = requestAnimationFrame(smoothCursorFollow);
        };

        const smoothScroll = () => {
            if (scrollContainerRef.current && scrollSpeed !== 0) {
                scrollContainerRef.current.scrollLeft += scrollSpeed;
            }
            animationFrameId = requestAnimationFrame(smoothScroll);
        };

        // Start smooth scroll loop
        animationFrameId = requestAnimationFrame(smoothScroll);
        cursorAnimationFrameId = requestAnimationFrame(smoothCursorFollow);

        // Add event listener
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            cancelAnimationFrame(cursorAnimationFrameId);
        };
    }, []);

    return (
        <div className="w-full h-screen bg-white overflow-hidden flex flex-col cursor-none">
            {/* Custom Cursor */}
            <div
                className="fixed pointer-events-none z-50 mix-blend-difference cursor-none"
                style={{
                    left: cursorPosition.x,
                    top: cursorPosition.y,
                    transform: 'translate(-50%, -50%)',
                    willChange: 'transform'
                }}
            >
                {cursorState === 'static' && (
                    <div className="w-10 h-10 bg-white rounded-sm" />
                )}
                {cursorState === 'left' && (
                    <div className="flex items-center gap-2">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                        <div className="w-12 h-1.5 bg-white rounded-full" />
                    </div>
                )}
                {cursorState === 'right' && (
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-white rounded-full" />
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Header Section - Responsive */}
            <div className="flex-shrink-0 px-4 sm:px-6 md:px-12 pt-20 sm:pt-24 pb-6 sm:pb-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-black mb-4 sm:mb-6 md:mb-8 uppercase"
                >
                    Selected Works
                </motion.h1>

                {/* Filter/Categories - Hidden on mobile, visible on larger screens */}
                <div className="hidden sm:flex flex-wrap gap-4 md:gap-8 text-xs sm:text-sm font-medium tracking-widest uppercase text-gray-400">
                    <span className="text-black">All</span>
                    <span className="hover:text-black transition-colors">Residential</span>
                    <span className="hover:text-black transition-colors">Commercial</span>
                    <span className="hover:text-black transition-colors">Hospitality</span>
                    <span className="hover:text-black transition-colors">Conservation</span>
                </div>
            </div>

            {/* Horizontal Scrollable Container - Responsive card sizes */}
            <div className="relative flex-1 flex items-center overflow-hidden">
                <div
                    ref={scrollContainerRef}
                    className="overflow-x-auto scrollbar-hide h-full flex items-center w-full scroll-smooth cursor-none"
                >
                    <div className="flex gap-4 sm:gap-6 px-4 sm:px-6 md:px-12 h-full items-center">
                        {projectsList.map((project, index) => (
                            <Link
                                href={`/arch/portfolio/${project.id}`}
                                key={project.id}
                                className="block group flex-shrink-0 cursor-none"
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.05 }}
                                    className="h-full"
                                >
                                    {/* Responsive card sizes:
                                        Mobile: 85vw × 50vh
                                        Small: 70vw × 55vh  
                                        Medium: 600px × 450px
                                        Large: 700px × 500px
                                        XL: 800px × 550px
                                    */}
                                    <div className="relative 
                                        w-[85vw] h-[50vh]
                                        sm:w-[70vw] sm:h-[55vh]
                                        md:w-[600px] md:h-[450px]
                                        lg:w-[700px] lg:h-[500px]
                                        xl:w-[800px] xl:h-[550px]
                                        bg-neutral-100 overflow-hidden">
                                        <Image
                                            src={project.images[0]}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                                        {/* Info overlay - responsive text */}
                                        <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-light mb-1 sm:mb-2">{project.title}</h3>
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

"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from './data';

export default function PortfolioClient() {
    const projectsList = Object.values(projects);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [cursorState, setCursorState] = useState<'static' | 'left' | 'right'>('static');
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Desktop: mouse-driven auto-scroll
    useEffect(() => {
        if (isMobile) return;
        let animationFrameId: number;
        let cursorAnimationFrameId: number;
        let scrollSpeed = 0;
        let targetCursorX = 0, targetCursorY = 0;
        let currentCursorX = 0, currentCursorY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            targetCursorX = e.clientX;
            targetCursorY = e.clientY;
            const vw = window.innerWidth;
            const zone = vw * 0.375;
            if (e.clientX < zone) { scrollSpeed = -(1 - e.clientX / zone) * 25; setCursorState('left'); }
            else if (e.clientX > vw - zone) { scrollSpeed = ((e.clientX - (vw - zone)) / zone) * 25; setCursorState('right'); }
            else { scrollSpeed = 0; setCursorState('static'); }
        };
        const smoothCursor = () => {
            currentCursorX += (targetCursorX - currentCursorX) * 0.15;
            currentCursorY += (targetCursorY - currentCursorY) * 0.15;
            setCursorPosition({ x: currentCursorX, y: currentCursorY });
            cursorAnimationFrameId = requestAnimationFrame(smoothCursor);
        };
        const smoothScroll = () => {
            if (scrollContainerRef.current && scrollSpeed !== 0) scrollContainerRef.current.scrollLeft += scrollSpeed;
            animationFrameId = requestAnimationFrame(smoothScroll);
        };

        animationFrameId = requestAnimationFrame(smoothScroll);
        cursorAnimationFrameId = requestAnimationFrame(smoothCursor);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            cancelAnimationFrame(cursorAnimationFrameId);
        };
    }, [isMobile]);

    return (
        <div className={`w-full h-screen bg-white overflow-hidden flex flex-col ${isMobile ? '' : 'cursor-none'}`}>

            {/* Custom cursor — desktop only */}
            {!isMobile && (
                <div className="fixed pointer-events-none z-50 mix-blend-difference" style={{ left: cursorPosition.x, top: cursorPosition.y, transform: 'translate(-50%, -50%)', willChange: 'transform' }}>
                    {cursorState === 'static' && <div className="w-12 h-12 bg-white rounded-sm" />}
                    {cursorState === 'left'   && <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>}
                    {cursorState === 'right'  && <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>}
                </div>
            )}

            {/* Header */}
            <div className="flex-shrink-0 px-5 sm:px-8 md:px-12 pt-20 sm:pt-24 pb-5 sm:pb-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-black mb-4 md:mb-6 uppercase"
                >
                    Portfolio
                </motion.h1>
                <div className="hidden sm:flex flex-wrap gap-4 md:gap-8 text-xs font-medium tracking-widest uppercase text-gray-400">
                    <span className="text-black">All</span>
                    <span className="hover:text-black transition-colors cursor-pointer">Residential</span>
                    <span className="hover:text-black transition-colors cursor-pointer">Commercial</span>
                    <span className="hover:text-black transition-colors cursor-pointer">Hospitality</span>
                    <span className="hover:text-black transition-colors cursor-pointer">Conservation</span>
                </div>
            </div>

            {/* Scroll area */}
            {isMobile ? (
                /* Mobile: vertical grid */
                <div className="flex-1 overflow-y-auto px-5 pb-8">
                    <div className="grid grid-cols-1 gap-4">
                        {projectsList.map((project, index) => (
                            <Link href={`/portfolio/${project.slug}`} key={project.slug} className="block group">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.04 }}
                                >
                                    <div className="relative w-full bg-neutral-100 overflow-hidden" style={{ aspectRatio: '4/3' }}>
                                        <Image src={project.images[0]} alt={project.title} fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/25" />
                                        <div className="absolute bottom-0 left-0 p-5">
                                            <h2 className="text-white text-xl font-light mb-1">{project.title}</h2>
                                            <p className="text-white/70 text-[10px] tracking-widest uppercase">{project.category} · {project.location}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                /* Desktop: horizontal scroll */
                <div className="relative flex-1 flex items-center overflow-hidden">
                    <div ref={scrollContainerRef} className="overflow-x-auto h-full flex items-center w-full scroll-smooth cursor-none" style={{ scrollbarWidth: 'none' }}>
                        <div className="flex gap-5 md:gap-6 px-8 md:px-12 h-full items-center">
                            {projectsList.map((project, index) => (
                                <Link href={`/portfolio/${project.slug}`} key={project.slug} className="block group flex-shrink-0 cursor-none">
                                    <motion.div
                                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.05 }}
                                    >
                                        <div className="relative bg-neutral-100 overflow-hidden" style={{ width: 'clamp(340px, 45vw, 800px)', height: 'clamp(260px, 38vh, 560px)' }}>
                                            <Image src={project.images[0]} alt={`${project.title} — ${project.category} · ${project.location}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                            <div className="absolute bottom-0 left-0 p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <h2 className="text-white text-xl md:text-2xl font-light mb-1">{project.title}</h2>
                                                <p className="text-white/80 text-[10px] tracking-widest uppercase">{project.category} / {project.location}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Scroll hint */}
                    <div className="absolute bottom-6 right-8 text-[9px] tracking-[0.3em] uppercase text-gray-300 font-light pointer-events-none hidden md:block">
                        drag to explore →
                    </div>
                </div>
            )}
        </div>
    );
}

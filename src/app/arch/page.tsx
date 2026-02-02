"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const heroSlides = [
    '/hero_slideshow_chennai_minimal_1767686629299.png',
    '/slider_kerala_eco_brutalist_1767686553206.png',
    '/slider_bangalore_fusion_villa_1767686574598.png'
];

export default function ArchHome() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-slide functionality
    const resetAutoSlide = () => {
        if (autoSlideTimerRef.current) {
            clearInterval(autoSlideTimerRef.current);
        }
        autoSlideTimerRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
    };

    useEffect(() => {
        resetAutoSlide();
        return () => {
            if (autoSlideTimerRef.current) {
                clearInterval(autoSlideTimerRef.current);
            }
        };
    }, []);

    // Mouse-controlled navigation
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const viewportWidth = window.innerWidth;
            const leftZone = viewportWidth * 0.4;
            const rightZone = viewportWidth * 0.6;
            const mouseX = e.clientX;

            if (mouseX < leftZone) {
                // Navigate to previous slide
                setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
                resetAutoSlide();
            } else if (mouseX > rightZone) {
                // Navigate to next slide
                setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
                resetAutoSlide();
            }
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div className="w-full h-screen overflow-hidden relative">
            {/* Full-Screen Slideshow */}
            <section className="relative h-full w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={heroSlides[currentSlide]}
                            alt={`Clouds Architecture - Slide ${currentSlide + 1}`}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </motion.div>
                </AnimatePresence>

                {/* Slide Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentSlide(index);
                                resetAutoSlide();
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const heroSlides = [
    {
        image: '/hero_slideshow_chennai_minimal_1767686629299.png',
        quote: 'Architecture should speak of its time and place, but yearn for timelessness.',
        author: 'Frank Gehry'
    },
    {
        image: '/slider_kerala_eco_brutalist_1767686553206.png',
        quote: 'The mother art is architecture. Without an architecture of our own we have no soul of our own civilization.',
        author: 'Frank Lloyd Wright'
    },
    {
        image: '/slider_bangalore_fusion_villa_1767686574598.png',
        quote: 'Space and light and order. Those are the things that men need just as much as they need bread or a place to sleep.',
        author: 'Le Corbusier'
    },
    {
        image: '/kerala_resort_slider_colorized_1767793672440.png',
        quote: 'Architecture depends on its time. It is the crystallization of its inner structure, the slow unfolding of its form.',
        author: 'Mies van der Rohe'
    },
    {
        image: '/chettinad_hero_fusion_1767964209108.png',
        quote: 'Less is more.',
        author: 'Ludwig Mies van der Rohe'
    }
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
            // Check if click is on explore button
            const target = e.target as HTMLElement;
            if (target.closest('.explore-button')) {
                return; // Don't interfere with button clicks
            }

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
                            src={heroSlides[currentSlide].image}
                            alt={`Clouds Architecture - Slide ${currentSlide + 1}`}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </motion.div>
                </AnimatePresence>

                {/* Quote Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="max-w-4xl text-center"
                        >
                            <blockquote className="text-2xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-6 italic">
                                "{heroSlides[currentSlide].quote}"
                            </blockquote>
                            <cite className="text-sm md:text-base tracking-widest uppercase not-italic text-white/80">
                                — {heroSlides[currentSlide].author}
                            </cite>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Explore Button */}
                <div className="absolute bottom-20 md:bottom-16 left-1/2 transform -translate-x-1/2 z-20">
                    <Link
                        href="/arch/portfolio"
                        className="explore-button group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <span className="text-sm md:text-base font-medium tracking-wider uppercase">Explore Portfolio</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

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

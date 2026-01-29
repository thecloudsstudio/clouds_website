"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ArchNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedLink, setExpandedLink] = useState<string | null>(null);
    const [expandedSubLink, setExpandedSubLink] = useState<string | null>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const toggleSubMenu = (name: string) => {
        setExpandedLink(expandedLink === name ? null : name);
        setExpandedSubLink(null);
    };

    const toggleSubSubMenu = (e: React.MouseEvent, name: string) => {
        e.stopPropagation();
        setExpandedSubLink(expandedSubLink === name ? null : name);
    };

    const navLinks = [
        {
            name: 'Services',
            href: '/arch/services',
            subItems: [
                {
                    name: 'Architecture',
                    href: '/arch/services/architecture',
                    subItems: [
                        { name: 'Residential', href: '/arch/services/architecture/residential' },
                        { name: 'Commercial', href: '/arch/services/architecture/commercial' },
                        { name: 'Heritage & Conservation', href: '/arch/services/architecture/heritage' }
                    ]
                },
                {
                    name: 'Interior Design',
                    href: '/arch/services/interior-design',
                    subItems: [
                        { name: 'Residential', href: '/arch/services/interior-design/residential' },
                        { name: 'Commercial', href: '/arch/services/interior-design/commercial' }
                    ]
                },
                {
                    name: 'Planning',
                    href: '/arch/services/planning',
                    subItems: [
                        { name: 'Planning Applications', href: '/arch/services/planning/applications' },
                        { name: 'Feasibility Studies', href: '/arch/services/planning/feasibility' }
                    ]
                },
                { name: 'Create & Construct', href: '/arch/services/create-and-construct' }
            ]
        },
        {
            name: 'Portfolio',
            href: '/arch/portfolio',
            subItems: [
                { name: 'Residential', href: '/arch/portfolio#residential' },
                { name: 'Commercial', href: '/arch/portfolio#commercial' },
                { name: 'Hospitality', href: '/arch/portfolio#hospitality' }
            ]
        },
        { name: 'About', href: '/arch/about' },
        { name: 'Contact', href: '/arch/contact' },
    ];

    return (
        <>
            {/* 
                NAVBAR WRAPPER STRATEGY
                - The wrappers <div className="mix-blend-difference"> apply the inversion math.
                - The inner elements are pure white.
                - Wrapper has pointer-events-auto to capture clicks.
            */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-start bg-transparent pointer-events-none">

                {/* Left: Logo Wrapper */}
                <div
                    className="relative z-50 pointer-events-auto mix-blend-difference"
                    style={{ mixBlendMode: 'difference' }}
                >
                    <Link href="/arch" className="text-2xl font-light tracking-[0.2em] text-white uppercase block">
                        CLOUDS
                    </Link>
                </div>

                {/* Right: Menu Icon Wrapper */}
                <div
                    className="relative z-50 pointer-events-auto mix-blend-difference"
                    style={{ mixBlendMode: 'difference' }}
                >
                    <button
                        onClick={toggleMenu}
                        className="text-white hover:text-gray-300 transition-colors focus:outline-none block"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </nav>

            {/* EXPANDED MENU */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 bg-neutral-900 z-40 flex flex-col justify-center px-12 md:px-24 overflow-y-auto"
                    >
                        <div className="max-w-xl w-full mx-auto space-y-6 py-24">
                            {navLinks.map((link) => (
                                <div key={link.name} className="border-b border-gray-800 pb-4">
                                    <div className="flex items-center justify-between group cursor-pointer" onClick={() => link.subItems ? toggleSubMenu(link.name) : toggleMenu()}>
                                        <Link
                                            href={link.href}
                                            className="text-3xl md:text-5xl font-light tracking-wide text-white group-hover:text-gray-400 transition-colors uppercase"
                                            onClick={(e) => {
                                                if (link.subItems) {
                                                    e.preventDefault();
                                                    toggleSubMenu(link.name);
                                                } else {
                                                    toggleMenu();
                                                }
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                        {link.subItems && (
                                            <span className="text-gray-500">
                                                {expandedLink === link.name ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                                            </span>
                                        )}
                                    </div>

                                    {/* Level 2 Sub-menu */}
                                    <AnimatePresence>
                                        {link.subItems && expandedLink === link.name && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden pl-4 mt-4 space-y-3"
                                            >
                                                {link.subItems.map((sub) => (
                                                    <div key={sub.name}>
                                                        <div className="flex items-center justify-between group cursor-pointer" onClick={(e) => 'subItems' in sub ? toggleSubSubMenu(e, sub.name) : toggleMenu()}>
                                                            <Link
                                                                href={sub.href}
                                                                onClick={(e) => {
                                                                    if ('subItems' in sub) {
                                                                        e.preventDefault();
                                                                        toggleSubSubMenu(e, sub.name);
                                                                    } else {
                                                                        toggleMenu();
                                                                    }
                                                                }}
                                                                className="block text-lg text-gray-500 hover:text-white transition-colors font-light tracking-wider"
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                            {'subItems' in sub && (
                                                                <span className="text-gray-600">
                                                                    {expandedSubLink === sub.name ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Level 3 Sub-menu */}
                                                        <AnimatePresence>
                                                            {'subItems' in sub && expandedSubLink === sub.name && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden pl-4 mt-2 space-y-2 border-l border-gray-800 ml-1"
                                                                >
                                                                    {(sub as any).subItems.map((subSub: any) => (
                                                                        <Link
                                                                            key={subSub.name}
                                                                            href={subSub.href}
                                                                            onClick={toggleMenu}
                                                                            className="block text-base text-gray-400 hover:text-white transition-colors font-light tracking-wider"
                                                                        >
                                                                            {subSub.name}
                                                                        </Link>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

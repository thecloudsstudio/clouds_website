"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Journal', href: '/journal' },
    { name: 'Contact', href: '/contact' },
];

export default function ArchNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-start bg-transparent pointer-events-none">

                {/* Logo */}
                <div className="relative z-50 pointer-events-auto mix-blend-difference" style={{ mixBlendMode: 'difference' }}>
                    <Link href="/" className="text-2xl font-light tracking-[0.2em] text-white uppercase block">
                        CLOUDS
                    </Link>
                </div>

                {/* Hamburger */}
                <div className="relative z-50 pointer-events-auto mix-blend-difference" style={{ mixBlendMode: 'difference' }}>
                    <button
                        onClick={toggleMenu}
                        className="text-white hover:text-gray-300 transition-colors focus:outline-none block"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </nav>

            {/* Full-screen menu */}
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
                                    <Link
                                        href={link.href}
                                        onClick={toggleMenu}
                                        className="text-3xl md:text-5xl font-light tracking-wide text-white hover:text-gray-400 transition-colors uppercase block"
                                    >
                                        {link.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
    {
        label: 'P',
        name: 'Portfolio',
        href: '/portfolio',
        desc: 'Selected works across residential, commercial, and hospitality.',
        bg: '#0a0a0a',
    },
    {
        label: 'S',
        name: 'Services',
        href: '/services',
        desc: 'Architecture, interiors, landscape design, and master planning.',
        bg: '#0f0f0f',
    },
    {
        label: 'A',
        name: 'About',
        href: '/about',
        desc: 'Our studio, our process, our philosophy.',
        bg: '#111111',
    },
    {
        label: 'J',
        name: 'Journal',
        href: '/journal',
        desc: 'Ideas, precedents, and work in progress.',
        bg: '#0d0d0d',
    },
    {
        label: 'C',
        name: 'Contact',
        href: '/contact',
        desc: 'Start a conversation about your next project.',
        bg: '#131313',
    },
];

export default function ArchNavbar() {
    const [isOpen, setIsOpen] = useState(false);

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
                <div className="relative z-50 pointer-events-auto">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="focus:outline-none block"
                        aria-label="Open Menu"
                        style={{ mixBlendMode: 'difference' }}
                    >
                        {/* Custom minimal bars */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 4 }}>
                            <div style={{ width: 24, height: 1, backgroundColor: '#fff', transition: 'all 0.3s' }} />
                            <div style={{ width: 16, height: 1, backgroundColor: '#fff', transition: 'all 0.3s' }} />
                        </div>
                    </button>
                </div>
            </nav>

            {/* ── FULL-SCREEN PANEL MENU ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 200,
                            display: 'flex', fontFamily: 'var(--font-inter)',
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: 'fixed', top: 28, right: 28, zIndex: 210,
                                background: 'none', border: 'none', cursor: 'pointer',
                                color: '#fff', padding: 4,
                            }}
                            aria-label="Close Menu"
                        >
                            <X size={22} strokeWidth={1.5} />
                        </button>

                        {/* Logo in menu */}
                        <div style={{
                            position: 'fixed', top: 28, left: 28, zIndex: 210,
                            fontSize: 13, letterSpacing: '0.4em', fontWeight: 300,
                            textTransform: 'uppercase', color: '#fff',
                        }}>CLOUDS</div>

                        {/* Panel columns */}
                        {NAV_ITEMS.map((item, i) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                                style={{ flex: 1, position: 'relative', overflow: 'hidden' }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        display: 'flex', flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        padding: '48px 32px',
                                        width: '100%', height: '100%',
                                        backgroundColor: item.bg,
                                        textDecoration: 'none',
                                        borderRight: i < NAV_ITEMS.length - 1
                                            ? '1px solid rgba(255,255,255,0.06)'
                                            : 'none',
                                        transition: 'background-color 0.3s',
                                        position: 'relative',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.backgroundColor =
                                            `color-mix(in srgb, ${item.bg} 60%, #1a1a1a 40%)`;
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.backgroundColor = item.bg;
                                    }}
                                >
                                    {/* Giant watermark letter */}
                                    <div style={{
                                        position: 'absolute', top: '50%', left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: 'clamp(80px, 14vw, 200px)',
                                        fontWeight: 300,
                                        color: 'rgba(255,255,255,0.04)',
                                        letterSpacing: '-0.05em',
                                        userSelect: 'none', lineHeight: 1,
                                        pointerEvents: 'none',
                                    }}>{item.label}</div>

                                    {/* Content */}
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <div style={{
                                            fontSize: 9, letterSpacing: '0.3em',
                                            textTransform: 'uppercase',
                                            color: 'rgba(255,255,255,0.3)',
                                            marginBottom: 14, fontWeight: 300,
                                        }}>0{i + 1}</div>
                                        <div style={{
                                            fontSize: 'clamp(18px, 1.8vw, 26px)',
                                            fontWeight: 300,
                                            letterSpacing: '-0.01em',
                                            color: '#fff',
                                            marginBottom: 14,
                                        }}>{item.name}</div>
                                        <div style={{
                                            width: 20, height: 1,
                                            backgroundColor: 'rgba(255,255,255,0.25)',
                                            marginBottom: 16,
                                        }} />
                                        <p style={{
                                            fontSize: 11, fontWeight: 300,
                                            color: 'rgba(255,255,255,0.45)',
                                            lineHeight: 1.75, maxWidth: 200,
                                            margin: 0,
                                        }}>{item.desc}</p>
                                        <div style={{
                                            marginTop: 28, fontSize: 9,
                                            letterSpacing: '0.25em',
                                            textTransform: 'uppercase',
                                            color: 'rgba(255,255,255,0.4)',
                                        }}>Enter →</div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

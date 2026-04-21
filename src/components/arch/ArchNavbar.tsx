"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Pages that have their own full-screen fixed navigation — hide the global navbar
const HIDDEN_ON = [/^\/portfolio\/.+/, /^\/services$/, /^\/mockups/];

// Pages with a LIGHT background — navbar must use dark ink
const LIGHT_BG_PAGES = [/^\/portfolio$/, /^\/about$/, /^\/contact$/, /^\/journal$/];

const NAV_ITEMS = [
    { label: 'P', name: 'Portfolio', href: '/portfolio', desc: 'Selected works across residential, commercial, and hospitality.',    bg: '#0a0a0a' },
    { label: 'S', name: 'Services',  href: '/services',  desc: 'Architecture, interiors, landscape design, and master planning.',    bg: '#0f0f0f' },
    { label: 'A', name: 'About',     href: '/about',     desc: 'Our studio, our process, our philosophy.',                           bg: '#111111' },
    { label: 'J', name: 'Journal',   href: '/journal',   desc: 'Ideas, precedents, and work in progress.',                          bg: '#0d0d0d' },
    { label: 'C', name: 'Contact',   href: '/contact',   desc: 'Start a conversation about your next project.',                     bg: '#131313' },
];

export default function ArchNavbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Close on route change
    useEffect(() => { setIsOpen(false); }, [pathname]);

    // Hide on pages that have their own nav
    if (HIDDEN_ON.some(re => re.test(pathname))) return null;

    // Colour scheme: dark ink on light-background pages, white on dark pages
    const isLightPage = LIGHT_BG_PAGES.some(re => re.test(pathname));
    const inkColor    = isLightPage ? '#111111' : '#ffffff';
    const inkMuted    = isLightPage ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.5)';

    return (
        <>
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                padding: isMobile ? '18px 20px' : '24px 28px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'transparent', pointerEvents: 'none',
                fontFamily: 'var(--font-inter)',
            }}>
                {/* Logo */}
                <div style={{ pointerEvents: 'auto' }}>
                    <Link href="/" style={{
                        fontSize: isMobile ? 12 : 14,
                        letterSpacing: '0.35em', fontWeight: 300,
                        textTransform: 'uppercase', color: inkColor,
                        textDecoration: 'none', display: 'block',
                        transition: 'color 0.3s',
                    }}>
                        CLOUDS
                    </Link>
                </div>

                {/* Hamburger */}
                <div style={{ pointerEvents: 'auto' }}>
                    <button
                        onClick={() => setIsOpen(true)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', flexDirection: 'column', gap: 5 }}
                        aria-label="Open Menu"
                    >
                        <div style={{ width: 24, height: 1, backgroundColor: inkColor, transition: 'background-color 0.3s' }} />
                        <div style={{ width: 16, height: 1, backgroundColor: inkColor, transition: 'background-color 0.3s' }} />
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
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 200,
                            fontFamily: 'var(--font-inter)',
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            overflowY: isMobile ? 'auto' : 'hidden',
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: 'fixed', top: isMobile ? 18 : 24, right: isMobile ? 20 : 28,
                                zIndex: 210, background: 'none', border: 'none', cursor: 'pointer',
                                color: '#fff', padding: 4,
                            }}
                            aria-label="Close Menu"
                        >
                            <X size={20} strokeWidth={1.5} />
                        </button>

                        {/* Logo in open menu */}
                        <div style={{
                            position: 'fixed', top: isMobile ? 20 : 26, left: isMobile ? 20 : 28,
                            zIndex: 210, fontSize: isMobile ? 11 : 13,
                            letterSpacing: '0.38em', fontWeight: 300,
                            textTransform: 'uppercase', color: '#fff',
                        }}>CLOUDS</div>

                        {/* Panel items */}
                        {NAV_ITEMS.map((item, i) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: isMobile ? 12 : 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.32, delay: i * 0.05 }}
                                style={{
                                    flex: isMobile ? 'none' : 1,
                                    minHeight: isMobile ? 130 : undefined,
                                    height: isMobile ? 'auto' : '100%',
                                    position: 'relative', overflow: 'hidden',
                                }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: isMobile ? 'row' : 'column',
                                        alignItems: isMobile ? 'center' : undefined,
                                        justifyContent: isMobile ? 'space-between' : 'flex-end',
                                        padding: isMobile ? '26px 24px' : '44px 28px',
                                        width: '100%', height: '100%',
                                        backgroundColor: item.bg,
                                        textDecoration: 'none',
                                        borderBottom: isMobile && i < NAV_ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                        borderRight: !isMobile && i < NAV_ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                        position: 'relative',
                                    }}
                                >
                                    {/* Giant watermark letter */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: isMobile ? 'auto' : '50%',
                                        right: isMobile ? 16 : 'auto',
                                        transform: isMobile ? 'translateY(-50%)' : 'translate(-50%,-50%)',
                                        fontSize: isMobile ? 72 : 'clamp(72px, 13vw, 190px)',
                                        fontWeight: 300, color: 'rgba(255,255,255,0.04)',
                                        letterSpacing: '-0.05em', userSelect: 'none',
                                        lineHeight: 1, pointerEvents: 'none',
                                    }}>{item.label}</div>

                                    {/* Content */}
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: isMobile ? 7 : 13, fontWeight: 300 }}>0{i + 1}</div>
                                        <div style={{ fontSize: isMobile ? 19 : 'clamp(17px, 1.7vw, 25px)', fontWeight: 300, letterSpacing: '-0.01em', color: '#fff', marginBottom: isMobile ? 0 : 13 }}>{item.name}</div>
                                        {!isMobile && (
                                            <>
                                                <div style={{ width: 18, height: 1, backgroundColor: 'rgba(255,255,255,0.22)', marginBottom: 14 }} />
                                                <p style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, maxWidth: 190, margin: 0 }}>{item.desc}</p>
                                            </>
                                        )}
                                    </div>

                                    {/* Arrow */}
                                    <div style={{ position: 'relative', zIndex: 1, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginTop: isMobile ? 0 : 26 }}>→</div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

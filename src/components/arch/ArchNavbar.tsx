"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Pages that have their own full-screen fixed navigation
const HIDDEN_ON = [/^\/portfolio\/.+/, /^\/services$/, /^\/mockups/];

const NAV_ITEMS = [
    { label: 'P', name: 'Portfolio', href: '/portfolio', desc: 'Selected works across residential, commercial, and hospitality.', bg: '#0a0a0a' },
    { label: 'S', name: 'Services',  href: '/services',  desc: 'Architecture, interiors, landscape design, and master planning.', bg: '#0f0f0f' },
    { label: 'A', name: 'About',     href: '/about',     desc: 'Our studio, our process, our philosophy.', bg: '#111111' },
    { label: 'J', name: 'Journal',   href: '/journal',   desc: 'Ideas, precedents, and work in progress.', bg: '#0d0d0d' },
    { label: 'C', name: 'Contact',   href: '/contact',   desc: 'Start a conversation about your next project.', bg: '#131313' },
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

    // Close menu on route change
    useEffect(() => { setIsOpen(false); }, [pathname]);

    if (HIDDEN_ON.some(re => re.test(pathname))) return null;

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 p-5 md:p-6 flex justify-between items-start bg-transparent pointer-events-none">
                {/* Logo */}
                <div className="relative z-50 pointer-events-auto" style={{ mixBlendMode: 'difference' }}>
                    <Link href="/" className="text-lg md:text-2xl font-light tracking-[0.2em] text-white uppercase block">
                        CLOUDS
                    </Link>
                </div>

                {/* Hamburger */}
                <div className="relative z-50 pointer-events-auto">
                    <button onClick={() => setIsOpen(true)} className="focus:outline-none block" aria-label="Open Menu" style={{ mixBlendMode: 'difference' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 4 }}>
                            <div style={{ width: 24, height: 1, backgroundColor: '#fff' }} />
                            <div style={{ width: 16, height: 1, backgroundColor: '#fff' }} />
                        </div>
                    </button>
                </div>
            </nav>

            {/* ── FULL-SCREEN MENU ── */}
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
                            // Desktop: horizontal columns | Mobile: vertical stack
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            overflowY: isMobile ? 'auto' : 'hidden',
                        }}
                    >
                        {/* Close */}
                        <button onClick={() => setIsOpen(false)} style={{ position: 'fixed', top: isMobile ? 20 : 28, right: isMobile ? 20 : 28, zIndex: 210, background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 4 }} aria-label="Close Menu">
                            <X size={20} strokeWidth={1.5} />
                        </button>

                        {/* Logo */}
                        <div style={{ position: 'fixed', top: isMobile ? 22 : 28, left: isMobile ? 20 : 28, zIndex: 210, fontSize: isMobile ? 11 : 13, letterSpacing: '0.4em', fontWeight: 300, textTransform: 'uppercase', color: '#fff' }}>CLOUDS</div>

                        {/* Nav items */}
                        {NAV_ITEMS.map((item, i) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: isMobile ? 16 : 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: i * 0.05 }}
                                style={{
                                    // Desktop: equal flex columns | Mobile: fixed height rows
                                    flex: isMobile ? 'none' : 1,
                                    height: isMobile ? 'auto' : '100%',
                                    minHeight: isMobile ? 140 : undefined,
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
                                        padding: isMobile ? '28px 24px' : '48px 32px',
                                        width: '100%', height: '100%',
                                        backgroundColor: item.bg,
                                        textDecoration: 'none',
                                        borderBottom: isMobile && i < NAV_ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                        borderRight: !isMobile && i < NAV_ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                        position: 'relative',
                                    }}
                                >
                                    {/* Watermark letter */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%', left: isMobile ? 'auto' : '50%',
                                        right: isMobile ? 20 : 'auto',
                                        transform: isMobile ? 'translateY(-50%)' : 'translate(-50%, -50%)',
                                        fontSize: isMobile ? 80 : 'clamp(80px, 14vw, 200px)',
                                        fontWeight: 300, color: 'rgba(255,255,255,0.04)',
                                        letterSpacing: '-0.05em', userSelect: 'none',
                                        lineHeight: 1, pointerEvents: 'none',
                                    }}>{item.label}</div>

                                    {/* Content */}
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: isMobile ? 8 : 14, fontWeight: 300 }}>0{i + 1}</div>
                                        <div style={{ fontSize: isMobile ? 20 : 'clamp(18px, 1.8vw, 26px)', fontWeight: 300, letterSpacing: '-0.01em', color: '#fff', marginBottom: isMobile ? 0 : 14 }}>{item.name}</div>
                                        {!isMobile && (
                                            <>
                                                <div style={{ width: 20, height: 1, backgroundColor: 'rgba(255,255,255,0.25)', marginBottom: 16 }} />
                                                <p style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 200, margin: 0 }}>{item.desc}</p>
                                            </>
                                        )}
                                    </div>

                                    {/* Arrow */}
                                    <div style={{ position: 'relative', zIndex: 1, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: isMobile ? 0 : 28 }}>→</div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

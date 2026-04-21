"use client";

/**
 * Project Detail — "The Darkroom"
 * Fully responsive: desktop (left panel) → mobile (bottom panel)
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Project {
    slug: string;
    title: string;
    category: string;
    location: string;
    year: string;
    description: string;
    heroImage: string;
    images: string[];
    plans: string[];
    sections: { title: string; content: string; image?: string; }[];
    size?: string;
}

export default function ProjectDetailClient({ project }: { project: Project }) {

    // Build frames
    const frames = [
        {
            image: project.heroImage,
            type: 'hero' as const,
            label: '',
            heading: project.title,
            sub: `${project.category} · ${project.year} · ${project.location}`,
            body: '',
        },
        {
            image: project.images[1] ?? project.images[0] ?? project.heroImage,
            type: 'section' as const,
            label: '01 — Design Brief',
            heading: 'Design Brief',
            sub: '',
            body: project.description,
        },
        ...project.sections.map((s, i) => ({
            image: s.image ?? project.images[i + 2] ?? project.heroImage,
            type: 'section' as const,
            label: `${String(i + 2).padStart(2, '0')} — ${s.title}`,
            heading: s.title,
            sub: '',
            body: s.content,
        })),
    ];

    const [current, setCurrent] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Responsive breakpoint detection
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const go = useCallback((dir: 1 | -1) => {
        setCurrent(prev => {
            const next = prev + dir;
            if (next < 0 || next >= frames.length) return prev;
            return next;
        });
    }, [frames.length]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    // Keyboard
    useEffect(() => {
        const fn = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(1); }
            if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); go(-1); }
        };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [go]);

    // Wheel (desktop)
    useEffect(() => {
        let last = 0;
        const fn = (e: WheelEvent) => {
            e.preventDefault();
            const now = Date.now();
            if (now - last < 650) return;
            last = now;
            go(e.deltaY > 0 ? 1 : -1);
        };
        window.addEventListener('wheel', fn, { passive: false });
        return () => window.removeEventListener('wheel', fn);
    }, [go]);

    // Touch swipe
    useEffect(() => {
        let startX = 0, startY = 0;
        const onStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };
        const onEnd = (e: TouchEvent) => {
            const dx = e.changedTouches[0].clientX - startX;
            const dy = e.changedTouches[0].clientY - startY;
            if (Math.abs(dx) < 40 && Math.abs(dy) < 40) return;
            if (Math.abs(dy) > Math.abs(dx)) {
                go(dy < 0 ? 1 : -1); // swipe up = next
            } else {
                go(dx < 0 ? 1 : -1); // swipe left = next
            }
        };
        window.addEventListener('touchstart', onStart, { passive: true });
        window.addEventListener('touchend', onEnd, { passive: true });
        return () => {
            window.removeEventListener('touchstart', onStart);
            window.removeEventListener('touchend', onEnd);
        };
    }, [go]);

    const frame = frames[current];

    return (
        <div style={{
            position: 'fixed', inset: 0, backgroundColor: '#0a0a0a',
            overflow: 'hidden', fontFamily: 'var(--font-inter)',
        }}>

            {/* Full-bleed image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    style={{ position: 'absolute', inset: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                >
                    <img
                        src={frame.image} alt={frame.heading}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isMobile ? 0.5 : 0.55 }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Gradients — adapt direction for mobile vs desktop */}
            {isMobile ? (
                <>
                    {/* Mobile: heavy bottom gradient for text readability */}
                    <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        background: 'linear-gradient(to top, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.7) 35%, rgba(5,5,5,0.1) 65%, transparent 100%)',
                    }} />
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 120, pointerEvents: 'none',
                        background: 'linear-gradient(to bottom, rgba(5,5,5,0.7) 0%, transparent 100%)',
                    }} />
                </>
            ) : (
                <>
                    {/* Desktop: left gradient for side panel */}
                    <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        background: 'linear-gradient(to right, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.65) 28%, rgba(5,5,5,0.15) 58%, transparent 100%)',
                    }} />
                    <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, pointerEvents: 'none',
                        background: 'linear-gradient(to top, rgba(5,5,5,0.75) 0%, transparent 100%)',
                    }} />
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 160, pointerEvents: 'none',
                        background: 'linear-gradient(to bottom, rgba(5,5,5,0.65) 0%, transparent 100%)',
                    }} />
                </>
            )}

            {/* Top bar */}
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: isMobile ? '20px 20px' : '28px 36px', zIndex: 50,
            }}>
                <Link href="/" style={{
                    fontSize: isMobile ? 11 : 13, letterSpacing: '0.4em', fontWeight: 300,
                    textTransform: 'uppercase', color: '#fff', textDecoration: 'none',
                }}>CLOUDS</Link>
                <Link href="/portfolio" style={{
                    fontSize: 9, letterSpacing: '0.25em', fontWeight: 300,
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                }}>← Portfolio</Link>
            </div>

            {/* ── DESKTOP: Left text panel, vertically centred ── */}
            {!isMobile && (
                <div style={{
                    position: 'fixed', left: 56, top: '50%', transform: 'translateY(-50%)',
                    width: 'min(440px, 36vw)', zIndex: 50,
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: -28 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 16 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                            {frame.type === 'hero' ? (
                                <>
                                    <div style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 24, fontWeight: 300 }}>{frame.sub}</div>
                                    <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 84px)', fontWeight: 300, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.03em', margin: 0 }}>{frame.heading}</h1>
                                    <div style={{ width: 40, height: 1, backgroundColor: 'rgba(255,255,255,0.25)', margin: '32px 0 28px' }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 32 }}>
                                        <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{project.category}</span>
                                        <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{project.location}</span>
                                        <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{project.year}{project.size ? ` · ${project.size}` : ''}</span>
                                    </div>
                                    <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 300, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.18)', paddingBottom: 3 }}>Start a project →</Link>
                                </>
                            ) : (
                                <>
                                    <div style={{ fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 22, fontWeight: 300 }}>{frame.label}</div>
                                    <h2 style={{ fontSize: 'clamp(26px, 3vw, 46px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 28px' }}>{frame.heading}</h2>
                                    <div style={{ width: 32, height: 1, backgroundColor: 'rgba(255,255,255,0.18)', marginBottom: 28 }} />
                                    <p style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.95, margin: 0 }}>{frame.body}</p>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            {/* ── MOBILE: Bottom text panel ── */}
            {isMobile && (
                <div style={{
                    position: 'fixed', bottom: 0, left: 0, right: 0,
                    padding: '28px 24px 90px',
                    zIndex: 50,
                    maxHeight: '55vh',
                    overflowY: 'auto',
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                            {frame.type === 'hero' ? (
                                <>
                                    <div style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 12, fontWeight: 300 }}>{frame.sub}</div>
                                    <h1 style={{ fontSize: 'clamp(32px, 8vw, 52px)', fontWeight: 300, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.025em', margin: '0 0 20px' }}>{frame.heading}</h1>
                                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
                                        <span style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{project.category}</span>
                                        <span style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{project.location}</span>
                                        <span style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{project.year}</span>
                                    </div>
                                    <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 300, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.18)', paddingBottom: 2 }}>Start a project →</Link>
                                </>
                            ) : (
                                <>
                                    <div style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 14, fontWeight: 300 }}>{frame.label}</div>
                                    <h2 style={{ fontSize: 'clamp(22px, 6vw, 36px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 16px' }}>{frame.heading}</h2>
                                    <div style={{ width: 28, height: 1, backgroundColor: 'rgba(255,255,255,0.18)', marginBottom: 16 }} />
                                    <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, margin: 0 }}>{frame.body}</p>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            {/* Right rail — hidden on very small screens */}
            {!isMobile && (
                <div style={{
                    position: 'fixed', right: 36, top: '50%', transform: 'translateY(-50%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 18, zIndex: 50,
                }}>
                    {frames.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: i === current ? 22 : 6, height: 1, backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.22)', transition: 'all 0.4s ease' }} />
                            <span style={{ fontSize: 9, letterSpacing: '0.15em', fontWeight: 300, color: i === current ? '#fff' : 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-inter)', transition: 'color 0.4s ease' }}>{String(i).padStart(2, '0')}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Mobile dot nav */}
            {isMobile && (
                <div style={{
                    position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)',
                    display: 'flex', flexDirection: 'column', gap: 8, zIndex: 50,
                }}>
                    {frames.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)} style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                        }}>
                            <div style={{
                                width: i === current ? 2 : 5, height: i === current ? 18 : 5,
                                borderRadius: i === current ? 1 : 3,
                                backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.3)',
                                transition: 'all 0.35s ease',
                            }} />
                        </button>
                    ))}
                </div>
            )}

            {/* Bottom progress rail */}
            <div style={{
                position: 'fixed',
                bottom: isMobile ? 70 : 36,
                left: isMobile ? 24 : 56,
                right: isMobile ? 40 : 80,
                display: 'flex', gap: 3, zIndex: 50,
            }}>
                {frames.map((_, i) => (
                    <div key={i} onClick={() => setCurrent(i)} style={{
                        flex: 1, height: 1, cursor: 'pointer',
                        backgroundColor: i <= current ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.13)',
                        transition: 'background-color 0.5s ease',
                    }} />
                ))}
            </div>

            {/* Prev */}
            {current > 0 && (
                <button onClick={() => go(-1)} style={{
                    position: 'fixed', left: isMobile ? 4 : 16, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', zIndex: 50,
                    color: 'rgba(255,255,255,0.22)', fontSize: isMobile ? 24 : 30, padding: '12px 8px',
                }}>‹</button>
            )}

            {/* Next */}
            {current < frames.length - 1 && !isMobile && (
                <button onClick={() => go(1)} style={{
                    position: 'fixed', right: 80, bottom: 64,
                    background: 'none', border: 'none', cursor: 'pointer', zIndex: 50,
                    color: 'rgba(255,255,255,0.28)', fontSize: 10, letterSpacing: '0.3em',
                    textTransform: 'uppercase', fontFamily: 'var(--font-inter)', fontWeight: 300,
                    padding: 8, writingMode: 'vertical-rl',
                }}>Next</button>
            )}

            {/* Mobile: swipe hint on first frame */}
            {isMobile && current === 0 && (
                <div style={{
                    position: 'fixed', bottom: 76, left: '50%', transform: 'translateX(-50%)',
                    zIndex: 50, fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.25)', fontWeight: 300, whiteSpace: 'nowrap',
                }}>swipe to explore</div>
            )}
        </div>
    );
}

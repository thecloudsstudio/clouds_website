"use client";

/**
 * CONCEPT A — "The Darkroom"
 *
 * Full-bleed image, cinematic, dark. Text lives on the LEFT side as a tall
 * vertically-centred panel — generous size, never competing with the image
 * but impossible to miss. Right rail stays as a numbered navigator.
 * Bottom: thin progress rail.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const PROJECT = {
    title: 'Bangalore Fusion Villa',
    category: 'Residential',
    location: 'Bangalore, India',
    year: '2023',
};

const FRAMES = [
    {
        image: '/bangalore_villa_facade_color_1767792911832.png',
        type: 'hero' as const,
        label: '',
        heading: 'Bangalore\nFusion Villa',
        caption: 'Residential · 2023 · Bangalore, India',
    },
    {
        image: '/kerala_resort_aerial_colorized_1767793602663.png',
        type: 'section' as const,
        label: '01 — The Brief',
        heading: 'The Brief',
        caption: 'The clients sought a home rooted in its landscape while embracing contemporary living. A 4,200 sq ft plot on Bangalore\'s outskirts became the site for an experiment in materiality — raw concrete tempered by teak, monsoon-conscious overhangs, and a central courtyard that breathes life into every room it touches.',
    },
    {
        image: '/chennai_urban_residence_exterior_1769688810297.png',
        type: 'section' as const,
        label: '02 — The Concept',
        heading: 'The Concept',
        caption: 'The plan organises itself around a double-height void — part light well, part social anchor. Public spaces orbit it at ground level; private quarters retreat above. Fenestration is calculated to capture morning light from the east while shielding afternoon heat.',
    },
    {
        image: '/chettinad_bedroom_colorized_1767964135344.png',
        type: 'section' as const,
        label: '03 — The Interior',
        heading: 'The Interior',
        caption: 'Local craftsmen were commissioned for the jaali screens, each panel a unique geometric study. The flooring — a blend of Kadappa stone and reclaimed timber — was sourced within 200 km of the site. Construction took 22 months, with the team on site throughout.',
    },
    {
        image: '/kerala_resort_yoga_colorized_v2_1767794447655.png',
        type: 'section' as const,
        label: '04 — The Detail',
        heading: 'The Detail',
        caption: 'Every junction was treated as a design opportunity. The interplay of rough and refined — exposed aggregate beside hand-polished terrazzo, industrial steel beside hand-woven cane — gives the house its quiet complexity.',
    },
];

export default function MockupA() {
    const [current, setCurrent] = useState(0);

    const go = useCallback((dir: 1 | -1) => {
        const next = current + dir;
        if (next < 0 || next >= FRAMES.length) return;
        setCurrent(next);
    }, [current]);

    // Keyboard navigation
    useEffect(() => {
        const fn = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(1);
            if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   go(-1);
        };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [go]);

    // Wheel navigation — one step per gesture
    useEffect(() => {
        let last = 0;
        const fn = (e: WheelEvent) => {
            e.preventDefault();
            const now = Date.now();
            if (now - last < 600) return;
            last = now;
            go(e.deltaY > 0 ? 1 : -1);
        };
        window.addEventListener('wheel', fn, { passive: false });
        return () => window.removeEventListener('wheel', fn);
    }, [go]);

    const frame = FRAMES[current];

    return (
        <div style={{
            position: 'fixed', inset: 0, backgroundColor: '#0a0a0a',
            overflow: 'hidden', fontFamily: 'var(--font-inter)',
        }}>

            {/* ── FULL-BLEED IMAGE ── */}
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
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* ── GRADIENTS ── */}
            {/* Left vignette — creates reading surface for the text panel */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(to right, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.6) 30%, rgba(5,5,5,0.15) 60%, transparent 100%)',
            }} />
            {/* Bottom vignette */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, pointerEvents: 'none',
                background: 'linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 100%)',
            }} />
            {/* Top vignette */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 160, pointerEvents: 'none',
                background: 'linear-gradient(to bottom, rgba(5,5,5,0.6) 0%, transparent 100%)',
            }} />

            {/* ── TOP BAR ── */}
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '28px 36px', zIndex: 50,
            }}>
                <Link href="/" style={{
                    fontSize: 13, letterSpacing: '0.4em', fontWeight: 300,
                    textTransform: 'uppercase', color: '#fff', textDecoration: 'none',
                }}>CLOUDS</Link>
                <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
                    <Link href="/mockups" style={{
                        fontSize: 9, letterSpacing: '0.25em', fontWeight: 300,
                        textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
                    }}>← Concepts</Link>
                    <Link href="/portfolio" style={{
                        fontSize: 9, letterSpacing: '0.25em', fontWeight: 300,
                        textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
                    }}>Portfolio</Link>
                </div>
            </div>

            {/* ── LEFT TEXT PANEL — vertically centred ── */}
            <div style={{
                position: 'fixed', left: 56, top: '50%', transform: 'translateY(-50%)',
                width: 'min(420px, 38vw)', zIndex: 50,
            }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                    >
                        {frame.type === 'hero' ? (
                            <>
                                <div style={{
                                    fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase',
                                    color: 'rgba(255,255,255,0.4)', marginBottom: 24, fontWeight: 300,
                                }}>{frame.caption}</div>
                                <h1 style={{
                                    fontSize: 'clamp(44px, 6vw, 88px)', fontWeight: 300, color: '#fff',
                                    lineHeight: 1.0, letterSpacing: '-0.03em', margin: 0,
                                    whiteSpace: 'pre-line',
                                }}>{frame.heading}</h1>
                                <div style={{ width: 40, height: 1, backgroundColor: 'rgba(255,255,255,0.3)', margin: '32px 0' }} />
                                <Link href="/contact" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 10,
                                    fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
                                    fontWeight: 300, color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                                    borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 3,
                                }}>Start a project →</Link>
                            </>
                        ) : (
                            <>
                                <div style={{
                                    fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase',
                                    color: 'rgba(255,255,255,0.38)', marginBottom: 20, fontWeight: 300,
                                }}>{frame.label}</div>
                                <h2 style={{
                                    fontSize: 'clamp(28px, 3.2vw, 48px)', fontWeight: 300, color: '#fff',
                                    lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 28, margin: '0 0 28px',
                                }}>{frame.heading}</h2>
                                <div style={{ width: 32, height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 28 }} />
                                <p style={{
                                    fontSize: 'clamp(14px, 1.1vw, 17px)', fontWeight: 300,
                                    color: 'rgba(255,255,255,0.68)',
                                    lineHeight: 1.9, margin: 0,
                                }}>{frame.caption}</p>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── RIGHT RAIL: numbered steps ── */}
            <div style={{
                position: 'fixed', right: 36, top: '50%', transform: 'translateY(-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 20, zIndex: 50,
            }}>
                {FRAMES.map((f, i) => (
                    <button
                        key={i} onClick={() => setCurrent(i)}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                            display: 'flex', alignItems: 'center', gap: 10,
                        }}
                    >
                        <div style={{
                            width: i === current ? 22 : 6, height: 1,
                            backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.25)',
                            transition: 'all 0.4s',
                        }} />
                        <span style={{
                            fontSize: 9, letterSpacing: '0.15em', fontWeight: 300,
                            color: i === current ? '#fff' : 'rgba(255,255,255,0.3)',
                            fontFamily: 'var(--font-inter)',
                            transition: 'color 0.4s',
                        }}>{String(i).padStart(2, '0')}</span>
                    </button>
                ))}
            </div>

            {/* ── BOTTOM PROGRESS RAIL ── */}
            <div style={{
                position: 'fixed', bottom: 36, left: 56, right: 80,
                display: 'flex', gap: 3, zIndex: 50,
            }}>
                {FRAMES.map((_, i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1, height: 1,
                            backgroundColor: i <= current ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.15)',
                            transition: 'background-color 0.5s',
                            cursor: 'pointer',
                        }}
                        onClick={() => setCurrent(i)}
                    />
                ))}
            </div>

            {/* ── PREV / NEXT ARROWS ── */}
            {current > 0 && (
                <button onClick={() => go(-1)} style={{
                    position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', zIndex: 50,
                    color: 'rgba(255,255,255,0.25)', fontSize: 28, padding: '12px 8px',
                    transition: 'color 0.3s',
                }}>‹</button>
            )}
            {current < FRAMES.length - 1 && (
                <button onClick={() => go(1)} style={{
                    position: 'fixed', right: 80, bottom: 60,
                    background: 'none', border: 'none', cursor: 'pointer', zIndex: 50,
                    color: 'rgba(255,255,255,0.3)', fontSize: 10, letterSpacing: '0.3em',
                    textTransform: 'uppercase', fontFamily: 'var(--font-inter)', fontWeight: 300,
                    padding: 8, transition: 'color 0.3s', writingMode: 'vertical-rl',
                }}>Next</button>
            )}
        </div>
    );
}

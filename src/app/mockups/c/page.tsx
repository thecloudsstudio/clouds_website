"use client";

/**
 * CONCEPT C — "The Unroll"
 *
 * The project unrolls like an architectural scroll — full-viewport sections
 * that snap into place. Dark image sections alternate with cream text sections.
 * Giant background numerals give each section a sense of scale.
 * A thin dot rail on the right tracks your position.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SLIDES = [
    {
        type: 'image' as const,
        num: '00',
        image: '/bangalore_villa_facade_color_1767792911832.png',
        eyebrow: 'Residential · Bangalore, India · 2023',
        title: 'Bangalore\nFusion Villa',
    },
    {
        type: 'text' as const,
        num: '01',
        label: 'The Brief',
        title: 'A home that belongs here.',
        body: 'The clients sought a home rooted in its landscape while embracing contemporary living. A 4,200 sq ft plot on Bangalore\'s outskirts became the site for an experiment in materiality — raw concrete tempered by teak, monsoon-conscious overhangs, and a central courtyard that breathes life into every room it touches.',
    },
    {
        type: 'image' as const,
        num: '02',
        image: '/kerala_resort_aerial_colorized_1767793602663.png',
        eyebrow: 'Aerial perspective',
        title: 'The Site',
    },
    {
        type: 'text' as const,
        num: '03',
        label: 'The Concept',
        title: 'Light as the structuring element.',
        body: 'The plan organises itself around a double-height void — part light well, part social anchor. Public spaces orbit it at ground level; private quarters retreat above. Fenestration captures morning light while shielding afternoon heat — reducing mechanical cooling loads by 40%.',
    },
    {
        type: 'image' as const,
        num: '04',
        image: '/chettinad_bedroom_colorized_1767964135344.png',
        eyebrow: 'Primary suite',
        title: 'The Interior',
    },
    {
        type: 'text' as const,
        num: '05',
        label: 'The Making',
        title: 'Craft, sourced close to home.',
        body: 'Local craftsmen were commissioned for the jaali screens — each panel a unique geometric study. The flooring is a blend of Kadappa stone and reclaimed timber sourced within 200 km of the site. Construction took 22 months, with the team on site throughout every phase.',
    },
    {
        type: 'image' as const,
        num: '06',
        image: '/kerala_resort_yoga_colorized_v2_1767794447655.png',
        eyebrow: 'Garden court',
        title: 'The Landscape',
    },
    {
        type: 'text' as const,
        num: '07',
        label: 'The Result',
        title: 'Indoors and outdoors, dissolved.',
        body: 'The boundary between building and garden is deliberately ambiguous. A shallow reflecting pool runs the length of the south elevation, doubling the sky. Planting is native and dense — selected to mature quickly and frame the architecture without competing with it.',
    },
] as const;

export default function MockupC() {
    const [active, setActive] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef(false);

    // Navigate to a slide by setting scrollTop on the container
    const goTo = useCallback((i: number) => {
        const el = containerRef.current;
        if (!el) return;
        const clamped = Math.max(0, Math.min(i, SLIDES.length - 1));
        el.scrollTo({ top: clamped * el.clientHeight, behavior: 'smooth' });
    }, []);

    // Track active slide from scroll position
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onScroll = () => {
            const idx = Math.round(el.scrollTop / el.clientHeight);
            setActive(Math.max(0, Math.min(idx, SLIDES.length - 1)));
        };
        el.addEventListener('scroll', onScroll, { passive: true });
        return () => el.removeEventListener('scroll', onScroll);
    }, []);

    // Wheel: one snap step at a time, debounced
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        let last = 0;
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const now = Date.now();
            if (now - last < 700) return;
            last = now;
            const cur = Math.round(el.scrollTop / el.clientHeight);
            goTo(cur + (e.deltaY > 0 ? 1 : -1));
        };
        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, [goTo]);

    // Keyboard nav
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1); }
            if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  { e.preventDefault(); goTo(active - 1); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [active, goTo]);

    return (
        <div style={{ position: 'fixed', inset: 0, fontFamily: 'var(--font-inter)' }}>

            {/* ── FIXED UI ── */}
            <Link href="/" style={{
                position: 'fixed', top: 28, left: 32, zIndex: 100,
                fontSize: 13, letterSpacing: '0.4em', fontWeight: 300,
                textTransform: 'uppercase', color: '#fff', textDecoration: 'none',
                mixBlendMode: 'difference',
            }}>CLOUDS</Link>

            <div style={{ position: 'fixed', top: 28, right: 32, zIndex: 100, display: 'flex', gap: 24 }}>
                <Link href="/mockups" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#fff', textDecoration: 'none', fontWeight: 300, mixBlendMode: 'difference' }}>← Concepts</Link>
                <Link href="/portfolio" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#fff', textDecoration: 'none', fontWeight: 300, mixBlendMode: 'difference' }}>Portfolio</Link>
            </div>

            {/* Right dot rail */}
            <div style={{
                position: 'fixed', right: 28, top: '50%', transform: 'translateY(-50%)',
                display: 'flex', flexDirection: 'column', gap: 10, zIndex: 100,
                mixBlendMode: 'difference',
            }}>
                {SLIDES.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)} style={{
                        width: i === active ? 1 : 5,
                        height: i === active ? 28 : 5,
                        borderRadius: i === active ? 1 : 3,
                        backgroundColor: '#fff',
                        opacity: i === active ? 1 : 0.35,
                        border: 'none', cursor: 'pointer', padding: 0,
                        transition: 'all 0.4s cubic-bezier(0.25,0.1,0.25,1)',
                    }} />
                ))}
            </div>

            {/* Slide counter */}
            <div style={{
                position: 'fixed', bottom: 32, left: 32, zIndex: 100,
                fontSize: 10, letterSpacing: '0.25em', fontWeight: 300,
                mixBlendMode: 'difference', color: '#fff',
            }}>
                {String(active + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </div>

            {/* ── SCROLL CONTAINER ── */}
            <div
                ref={containerRef}
                style={{
                    position: 'absolute', inset: 0,
                    overflowY: 'scroll',
                    scrollSnapType: 'y mandatory',
                    // Hide scrollbar
                    scrollbarWidth: 'none',
                }}
            >
                {SLIDES.map((s, i) => (
                    <div key={i} style={{
                        height: '100vh',
                        scrollSnapAlign: 'start',
                        scrollSnapStop: 'always',
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundColor: s.type === 'image' ? '#0a0a0a' : '#f5f4f0',
                    }}>
                        {s.type === 'image' ? (
                            <>
                                <img src={s.image} alt={s.title}
                                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} />

                                {/* Bottom gradient */}
                                <div style={{
                                    position: 'absolute', inset: 0, pointerEvents: 'none',
                                    background: 'linear-gradient(to top, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.1) 55%, transparent 100%)',
                                }} />

                                {/* Ghost number */}
                                <div style={{
                                    position: 'absolute', top: '50%', left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    fontSize: '38vw', fontWeight: 300,
                                    color: 'rgba(255,255,255,0.04)',
                                    letterSpacing: '-0.06em', userSelect: 'none',
                                    pointerEvents: 'none', lineHeight: 1,
                                }}>{s.num}</div>

                                {/* Bottom-left label */}
                                <div style={{ position: 'absolute', bottom: 60, left: 64, zIndex: 2 }}>
                                    <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 18, fontWeight: 300 }}>
                                        {s.eyebrow}
                                    </div>
                                    <h2 style={{
                                        fontSize: 'clamp(36px, 5.5vw, 80px)', fontWeight: 300,
                                        color: '#fff', letterSpacing: '-0.025em',
                                        lineHeight: 1.0, margin: 0, whiteSpace: 'pre-line',
                                    }}>{s.title}</h2>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Ghost number — right anchored */}
                                <div style={{
                                    position: 'absolute', top: '50%', right: '-2vw',
                                    transform: 'translateY(-50%)',
                                    fontSize: '38vw', fontWeight: 300,
                                    color: 'rgba(0,0,0,0.04)',
                                    letterSpacing: '-0.06em', userSelect: 'none',
                                    pointerEvents: 'none', lineHeight: 1,
                                }}>{s.num}</div>

                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, backgroundColor: 'rgba(0,0,0,0.08)' }} />

                                {/* Centred content */}
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                    padding: '0 10vw',
                                }}>
                                    <div style={{ maxWidth: 640 }}>
                                        <div style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#bbb', marginBottom: 28, fontWeight: 300 }}>
                                            {s.num} — {s.label}
                                        </div>
                                        <h2 style={{
                                            fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 300,
                                            color: '#0c0c0c', letterSpacing: '-0.02em',
                                            lineHeight: 1.1, marginBottom: 32,
                                        }}>{s.title}</h2>
                                        <div style={{ width: 32, height: 1, backgroundColor: '#c0b89a', marginBottom: 32 }} />
                                        <p style={{ fontSize: 15, fontWeight: 300, color: '#555', lineHeight: 1.9 }}>{s.body}</p>

                                        {i === SLIDES.length - 1 && (
                                            <Link href="/contact" style={{
                                                display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 40,
                                                fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
                                                fontWeight: 300, color: '#222', textDecoration: 'none',
                                                borderBottom: '1px solid rgba(0,0,0,0.2)', paddingBottom: 3,
                                            }}>Start a project →</Link>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

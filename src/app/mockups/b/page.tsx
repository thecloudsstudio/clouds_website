"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const SECTIONS = [
    {
        num: '00', label: 'Overview',
        title: 'Bangalore\nFusion Villa',
        body: "A contemporary residence bridging modernist geometry with vernacular Kerala craftsmanship.",
        image: '/bangalore_villa_facade_color_1767792911832.png',
        meta: 'Residential · Bangalore, India · 2023',
    },
    {
        num: '01', label: 'The Brief',
        title: 'A home that\nbelongs here.',
        body: "The clients sought a home rooted in its landscape. A 4,200 sq ft plot became the site for an experiment in materiality — raw concrete tempered by teak, monsoon-conscious overhangs, and a central courtyard.",
        image: '/kerala_resort_aerial_colorized_1767793602663.png',
        meta: null,
    },
    {
        num: '02', label: 'The Concept',
        title: 'Light as the\nstructuring element.',
        body: 'The plan organises itself around a double-height void — part light well, part social anchor. Fenestration reduces mechanical cooling loads by 40%.',
        image: '/chennai_urban_residence_exterior_1769688810297.png',
        meta: null,
    },
    {
        num: '03', label: 'The Interior',
        title: 'The craft\nof quiet detail.',
        body: 'Local craftsmen were commissioned for the jaali screens. The flooring — Kadappa stone and reclaimed timber — was sourced within 200 km of the site.',
        image: '/chettinad_bedroom_colorized_1767964135344.png',
        meta: null,
    },
    {
        num: '04', label: 'The Landscape',
        title: 'Indoors,\noutdoors — dissolved.',
        body: 'The boundary between building and garden is deliberately ambiguous. A reflecting pool runs the south elevation, doubling the sky.',
        image: '/kerala_resort_yoga_colorized_v2_1767794447655.png',
        meta: null,
    },
];

export default function MockupB() {
    const [activeIdx, setActiveIdx] = useState(0);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        sectionRefs.current.forEach((el, i) => {
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveIdx(i); },
                { threshold: 0.4 }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach(o => o.disconnect());
    }, []);

    const active = SECTIONS[activeIdx];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font-inter)', backgroundColor: '#f5f4f0' }}>

            <div style={{ position: 'sticky', top: 0, width: '45%', height: '100vh', flexShrink: 0 }}>
                <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                    <AnimatePresence mode="wait">
                        <motion.div key={activeIdx} style={{ position: 'absolute', inset: 0 }}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}>
                            <img src={active.image} alt={active.label}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        <motion.div key={`lbl-${activeIdx}`}
                            style={{ position: 'absolute', bottom: 48, left: 44, zIndex: 2 }}
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}>
                            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
                                {active.meta ?? active.label}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <div style={{ position: 'absolute', top: '50%', right: 20, transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 8, zIndex: 5 }}>
                        {SECTIONS.map((_, i) => (
                            <div key={i} style={{ width: 1, height: i === activeIdx ? 28 : 10, backgroundColor: i === activeIdx ? '#fff' : 'rgba(255,255,255,0.35)', transition: 'height 0.4s' }} />
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, backgroundColor: '#f5f4f0' }}>
                <div style={{ position: 'sticky', top: 0, backgroundColor: '#f5f4f0', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '24px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 50 }}>
                    <Link href="/" style={{ fontSize: 13, letterSpacing: '0.4em', fontWeight: 300, textTransform: 'uppercase', color: '#111', textDecoration: 'none' }}>CLOUDS</Link>
                    <Link href="/mockups" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#aaa', textDecoration: 'none', fontWeight: 300 }}>Back</Link>
                </div>
                {SECTIONS.map((s, i) => (
                    <div key={i} ref={el => { sectionRefs.current[i] = el; }}
                        style={{ minHeight: '100vh', padding: '0 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: i < SECTIONS.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '50%', right: -24, transform: 'translateY(-50%)', fontSize: '22vw', fontWeight: 300, color: 'rgba(0,0,0,0.04)', letterSpacing: '-0.05em', userSelect: 'none', pointerEvents: 'none', lineHeight: 1 }}>{s.num}</div>
                        <div style={{ position: 'relative', zIndex: 1, maxWidth: 520 }}>
                            <div style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#aaa', marginBottom: 28, fontWeight: 300 }}>{s.num} — {s.label}</div>
                            <h2 style={{ fontSize: 'clamp(30px, 3.5vw, 52px)', fontWeight: 300, color: '#0c0c0c', letterSpacing: '-0.02em', lineHeight: 1.08, marginBottom: 32, whiteSpace: 'pre-line' }}>{s.title}</h2>
                            <div style={{ width: 32, height: 1, backgroundColor: '#c0b89a', marginBottom: 32 }} />
                            <p style={{ fontSize: 14, fontWeight: 300, color: '#555', lineHeight: 1.9 }}>{s.body}</p>
                        </div>
                    </div>
                ))}
                <div style={{ height: 80, borderTop: '1px solid rgba(0,0,0,0.07)' }} />
            </div>
        </div>
    );
}

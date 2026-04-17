"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ── GEOMETRY ──────────────────────────────────────────────────────────────────
const CX   = 72;    // ring centre x
const CY   = 450;   // ring centre y
const R1   = 88;    // hub
const R2   = 456;   // selector wheel
const N    = 7;
const STEP = 360 / N;
const R_LBL      = R2 * 0.57;               // label radius
const POINTER_END = Math.floor(R_LBL - 112); // pointer stops before labels

// How many px above/below center each image band occupies
const BAND = 190;

// Arc x-offset — follows Ring 2 curvature for content entering from top/bottom
// Gives the "circular scroll" feel as items arc in from the wheel edge
const arcX = (dy: number) =>
    -(R2 - Math.sqrt(Math.max(0, R2 * R2 - dy * dy))) * 0.45;

// Adaptive colour — pure geometry, no DOM, SSR-safe
function adaptColor(px: number, py: number): string {
    return Math.sqrt((px - CX) ** 2 + (py - CY) ** 2) <= R2
        ? '#ffffff'
        : '#111111';
}

// ── DATA ──────────────────────────────────────────────────────────────────────
const SERVICES = [
    {
        id: 1,
        shortName: "Architectural Design",
        title: "Architectural\nDesign",
        tagline: "Every space begins with a vision — we give it form.",
        description: "We design any built environment — homes, schools, factories, resorts, public buildings, parks. Interior space planning is part of the process, not an afterthought.",
        areas: ["Residential", "Commercial & Institutional", "Industrial & Hospitality", "Interior Spaces"],
        heroImage: "/bangalore_villa_facade_color_1767792911832.png",
    },
    {
        id: 2,
        shortName: "Design Consultancy",
        title: "Design\nConsultancy",
        tagline: "Your team, your site — guided by the people who designed it.",
        description: "Once the design is complete, we stay on as technical advisors — reviewing execution, answering site queries, and ensuring every decision stays true to the original design intent.",
        areas: ["Design Advisory", "Technical Guidance", "Site Reviews", "Execution Compliance"],
        heroImage: "/kerala_resort_aerial_colorized_1767793602663.png",
    },
    {
        id: 3,
        shortName: "Architecture PMC",
        title: "Architecture\nPMC",
        tagline: "One accountable voice between client and contractor.",
        description: "We act as your dedicated project management layer — scheduling, directing, and quality-controlling your appointed execution team so every decision serves the design.",
        areas: ["Project Scheduling", "Contractor Coordination", "Quality Control", "Cost Management"],
        heroImage: "/chennai_urban_residence_exterior_1769688810297.png",
    },
    {
        id: 4,
        shortName: "Turnkey Construction",
        title: "Turnkey\nConstruction",
        tagline: "Design, build, and deliver — nothing left undone.",
        description: "For clients who want a single point of responsibility. We design, construct, and finish everything — structure, interiors, fit-out — handing over a space that is ready to inhabit.",
        areas: ["Full-Build Execution", "Interior Fit-Out", "MEP & Services", "Handover & Closeout"],
        heroImage: "/chennai_apartments_exterior_v2_1769753645940.png",
    },
    {
        id: 5,
        shortName: "Product Design",
        title: "Product &\nIndustrial Design",
        tagline: "Every object deserves the precision of great design.",
        description: "We design physical things — furniture, machines, vehicles, consumer products, packaging. If it needs a designer's eye to be better made, more functional, or more beautiful, we do it.",
        areas: ["Consumer Products", "Industrial Equipment", "Furniture Design", "Packaging Design"],
        heroImage: "/chettinad_bedroom_colorized_1767964135344.png",
    },
    {
        id: 6,
        shortName: "Brand Design",
        title: "Brand &\nVisual Design",
        tagline: "Identity that is felt before it is read.",
        description: "From logo and stationery to exhibition stalls, promotional gifts, and branded environments — we craft the visual language that represents your organisation at every touchpoint.",
        areas: ["Brand Identity", "Print & Digital", "Exhibition & Events", "Branded Environments"],
        heroImage: "/kerala_resort_yoga_colorized_v2_1767794447655.png",
    },
    {
        id: 7,
        shortName: "3D Visualisation",
        title: "3D\nVisualisation",
        tagline: "See it before it exists.",
        description: "We turn concepts into photorealistic renders, immersive walkthroughs, and motion animations — from architectural interiors to manufacturing process visualisations.",
        areas: ["3D Modelling", "Photorealistic Rendering", "Walkthrough Animation", "Process Visualisation"],
        heroImage: "/bangalore_villa_facade_color_1767792911832.png",
    },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function ServicesClient() {
    const [mounted,     setMounted]     = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [angleOffset, setAngleOffset] = useState(0);
    const [scrollDir,   setScrollDir]   = useState<1 | -1>(1);

    const angleRef       = useRef(0);
    const targetRef      = useRef(0);
    const isWheelRef     = useRef(true);
    const lastWheelRef   = useRef(0);
    const rafRef         = useRef<number>(0);

    // ── MOUNT: forcibly hide ArchNavbar ──────────────────────────────────
    useEffect(() => {
        setMounted(true);
        const navEls = document.querySelectorAll('nav');
        navEls.forEach(el =>
            (el as HTMLElement).style.setProperty('display', 'none', 'important'));
        return () => navEls.forEach(el =>
            (el as HTMLElement).style.removeProperty('display'));
    }, []);

    // ── SPRING LOOP ──────────────────────────────────────────────────────
    useEffect(() => {
        const loop = () => {
            angleRef.current += (targetRef.current - angleRef.current) * 0.1;
            setAngleOffset(angleRef.current);
            const snap = Math.round(-angleRef.current / STEP);
            setActiveIndex(((snap % N) + N) % N);
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    // ── MOUSE ZONE ───────────────────────────────────────────────────────
    useEffect(() => {
        const fn = (e: MouseEvent) => { isWheelRef.current = e.clientX <= CX + R2; };
        window.addEventListener('mousemove', fn);
        return () => window.removeEventListener('mousemove', fn);
    }, []);

    // ── WHEEL — one snap per gesture ─────────────────────────────────────
    useEffect(() => {
        const fn = (e: WheelEvent) => {
            e.preventDefault();
            if (!isWheelRef.current) return;
            const now = Date.now();
            if (now - lastWheelRef.current < 450) return;
            lastWheelRef.current = now;
            const dir = e.deltaY > 0 ? 1 : -1;
            setScrollDir(dir as 1 | -1);
            const cur = Math.round(-targetRef.current / STEP);
            targetRef.current = -(cur + dir) * STEP;
        };
        window.addEventListener('wheel', fn, { passive: false });
        return () => window.removeEventListener('wheel', fn);
    }, []);

    const goTo = (i: number) => {
        const dir = i > activeIndex ? 1 : -1;
        setScrollDir(dir as 1 | -1);
        targetRef.current = -i * STEP;
    };

    if (!mounted) return <div className="w-full h-screen" style={{ backgroundColor: '#f5f4f0' }} />;

    const svc      = SERVICES[activeIndex];
    const prevSvc  = SERVICES[(activeIndex - 1 + N) % N];
    const nextSvc  = SERVICES[(activeIndex + 1) % N];

    // Logo: always over dark Ring 2 → fixed white
    const logoColor = '#ffffff';

    return (
        <div
            className="w-full h-screen overflow-hidden relative"
            style={{ cursor: 'none', backgroundColor: '#f5f4f0' }}
        >

            {/* ══════════════════════════════════════════════════════════════
                LAYER 1: IMAGE BANDS — light opacity, no dark overlay
                Top = previous service, Bottom = next service
                The cream gradient overlay (Layer 1b) handles all fading —
                no per-band gradients needed, so zero hard edges possible.
            ══════════════════════════════════════════════════════════════ */}

            {/* TOP BAND — previous service image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`top-${activeIndex}`}
                    className="absolute left-0 right-0 overflow-hidden"
                    style={{ top: 0, height: CY - BAND, zIndex: 1 }}
                    initial={{ opacity: 0, y: scrollDir * -50, x: arcX(-BAND) }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: scrollDir * 40 }}
                    transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <img
                        src={prevSvc.heroImage} alt={prevSvc.shortName}
                        className="w-full h-full object-cover"
                        style={{ opacity: 0.40 }}
                    />
                    <span style={{
                        position: 'absolute', bottom: 28, right: 56,
                        fontSize: 9.5, letterSpacing: '0.22em', color: 'rgba(50,50,50,0.45)',
                        textTransform: 'uppercase', fontFamily: 'var(--font-inter)', fontWeight: 300,
                    }}>
                        {prevSvc.shortName}
                    </span>
                </motion.div>
            </AnimatePresence>

            {/* BOTTOM BAND — next service image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`bot-${activeIndex}`}
                    className="absolute left-0 right-0 overflow-hidden"
                    style={{ top: CY + BAND, bottom: 0, zIndex: 1 }}
                    initial={{ opacity: 0, y: scrollDir * 50, x: arcX(BAND) }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: scrollDir * -40 }}
                    transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <img
                        src={nextSvc.heroImage} alt={nextSvc.shortName}
                        className="w-full h-full object-cover"
                        style={{ opacity: 0.40 }}
                    />
                    <span style={{
                        position: 'absolute', top: 28, right: 56,
                        fontSize: 9.5, letterSpacing: '0.22em', color: 'rgba(50,50,50,0.45)',
                        textTransform: 'uppercase', fontFamily: 'var(--font-inter)', fontWeight: 300,
                    }}>
                        {nextSvc.shortName}
                    </span>
                </motion.div>
            </AnimatePresence>

            {/* ── LAYER 1b: SINGLE CREAM GRADIENT OVERLAY ─────────────────────
                Spans the full viewport. Transparent at top & bottom (images
                show through), solid cream in the centre. One continuous CSS
                gradient = physically impossible to have a hard seam.
            ─────────────────────────────────────────────────────────────── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    zIndex: 2,
                    /* px-based stops — exact regardless of viewport height.
                       Top band ends at ${CY - BAND}px = 260px.
                       Bottom band starts at ${CY + BAND}px = 640px.
                       Cream is solid well before/after each hard div edge.
                       Long 260px tail at bottom so fade is barely visible
                       within any normal viewport height. */
                    /* Cream hits 1.0 EXACTLY at the div hard edges (CY±BAND).
                       The 180px fade lives entirely inside the image band zone —
                       so the div boundary is 100% buried and invisible.
                       Below 260px / above 640px: pure background, no image div. */
                    background: `linear-gradient(to bottom,
                        rgba(245,244,240,0)   0px,
                        rgba(245,244,240,0)   ${CY - BAND - 180}px,
                        rgba(245,244,240,1.0) ${CY - BAND}px,
                        rgba(245,244,240,1.0) ${CY + BAND}px,
                        rgba(245,244,240,0)   ${CY + BAND + 180}px
                    )`,
                }}
            />


            {/* ══════════════════════════════════════════════════════════════
                LAYER 2: ROTATING SPOKES — synced with wheel rotation
            ══════════════════════════════════════════════════════════════ */}
            {/* Spokes clipped to Ring 2 — never bleed into cream content area */}
            <svg
                className="absolute inset-0 pointer-events-none"
                width="1440" height="900"
                style={{
                    zIndex: 3,
                    transform: `rotate(${angleOffset}deg)`,
                    transformOrigin: `${CX}px ${CY}px`,
                }}
            >
                <defs>
                    <clipPath id="ring2clip">
                        <circle cx={CX} cy={CY} r={R2} />
                    </clipPath>
                </defs>
                <g clipPath="url(#ring2clip)">
                    {[14, 42, 70].map(deg =>
                        [-1, 1].map(sign => {
                            const rad = deg * sign * Math.PI / 180;
                            const x1 = CX + R1 * Math.cos(rad);
                            const y1 = CY + R1 * Math.sin(rad);
                            const x2 = CX + R2 * Math.cos(rad);
                            const y2 = CY + R2 * Math.sin(rad);
                            return (
                                <line key={`${deg}${sign}`}
                                    x1={x1} y1={y1} x2={x2} y2={y2}
                                    stroke="rgba(100,96,88,0.25)" strokeWidth="0.9"
                                />
                            );
                        })
                    )}
                </g>
            </svg>

            {/* ══════════════════════════════════════════════════════════════
                LAYER 3: RING 2 — dark selector wheel (clips left of content)
                This naturally creates the curved arc boundary for all content
            ══════════════════════════════════════════════════════════════ */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: R2 * 2, height: R2 * 2,
                    left: CX - R2, top: CY - R2,
                    backgroundColor: '#111111',
                    border: '1px solid #252525',
                    zIndex: 4,
                }}
            />

            {/* ══════════════════════════════════════════════════════════════
                LAYER 4: SERVICE LABELS — rotate with wheel
            ══════════════════════════════════════════════════════════════ */}
            <div className="absolute pointer-events-none" style={{ left: CX, top: CY, zIndex: 5 }}>
                <div style={{ transform: `rotate(${angleOffset}deg)` }}>
                    {SERVICES.map((s, i) => {
                        const deg = (i / N) * 360;
                        const rad = deg * Math.PI / 180;
                        const isActive = i === activeIndex;
                        return (
                            <React.Fragment key={s.id}>
                                {/* Tick */}
                                <div className="absolute" style={{
                                    left: R2 * Math.cos(rad) - 8,
                                    top: R2 * Math.sin(rad) - (isActive ? 1 : 0.5),
                                    width: 16, height: isActive ? 1.5 : 0.75,
                                    backgroundColor: isActive ? '#888' : '#3a3a3a',
                                    transform: `rotate(${deg}deg)`,
                                    transformOrigin: 'center',
                                }} />
                                {/* Label */}
                                <div
                                    className="absolute"
                                    style={{
                                        left: R_LBL * Math.cos(rad),
                                        top: R_LBL * Math.sin(rad),
                                        transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                                        width: 194, textAlign: 'center',
                                        fontSize: isActive ? 11.5 : 9.5,
                                        letterSpacing: isActive ? '0.24em' : '0.18em',
                                        fontWeight: isActive ? 400 : 300,
                                        color: isActive ? '#ffffff' : '#808080',
                                        fontFamily: 'var(--font-inter)',
                                        textTransform: 'uppercase',
                                        whiteSpace: 'nowrap',
                                        transition: 'color 0.4s',
                                        pointerEvents: 'auto', cursor: 'none',
                                    }}
                                    onClick={() => goTo(i)}
                                >
                                    {s.shortName}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                LAYER 5: RING 1 — hub
            ══════════════════════════════════════════════════════════════ */}
            <div className="absolute rounded-full pointer-events-none" style={{
                width: R1 * 2, height: R1 * 2,
                left: CX - R1, top: CY - R1,
                backgroundColor: '#080808',
                border: '1px solid #303030',
                zIndex: 6,
            }} />
            <div className="absolute pointer-events-none" style={{
                left: CX - 42, top: CY - 7,
                width: 84, textAlign: 'center',
                fontSize: 10, letterSpacing: '0.38em',
                color: '#505050', fontFamily: 'var(--font-inter)',
                fontWeight: 300, textTransform: 'uppercase', zIndex: 7,
            }}>SERVICES</div>

            {/* ══════════════════════════════════════════════════════════════
                LAYER 6: POINTER (stops before label text zone)
            ══════════════════════════════════════════════════════════════ */}
            <div className="absolute pointer-events-none" style={{
                left: CX + R1 + 8, top: CY - 0.75,
                width: POINTER_END - R1 - 8, height: 1.5,
                backgroundColor: '#424242', zIndex: 7,
            }} />
            <div className="absolute rounded-full pointer-events-none" style={{
                width: 7, height: 7,
                left: CX + POINTER_END - 3.5, top: CY - 3.5,
                backgroundColor: '#585858', zIndex: 7,
            }} />

            {/* ══════════════════════════════════════════════════════════════
                LAYER 7: ACTIVE CONTENT — centred at pointer level
                Animates with arc-curve motion matching the wheel geometry
            ══════════════════════════════════════════════════════════════ */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={svc.id}
                    style={{
                        position: 'absolute',
                        left: CX + R2 + 56,
                        right: 0,
                        top: CY - BAND,
                        height: BAND * 2,
                        paddingRight: 56,
                        display: 'flex', flexDirection: 'row', alignItems: 'center',
                        gap: 40,
                        zIndex: 10,
                    }}
                    initial={{ opacity: 0, y: scrollDir * 52, x: arcX(scrollDir * BAND) }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: scrollDir * -52, x: arcX(scrollDir * -BAND) }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {/* ── LEFT: Title + tagline + description + CTA ── */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                        {/* Title */}
                        <h2 style={{
                            fontSize: 56, fontWeight: 300, color: '#0c0c0c',
                            lineHeight: 1.05, letterSpacing: '-0.02em',
                            whiteSpace: 'pre-line', marginBottom: 18,
                            fontFamily: 'var(--font-inter)',
                        }}>{svc.title}</h2>

                        {/* Rule */}
                        <div style={{ width: 36, height: 1, backgroundColor: '#bbb', marginBottom: 18 }} />

                        {/* Tagline */}
                        <p style={{
                            fontSize: 14, fontWeight: 300, color: '#555',
                            lineHeight: 1.75, maxWidth: 400, marginBottom: 12,
                            fontFamily: 'var(--font-inter)', fontStyle: 'italic',
                        }}>{svc.tagline}</p>

                        {/* Description */}
                        <p style={{
                            fontSize: 13, fontWeight: 300, color: '#777',
                            lineHeight: 1.85, maxWidth: 400, marginBottom: 28,
                            fontFamily: 'var(--font-inter)',
                        }}>{svc.description}</p>

                        {/* CTA */}
                        <Link href="/contact" style={{
                            display: 'inline-flex', alignItems: 'center', gap: 10,
                            fontSize: 10, letterSpacing: '0.28em',
                            textTransform: 'uppercase', fontWeight: 300,
                            color: '#222', textDecoration: 'none',
                            borderBottom: '1px solid rgba(0,0,0,0.22)', paddingBottom: 3,
                            fontFamily: 'var(--font-inter)', width: 'fit-content',
                        }}>Start a project →</Link>
                    </div>

                    {/* ── RIGHT: Service name, right-aligned, vertically centred ── */}
                    <div style={{
                        flexShrink: 0, width: 180,
                        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                        alignSelf: 'stretch',
                    }}>
                        <p style={{
                            fontSize: 9, letterSpacing: '0.30em',
                            textTransform: 'uppercase', fontWeight: 300,
                            color: 'rgba(0,0,0,0.30)', textAlign: 'right',
                            fontFamily: 'var(--font-inter)',
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                            lineHeight: 1,
                        }}>{svc.shortName}</p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* ══════════════════════════════════════════════════════════════
                LOGO + HAMBURGER — adaptive colour, geometry-based
            ══════════════════════════════════════════════════════════════ */}
            <div className="fixed pointer-events-none" style={{
                top: 28, left: 24, zIndex: 50,
                fontSize: 15, letterSpacing: '0.4em',
                fontWeight: 300, textTransform: 'uppercase',
                fontFamily: 'var(--font-inter)',
                color: logoColor, transition: 'color 0.4s',
            }}>CLOUDS</div>

            {/* Hamburger — mix-blend-mode:difference with white bars
                 → appears white on dark images, dark on light cream area,
                   reacting to actual rendered pixels in real time            */}
            <div className="fixed" style={{
                top: 25, right: 24, zIndex: 50,
                display: 'flex', flexDirection: 'column', gap: 8, cursor: 'none',
                mixBlendMode: 'difference',
            }}>
                {[0, 1, 2].map(i => (
                    <div key={i} style={{
                        width: 26, height: 1.5,
                        backgroundColor: '#ffffff',
                    }} />
                ))}
            </div>

        </div>
    );
}

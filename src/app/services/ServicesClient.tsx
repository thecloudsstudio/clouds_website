"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ── GEOMETRY ──────────────────────────────────────────────────────────────────
const CX   = 72;    // ring centre x
const CY   = 450;   // ring centre y
const R1   = 88;    // hub
const R2   = 456;   // selector wheel
const N    = 6;
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
        shortName: "Architecture & Design",
        title: "Architecture\n& Design",
        tagline: "Spaces that speak of their time and yearn for timelessness.",
        description: "From intimate private residences to large-scale commercial complexes — every project shaped by material honesty, contextual rigour, and spatial clarity.",
        areas: ["Residential", "Commercial", "Hospitality", "Heritage & Conservation"],
        heroImage: "/bangalore_villa_facade_color_1767792911832.png",
    },
    {
        id: 2,
        shortName: "Interior Design",
        title: "Interior\nDesign",
        tagline: "Every material, every surface, every shadow — considered.",
        description: "We extend the architectural vision inward. Material palettes, spatial sequences, lighting, and furniture that create environments both deliberate and deeply lived-in.",
        areas: ["Residential Interiors", "Commercial Interiors", "Hospitality Interiors", "Furniture Curation"],
        heroImage: "/chettinad_bedroom_colorized_1767964135344.png",
    },
    {
        id: 3,
        shortName: "Construction Management",
        title: "Construction\nManagement",
        tagline: "A single point of accountability — concept to completion.",
        description: "We manage the complete build: procurement, contractor coordination, site supervision, and handover. Design intent preserved through every phase of construction.",
        areas: ["Project Management", "Contractor Coordination", "Site Supervision", "Handover & Closeout"],
        heroImage: "/chennai_urban_residence_exterior_1769688810297.png",
    },
    {
        id: 4,
        shortName: "Planning & Approvals",
        title: "Planning &\nApprovals",
        tagline: "Clarity through complexity — every submission, every stage.",
        description: "Planning applications, feasibility studies, and regulatory submissions prepared with precision. Deep familiarity with planning frameworks across India.",
        areas: ["Planning Applications", "Feasibility Studies", "Regulatory Submissions", "Zoning Analysis"],
        heroImage: "/chennai_apartments_exterior_v2_1769753645940.png",
    },
    {
        id: 5,
        shortName: "Project Consultation",
        title: "Project\nConsultation",
        tagline: "Expert guidance at any stage, however complex the question.",
        description: "Site appraisals, brief development, design reviews, and value engineering — bringing clarity to decisions at every scale, for every kind of client.",
        areas: ["Site Appraisals", "Brief Development", "Design Review", "Value Engineering"],
        heroImage: "/kerala_resort_aerial_colorized_1767793602663.png",
    },
    {
        id: 6,
        shortName: "Site Analysis",
        title: "Site\nAnalysis",
        tagline: "Architecture that belongs to its ground.",
        description: "Topography, solar orientation, wind, drainage, views, and context — comprehensively studied before a single line is drawn. The foundation every great building needs.",
        areas: ["Topographic Survey", "Solar & Wind Analysis", "Contextual Study", "Environmental Assessment"],
        heroImage: "/kerala_resort_yoga_colorized_v2_1767794447655.png",
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

    if (!mounted) return <div className="w-full h-screen bg-[#0e0e0e]" />;

    const svc      = SERVICES[activeIndex];
    const prevSvc  = SERVICES[(activeIndex - 1 + N) % N];
    const nextSvc  = SERVICES[(activeIndex + 1) % N];

    // Logo: sits at (57,36), inside Ring 2 → white
    // Hamburger: sits at (1403,36), outside Ring 3 → white too
    // (dist = sqrt((1403-72)²+(36-450)²) ≈ 1394 > R3=1380)
    const logoColor   = adaptColor(57, 36);   // → '#ffffff'
    const burgerColor = adaptColor(1403, 36);  // → '#ffffff'

    return (
        <div
            className="w-full h-screen overflow-hidden bg-[#0e0e0e] relative"
            style={{ cursor: 'none' }}
        >

            {/* ══════════════════════════════════════════════════════════════
                LAYER 1: FULL-SCREEN IMAGE BACKGROUND (fills corners too)
                Three crossfading images stacked by zone:
                top=prev service, center=active, bottom=next service
            ══════════════════════════════════════════════════════════════ */}

            {/* TOP BAND — previous service image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`top-${activeIndex}`}
                    className="absolute left-0 right-0 overflow-hidden"
                    style={{ top: 0, height: CY - BAND + 30, zIndex: 1 }}
                    initial={{ opacity: 0, y: scrollDir * -50, x: arcX(-BAND) }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: scrollDir * 40 }}
                    transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <img
                        src={prevSvc.heroImage} alt={prevSvc.shortName}
                        className="w-full h-full object-cover"
                        style={{ opacity: 0.55 }}
                    />
                    {/* Fade out toward active zone */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to bottom, rgba(14,14,14,0.55) 0%, rgba(14,14,14,0.10) 60%, rgba(242,240,236,0.92) 100%)',
                    }} />
                    <span style={{
                        position: 'absolute', bottom: 22, right: 56,
                        fontSize: 9.5, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.55)',
                        textTransform: 'uppercase', fontFamily: 'var(--font-inter)', fontWeight: 300,
                    }}>
                        {prevSvc.shortName}
                    </span>
                </motion.div>
            </AnimatePresence>

            {/* CENTER BAND — active service image (full bleed) */}
            <AnimatePresence mode="sync">
                <motion.div
                    key={`center-${svc.id}`}
                    className="absolute left-0 right-0 overflow-hidden"
                    style={{ top: CY - BAND, height: BAND * 2, zIndex: 1 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9 }}
                >
                    <img
                        src={svc.heroImage} alt={svc.shortName}
                        className="w-full h-full object-cover"
                    />
                    {/* Cream overlay so text is readable */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to right, rgba(14,14,14,0.1) 0%, rgba(242,240,236,0.65) 30%, rgba(242,240,236,0.55) 100%)',
                    }} />
                </motion.div>
            </AnimatePresence>

            {/* BOTTOM BAND — next service image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`bot-${activeIndex}`}
                    className="absolute left-0 right-0 overflow-hidden"
                    style={{ top: CY + BAND - 30, bottom: 0, zIndex: 1 }}
                    initial={{ opacity: 0, y: scrollDir * 50, x: arcX(BAND) }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: scrollDir * -40 }}
                    transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <img
                        src={nextSvc.heroImage} alt={nextSvc.shortName}
                        className="w-full h-full object-cover"
                        style={{ opacity: 0.55 }}
                    />
                    {/* Fade out toward active zone */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(14,14,14,0.55) 0%, rgba(14,14,14,0.10) 60%, rgba(242,240,236,0.92) 100%)',
                    }} />
                    <span style={{
                        position: 'absolute', top: 22, right: 56,
                        fontSize: 9.5, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.55)',
                        textTransform: 'uppercase', fontFamily: 'var(--font-inter)', fontWeight: 300,
                    }}>
                        {nextSvc.shortName}
                    </span>
                </motion.div>
            </AnimatePresence>

            {/* Thin band separators — subtle arc dividers */}
            <div style={{
                position: 'absolute', left: CX + R2, right: 0,
                top: CY - BAND, height: 1,
                background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.12) 20%, rgba(0,0,0,0.12) 80%, transparent)',
                zIndex: 9,
            }} />
            <div style={{
                position: 'absolute', left: CX + R2, right: 0,
                top: CY + BAND, height: 1,
                background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.12) 20%, rgba(0,0,0,0.12) 80%, transparent)',
                zIndex: 9,
            }} />

            {/* ══════════════════════════════════════════════════════════════
                LAYER 2: ROTATING SPOKES — synced with wheel rotation
            ══════════════════════════════════════════════════════════════ */}
            <svg
                className="absolute inset-0 pointer-events-none"
                width="1440" height="900"
                style={{
                    zIndex: 3,
                    transform: `rotate(${angleOffset}deg)`,
                    transformOrigin: `${CX}px ${CY}px`,
                }}
            >
                {[14, 42, 70].map(deg =>
                    [-1, 1].map(sign => {
                        const rad = deg * sign * Math.PI / 180;
                        const x1 = CX + (R2 + 14) * Math.cos(rad);
                        const y1 = CY + (R2 + 14) * Math.sin(rad);
                        const x2 = CX + (R2 + 800) * Math.cos(rad);
                        const y2 = CY + (R2 + 800) * Math.sin(rad);
                        return (
                            <line key={`${deg}${sign}`}
                                x1={x1} y1={y1} x2={x2} y2={y2}
                                stroke="rgba(100,96,88,0.25)" strokeWidth="0.9"
                            />
                        );
                    })
                )}
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
                        left: CX + R2 + 64,
                        right: 0,
                        top: CY - BAND + 16,
                        height: BAND * 2 - 32,
                        paddingRight: 56,
                        display: 'flex', flexDirection: 'column', justifyContent: 'center',
                        zIndex: 10,
                    }}
                    initial={{ opacity: 0, y: scrollDir * 52, x: arcX(scrollDir * BAND) }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: scrollDir * -52, x: arcX(scrollDir * -BAND) }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {/* Counter */}
                    <p style={{
                        fontSize: 11, letterSpacing: '0.46em', color: '#888',
                        fontWeight: 300, textTransform: 'uppercase', marginBottom: 14,
                        fontFamily: 'var(--font-inter)',
                    }}>0{svc.id} / 0{N}</p>

                    {/* Title */}
                    <h2 style={{
                        fontSize: 60, fontWeight: 300, color: '#0c0c0c',
                        lineHeight: 1.05, letterSpacing: '-0.02em',
                        whiteSpace: 'pre-line', marginBottom: 16,
                        fontFamily: 'var(--font-inter)',
                    }}>{svc.title}</h2>

                    {/* Rule */}
                    <div style={{ width: 40, height: 1, backgroundColor: '#aaa', marginBottom: 16 }} />

                    {/* Tagline */}
                    <p style={{
                        fontSize: 14.5, fontWeight: 300, color: '#444',
                        lineHeight: 1.7, maxWidth: 460, marginBottom: 10,
                        fontFamily: 'var(--font-inter)', fontStyle: 'italic',
                    }}>{svc.tagline}</p>

                    {/* Description */}
                    <p style={{
                        fontSize: 13.5, fontWeight: 300, color: '#666',
                        lineHeight: 1.8, maxWidth: 480, marginBottom: 20,
                        fontFamily: 'var(--font-inter)',
                    }}>{svc.description}</p>

                    {/* Areas */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
                        {svc.areas.map(a => (
                            <span key={a} style={{
                                fontSize: 9.5, letterSpacing: '0.18em',
                                textTransform: 'uppercase', fontWeight: 300,
                                color: '#777', border: '1px solid rgba(0,0,0,0.18)',
                                padding: '5px 12px', borderRadius: 2,
                                fontFamily: 'var(--font-inter)',
                            }}>{a}</span>
                        ))}
                    </div>

                    {/* CTA */}
                    <Link href="/contact" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        fontSize: 10.5, letterSpacing: '0.28em',
                        textTransform: 'uppercase', fontWeight: 300,
                        color: '#222', textDecoration: 'none',
                        borderBottom: '1px solid rgba(0,0,0,0.25)', paddingBottom: 3,
                        fontFamily: 'var(--font-inter)', width: 'fit-content',
                    }}>Start a project →</Link>
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

            <div className="fixed" style={{
                top: 25, right: 24, zIndex: 50,
                display: 'flex', flexDirection: 'column', gap: 8, cursor: 'none',
            }}>
                {[0, 1, 2].map(i => (
                    <div key={i} style={{
                        width: 26, height: 1.5,
                        backgroundColor: burgerColor,
                        transition: 'background-color 0.4s',
                    }} />
                ))}
            </div>

        </div>
    );
}

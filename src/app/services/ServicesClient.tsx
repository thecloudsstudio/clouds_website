"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ── GEOMETRY ──────────────────────────────────────────────────────────────────
const CX = 72;      // ring centre x (px)
const CY = 450;     // ring centre y (px)
const R1 = 88;      // hub radius
const R2 = 456;     // selector wheel — wider to fit "Construction Management"
const R3 = 1380;    // content/image circle
const N  = 6;
const STEP = 360 / N; // 60° per service

// Label radius: 57% of R2 — text centres here
const R_LBL = R2 * 0.57; // ~260 px

// Longest label is "Construction Management" (~192px at 9.5px + 0.19em spacing).
// Text spans ±96px either side of R_LBL. Pointer must end before R_LBL - 96.
const POINTER_END = Math.floor(R_LBL - 108); // comfortable gap before text

// Adaptive colour — pure geometry, no DOM sampling, works on SSR too
function adaptColor(px: number, py: number): string {
    const d = Math.sqrt((px - CX) ** 2 + (py - CY) ** 2);
    // Inside dark ring  → white text
    if (d <= R2) return '#ffffff';
    // Inside image/cream circle → dark text
    if (d <= R3) return '#111111';
    // Outside everything (dark bg strip on far right) → white
    return '#ffffff';
}

// ── DATA ──────────────────────────────────────────────────────────────────────
const SERVICES = [
    {
        id: 1,
        shortName: "Architecture & Design",
        title: "Architecture\n& Design",
        description: "We design buildings deeply rooted in their context and built to last generations. Our work begins with a rigorous understanding of site, climate, culture, and the precise way people inhabit space.\n\nFrom intimate private residences to large-scale commercial complexes, every project is shaped by a commitment to material honesty and spatial clarity.",
        areas: ["Residential", "Commercial", "Hospitality", "Heritage & Conservation"],
        heroImage: "/bangalore_villa_facade_color_1767792911832.png",
    },
    {
        id: 2,
        shortName: "Interior Design",
        title: "Interior\nDesign",
        description: "Our interior practice extends the architectural vision inward — from first wall to last detail. We curate material palettes, spatial sequences, lighting strategies, and furniture selections that create cohesive, considered environments.\n\nWe design interiors that feel both deliberate and lived-in, spaces that grow richer over time rather than dating with trends.",
        areas: ["Residential Interiors", "Commercial Interiors", "Hospitality Interiors", "Furniture Curation"],
        heroImage: "/chettinad_bedroom_colorized_1767964135344.png",
    },
    {
        id: 3,
        shortName: "Construction Management",
        title: "Construction\nManagement",
        description: "Through our create-and-construct model, we manage the complete build process — procurement, contractor coordination, site supervision, and handover. A single point of accountability from concept to completion.\n\nThis end-to-end involvement ensures the design intent is fully preserved through every phase of construction.",
        areas: ["Project Management", "Contractor Coordination", "Site Supervision", "Handover & Closeout"],
        heroImage: "/chennai_urban_residence_exterior_1769688810297.png",
    },
    {
        id: 4,
        shortName: "Planning & Approvals",
        title: "Planning &\nApprovals",
        description: "Navigating planning regulations and statutory approvals requires both experience and precision. We prepare comprehensive planning applications, feasibility studies, and regulatory submissions.\n\nOur deep familiarity with local planning frameworks across India ensures projects move efficiently from concept to commencement.",
        areas: ["Planning Applications", "Feasibility Studies", "Regulatory Submissions", "Zoning Analysis"],
        heroImage: "/chennai_apartments_exterior_v2_1769753645940.png",
    },
    {
        id: 5,
        shortName: "Project Consultation",
        title: "Project\nConsultation",
        description: "Not every project needs a full service from day one. Our consultation offering provides focused expert guidance at any stage — from site appraisals and brief development to design reviews and value engineering.\n\nWhether you are an individual client, developer, or another design practice, we bring clarity to complex decisions.",
        areas: ["Site Appraisals", "Brief Development", "Design Review", "Value Engineering"],
        heroImage: "/kerala_resort_aerial_colorized_1767793602663.png",
    },
    {
        id: 6,
        shortName: "Site Analysis",
        title: "Site\nAnalysis",
        description: "Every great building begins with a thorough understanding of its ground. Our site analysis service examines topography, solar orientation, wind patterns, drainage, views, and contextual relationships — producing a comprehensive brief that informs every subsequent design decision.\n\nThis foundational work ensures the architecture that emerges is specific to its place.",
        areas: ["Topographic Survey", "Solar & Wind Analysis", "Contextual Study", "Environmental Assessment"],
        heroImage: "/kerala_resort_yoga_colorized_v2_1767794447655.png",
    },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function ServicesClient() {
    const [mounted, setMounted]         = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [angleOffset, setAngleOffset] = useState(0);
    const [scrollDir, setScrollDir]     = useState<1 | -1>(1);

    const angleRef        = useRef(0);
    const targetAngleRef  = useRef(0);
    const isWheelZoneRef  = useRef(true);
    const lastWheelRef    = useRef(0);     // debounce: time of last snap
    const contentRef      = useRef<HTMLDivElement>(null);
    const rafRef          = useRef<number>(0);

    // ── MOUNT: hide ArchNavbar ─────────────────────────────────────────────
    useEffect(() => {
        setMounted(true);
        // Force-hide the global ArchNavbar (fixed nav) on this page
        const navEls = document.querySelectorAll('nav');
        navEls.forEach(el => { (el as HTMLElement).style.setProperty('display', 'none', 'important'); });
        return () => {
            navEls.forEach(el => { (el as HTMLElement).style.removeProperty('display'); });
        };
    }, []);

    // ── SPRING ANIMATION LOOP ──────────────────────────────────────────────
    useEffect(() => {
        const loop = () => {
            const diff = targetAngleRef.current - angleRef.current;
            angleRef.current += diff * 0.1;
            setAngleOffset(angleRef.current);
            const snapped = Math.round(-angleRef.current / STEP);
            setActiveIndex(((snapped % N) + N) % N);
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    // ── MOUSE ZONE ─────────────────────────────────────────────────────────
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            isWheelZoneRef.current = e.clientX <= CX + R2;
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    // ── WHEEL — ONE SNAP PER GESTURE (400ms debounce) ─────────────────────
    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (isWheelZoneRef.current) {
                const now = Date.now();
                if (now - lastWheelRef.current < 400) return; // block rapid fire
                lastWheelRef.current = now;
                const dir = e.deltaY > 0 ? 1 : -1;
                setScrollDir(dir as 1 | -1);
                // Snap from current target position — not visual position
                const currentSnap = Math.round(-targetAngleRef.current / STEP);
                targetAngleRef.current = -(currentSnap + dir) * STEP;
            } else {
                contentRef.current?.scrollBy({ top: e.deltaY });
            }
        };
        window.addEventListener('wheel', onWheel, { passive: false });
        return () => window.removeEventListener('wheel', onWheel);
    }, []);

    // Click a label → jump to that service
    const goTo = (i: number) => {
        setScrollDir((i > activeIndex ? 1 : -1) as 1 | -1);
        targetAngleRef.current = -i * STEP;
    };

    const service = SERVICES[activeIndex];

    // Adaptive colour — computed from geometry, stable across SSR + client
    // Logo centre ≈ (57, 36), Hamburger centre ≈ (1416, 36)
    const logoColor   = adaptColor(57, 36);
    const burgerColor = adaptColor(1416, 36);

    // ── SSR SHELL ─────────────────────────────────────────────────────────
    if (!mounted) return <div className="w-full h-screen bg-[#0e0e0e]" />;

    return (
        <div
            className="w-full h-screen overflow-hidden bg-[#0e0e0e] relative"
            style={{ cursor: 'none' }}
        >
            {/* ═══════════════════════════════════════════════════════════════
                RING 3 — large image-filled circle
                Image IS the background; cream overlay makes text readable
            ═══════════════════════════════════════════════════════════════ */}
            <div
                className="absolute rounded-full overflow-hidden pointer-events-none"
                style={{
                    width: R3 * 2, height: R3 * 2,
                    left: CX - R3, top: CY - R3,
                    zIndex: 1,
                }}
            >
                {/* Crossfading hero image */}
                <AnimatePresence mode="sync">
                    <motion.img
                        key={service.id}
                        src={service.heroImage}
                        alt={service.shortName}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9 }}
                        style={{
                            position: 'absolute', inset: 0,
                            width: '100%', height: '100%',
                            objectFit: 'cover',
                            objectPosition: '60% center',
                        }}
                    />
                </AnimatePresence>

                {/* Cream overlay — 80% opacity, image subtly shows through */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundColor: 'rgba(245,244,240,0.80)',
                }} />

                {/* Left-side radial fade into dark (blends Ring 2 boundary) */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(ellipse ${R2 + 80}px ${R3 * 0.5}px at ${R3}px ${R3}px, rgba(13,13,13,0.96) 0%, transparent 100%)`,
                }} />
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                ROTATING SVG SPOKES — rotate with wheel, outside Ring 2
            ═══════════════════════════════════════════════════════════════ */}
            <svg
                className="absolute inset-0 pointer-events-none"
                width="1440" height="900"
                style={{
                    zIndex: 2,
                    transform: `rotate(${angleOffset}deg)`,
                    transformOrigin: `${CX}px ${CY}px`,
                }}
            >
                {[15, 43, 71].map(deg =>
                    [-1, 1].map(sign => {
                        const rad = (deg * sign) * Math.PI / 180;
                        const x1 = CX + (R2 + 16) * Math.cos(rad);
                        const y1 = CY + (R2 + 16) * Math.sin(rad);
                        const x2 = CX + (R2 + 740) * Math.cos(rad);
                        const y2 = CY + (R2 + 740) * Math.sin(rad);
                        return (
                            <line
                                key={`${deg}${sign}`}
                                x1={x1} y1={y1} x2={x2} y2={y2}
                                stroke="#d4d2cc" strokeWidth="0.7"
                            />
                        );
                    })
                )}
            </svg>

            {/* ═══════════════════════════════════════════════════════════════
                RING 2 — dark service selector wheel
                z:4 so it sits above spokes (spokes are outside Ring 2 anyway)
            ═══════════════════════════════════════════════════════════════ */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: R2 * 2, height: R2 * 2,
                    left: CX - R2, top: CY - R2,
                    backgroundColor: '#121212',
                    border: '1px solid #2a2a2a',
                    zIndex: 4,
                }}
            />

            {/* ═══════════════════════════════════════════════════════════════
                SERVICE LABELS — rotate with wheel, z:5 (above Ring 2)
            ═══════════════════════════════════════════════════════════════ */}
            <div
                className="absolute pointer-events-none"
                style={{ left: CX, top: CY, zIndex: 5 }}
            >
                <div style={{ transform: `rotate(${angleOffset}deg)` }}>
                    {SERVICES.map((svc, i) => {
                        const deg = (i / N) * 360;
                        const rad = deg * Math.PI / 180;
                        const isActive = i === activeIndex;
                        const lx = R_LBL * Math.cos(rad);
                        const ly = R_LBL * Math.sin(rad);

                        return (
                            <React.Fragment key={svc.id}>
                                {/* Tick mark at ring edge */}
                                <div
                                    className="absolute"
                                    style={{
                                        left: R2 * Math.cos(rad) - 8,
                                        top:  R2 * Math.sin(rad) - (isActive ? 1 : 0.5),
                                        width: 16,
                                        height: isActive ? 1.5 : 0.75,
                                        backgroundColor: isActive ? '#888' : '#3c3c3c',
                                        transform: `rotate(${deg}deg)`,
                                        transformOrigin: 'center',
                                    }}
                                />
                                {/* Service name */}
                                <div
                                    className="absolute"
                                    style={{
                                        left: lx,
                                        top:  ly,
                                        transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                                        width: 194,
                                        textAlign: 'center',
                                        fontSize: isActive ? 11.5 : 9.5,
                                        letterSpacing: isActive ? '0.24em' : '0.18em',
                                        fontWeight: isActive ? 400 : 300,
                                        color: isActive ? '#ffffff' : '#787878',
                                        fontFamily: 'var(--font-inter)',
                                        textTransform: 'uppercase',
                                        whiteSpace: 'nowrap',
                                        transition: 'color 0.4s, font-size 0.3s',
                                        pointerEvents: 'auto',
                                        cursor: 'none',
                                    }}
                                    onClick={() => goTo(i)}
                                >
                                    {svc.shortName}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                RING 1 — static hub, z:6 (above everything in the wheel)
            ═══════════════════════════════════════════════════════════════ */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: R1 * 2, height: R1 * 2,
                    left: CX - R1, top: CY - R1,
                    backgroundColor: '#090909',
                    border: '1px solid #333',
                    zIndex: 6,
                }}
            />
            {/* "SERVICES" label inside hub */}
            <div
                className="absolute pointer-events-none"
                style={{
                    left: CX - 42, top: CY - 7,
                    width: 84, textAlign: 'center',
                    fontSize: 10, letterSpacing: '0.38em',
                    color: '#545454', fontFamily: 'var(--font-inter)',
                    fontWeight: 300, textTransform: 'uppercase',
                    zIndex: 7,
                }}
            >
                SERVICES
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                POINTER — ends before the label text zone
            ═══════════════════════════════════════════════════════════════ */}
            <div
                className="absolute pointer-events-none"
                style={{
                    left: CX + R1 + 8,
                    top: CY - 0.75,
                    width: POINTER_END - R1 - 8,
                    height: 1.5,
                    backgroundColor: '#454545',
                    zIndex: 7,
                }}
            />
            {/* Pointer tip */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 7, height: 7,
                    left: CX + POINTER_END - 3.5,
                    top: CY - 3.5,
                    backgroundColor: '#606060',
                    zIndex: 7,
                }}
            />

            {/* ═══════════════════════════════════════════════════════════════
                CONTENT PANEL — right of Ring 2, z:8
                Scrollable independently, image fills most of panel
            ═══════════════════════════════════════════════════════════════ */}
            <div
                ref={contentRef}
                className="absolute overflow-y-auto"
                style={{
                    left: CX + R2 + 60,
                    top: 0, right: 0, bottom: 0,
                    paddingTop: 66,
                    paddingRight: 60,
                    paddingBottom: 48,
                    scrollbarWidth: 'none',
                    zIndex: 8,
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: scrollDir * 52 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: scrollDir * -52 }}
                        transition={{ duration: 0.46, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        {/* Counter */}
                        <p style={{
                            fontSize: 12, letterSpacing: '0.44em',
                            color: '#aaa', fontWeight: 300,
                            textTransform: 'uppercase', marginBottom: 18,
                            fontFamily: 'var(--font-inter)',
                        }}>
                            0{service.id} / 0{N}
                        </p>

                        {/* Title */}
                        <h2 style={{
                            fontSize: 62, fontWeight: 300,
                            color: '#0d0d0d', lineHeight: 1.06,
                            letterSpacing: '-0.02em',
                            whiteSpace: 'pre-line', marginBottom: 22,
                            fontFamily: 'var(--font-inter)',
                        }}>
                            {service.title}
                        </h2>

                        {/* Rule */}
                        <div style={{ width: 44, height: 1, backgroundColor: '#bbb', marginBottom: 22 }} />

                        {/* Description */}
                        <p style={{
                            fontSize: 15, fontWeight: 300,
                            color: '#555', lineHeight: 1.85,
                            whiteSpace: 'pre-line', maxWidth: 440,
                            marginBottom: 26,
                            fontFamily: 'var(--font-inter)',
                        }}>
                            {service.description}
                        </p>

                        {/* Areas */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                            {service.areas.map(a => (
                                <span
                                    key={a}
                                    style={{
                                        fontSize: 10, letterSpacing: '0.18em',
                                        textTransform: 'uppercase', fontWeight: 300,
                                        color: '#888', border: '1px solid #ddd',
                                        padding: '5px 13px', borderRadius: 2,
                                        fontFamily: 'var(--font-inter)',
                                    }}
                                >
                                    {a}
                                </span>
                            ))}
                        </div>

                        {/* ── LARGE HERO IMAGE ── fills the content width */}
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: 700,
                            aspectRatio: '16/9',
                            marginBottom: 28,
                            borderRadius: 2,
                            overflow: 'hidden',
                        }}>
                            <img
                                src={service.heroImage}
                                alt={service.shortName}
                                style={{
                                    width: '100%', height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)',
                            }} />
                            <span style={{
                                position: 'absolute', bottom: 14, left: 16,
                                fontSize: 9, letterSpacing: '0.22em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.8)',
                                fontWeight: 300, fontFamily: 'var(--font-inter)',
                            }}>
                                {service.shortName}
                            </span>
                        </div>

                        {/* CTA */}
                        <Link
                            href="/contact"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 10,
                                fontSize: 11, letterSpacing: '0.28em',
                                textTransform: 'uppercase', fontWeight: 300,
                                color: '#333', textDecoration: 'none',
                                borderBottom: '1px solid #bbb', paddingBottom: 3,
                                fontFamily: 'var(--font-inter)',
                            }}
                        >
                            Start a project →
                        </Link>

                        {/* Scroll hint */}
                        <p style={{
                            marginTop: 40,
                            fontSize: 10, letterSpacing: '0.28em',
                            textTransform: 'uppercase', color: '#c0c0c0',
                            fontWeight: 300, fontFamily: 'var(--font-inter)',
                        }}>
                            ◌&nbsp;&nbsp;rotate wheel to explore services&nbsp;&nbsp;◌
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                ADAPTIVE LOGO — geometry-based colour, no DOM sampling
                Logo sits at (24,28). Centre ≈ (57, 36).
                d from (CX,CY) = ~393px — inside Ring 2 (R2=456) → white ✓
                (When ring 2 is visible behind logo, which it always is)
            ═══════════════════════════════════════════════════════════════ */}
            <div
                className="fixed pointer-events-none"
                style={{
                    top: 28, left: 24, zIndex: 50,
                    fontSize: 15, letterSpacing: '0.4em',
                    fontWeight: 300, textTransform: 'uppercase',
                    fontFamily: 'var(--font-inter)',
                    color: logoColor,
                    transition: 'color 0.4s',
                }}
            >
                CLOUDS
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                ADAPTIVE HAMBURGER — three lines, geometry-based colour.
                Hamburger sits at right: 24px. Centre ≈ (1403, 36).
                d from (CX,CY) = ~1331px — inside Ring 3 (R3=1380) → dark ✓
                But screen right edge is past ring 3, so right corner = dark bg → white.
                1440-24-13 = 1403. dist = sqrt((1403-72)²+(36-450)²) = sqrt(1331²+414²) ≈ 1394 > R3=1380 → white ✓
            ═══════════════════════════════════════════════════════════════ */}
            <div
                className="fixed"
                style={{
                    top: 25, right: 24, zIndex: 50,
                    display: 'flex', flexDirection: 'column', gap: 8,
                    cursor: 'none',
                }}
            >
                {[0, 1, 2].map(i => (
                    <div
                        key={i}
                        style={{
                            width: 26, height: 1.5,
                            backgroundColor: burgerColor,
                            transition: 'background-color 0.4s',
                        }}
                    />
                ))}
            </div>

        </div>
    );
}

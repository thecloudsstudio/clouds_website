"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ── GEOMETRY ─────────────────────────────────────────────────────────────────
const CX = 72;   // ring centre x (px from left)
const CY = 450;  // ring centre y (px from top)
const R1 = 82;   // hub radius
const R2 = 360;  // dark selector wheel radius
const R3 = 1380; // cream content circle radius

// Returns white or black text depending on which ring zone a point sits in
function adaptiveColor(px: number, py: number): string {
    const dist = Math.sqrt((px - CX) ** 2 + (py - CY) ** 2);
    if (dist < R2) return '#ffffff';   // inside dark ring  → white
    if (dist < R3) return '#111111';   // inside cream ring → dark
    return '#ffffff';                   // outside cream     → white (dark bg)
}

// ── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
    {
        id: 1,
        title: "Architecture\n& Design",
        shortName: "Architecture & Design",
        description: "We design buildings deeply rooted in their context and built to last generations. Our work begins with a rigorous understanding of site, climate, culture, and the precise way people inhabit space.\n\nFrom intimate private residences to large-scale commercial complexes, every project is shaped by a commitment to material honesty and spatial clarity.",
        areas: ["Residential", "Commercial", "Hospitality", "Heritage & Conservation"],
        images: [
            { src: "/bangalore_villa_facade_color_1767792911832.png", label: "Exterior / Facade" },
            { src: "/bangalore_villa_bedroom_color_1767792889582.png", label: "Interior" },
            { src: "/bangalore_villa_kitchen_color_1767792872338.png", label: "Detail" },
        ],
    },
    {
        id: 2,
        title: "Interior\nDesign",
        shortName: "Interior Design",
        description: "Our interior practice extends the architectural vision inward — from first wall to last detail. We curate material palettes, spatial sequences, lighting strategies, and furniture selections that create cohesive environments.\n\nWe design interiors that feel both deliberate and lived-in, spaces that grow richer over time.",
        areas: ["Residential Interiors", "Commercial Interiors", "Hospitality Interiors", "Furniture Curation"],
        images: [
            { src: "/chettinad_bedroom_colorized_1767964135344.png", label: "Bedroom" },
            { src: "/chettinad_dining_colorized_1767964163160.png", label: "Dining" },
            { src: "/chettinad_courtyard_colorized_1767964112792.png", label: "Courtyard" },
        ],
    },
    {
        id: 3,
        title: "Construction\nManagement",
        shortName: "Construction Management",
        description: "Through our create-and-construct model, we manage the complete build process — procurement, contractor coordination, site supervision, and handover. A single point of accountability from concept to completion.\n\nThis end-to-end involvement ensures the design intent is fully preserved through every phase.",
        areas: ["Project Management", "Contractor Coordination", "Site Supervision", "Handover & Closeout"],
        images: [
            { src: "/chennai_urban_residence_exterior_1769688810297.png", label: "Site" },
            { src: "/chennai_residence_facade_detail_1769692207613.png", label: "Facade Detail" },
            { src: "/chennai_residence_staircase_1769688893581.png", label: "Structure" },
        ],
    },
    {
        id: 4,
        title: "Planning &\nApprovals",
        shortName: "Planning & Approvals",
        description: "Navigating planning regulations and statutory approvals requires both experience and precision. We prepare comprehensive planning applications, feasibility studies, and regulatory submissions.\n\nOur deep familiarity with local planning frameworks across India ensures projects move efficiently from concept to commencement.",
        areas: ["Planning Applications", "Feasibility Studies", "Regulatory Submissions", "Zoning Analysis"],
        images: [
            { src: "/chennai_apartments_exterior_v2_1769753645940.png", label: "Massing" },
            { src: "/chennai_apartments_living_1769753696485.png", label: "Unit Interior" },
            { src: "/chennai_apartments_staircase_1769753677802.png", label: "Circulation" },
        ],
    },
    {
        id: 5,
        title: "Project\nConsultation",
        shortName: "Project Consultation",
        description: "Not every project needs a full service from day one. Our consultation offering provides focused expert guidance at any stage — from site appraisals and brief development to design reviews and value engineering.\n\nWhether you are an individual client, a developer, or another design practice, we bring clarity to complex decisions.",
        areas: ["Site Appraisals", "Brief Development", "Design Review", "Value Engineering"],
        images: [
            { src: "/kerala_resort_aerial_colorized_1767793602663.png", label: "Aerial View" },
            { src: "/kerala_resort_reception_colorized_v2_1767794334436.png", label: "Reception" },
            { src: "/kerala_resort_pool_colorized_v2_1767794309819.png", label: "Landscape" },
        ],
    },
    {
        id: 6,
        title: "Site\nAnalysis",
        shortName: "Site Analysis",
        description: "Every great building begins with a thorough understanding of its ground. Our site analysis service examines topography, solar orientation, wind patterns, drainage, views, and contextual relationships.\n\nThis foundational work ensures the architecture that emerges is specific to its place, not generic to any site.",
        areas: ["Topographic Survey", "Solar & Wind Analysis", "Contextual Study", "Environmental Assessment"],
        images: [
            { src: "/kerala_resort_yoga_colorized_v2_1767794447655.png", label: "Landscape" },
            { src: "/kerala_resort_walkway_colorized_1767793650889.png", label: "Circulation" },
            { src: "/kerala_resort_bedroom_colorized_1767793625502.png", label: "Environment" },
        ],
    },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function ServicesClient() {
    const [mounted, setMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [angleOffset, setAngleOffset] = useState(0);
    const [scrollDir, setScrollDir] = useState<1 | -1>(1);

    // Refs — avoid stale closures in event handlers
    const angleRef = useRef(0);
    const targetAngleRef = useRef(0);
    const isWheelZoneRef = useRef(true);
    const contentRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);

    const N = SERVICES.length;
    const STEP = 360 / N; // 60° per service

    // ── MOUNT: hide ArchNavbar, mark body ──────────────────────────────────
    useEffect(() => {
        setMounted(true);
        document.body.classList.add('services-page');
        return () => document.body.classList.remove('services-page');
    }, []);

    // ── SPRING ANIMATION LOOP ──────────────────────────────────────────────
    useEffect(() => {
        const loop = () => {
            const diff = targetAngleRef.current - angleRef.current;
            angleRef.current += diff * 0.09;
            setAngleOffset(angleRef.current);
            const snapped = Math.round(-angleRef.current / STEP);
            const idx = ((snapped % N) + N) % N;
            setActiveIndex(idx);
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafRef.current);
    }, [N, STEP]);

    // ── MOUSE ZONE DETECTION ───────────────────────────────────────────────
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            isWheelZoneRef.current = e.clientX <= CX + R2;
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    // ── WHEEL HANDLER (uses refs — no stale closure) ───────────────────────
    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (isWheelZoneRef.current) {
                setScrollDir(e.deltaY > 0 ? 1 : -1);
                targetAngleRef.current -= e.deltaY * 0.2;
            } else {
                contentRef.current?.scrollBy({ top: e.deltaY });
            }
        };
        window.addEventListener('wheel', onWheel, { passive: false });
        return () => window.removeEventListener('wheel', onWheel);
    }, []);

    const goTo = (i: number) => {
        setScrollDir(i > activeIndex ? 1 : -1);
        targetAngleRef.current = -i * STEP;
    };

    const service = SERVICES[activeIndex];

    // Adaptive colours — purely geometry-based, no DOM sampling
    // Logo: fixed at approx centre (57, 39)
    const logoColor = adaptiveColor(57, 39);
    // Hamburger: fixed at approx centre (W-39, 37) — 1401, 37
    const burgerColor = adaptiveColor(1401, 37);

    // ── SSR GUARD — render nothing until client mounts ─────────────────────
    // (prevents hydration mismatch from Math.cos/sin position computations)
    if (!mounted) {
        return (
            <div className="w-full h-screen bg-[#0e0e0e]" />
        );
    }

    return (
        <div className="w-full h-screen overflow-hidden bg-[#0e0e0e] relative" style={{ cursor: 'none' }}>

            {/* ── RING 3: large cream content circle ──────────────────── */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: R3 * 2, height: R3 * 2,
                    left: CX - R3, top: CY - R3,
                    backgroundColor: '#f5f4f0',
                }}
            />

            {/* ── SVG SPOKES inside Ring 3 ────────────────────────────── */}
            <svg
                className="absolute inset-0 pointer-events-none"
                width="1440" height="900"
                style={{ zIndex: 1 }}
            >
                {[14, 40, 66].map(deg =>
                    [-1, 1].map(sign => {
                        const rad = deg * sign * Math.PI / 180;
                        const x1 = CX + (R2 + 20) * Math.cos(rad);
                        const y1 = CY + (R2 + 20) * Math.sin(rad);
                        const x2 = CX + (R2 + 700) * Math.cos(rad);
                        const y2 = CY + (R2 + 700) * Math.sin(rad);
                        return (
                            <line
                                key={`${deg}-${sign}`}
                                x1={x1} y1={y1} x2={x2} y2={y2}
                                stroke="#e0dfd9" strokeWidth="0.8"
                            />
                        );
                    })
                )}
            </svg>

            {/* ── RING 2: dark service selector wheel ─────────────────── */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: R2 * 2, height: R2 * 2,
                    left: CX - R2, top: CY - R2,
                    backgroundColor: '#141414',
                    border: '1px solid #2a2a2a',
                    zIndex: 2,
                }}
            />

            {/* ── ROTATING SERVICE LABELS on Ring 2 ───────────────────── */}
            {/* This whole group rotates with angleOffset */}
            <div
                className="absolute pointer-events-none"
                style={{ left: CX, top: CY, zIndex: 3 }}
            >
                <div style={{ transform: `rotate(${angleOffset}deg)` }}>
                    {SERVICES.map((svc, i) => {
                        const deg = (i / N) * 360;
                        const rad = deg * Math.PI / 180;
                        const isActive = i === activeIndex;
                        const R_lbl = R2 * 0.63;
                        const lx = R_lbl * Math.cos(rad);
                        const ly = R_lbl * Math.sin(rad);

                        return (
                            <React.Fragment key={svc.id}>
                                {/* Tick at ring edge */}
                                <div
                                    className="absolute"
                                    style={{
                                        left: R2 * Math.cos(rad) - 8,
                                        top: R2 * Math.sin(rad) - (isActive ? 1 : 0.5),
                                        width: 16,
                                        height: isActive ? 1.5 : 0.75,
                                        backgroundColor: isActive ? '#777' : '#333',
                                        transform: `rotate(${deg}deg)`,
                                        transformOrigin: 'center',
                                    }}
                                />
                                {/* Label */}
                                <div
                                    className="absolute"
                                    style={{
                                        left: lx,
                                        top: ly,
                                        transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                                        width: 178,
                                        textAlign: 'center',
                                        fontSize: isActive ? 11 : 9,
                                        letterSpacing: isActive ? '0.24em' : '0.18em',
                                        fontWeight: 300,
                                        color: isActive ? '#ffffff' : '#606060',
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

            {/* ── RING 1: hub ─────────────────────────────────────────── */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: R1 * 2, height: R1 * 2,
                    left: CX - R1, top: CY - R1,
                    backgroundColor: '#0e0e0e',
                    border: '1px solid #333',
                    zIndex: 4,
                }}
            />
            {/* SERVICES label inside hub */}
            <div
                className="absolute pointer-events-none"
                style={{
                    left: CX - 38, top: CY - 7,
                    fontSize: 10, letterSpacing: '0.38em',
                    color: '#555', fontFamily: 'var(--font-inter)',
                    fontWeight: 300, textTransform: 'uppercase',
                    width: 76, textAlign: 'center',
                    zIndex: 5,
                }}
            >
                SERVICES
            </div>

            {/* ── POINTER — ends before label zone (R2 * 0.52) ────────── */}
            <div
                className="absolute pointer-events-none"
                style={{
                    left: CX + R1 + 4,
                    top: CY - 0.75,
                    width: R2 * 0.52 - R1 - 4,
                    height: 1.5,
                    backgroundColor: '#555',
                    zIndex: 5,
                }}
            />
            {/* Pointer tip dot */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 8, height: 8,
                    left: CX + R2 * 0.52 - 4,
                    top: CY - 4,
                    backgroundColor: '#888',
                    zIndex: 5,
                }}
            />

            {/* ── CONTENT PANEL ────────────────────────────────────────── */}
            <div
                ref={contentRef}
                className="absolute overflow-y-auto"
                style={{
                    left: CX + R2 + 72,
                    top: 0, right: 0, bottom: 0,
                    paddingTop: 72,
                    paddingRight: 72,
                    paddingBottom: 48,
                    scrollbarWidth: 'none',
                    zIndex: 6,
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: scrollDir * 50, x: scrollDir * 8 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: scrollDir * -50, x: scrollDir * -8 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        {/* Counter */}
                        <p style={{
                            fontSize: 12, letterSpacing: '0.42em',
                            color: '#999', fontWeight: 300,
                            textTransform: 'uppercase', marginBottom: 24,
                            fontFamily: 'var(--font-inter)',
                        }}>
                            0{service.id} / 0{N}
                        </p>

                        {/* Title */}
                        <h2 style={{
                            fontSize: 68, fontWeight: 300,
                            color: '#0e0e0e', lineHeight: 1.05,
                            letterSpacing: '-0.02em',
                            whiteSpace: 'pre-line', marginBottom: 28,
                            fontFamily: 'var(--font-inter)',
                        }}>
                            {service.title}
                        </h2>

                        {/* Rule */}
                        <div style={{ width: 48, height: 1, backgroundColor: '#ccc', marginBottom: 28 }} />

                        {/* Description */}
                        <p style={{
                            fontSize: 15, fontWeight: 300,
                            color: '#5a5a5a', lineHeight: 1.85,
                            whiteSpace: 'pre-line', maxWidth: 440,
                            marginBottom: 32, fontFamily: 'var(--font-inter)',
                        }}>
                            {service.description}
                        </p>

                        {/* Areas */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
                            {service.areas.map(a => (
                                <span
                                    key={a}
                                    style={{
                                        fontSize: 10, letterSpacing: '0.18em',
                                        textTransform: 'uppercase', fontWeight: 300,
                                        color: '#888', border: '1px solid #ddd',
                                        padding: '6px 14px', borderRadius: 2,
                                        fontFamily: 'var(--font-inter)',
                                    }}
                                >
                                    {a}
                                </span>
                            ))}
                        </div>

                        {/* Images — circular arc stagger */}
                        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 36 }}>
                            {/* Main image */}
                            <div style={{ position: 'relative', width: 248, height: 214, flexShrink: 0 }}>
                                <img
                                    src={service.images[0].src}
                                    alt={service.images[0].label}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }}
                                />
                                <span style={{
                                    position: 'absolute', bottom: 10, left: 12,
                                    fontSize: 8, letterSpacing: '0.2em',
                                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
                                    fontWeight: 300, fontFamily: 'var(--font-inter)',
                                }}>
                                    {service.images[0].label}
                                </span>
                            </div>

                            {/* Two stacked — offset down slightly along arc */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 14 }}>
                                {service.images.slice(1).map((img, ii) => (
                                    <div key={ii} style={{ position: 'relative', width: 164, height: 96 }}>
                                        <img
                                            src={img.src}
                                            alt={img.label}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }}
                                        />
                                        <span style={{
                                            position: 'absolute', bottom: 8, left: 10,
                                            fontSize: 8, letterSpacing: '0.18em',
                                            textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
                                            fontWeight: 300, fontFamily: 'var(--font-inter)',
                                        }}>
                                            {img.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <Link
                            href="/contact"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 12,
                                fontSize: 11, letterSpacing: '0.28em',
                                textTransform: 'uppercase', fontWeight: 300,
                                color: '#333', textDecoration: 'none',
                                borderBottom: '1px solid #ccc',
                                paddingBottom: 4, fontFamily: 'var(--font-inter)',
                            }}
                        >
                            Start a project →
                        </Link>

                        {/* Scroll hint */}
                        <p style={{
                            marginTop: 48, fontSize: 10, letterSpacing: '0.28em',
                            textTransform: 'uppercase', color: '#bbb', fontWeight: 300,
                            fontFamily: 'var(--font-inter)',
                        }}>
                            ◌&nbsp;&nbsp;rotate wheel to explore&nbsp;&nbsp;◌
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── ADAPTIVE LOGO ──────────────────────────────────────── */}
            <div
                className="fixed z-50 pointer-events-none"
                style={{
                    top: 28, left: 24,
                    fontSize: 15, letterSpacing: '0.38em',
                    fontWeight: 300, textTransform: 'uppercase',
                    fontFamily: 'var(--font-inter)',
                    color: logoColor,
                    transition: 'color 0.4s',
                }}
            >
                CLOUDS
            </div>

            {/* ── ADAPTIVE HAMBURGER ─────────────────────────────────── */}
            <div
                className="fixed z-50"
                style={{ top: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 8, cursor: 'none' }}
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

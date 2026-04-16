"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── DATA ─────────────────────────────────────────────────────────────────────
const services = [
    {
        id: 1,
        title: "Architecture\n& Design",
        shortName: "Architecture & Design",
        description: "We design buildings that are deeply rooted in their context and built to last generations. Our architectural work begins with a rigorous understanding of site, climate, culture, and the precise way people inhabit space.\n\nFrom intimate private residences to large-scale commercial complexes, every project is shaped by a commitment to material honesty and spatial clarity. We believe architecture should speak of its time and place — and yearn for timelessness.",
        areas: ["Residential", "Commercial", "Hospitality", "Heritage & Conservation"],
        images: [
            { src: "/bangalore_villa_facade_color_1767792911832.png", label: "EXTERIOR / FACADE", type: "image" },
            { src: "/bangalore_villa_bedroom_color_1767792889582.png", label: "INTERIOR", type: "image" },
            { src: "/bangalore_villa_kitchen_color_1767792872338.png", label: "DETAIL", type: "image" },
        ],
    },
    {
        id: 2,
        title: "Interior\nDesign",
        shortName: "Interior Design",
        description: "Our interior practice extends the architectural vision inward — from first wall to last detail. We curate material palettes, spatial sequences, lighting strategies, and furniture selections that create cohesive environments where every decision is considered.\n\nWe design interiors that feel both deliberate and lived-in, spaces that grow richer over time rather than dating with trends.",
        areas: ["Residential Interiors", "Commercial Interiors", "Hospitality Interiors", "Furniture Curation"],
        images: [
            { src: "/chettinad_bedroom_colorized_1767964135344.png", label: "BEDROOM", type: "image" },
            { src: "/chettinad_dining_colorized_1767964163160.png", label: "DINING", type: "image" },
            { src: "/chettinad_courtyard_colorized_1767964112792.png", label: "COURTYARD", type: "image" },
        ],
    },
    {
        id: 3,
        title: "Construction\nManagement",
        shortName: "Construction Management",
        description: "Through our create-and-construct model, we manage the complete build process — procurement, contractor coordination, site supervision, and handover. A single point of accountability from concept to completion.\n\nThis end-to-end involvement ensures the design intent is preserved through every phase of construction, eliminating the gap between what is drawn and what is built.",
        areas: ["Project Management", "Contractor Coordination", "Site Supervision", "Handover & Closeout"],
        images: [
            { src: "/chennai_urban_residence_exterior_1769688810297.png", label: "SITE", type: "image" },
            { src: "/chennai_residence_facade_detail_1769692207613.png", label: "FACADE DETAIL", type: "image" },
            { src: "/chennai_residence_staircase_1769688893581.png", label: "STRUCTURE", type: "image" },
        ],
    },
    {
        id: 4,
        title: "Planning &\nApprovals",
        shortName: "Planning & Approvals",
        description: "Navigating planning regulations and statutory approvals requires both experience and precision. We prepare comprehensive planning applications, feasibility studies, and regulatory submissions — guiding projects through complex approval processes with clarity.\n\nOur deep understanding of local planning frameworks across India ensures projects move efficiently from concept to commencement.",
        areas: ["Planning Applications", "Feasibility Studies", "Regulatory Submissions", "Zoning Analysis"],
        images: [
            { src: "/chennai_apartments_exterior_v2_1769753645940.png", label: "MASSING", type: "image" },
            { src: "/chennai_apartments_living_1769753696485.png", label: "UNIT INTERIOR", type: "image" },
            { src: "/chennai_apartments_staircase_1769753677802.png", label: "CIRCULATION", type: "image" },
        ],
    },
    {
        id: 5,
        title: "Project\nConsultation",
        shortName: "Project Consultation",
        description: "Not every project needs a full design service from day one. Our consultation offering provides focused, expert guidance at any stage — from initial site appraisals and brief development to design reviews and value engineering exercises.\n\nWhether you are an individual client, a developer, or another design practice, we bring clarity and direction to complex decisions.",
        areas: ["Site Appraisals", "Brief Development", "Design Review", "Value Engineering"],
        images: [
            { src: "/kerala_resort_aerial_colorized_1767793602663.png", label: "AERIAL VIEW", type: "image" },
            { src: "/kerala_resort_reception_colorized_v2_1767794334436.png", label: "RECEPTION", type: "image" },
            { src: "/kerala_resort_pool_colorized_v2_1767794309819.png", label: "LANDSCAPE", type: "image" },
        ],
    },
    {
        id: 6,
        title: "Site\nAnalysis",
        shortName: "Site Analysis",
        description: "Every great building begins with a thorough understanding of its ground. Our site analysis service examines topography, solar orientation, wind patterns, drainage, views, and contextual relationships — producing a comprehensive brief that informs every subsequent design decision.\n\nThis foundational work ensures the architecture that emerges is specific to its place, not generic to any site.",
        areas: ["Topographic Survey", "Solar & Wind Analysis", "Contextual Study", "Environmental Assessment"],
        images: [
            { src: "/kerala_resort_yoga_colorized_v2_1767794447655.png", label: "LANDSCAPE", type: "image" },
            { src: "/kerala_resort_walkway_colorized_1767793650889.png", label: "CIRCULATION", type: "image" },
            { src: "/kerala_resort_bedroom_colorized_1767793625502.png", label: "ENVIRONMENT", type: "image" },
        ],
    },
];

// ── ADAPTIVE COLOR HOOK ───────────────────────────────────────────────────────
// Reads pixel brightness beneath a fixed element and returns 'light' or 'dark'
function useAdaptiveColor(ref: React.RefObject<HTMLElement | null>) {
    const [scheme, setScheme] = useState<'light' | 'dark'>('dark');
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 1; canvas.height = 1;
        canvasRef.current = canvas;
    }, []);

    useEffect(() => {
        let raf: number;
        const check = () => {
            const el = ref.current;
            const canvas = canvasRef.current;
            if (!el || !canvas) { raf = requestAnimationFrame(check); return; }
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const ctx = canvas.getContext('2d');
            if (!ctx) { raf = requestAnimationFrame(check); return; }
            try {
                // Sample background color via computed style of element at point
                const els = document.elementsFromPoint(cx, cy);
                // Find the first non-overlay element beneath our logo
                let bg = '#111';
                for (const e of els) {
                    if (e === el || el.contains(e as Node)) continue;
                    const computed = window.getComputedStyle(e).backgroundColor;
                    if (computed && computed !== 'rgba(0, 0, 0, 0)' && computed !== 'transparent') {
                        bg = computed;
                        break;
                    }
                }
                // Parse rgb
                const m = bg.match(/\d+/g);
                if (m && m.length >= 3) {
                    const r = +m[0], g = +m[1], b = +m[2];
                    // Perceived luminance
                    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
                    setScheme(lum > 140 ? 'dark' : 'light');
                }
            } catch (_) {}
            raf = requestAnimationFrame(check);
        };
        raf = requestAnimationFrame(check);
        return () => cancelAnimationFrame(raf);
    }, [ref]);

    return scheme;
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function ServicesClient() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [targetIndex, setTargetIndex] = useState(0);
    const [angleOffset, setAngleOffset] = useState(0);   // degrees, animated
    const [isWheelZone, setIsWheelZone] = useState(false);
    const wheelRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const burgerRef = useRef<HTMLDivElement>(null);
    const angleRef = useRef(0);
    const targetAngleRef = useRef(0);
    const rafRef = useRef<number>(0);

    const N = services.length;
    const STEP = 360 / N; // 60° per service

    const logoScheme = useAdaptiveColor(logoRef);
    const burgerScheme = useAdaptiveColor(burgerRef);

    // ── SMOOTH WHEEL SPRING ─────────────────────────────────────────────────
    useEffect(() => {
        const spring = () => {
            const diff = targetAngleRef.current - angleRef.current;
            angleRef.current += diff * 0.08;
            setAngleOffset(angleRef.current);

            // Snap active index from angle
            const snapped = Math.round(-angleRef.current / STEP);
            const idx = ((snapped % N) + N) % N;
            setActiveIndex(idx);

            rafRef.current = requestAnimationFrame(spring);
        };
        rafRef.current = requestAnimationFrame(spring);
        return () => cancelAnimationFrame(rafRef.current);
    }, [N, STEP]);

    // ── MOUSE ZONE DETECTION ────────────────────────────────────────────────
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const wheelPanel = wheelRef.current;
        if (!wheelPanel) return;
        const rect = wheelPanel.getBoundingClientRect();
        setIsWheelZone(e.clientX <= rect.right);
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    // ── WHEEL EVENT ──────────────────────────────────────────────────────────
    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        if (isWheelZone) {
            targetAngleRef.current -= e.deltaY * 0.18;
        } else {
            contentRef.current?.scrollBy({ top: e.deltaY, behavior: 'auto' });
        }
    }, [isWheelZone]);

    useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);

    // ── NAVIGATE TO SERVICE ──────────────────────────────────────────────────
    const goTo = (i: number) => {
        targetAngleRef.current = -i * STEP;
        setTargetIndex(i);
    };

    const service = services[activeIndex];

    // ── CIRCLE GEOMETRY ──────────────────────────────────────────────────────
    const CX = 72, CY = 450;      // circle origin (pixels, left edge + 72px)
    const R1 = 82, R2 = 360;      // ring radii

    return (
        <div className="w-full h-screen overflow-hidden bg-[#0e0e0e] relative cursor-none select-none">

            {/* ── RING 3: large cream content circle ── */}
            <div
                className="absolute rounded-full"
                style={{
                    width: 1380 * 2,
                    height: 1380 * 2,
                    left: CX - 1380,
                    top: CY - 1380,
                    backgroundColor: '#f6f5f2',
                    pointerEvents: 'none',
                }}
            />

            {/* ── SUBTLE SPOKES inside Ring 3 ── */}
            {[18, 48, 78].map(deg => (
                [1, -1].map(sign => {
                    const rad = deg * sign * Math.PI / 180;
                    const x1 = CX + (R2 + 24) * Math.cos(rad);
                    const y1 = CY + (R2 + 24) * Math.sin(rad);
                    return (
                        <div
                            key={`spoke-${deg}-${sign}`}
                            className="absolute origin-left"
                            style={{
                                left: x1,
                                top: y1 - 0.4,
                                width: 680,
                                height: 0.8,
                                backgroundColor: '#e0dfd9',
                                transform: `rotate(${-deg * sign}deg)`,
                                pointerEvents: 'none',
                            }}
                        />
                    );
                })
            ))}

            {/* ── RING 2: dark rotating service wheel ── */}
            <div ref={wheelRef} className="absolute" style={{ pointerEvents: 'none' }}>
                <div
                    className="absolute rounded-full"
                    style={{
                        width: R2 * 2,
                        height: R2 * 2,
                        left: CX - R2,
                        top: CY - R2,
                        backgroundColor: '#171717',
                        border: '1px solid #2a2a2a',
                    }}
                />
            </div>

            {/* ── SERVICE LABELS on Ring 2 (rotate with angleOffset) ── */}
            <div
                className="absolute"
                style={{
                    left: CX,
                    top: CY,
                    transform: `rotate(${angleOffset}deg)`,
                    pointerEvents: 'none',
                }}
            >
                {services.map((svc, i) => {
                    const deg = (i / N) * 360;
                    const rad = deg * Math.PI / 180;
                    const R_lbl = R2 * 0.64;
                    const lx = R_lbl * Math.cos(rad);
                    const ly = R_lbl * Math.sin(rad);
                    const isActive = i === activeIndex;
                    return (
                        <React.Fragment key={svc.id}>
                            {/* Tick mark at ring edge */}
                            <div
                                className="absolute origin-center"
                                style={{
                                    left: R2 * Math.cos(rad) - 8,
                                    top: R2 * Math.sin(rad) - (isActive ? 1 : 0.5),
                                    width: 16,
                                    height: isActive ? 1.5 : 0.75,
                                    backgroundColor: isActive ? '#888' : '#333',
                                    transform: `rotate(${deg}deg)`,
                                }}
                            />
                            {/* Label */}
                            <div
                                className="absolute"
                                style={{
                                    left: lx,
                                    top: ly,
                                    transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                                    width: 180,
                                    textAlign: 'center',
                                    fontSize: isActive ? 11 : 9,
                                    letterSpacing: isActive ? '0.22em' : '0.18em',
                                    fontWeight: 300,
                                    color: isActive ? '#fff' : '#444',
                                    fontFamily: 'var(--font-inter)',
                                    textTransform: 'uppercase',
                                    whiteSpace: 'nowrap',
                                    transition: 'color 0.3s',
                                    cursor: 'pointer',
                                    pointerEvents: 'auto',
                                }}
                                onClick={() => goTo(i)}
                            >
                                {svc.shortName}
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>

            {/* ── RING 1: hub ── */}
            <div
                className="absolute rounded-full"
                style={{
                    width: R1 * 2,
                    height: R1 * 2,
                    left: CX - R1,
                    top: CY - R1,
                    backgroundColor: '#111',
                    border: '1px solid #3a3a3a',
                    pointerEvents: 'none',
                    zIndex: 10,
                }}
            />
            <div
                className="absolute z-10 pointer-events-none"
                style={{
                    left: CX - 36,
                    top: CY - 6,
                    fontSize: 10,
                    letterSpacing: '0.38em',
                    color: '#666',
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    width: 72,
                    textAlign: 'center',
                }}
            >
                SERVICES
            </div>

            {/* ── POINTER (static, pointing right) ── */}
            <div
                className="absolute z-10 pointer-events-none"
                style={{
                    left: CX + R1,
                    top: CY - 0.75,
                    width: R2 - R1 - 8,
                    height: 1.5,
                    backgroundColor: '#666',
                }}
            />
            <div
                className="absolute z-10 rounded-full pointer-events-none"
                style={{
                    width: 10, height: 10,
                    left: CX + R2 - 5,
                    top: CY - 5,
                    backgroundColor: '#fff',
                }}
            />

            {/* ── RIGHT CONTENT PANEL ── */}
            <div
                ref={contentRef}
                className="absolute overflow-y-auto"
                style={{
                    left: CX + R2 + 80,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    paddingTop: 72,
                    paddingRight: 80,
                    scrollbarWidth: 'none',
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                    >
                        {/* Counter */}
                        <p className="text-[13px] tracking-[0.38em] text-neutral-400 font-light mb-6 uppercase">
                            0{service.id} / 0{N}
                        </p>

                        {/* Title */}
                        <h2
                            className="font-light text-neutral-900 mb-8 leading-tight"
                            style={{ fontSize: 68, letterSpacing: '-0.02em', whiteSpace: 'pre-line' }}
                        >
                            {service.title}
                        </h2>

                        {/* Rule */}
                        <div className="w-12 h-px bg-neutral-300 mb-8" />

                        {/* Description */}
                        <p
                            className="font-light text-neutral-500 leading-[1.8] mb-10 max-w-[440px]"
                            style={{ fontSize: 15, whiteSpace: 'pre-line' }}
                        >
                            {service.description}
                        </p>

                        {/* Areas */}
                        <ul className="flex flex-wrap gap-3 mb-12">
                            {service.areas.map(a => (
                                <li
                                    key={a}
                                    className="text-[10px] tracking-[0.2em] uppercase font-light text-neutral-500 border border-neutral-200 px-3 py-1.5 rounded-sm"
                                >
                                    {a}
                                </li>
                            ))}
                        </ul>

                        {/* Images — staggered along arc curve */}
                        <div className="flex gap-4 items-start mb-10">
                            {/* Main image — tall */}
                            <div className="flex-shrink-0 relative" style={{ width: 252, height: 218 }}>
                                <img
                                    src={service.images[0].src}
                                    alt={service.images[0].label}
                                    className="w-full h-full object-cover rounded-sm"
                                />
                                <span className="absolute bottom-3 left-3 text-[8px] tracking-[0.2em] uppercase text-white/70 font-light">
                                    {service.images[0].label}
                                </span>
                            </div>

                            {/* Two stacked images */}
                            <div className="flex flex-col gap-4" style={{ marginTop: 12 }}>
                                <div className="relative" style={{ width: 168, height: 100 }}>
                                    <img
                                        src={service.images[1].src}
                                        alt={service.images[1].label}
                                        className="w-full h-full object-cover rounded-sm"
                                    />
                                    <span className="absolute bottom-2 left-2 text-[8px] tracking-[0.2em] uppercase text-white/70 font-light">
                                        {service.images[1].label}
                                    </span>
                                </div>
                                <div className="relative" style={{ width: 168, height: 100 }}>
                                    <img
                                        src={service.images[2].src}
                                        alt={service.images[2].label}
                                        className="w-full h-full object-cover rounded-sm"
                                    />
                                    <span className="absolute bottom-2 left-2 text-[8px] tracking-[0.2em] uppercase text-white/70 font-light">
                                        {service.images[2].label}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Scroll hint */}
                        <p className="text-[10px] tracking-[0.28em] uppercase font-light text-neutral-400 mb-16">
                            ◌&nbsp;&nbsp;rotate wheel to explore services&nbsp;&nbsp;◌
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── ADAPTIVE COLOR LOGO ── */}
            <div
                ref={logoRef}
                className="fixed top-7 left-6 z-50 pointer-events-none"
                style={{
                    fontSize: 16,
                    letterSpacing: '0.38em',
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    color: logoScheme === 'light' ? '#fff' : '#111',
                    transition: 'color 0.4s',
                }}
            >
                CLOUDS
            </div>

            {/* ── ADAPTIVE COLOR HAMBURGER ── */}
            <div
                ref={burgerRef}
                className="fixed top-7 right-6 z-50 flex flex-col gap-[8px] cursor-pointer pointer-events-auto"
                style={{ transition: 'opacity 0.2s' }}
            >
                {[0, 1, 2].map(i => (
                    <div
                        key={i}
                        style={{
                            width: 26,
                            height: 1.5,
                            backgroundColor: burgerScheme === 'light' ? '#fff' : '#111',
                            transition: 'background-color 0.4s',
                        }}
                    />
                ))}
            </div>

            {/* ── MOUSE ZONE INDICATOR (dev helper, remove in prod) ── */}
            <div
                className="fixed bottom-4 left-6 z-50 pointer-events-none"
                style={{ fontSize: 9, letterSpacing: '0.15em', color: isWheelZone ? '#555' : '#333', textTransform: 'uppercase', fontFamily: 'var(--font-inter)', fontWeight: 300 }}
            >
                {isWheelZone ? '[ wheel zone ]' : '[ content zone ]'}
            </div>
        </div>
    );
}

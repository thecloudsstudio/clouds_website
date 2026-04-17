"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// R2=456 is the reference radius used as the font/label scale baseline
const BASE_R2 = 456;
const N    = 7;
const STEP = 360 / N;

// ── DATA ──────────────────────────────────────────────────────────────────────
const SERVICES = [
    {
        id: 1,
        shortName: "Architectural Design",
        title: "Architectural\nDesign",
        tagline: "Every space begins with a vision — we give it form.",
        description: "We design any built environment — homes, schools, factories, resorts, public buildings, parks. Interior space planning is part of the process, not an afterthought.",
        heroImage: "/bangalore_villa_facade_color_1767792911832.png",
    },
    {
        id: 2,
        shortName: "Design Consultancy",
        title: "Design\nConsultancy",
        tagline: "Your team, your site — guided by the people who designed it.",
        description: "Once the design is complete, we stay on as technical advisors — reviewing execution, answering site queries, and ensuring every decision stays true to the original design intent.",
        heroImage: "/kerala_resort_aerial_colorized_1767793602663.png",
    },
    {
        id: 3,
        shortName: "Architecture PMC",
        title: "Architecture\nPMC",
        tagline: "One accountable voice between client and contractor.",
        description: "We act as your dedicated project management layer — scheduling, directing, and quality-controlling your appointed execution team so every decision serves the design.",
        heroImage: "/chennai_urban_residence_exterior_1769688810297.png",
    },
    {
        id: 4,
        shortName: "Turnkey Construction",
        title: "Turnkey\nConstruction",
        tagline: "Design, build, and deliver — nothing left undone.",
        description: "For clients who want a single point of responsibility. We design, construct, and finish everything — structure, interiors, fit-out — handing over a space that is ready to inhabit.",
        heroImage: "/chennai_apartments_exterior_v2_1769753645940.png",
    },
    {
        id: 5,
        shortName: "Product Design",
        title: "Product &\nIndustrial Design",
        tagline: "Every object deserves the precision of great design.",
        description: "We design physical things — furniture, machines, vehicles, consumer products, packaging. If it needs a designer's eye to be better made, more functional, or more beautiful, we do it.",
        heroImage: "/chettinad_bedroom_colorized_1767964135344.png",
    },
    {
        id: 6,
        shortName: "Brand Design",
        title: "Brand &\nVisual Design",
        tagline: "Identity that is felt before it is read.",
        description: "From logo and stationery to exhibition stalls, promotional gifts, and branded environments — we craft the visual language that represents your organisation at every touchpoint.",
        heroImage: "/kerala_resort_yoga_colorized_v2_1767794447655.png",
    },
    {
        id: 7,
        shortName: "3D Visualisation",
        title: "3D\nVisualisation",
        tagline: "See it before it exists.",
        description: "We turn concepts into photorealistic renders, immersive walkthroughs, and motion animations — from architectural interiors to manufacturing process visualisations.",
        heroImage: "/bangalore_villa_facade_color_1767792911832.png",
    },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function ServicesClient() {
    const [mounted,     setMounted]     = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [angleOffset, setAngleOffset] = useState(0);
    const [scrollDir,   setScrollDir]   = useState<1 | -1>(1);
    const [vpW,         setVpW]         = useState(1512);
    const [vpH,         setVpH]         = useState(942);

    const angleRef     = useRef(0);
    const targetRef    = useRef(0);
    const isWheelRef   = useRef(true);
    const lastWheelRef = useRef(0);
    const rafRef       = useRef<number>(0);
    // Mutable ref so event handlers always see current geometry without re-subscribing
    const geomRef      = useRef({ CX: 72, R2: BASE_R2 });

    // ── DERIVED GEOMETRY ──────────────────────────────────────────────────────
    // Strategy: wheel radius is driven by VIEWPORT HEIGHT so it always fills
    // the screen top-to-bottom. Width is only checked to guarantee a minimum
    // readable content column stays to the right of the wheel.
    const PAD_L       = 56;   // gap: wheel right-edge → content left
    const PAD_R       = 56;   // page right margin
    const MIN_CONTENT = 380;  // minimum content panel width (px)

    // Primary: wheel radius = 52 % of viewport height
    const R2target = Math.round(vpH * 0.52);
    // Secondary: ensure content fits — CX ≈ 16 % of R2
    const R2max    = vpW - Math.round(R2target * 0.16) - PAD_L - PAD_R - MIN_CONTENT;
    const R2       = Math.max(160, Math.min(R2target, R2max));

    const CX          = Math.round(R2 * 0.16);        // wheel center x (near left edge)
    const CY          = Math.round(vpH * 0.51);       // wheel center y (just below mid)
    const R1          = Math.round(R2 * 0.193);       // hub radius (88/456 ≈ 0.193)
    const BAND        = Math.round(vpH * 0.215);      // half-height of content zone
    const R_LBL       = R2 * 0.57;
    const POINTER_END = Math.floor(R_LBL - R2 * 0.246);
    // Font/label scale relative to reference R2
    const scale       = R2 / BASE_R2;
    const isMobile    = vpW < 900;

    // Keep geomRef in sync every render (used by event-handler closures)
    geomRef.current = { CX, R2 };

    const arcX = (dy: number) =>
        -(R2 - Math.sqrt(Math.max(0, R2 * R2 - dy * dy))) * 0.45;

    // ── MOUNT + VIEWPORT TRACKER ──────────────────────────────────────────────
    useEffect(() => {
        setMounted(true);
        const updateVp = () => {
            setVpW(window.innerWidth);
            setVpH(window.innerHeight);
        };
        updateVp();
        window.addEventListener('resize', updateVp);

        // Lock body scroll so no layout elements bleed in below this page
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        const navEls = document.querySelectorAll('nav');
        navEls.forEach(el =>
            (el as HTMLElement).style.setProperty('display', 'none', 'important'));

        return () => {
            window.removeEventListener('resize', updateVp);
            document.body.style.overflow = prev;
            document.documentElement.style.overflow = '';
            navEls.forEach(el =>
                (el as HTMLElement).style.removeProperty('display'));
        };
    }, []);

    // ── SPRING ANIMATION LOOP ─────────────────────────────────────────────────
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

    // ── MOUSE ZONE (use ref so no stale closure on resize) ────────────────────
    useEffect(() => {
        const fn = (e: MouseEvent) => {
            isWheelRef.current = e.clientX <= geomRef.current.CX + geomRef.current.R2;
        };
        window.addEventListener('mousemove', fn);
        return () => window.removeEventListener('mousemove', fn);
    }, []);

    // ── WHEEL — one snap per gesture ─────────────────────────────────────────
    useEffect(() => {
        const fn = (e: WheelEvent) => {
            e.preventDefault();
            if (!isMobile && !isWheelRef.current) return;
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
    }, [isMobile]);

    const goTo = (i: number) => {
        const dir = i > activeIndex ? 1 : -1;
        setScrollDir(dir as 1 | -1);
        targetRef.current = -i * STEP;
    };

    if (!mounted) return <div style={{ position: 'fixed', inset: 0, backgroundColor: '#f5f4f0' }} />;

    const svc     = SERVICES[activeIndex];
    const prevSvc = SERVICES[(activeIndex - 1 + N) % N];
    const nextSvc = SERVICES[(activeIndex + 1) % N];

    // ─────────────────────────────────────────────────────────────────────────
    // MOBILE LAYOUT  (< 900 px — phones + narrow tablets)
    // Full-screen hero image + centred content + dot nav
    // ─────────────────────────────────────────────────────────────────────────
    if (isMobile) {
        return (
            <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', backgroundColor: '#f5f4f0' }}>

                {/* Background hero */}
                <AnimatePresence mode="wait">
                    <motion.div key={`mob-hero-${svc.id}`} className="absolute inset-0"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}>
                        <img src={svc.heroImage} alt={svc.shortName}
                            className="w-full h-full object-cover" style={{ opacity: 0.12 }} />
                    </motion.div>
                </AnimatePresence>

                {/* Content */}
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    padding: '0 32px 88px',
                }}>
                    <div style={{
                        fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
                        color: '#aaa', fontFamily: 'var(--font-inter)', marginBottom: 20,
                    }}>
                        {String(activeIndex + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div key={`mob-content-${svc.id}`}
                            initial={{ opacity: 0, y: scrollDir * 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: scrollDir * -30 }}
                            transition={{ duration: 0.4 }}>
                            <h2 style={{
                                fontSize: 38, fontWeight: 300, lineHeight: 1.1,
                                letterSpacing: '-0.02em', color: '#0c0c0c',
                                fontFamily: 'var(--font-inter)', whiteSpace: 'pre-line', marginBottom: 18,
                            }}>{svc.title}</h2>
                            <div style={{ width: 32, height: 1, backgroundColor: '#bbb', marginBottom: 18 }} />
                            <p style={{
                                fontSize: 15, fontStyle: 'italic', color: '#444',
                                lineHeight: 1.75, fontFamily: 'var(--font-inter)', marginBottom: 14,
                            }}>{svc.tagline}</p>
                            <p style={{
                                fontSize: 13, color: '#777', lineHeight: 1.85,
                                fontFamily: 'var(--font-inter)', marginBottom: 30,
                            }}>{svc.description}</p>
                            <Link href="/contact" style={{
                                fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
                                fontWeight: 300, color: '#222', textDecoration: 'none',
                                borderBottom: '1px solid rgba(0,0,0,0.22)', paddingBottom: 3,
                                fontFamily: 'var(--font-inter)',
                            }}>Start a project →</Link>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Prev / Next arrows */}
                <button onClick={() => goTo((activeIndex - 1 + N) % N)} style={{
                    position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', fontSize: 30, color: '#666',
                    cursor: 'pointer', padding: '8px 14px',
                }}>‹</button>
                <button onClick={() => goTo((activeIndex + 1) % N)} style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', fontSize: 30, color: '#666',
                    cursor: 'pointer', padding: '8px 14px',
                }}>›</button>

                {/* Dot navigation */}
                <div style={{
                    position: 'absolute', bottom: 36, left: 0, right: 0,
                    display: 'flex', justifyContent: 'center', gap: 8,
                }}>
                    {SERVICES.map((_, i) => (
                        <button key={i} onClick={() => goTo(i)} style={{
                            width: i === activeIndex ? 20 : 6, height: 6,
                            borderRadius: 3, padding: 0, border: 'none', cursor: 'pointer',
                            backgroundColor: i === activeIndex ? '#333' : '#ccc',
                            transition: 'all 0.3s',
                        }} />
                    ))}
                </div>

                {/* Logo */}
                <div className="fixed" style={{
                    top: 24, left: 20, zIndex: 50, fontSize: 13, letterSpacing: '0.4em',
                    fontWeight: 300, textTransform: 'uppercase',
                    fontFamily: 'var(--font-inter)', color: '#111',
                }}>CLOUDS</div>

                {/* Hamburger */}
                <div className="fixed" style={{
                    top: 22, right: 20, zIndex: 50,
                    display: 'flex', flexDirection: 'column', gap: 7,
                }}>
                    {[0, 1, 2].map(i => (
                        <div key={i} style={{ width: 24, height: 1.5, backgroundColor: '#333' }} />
                    ))}
                </div>
            </div>
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DESKTOP LAYOUT  (≥ 768 px) — rotary dial, all geometry scales with viewport
    // ─────────────────────────────────────────────────────────────────────────

    // Content panel dimensions
    const contentLeft  = CX + R2 + PAD_L;
    const contentRight = PAD_R;
    const titleSize    = Math.max(24, Math.min(64, Math.round(56 * scale)));
    const bodyGap      = Math.max(24, Math.round(48 * scale));
    const fadeRange    = Math.round(BAND * 0.92);  // fade lives inside image-band zone

    return (
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', cursor: 'none', backgroundColor: '#f5f4f0' }}>

            {/* ══════════════════════════════════════════════════════════════
                LAYER 1 — IMAGE BANDS  (prev above / next below the content zone)
            ══════════════════════════════════════════════════════════════ */}
            <AnimatePresence mode="wait">
                <motion.div key={`top-${activeIndex}`}
                    className="absolute left-0 right-0 overflow-hidden"
                    style={{ top: 0, height: CY - BAND, zIndex: 1 }}
                    initial={{ opacity: 0, y: scrollDir * -50, x: arcX(-BAND) }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: scrollDir * 40 }}
                    transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}>
                    <img src={prevSvc.heroImage} alt={prevSvc.shortName}
                        className="w-full h-full object-cover" style={{ opacity: 0.40 }} />
                    <span style={{
                        position: 'absolute', bottom: 22, right: contentRight,
                        fontSize: 9, letterSpacing: '0.22em', color: 'rgba(50,50,50,0.40)',
                        textTransform: 'uppercase', fontFamily: 'var(--font-inter)', fontWeight: 300,
                    }}>{prevSvc.shortName}</span>
                </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <motion.div key={`bot-${activeIndex}`}
                    className="absolute left-0 right-0 overflow-hidden"
                    style={{ top: CY + BAND, bottom: 0, zIndex: 1 }}
                    initial={{ opacity: 0, y: scrollDir * 50, x: arcX(BAND) }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: scrollDir * -40 }}
                    transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}>
                    <img src={nextSvc.heroImage} alt={nextSvc.shortName}
                        className="w-full h-full object-cover" style={{ opacity: 0.40 }} />
                    <span style={{
                        position: 'absolute', top: 22, right: contentRight,
                        fontSize: 9, letterSpacing: '0.22em', color: 'rgba(50,50,50,0.40)',
                        textTransform: 'uppercase', fontFamily: 'var(--font-inter)', fontWeight: 300,
                    }}>{nextSvc.shortName}</span>
                </motion.div>
            </AnimatePresence>

            {/* ══════════════════════════════════════════════════════════════
                LAYER 1b — CREAM GRADIENT OVERLAY
                px-based stops so cream hits 1.0 exactly at the div hard edges
            ══════════════════════════════════════════════════════════════ */}
            <div className="absolute inset-0 pointer-events-none" style={{
                zIndex: 2,
                background: `linear-gradient(to bottom,
                    rgba(245,244,240,0)   0px,
                    rgba(245,244,240,0)   ${CY - BAND - fadeRange}px,
                    rgba(245,244,240,1.0) ${CY - BAND}px,
                    rgba(245,244,240,1.0) ${CY + BAND}px,
                    rgba(245,244,240,0)   ${CY + BAND + fadeRange}px
                )`,
            }} />

            {/* ══════════════════════════════════════════════════════════════
                LAYER 2 — ROTATING SPOKES (clipped to Ring 2)
            ══════════════════════════════════════════════════════════════ */}
            <svg className="absolute inset-0 pointer-events-none"
                width={vpW} height={vpH}
                style={{
                    zIndex: 3,
                    transform: `rotate(${angleOffset}deg)`,
                    transformOrigin: `${CX}px ${CY}px`,
                }}>
                <defs>
                    <clipPath id="ring2clip"><circle cx={CX} cy={CY} r={R2} /></clipPath>
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
                                    stroke="rgba(100,96,88,0.25)" strokeWidth="0.9" />
                            );
                        })
                    )}
                </g>
            </svg>

            {/* ══════════════════════════════════════════════════════════════
                LAYER 3 — RING 2  (dark selector wheel)
            ══════════════════════════════════════════════════════════════ */}
            <div className="absolute rounded-full pointer-events-none" style={{
                width: R2 * 2, height: R2 * 2,
                left: CX - R2, top: CY - R2,
                backgroundColor: '#111111', border: '1px solid #252525', zIndex: 4,
            }} />

            {/* ══════════════════════════════════════════════════════════════
                LAYER 4 — SERVICE LABELS  (rotate with wheel)
            ══════════════════════════════════════════════════════════════ */}
            <div className="absolute pointer-events-none" style={{ left: CX, top: CY, zIndex: 5 }}>
                <div style={{ transform: `rotate(${angleOffset}deg)` }}>
                    {SERVICES.map((s, i) => {
                        const deg      = (i / N) * 360;
                        const rad      = deg * Math.PI / 180;
                        const isActive = i === activeIndex;
                        const lblSize  = isActive
                            ? Math.max(8, Math.round(11.5 * scale))
                            : Math.max(7, Math.round(9.5  * scale));
                        return (
                            <React.Fragment key={s.id}>
                                {/* Tick mark */}
                                <div className="absolute" style={{
                                    left: R2 * Math.cos(rad) - 8,
                                    top:  R2 * Math.sin(rad) - (isActive ? 1 : 0.5),
                                    width: 16, height: isActive ? 1.5 : 0.75,
                                    backgroundColor: isActive ? '#888' : '#3a3a3a',
                                    transform: `rotate(${deg}deg)`, transformOrigin: 'center',
                                }} />
                                {/* Label */}
                                <div className="absolute" onClick={() => goTo(i)} style={{
                                    left: R_LBL * Math.cos(rad),
                                    top:  R_LBL * Math.sin(rad),
                                    transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                                    width: Math.round(194 * scale), textAlign: 'center',
                                    fontSize: lblSize,
                                    letterSpacing: isActive ? '0.24em' : '0.18em',
                                    fontWeight: isActive ? 400 : 300,
                                    color: isActive ? '#ffffff' : '#808080',
                                    fontFamily: 'var(--font-inter)', textTransform: 'uppercase',
                                    whiteSpace: 'nowrap', transition: 'color 0.4s',
                                    pointerEvents: 'auto', cursor: 'none',
                                }}>{s.shortName}</div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                LAYER 5 — RING 1  (hub)
            ══════════════════════════════════════════════════════════════ */}
            <div className="absolute rounded-full pointer-events-none" style={{
                width: R1 * 2, height: R1 * 2,
                left: CX - R1, top: CY - R1,
                backgroundColor: '#080808', border: '1px solid #303030', zIndex: 6,
            }} />
            <div className="absolute pointer-events-none" style={{
                left: CX - 42, top: CY - 7, width: 84, textAlign: 'center',
                fontSize: Math.max(8, Math.round(10 * scale)), letterSpacing: '0.38em',
                color: '#505050', fontFamily: 'var(--font-inter)', fontWeight: 300,
                textTransform: 'uppercase', zIndex: 7,
            }}>SERVICES</div>

            {/* ══════════════════════════════════════════════════════════════
                LAYER 6 — POINTER
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
                LAYER 7 — ACTIVE CONTENT PANEL

                Layout:
                  [Title — full width, wraps naturally]
                  [thin rule]
                  [Tagline (italic, 38%) │ Description (62%)]
                  [Start a project →]

                This way the title never overflows into body text,
                and both tagline + description fill the available width.
            ══════════════════════════════════════════════════════════════ */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={svc.id}
                    style={{
                        position: 'absolute',
                        left: contentLeft, right: 0,
                        top: CY - BAND, height: BAND * 2,
                        paddingRight: contentRight,
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'center',
                        overflowX: 'hidden',
                        zIndex: 10,
                    }}
                    initial={{ opacity: 0, y: scrollDir * 52, x: arcX(scrollDir * BAND) }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: scrollDir * -52, x: arcX(scrollDir * -BAND) }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {/* ── Title (full panel width) ── */}
                    <h2 style={{
                        fontSize: titleSize, fontWeight: 300, color: '#0c0c0c',
                        lineHeight: 1.05, letterSpacing: '-0.02em',
                        whiteSpace: 'pre-line',
                        marginBottom: Math.round(14 * scale),
                        fontFamily: 'var(--font-inter)',
                    }}>{svc.title}</h2>

                    {/* ── Rule ── */}
                    <div style={{
                        width: 32, height: 1, backgroundColor: '#bbb',
                        marginBottom: Math.round(18 * scale),
                    }} />

                    {/* ── Body row: Tagline | Description side-by-side ── */}
                    <div style={{
                        display: 'flex', gap: bodyGap, alignItems: 'flex-start',
                        marginBottom: Math.round(26 * scale),
                    }}>
                        {/* Tagline — italic, ~38% */}
                        <p style={{
                            flex: '0 0 38%', minWidth: 0,
                            fontSize: Math.max(12, Math.round(15 * scale)),
                            fontWeight: 300, color: '#444',
                            lineHeight: 1.75, fontStyle: 'italic',
                            fontFamily: 'var(--font-inter)',
                        }}>{svc.tagline}</p>

                        {/* Description — remaining width */}
                        <p style={{
                            flex: 1, minWidth: 0,
                            fontSize: Math.max(11, Math.round(13 * scale)),
                            fontWeight: 300, color: '#777',
                            lineHeight: 1.9, fontFamily: 'var(--font-inter)',
                        }}>{svc.description}</p>
                    </div>

                    {/* ── CTA ── */}
                    <Link href="/contact" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        fontSize: Math.max(9, Math.round(10 * scale)),
                        letterSpacing: '0.28em', textTransform: 'uppercase',
                        fontWeight: 300, color: '#222', textDecoration: 'none',
                        borderBottom: '1px solid rgba(0,0,0,0.22)', paddingBottom: 3,
                        fontFamily: 'var(--font-inter)', width: 'fit-content',
                    }}>Start a project →</Link>
                </motion.div>
            </AnimatePresence>

            {/* ══════════════════════════════════════════════════════════════
                LOGO + HAMBURGER
            ══════════════════════════════════════════════════════════════ */}
            <div className="fixed pointer-events-none" style={{
                top: 28, left: 24, zIndex: 50,
                fontSize: Math.max(12, Math.round(15 * scale)),
                letterSpacing: '0.4em', fontWeight: 300,
                textTransform: 'uppercase', fontFamily: 'var(--font-inter)',
                color: '#ffffff', transition: 'color 0.4s',
            }}>CLOUDS</div>

            {/* mix-blend-mode:difference → white bars look dark on cream, white on dark wheel */}
            <div className="fixed" style={{
                top: 25, right: 24, zIndex: 50,
                display: 'flex', flexDirection: 'column', gap: 8,
                cursor: 'none', mixBlendMode: 'difference',
            }}>
                {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 26, height: 1.5, backgroundColor: '#ffffff' }} />
                ))}
            </div>

        </div>
    );
}

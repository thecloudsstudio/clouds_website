"use client";
import Link from 'next/link';

export default function MockupsIndex() {
    const options = [
        {
            href: '/mockups/a',
            label: 'A',
            name: 'The Darkroom',
            desc: 'Full dark. Images fill the screen one at a time. Text lives at the bottom as a quiet caption. Film-like, atmospheric, image-first.',
            bg: '#0a0a0a', fg: '#fff', accent: 'rgba(255,255,255,0.15)',
        },
        {
            href: '/mockups/b',
            label: 'B',
            name: 'The Editorial',
            desc: 'Left half: image that changes as you scroll. Right half: the project story unfolds. Split-screen magazine feel.',
            bg: '#f5f4f0', fg: '#0c0c0c', accent: 'rgba(0,0,0,0.08)',
        },
        {
            href: '/mockups/c',
            label: 'C',
            name: 'The Unroll',
            desc: 'Dark image sections snap into cream text sections. Alternating rhythm. Huge background numerals. Like unrolling an architectural scroll.',
            bg: '#1a1a1a', fg: '#fff', accent: 'rgba(255,255,255,0.08)',
        },
    ];

    return (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', fontFamily: 'var(--font-inter)' }}>
            {options.map((o) => (
                <Link key={o.href} href={o.href} style={{
                    flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    padding: '48px 40px', backgroundColor: o.bg, textDecoration: 'none',
                    borderRight: '1px solid rgba(128,128,128,0.15)',
                    transition: 'flex 0.5s cubic-bezier(0.25,0.1,0.25,1)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    {/* Large letter watermark */}
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%,-50%)',
                        fontSize: '28vw', fontWeight: 300, color: o.accent,
                        letterSpacing: '-0.05em', userSelect: 'none', lineHeight: 1,
                    }}>{o.label}</div>

                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: o.fg, opacity: 0.4, marginBottom: 16, fontWeight: 300 }}>
                            Concept {o.label}
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 300, letterSpacing: '-0.01em', color: o.fg, marginBottom: 16 }}>{o.name}</div>
                        <div style={{ width: 24, height: 1, backgroundColor: o.fg, opacity: 0.3, marginBottom: 20 }} />
                        <p style={{ fontSize: 12, fontWeight: 300, color: o.fg, opacity: 0.55, lineHeight: 1.8, maxWidth: 240 }}>{o.desc}</p>
                        <div style={{ marginTop: 32, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: o.fg, opacity: 0.6 }}>
                            View mockup →
                        </div>
                    </div>
                </Link>
            ))}

            {/* Back */}
            <Link href="/" style={{
                position: 'fixed', top: 28, left: 28, fontSize: 12, letterSpacing: '0.35em',
                textTransform: 'uppercase', color: '#fff', textDecoration: 'none',
                fontWeight: 300, fontFamily: 'var(--font-inter)', mixBlendMode: 'difference', zIndex: 50,
            }}>CLOUDS</Link>
        </div>
    );
}

"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
);

const HeroSection = () => {
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 1000], [1.1, 1]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    return (
        <div className="relative h-[80vh] w-full overflow-hidden bg-neutral-900 text-white flex items-center justify-center">
            <motion.div style={{ scale, opacity }} className="absolute inset-0 w-full h-full">
                <Image
                    src="/chettinad_hero_fusion_1767964209108.png"
                    alt="Heritage Architecture"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
            </motion.div>
            <div className="relative z-10 text-center space-y-6 max-w-4xl px-6">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-block text-sm tracking-[0.3em] uppercase border border-white/30 px-4 py-2"
                >
                    Expertise
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-7xl font-light tracking-tight"
                >
                    HERITAGE & CONSERVATION
                </motion.h1>
            </div>
        </div>
    );
};

const TextRow = ({ title, content }: { title: string, content: string }) => (
    <div className="w-full bg-white text-black py-24 md:py-32 px-6 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3">
                <div className="md:sticky md:top-32">
                    <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-neutral-900 mb-2">{title}</h2>
                    <div className="w-12 h-[1px] bg-black mt-4"></div>
                </div>
            </div>
            <div className="w-full md:w-2/3 space-y-6">
                {content.split('\n').filter(p => p.trim()).map((paragraph, index) => (
                    <p key={index} className="text-lg md:text-xl font-light leading-relaxed text-neutral-600">
                        {paragraph.trim()}
                    </p>
                ))}
            </div>
        </div>
    </div>
);

const FullWidthImage = ({ src, alt }: { src: string, alt: string }) => (
    <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden">
        <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
        >
            <Image src={src} alt={alt} fill className="object-cover" />
        </motion.div>
    </div>
);

export default function HeritageServicesClient() {
    return (
        <div className="w-full bg-white min-h-screen text-black">
            <HeroSection />

            <FadeIn>
                <TextRow
                    title="Conservation & Heritage"
                    content={`Rigorous, pragmatic and with a clear knowledge of the constraints linked to conservation and heritage buildings, the studio embraces the challenge that comes with successfully and harmoniously integrating contemporary design within a period space.

Our approach is one of sensitivity and respect, balancing the preservation of the past with the needs of the present. We work alongside heritage bodies and specialist craftsmen to ensure that every intervention is reversible and authentic to the building's history.`}
                />
            </FadeIn>

            <FullWidthImage src="/chettinad_courtyard_colorized_1767964112792.png" alt="Heritage Restoration" />

            <FadeIn>
                <TextRow
                    title="Adaptive Reuse"
                    content={`We believe that the most sustainable building is the one that already exists. Our expertise in adaptive reuse allows us to breathe new life into historic structures, repurposing them for contemporary living or commercial use while retaining their unique character.

From transforming traditional Chettinad mansions into boutique hotels to converting industrial warehouses into creative workspaces, we find innovative ways to unlock the potential of heritage assets.`}
                />
            </FadeIn>

            <FullWidthImage src="/chettinad_bedroom_colorized_1767964135344.png" alt="Adaptive Reuse Interior" />

            <FadeIn>
                <TextRow
                    title="Traditional Craftsmanship"
                    content={`Central to our heritage work is a deep appreciation for traditional craftsmanship. We collaborate with local artisans who are masters of their trade—whether it's Athangudi tile making, lime plastering, or intricate woodwork.

By integrating these traditional techniques with modern construction methods, we preserve intangible cultural heritage while delivering buildings that meet the highest standards of comfort and performance.`}
                />
            </FadeIn>

            <FullWidthImage src="/chettinad_dining_colorized_1767964163160.png" alt="Traditional Craftsmanship" />

            <FadeIn>
                <TextRow
                    title="Planning in Heritage Contexts"
                    content={`Navigating the planning process for listed buildings and conservation areas requires specific expertise. Our team has a proven track record of securing planning permissions for sensitive heritage sites.

We prepare detailed heritage impact assessments and work constructively with planning officers and conservation teams to demonstrate how our proposals enhance the significance of the heritage asset.`}
                />
            </FadeIn>

            <FullWidthImage src="/chettinad_terrace_colorized_1767964188693.png" alt="Heritage Context" />

        </div>
    );
}

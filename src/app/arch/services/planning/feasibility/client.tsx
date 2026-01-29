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
                    src="/urban_massing_model_1767966174787.png"
                    alt="Feasibility Studies"
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
                    FEASIBILITY STUDIES
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

export default function FeasibilityStudiesClient() {
    return (
        <div className="w-full bg-white min-h-screen text-black">
            <HeroSection />

            <FadeIn>
                <TextRow
                    title="Site Appraisal"
                    content={`Before embarking on any project, understanding the potential and constraints of a site is crucial. Our site appraisal service provides a comprehensive analysis of the physical, legal, and planning context of potential development sites.

We investigate factors such as access, topography, orientation, and surrounding context to provide an initial assessment of development viability. This early-stage insight helps clients make informed decisions about land acquisition and project scope.`}
                />
            </FadeIn>

            <FullWidthImage src="/site_analysis_diagram_1767966156779.png" alt="Site Analysis" />

            <FadeIn>
                <TextRow
                    title="Capacity Studies"
                    content={`Development capacity studies explore the maximum potential of a site. By testing various massing options and density models, we identify the optimal balance between development quantum and architectural quality.

Our approach is design-led but commercially grounded. We use 3D massing models to test build forms against planning policies such as daylight, overlooking, and townscape impact, ensuring that our proposals are robust and deliverable.`}
                />
            </FadeIn>

            <FullWidthImage src="/urban_massing_model_1767966174787.png" alt="Massing Study" />

            <FadeIn>
                <TextRow
                    title="Concept Design"
                    content={`Following the initial feasibility checks, we develop concept designs that breathe life into the data. These early architectural sketches and visualizations help stakeholders envision the transformation of the site.

From loose hand sketches to preliminary 3D visualizations, we communicate the design intent clearly and effectively. This stage is vital for pre-application discussions with planning authorities and for securing investor confidence.`}
                />
            </FadeIn>

            <FullWidthImage src="/architectural_sketch_concept_1767966138243.png" alt="Concept Sketch" />

            <FadeIn>
                <TextRow
                    title="Pre-Application Advice"
                    content={`Engaging with the local planning authority early in the process significantly de-risks a project. We prepare comprehensive pre-application documents that frame the design narrative and justify the development principles.

Our experience in navigating these early consultations ensures that key planning issues are addressed before the submission of a full planning application, streamlining the route to consent.`}
                />
            </FadeIn>

            <FullWidthImage src="/chennai_office_facade_detail_1767693844620.png" alt="Technical Consultation" />

        </div>
    );
}

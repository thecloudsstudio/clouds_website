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
                    src="/bangalore_villa_exterior_dusk_1767692214973.png"
                    alt="Planning Applications"
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
                    PLANNING APPLICATIONS
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

export default function PlanningApplicationsClient() {
    return (
        <div className="w-full bg-white min-h-screen text-black">
            <HeroSection />

            <FadeIn>
                <TextRow
                    title="Planning Permission"
                    content={`The purpose of planning permission is to regulate the development and use of land in the public interest. Planning permission is required for most building work where the external building mass is modified or extended, or where it is proposed to change the use of a building, or land.

Regulations across the country can vary depending on specific conditions set by each local authority. It will also depend on the type of building or land classification, such as whether the property falls under a conservation area, or if the property sits on a heritage site such as a listed building.`}
                />
            </FadeIn>

            <FullWidthImage src="/chettinad_terrace_colorized_1767964188693.png" alt="Planning Context" />

            <FadeIn>
                <TextRow
                    title="Building Regulations"
                    content={`As well as planning permission, property owners and developers are required by law to obtain Building Regulation approval for any building project that involves health and safety. These important regulations include requirements for building design and construction to ensure health and safety regulations are appropriately met.`}
                />
            </FadeIn>

            <FullWidthImage src="/chennai_office_facade_detail_1767693844620.png" alt="Technical Detail" />

            <FadeIn>
                <TextRow
                    title="Our Planning Team"
                    content={`Our planning application team provide straightforward expert advice, from initial consultations through to creating complete planning application packages to suit each individual requirement. Our advice is measured against the individual regulations set by each council, to ensure the best success for each application.`}
                />
            </FadeIn>

            <FullWidthImage src="/chennai_office_atrium_1767693827347.png" alt="Planning Team" />

            <FadeIn>
                <TextRow
                    title="Site Analysis"
                    content={`Initially, we will undertake local research: feasibility and precedent studies; and a full site appraisal, in order that we understand the context of the planning application.`}
                />
            </FadeIn>

            <FullWidthImage src="/kerala_resort_aerial_colorized_1767793602663.png" alt="Site Analysis" />

            <FadeIn>
                <TextRow
                    title="Design & Application"
                    content={`Our architectural team provide design ideas and planning solutions from straightforward extensions, to complex building alterations, including conservation & heritage buildings.

Our planning team provide: building surveys; Building Enhancement Statements; Design and Access Statements; Traffic Management Plans; Environmental Impact Assessment reports (EIA); Liaison with local planning departments; Planning application forms; Conservation and Heritage planning applications; Listed Building Consent.`}
                />
            </FadeIn>

            <FullWidthImage src="/chettinad_courtyard_colorized_1767964112792.png" alt="Heritage Consent" />

        </div>
    );
}

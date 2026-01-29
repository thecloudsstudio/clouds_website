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
                    src="/bangalore_villa_facade_color_1767792911832.png"
                    alt="Residential Architecture"
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
                    RESIDENTIAL ARCHITECTS
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
            <div className="w-full md:w-2/3">
                <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 whitespace-pre-wrap">
                    {content}
                </p>
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

export default function ResidentialServicesClient() {
    return (
        <div className="w-full bg-white min-h-screen text-black">
            <HeroSection />

            <FadeIn>
                <TextRow
                    title="Residential Architecture"
                    content="Faithful to an integrated spirit that is characteristic of the studio, our residential architecture is conceived in response to environmental, landscape and client needs. This follows a belief that our surroundings directly influence the quality of our lives. Houses, apartments, holiday homes and large-scale housing developments; the studio creates considered architecture that renders every project unique.\n\nWith an inherent fascination for exploring the varying nuances with how people live; specifically, the relationship between creating beautiful inner sanctums, and creating functional environments that suit individual needs, our architectural team of conceptual designers, and technical detailing specialists work towards a consistent and unique creative vision."
                />
            </FadeIn>

            <FullWidthImage src="/bangalore_villa_bedroom_color_1767792889582.png" alt="Residential Interior" />

            <FadeIn>
                <TextRow
                    title="Home Renovation"
                    content="Specialising in private residential projects, the studio has completed projects that span from new build designs, to home renovation and refurbishments including extensions and basements. We have completed many conservation and heritage building projects, successfully and harmoniously integrating new architectural technologies and features, into the original fabric of the building.\n\nKnown for our residential expertise, our architectural team develop innovative ideas and site-specific design solutions, bringing together creative vision and technical skills from concept to construction."
                />
            </FadeIn>

            <FullWidthImage src="/chettinad_courtyard_pillars_1767774551710.png" alt="Heritage Restoration" />

            <FadeIn>
                <TextRow
                    title="Housing"
                    content="House renovations and mixed-use projects are invariably cost-sensitive. Our residential architects work directly with our clients to evaluate project feasibility. This includes planning objectives as well as key commercial decisions regarding multiple occupancy design. The studio combines strategic thinking with design creativity to provide value-added innovative design solutions for all housing schemes. This ensures projects are attractive to the market, and meet the required long-term occupancy needs."
                />
            </FadeIn>

            <FullWidthImage src="/kerala_resort_aerial_colorized_1767793602663.png" alt="Housing Development" />

            <FadeIn>
                <TextRow
                    title="Conservation & Heritage"
                    content="Rigorous, pragmatic and with a clear knowledge of the constraints linked to conservation and heritage buildings, the Studio embraces the challenge that comes with successfully and harmoniously integrating contemporary design within a period space. Working alongside heritage bodies and our specialist team, our Studio addresses the necessity to provide elegant design solutions while combining them with ambitious creative schemes."
                />
            </FadeIn>

            <FadeIn>
                <TextRow
                    title="Planning Applications"
                    content="The architectural team have a wealth of experience with planning departments. We advise on all planning matters and building regulations, from small to large scale residential schemes. Where required, we work in consultation with heritage bodies and also external planning consultant teams."
                />
            </FadeIn>

            <FullWidthImage src="/chennai_facade_night_colorized_1767795174827.png" alt="Complex Planning" />

            <FadeIn>
                <TextRow
                    title="Architecture & Interior"
                    content="Our projects reflect a belief that architecture and interiors are synonymously linked. For a truly successful project, there is design continuity that extends beyond the exterior structure of a building, and carries through to the inside. Our architecture and interior design teams work in tandem for a consistent blend of functionality and creativity."
                />
            </FadeIn>

            <FullWidthImage src="/bangalore_villa_kitchen_color_1767792872338.png" alt="Interior Design" />

            <FadeIn>
                <TextRow
                    title="Landscape Design"
                    content="A consideration of the external landscape is an essential component to any architectural project. Whether it concerns the landscaping of a garden at the rear of a house or conceiving an illuminated walled garden to a housing development scheme, it is important to align exterior concepts to an architectural scheme. In collaboration with landscape architects, we can achieve space-appropriate, elegant and elaborate solutions."
                />
            </FadeIn>

            <FullWidthImage src="/kerala_resort_walkway_colorized_1767793650889.png" alt="Landscape Design" />

            <FadeIn>
                <TextRow
                    title="Sustainable Design"
                    content="Good design must be responsible. To this aim, the studio experiments with recycled materials, as well as responsibly sourced products in all areas of expertise. Exploration into passive ways for comfort, thermal control and shading, and ventilation, is a key element to the studio’s ethos surrounding responsible design."
                />
            </FadeIn>

            <FullWidthImage src="/chennai_biophilic_colorized_1767855835687.png" alt="Sustainable Design" />

        </div>
    );
}

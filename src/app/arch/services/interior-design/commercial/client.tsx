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
                    src="/chennai_biophilic_colorized_1767855835687.png"
                    alt="Commercial Interior Design"
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
                    COMMERCIAL INTERIORS
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

export default function CommercialInteriorClient() {
    return (
        <div className="w-full bg-white min-h-screen text-black">
            <HeroSection />

            <FadeIn>
                <TextRow
                    title="Commercial Interior Design"
                    content={`We believe that all elements that inform the character of a commercial interiors development must work together, from context to internal form, flow and aesthetic, to the needs of the inhabitants.

Collaborating with marketing, graphics and branding consultants to realise branding objectives, our interior commercial spaces are designed to be experiential. This is based on a pragmatic design principle intended to engage with the senses. We believe it is as important to create beautiful interiors, as it is to experience the beauty of good design.`}
                />
            </FadeIn>

            <FullWidthImage src="/chennai_lobby_art_colorized_1767855782255.png" alt="Experiential Commercial Design" />

            <FadeIn>
                <TextRow
                    title="Workplace"
                    content={`Carefully considered spatial planning can create workplace environments that stimulate productivity and collaboration, as well as providing crucial workflow efficiencies. We look to create spaces that motivate workers through exciting and stimulating design.

Our commercial interior design team work with our clients to create bespoke interior environments, composed with materials to render every project unique.`}
                />
            </FadeIn>

            <FullWidthImage src="/chennai_meeting_pod_colorized_1767855802746.png" alt="Modern Workplace" />

            <FadeIn>
                <TextRow
                    title="Hospitality"
                    content={`Innovative and always appropriate to the context, our restaurant and hotel interiors reflect both a rigorous design and a special consideration for function. Enriched by an expertise in commercial interiors and customised design, the attention to detail is reflected in these spaces in form as well as function.`}
                />
            </FadeIn>

            <FullWidthImage src="/kerala_resort_restaurant_colorized_v2_1767794399155.png" alt="Hospitality Interior" />

            <FadeIn>
                <TextRow
                    title="Design & Architecture"
                    content={`Successful commercial interior design services incorporate the right balance between an efficient use of space and creative solutions. Our commercial interior design team work collaboratively to achieve a coordinated balance between interior features and finishes, architectural structure and materiality.`}
                />
            </FadeIn>

            <FullWidthImage src="/chennai_office_atrium_1767693827347.png" alt="Architecture & Interiors" />

            <FadeIn>
                <TextRow
                    title="Bespoke Joinery"
                    content={`Our interiors team work alongside our furniture designers to design all and any interior bespoke joinery. We have an established reputation for joinery design and offer anything from interior furniture such as: commercial kitchens, meeting room furniture, workstations, fitted storage, reception desks, proprietary cladding.`}
                />
            </FadeIn>

            <FullWidthImage src="/chennai_cafeteria_colorized_1767795152837.png" alt="Bespoke Joinery" />

            <FadeIn>
                <TextRow
                    title="FF&E"
                    content={`The design team collaborates with renowned British, European and global product designers to source one-off pieces of furniture, interior lighting, accessories and full interior furnishings and equipment. All items are sourced, selected and procured by our interior design team.`}
                />
            </FadeIn>

            <FullWidthImage src="/chennai_office_workspace_biophilic_1767775087341.png" alt="Furniture & Finishes" />

        </div>
    );
}

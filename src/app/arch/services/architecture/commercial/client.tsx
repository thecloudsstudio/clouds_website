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
                    src="/chennai_facade_night_colorized_1767795174827.png"
                    alt="Commercial Architecture"
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
                    COMMERCIAL ARCHITECTS
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

export default function CommercialServicesClient() {
    return (
        <div className="w-full bg-white min-h-screen text-black">
            <HeroSection />

            <FadeIn>
                <TextRow
                    title="Commercial Architects"
                    content={`Our core design philosophy behind all commercial projects is to achieve the right balance between productivity enhancement, and an efficient use of space. We also provide creative solutions that encourage social interaction and stimulation.

A key strength of our commercial team is an ability to transcend brand and business identity into architectural and interior design elements. Our commercial architects bring a wealth of experience working with business owners, delivering innovative small to medium scale commercial projects across the UK. We have wide-ranging experience collaborating with outside Project Management companies, consultant design teams and contractors, on all types of commercial ventures.`}
                />
            </FadeIn>

            <FullWidthImage src="/chennai_office_atrium_1767693827347.png" alt="Collaborative Atrium" />

            <FadeIn>
                <TextRow
                    title="Workplace"
                    content={`We strive to create workplace environments that are inclusive and inspiring with people at its core.

Successful commercial architectural designs require in-depth analysis and research in order to align creative thought with business objectives. From the outset, we aspire to understand the particular needs of a business, advising clients on how creative contribution can enhance the working environment, facilitating collaborative communication and making a work space a more engaging place to be.`}
                />
            </FadeIn>

            <FullWidthImage src="/chennai_biophilic_colorized_1767855835687.png" alt="Biophilic Workplace" />

            <FadeIn>
                <TextRow
                    title="Hospitality"
                    content={`Innovative and always appropriate to the context, our restaurant and hotel designs reflect both a rigorous design and a special consideration for function. Enriched by an expertise in architectural interiors and customised design, the attention to detail is reflected in these spaces in form as well as function.`}
                />
            </FadeIn>

            <FullWidthImage src="/kerala_resort_restaurant_colorized_v2_1767794399155.png" alt="Hospitality Design" />

            <FadeIn>
                <TextRow
                    title="Architecture & Interior"
                    content={`Successful commercial interior schemes incorporate a balance between ergonomics and sophisticated creative ideas. Our architecture and interior design teams work collaboratively to achieve this harmony, understanding the importance of the interior features and finishes, and the architectural structure and materiality.`}
                />
            </FadeIn>

            <FullWidthImage src="/chennai_lobby_art_colorized_1767855782255.png" alt="Commercial Interiors" />

        </div>
    );
}

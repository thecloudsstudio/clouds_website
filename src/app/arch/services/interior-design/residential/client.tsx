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
                    src="/bangalore_villa_living_room_1767692157648.png"
                    alt="Residential Interior Design"
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
                    RESIDENTIAL INTERIORS
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

export default function ResidentialInteriorClient() {
    return (
        <div className="w-full bg-white min-h-screen text-black">
            <HeroSection />

            <FadeIn>
                <TextRow
                    title="Residential Interior Design"
                    content={`Our approach to any residential design project is to re-conceptualise what is considered an ordinary interior and elevate it to an extraordinary scheme. Cultivating the right balance between a building and its interior, our holistic ethos results in fluid, light-filled spaces that connect with their architectural surrounds.

With the support of a talented team, including highly trained residential interior designers, interior joinery designers, furnishings and procurement specialists, our interior design studio works cohesively to bring a unique identity to any design.`}
                />
            </FadeIn>

            <FullWidthImage src="/bangalore_villa_bedroom_color_1767792889582.png" alt="Luxury Bedroom" />

            <FadeIn>
                <TextRow
                    title="Homes and Apartments"
                    content={`Interior design has an ability to influence mood and the way we behave in the home. Understanding the profound impact an interior can have on the way we live, our schemes reflect a thoughtful design and a special consideration for function.

Creating spaces adapted to client’s needs, our interior design studio strives to create spectacular home interiors that effortlessly integrate with its inhabitants’ lives; resulting in sophisticated layouts with an uncompromising attention to detail.`}
                />
            </FadeIn>

            <FullWidthImage src="/bangalore_villa_bathroom_skylight_color_1767792931406.png" alt="Bespoke Bathroom" />

            <FadeIn>
                <TextRow
                    title="Housing Interiors"
                    content={`Housing projects are invariably cost-sensitive, and as such, successful projects need to be viable whilst maintaining a balance between efficiency and elegance. Our residential interior designers combine detailed, strategic thinking with design creativity to provide value-added interior design for all housing schemes.`}
                />
            </FadeIn>

            <FullWidthImage src="/kerala_resort_bedroom_colorized_1767793625502.png" alt="Housing Interior" />

            <FadeIn>
                <TextRow
                    title="Heritage & Conservation"
                    content={`Rigorous, pragmatic and with a clear knowledge of the constraints linked to conservation and heritage buildings, the Studio embraces the challenge that comes with successfully and harmoniously integrating contemporary design within a period space. Working alongside heritage bodies and our specialist heritage buildings team, our interior design studio addresses the necessity to provide elegant design solutions while combining them with ambitious creative schemes.`}
                />
            </FadeIn>

            <FullWidthImage src="/chettinad_bedroom_colorized_1767964135344.png" alt="Heritage Interior" />

            <FadeIn>
                <TextRow
                    title="Bespoke Joinery"
                    content={`With an established reputation for joinery design that draws upon a residential architectural and interior design experience, and passion for bespoke furniture, our interior design studio offers clients bespoke solutions by designing custom interiors such as kitchens, dressing rooms, libraries, cinema rooms and vanity units.`}
                />
            </FadeIn>

            <FullWidthImage src="/bangalore_villa_kitchen_color_1767792872338.png" alt="Bespoke Kitchen" />

            <FadeIn>
                <TextRow
                    title="Residential Architecture"
                    content={`The continuity of architecture and interior design is synonymous with the ethos of our Studio. Our expert teams work together for a harmonious blend of function and creativity.`}
                />
            </FadeIn>

            <FullWidthImage src="/bangalore_villa_courtyard_detail_1767692174458.png" alt="Architecture & Interiors" />

        </div>
    );
}

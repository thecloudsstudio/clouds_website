"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface ProjectDetailClientProps {
    project: {
        slug: string;
        title: string;
        location: string;
        year: string;
        description: string;
        heroImage: string;
        images: string[];
        plans: string[];
        sections: { title: string; content: string; image?: string; }[];
    };
}

const FadeIn = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const HeroSection = ({ project }: { project: ProjectDetailClientProps['project'] }) => {
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-neutral-900 text-white">
            <motion.div style={{ scale, opacity }} className="absolute inset-0 w-full h-full">
                <Image src={project.heroImage} alt={project.title} fill className="object-cover opacity-80" priority />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-16 flex flex-col items-start">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-7xl font-light uppercase tracking-wide mb-6"
                >
                    {project.title}
                </motion.h1>
                <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-sm md:text-base font-light tracking-[0.2em] text-neutral-300 uppercase">
                    <span>{project.location}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{project.year}</span>
                </div>
            </div>
        </div>
    );
};

const TextRow = ({ title, content }: { title: string; content: string }) => (
    <div className="w-full bg-white text-black py-24 md:py-32 px-6 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3">
                <div className="md:sticky md:top-32">
                    <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-neutral-900 mb-2">{title}</h2>
                    <div className="w-12 h-[1px] bg-black mt-4" />
                </div>
            </div>
            <div className="w-full md:w-2/3">
                <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 whitespace-pre-wrap">{content}</p>
            </div>
        </div>
    </div>
);

const FullWidthImage = ({ image, alt }: { image: string; alt: string }) => (
    <div className="relative w-full h-[80vh] md:h-screen bg-neutral-100">
        <Image src={image} alt={alt} fill className="object-cover" />
    </div>
);

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
    return (
        <div className="w-full bg-white min-h-screen text-black">
            <div className="fixed top-8 left-6 md:left-12 z-50 mix-blend-difference text-white">
                <Link href="/portfolio" className="flex items-center text-sm font-medium tracking-[0.2em] hover:opacity-70 transition-opacity uppercase group">
                    <ArrowLeft size={16} className="mr-3 transition-transform group-hover:-translate-x-1" />
                    Portfolio
                </Link>
            </div>

            <HeroSection project={project} />

            <div className="flex flex-col w-full">
                <FadeIn>
                    <TextRow title="Design Brief" content={project.description} />
                </FadeIn>
                {project.sections.map((section, i) => (
                    <React.Fragment key={i}>
                        <FadeIn>
                            <TextRow title={section.title} content={section.content} />
                        </FadeIn>
                        {section.image && (
                            <FadeIn>
                                <FullWidthImage image={section.image} alt={section.title} />
                            </FadeIn>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {project.plans.length > 0 && (
                <div className="bg-[#f4f4f4] text-black py-32 px-6 border-t border-neutral-200">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-light uppercase mb-16 tracking-widest">Floorplans</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {project.plans.map((p, i) => (
                                <div key={i} className="bg-white border border-neutral-200 aspect-square flex items-center justify-center p-12 hover:shadow-lg transition-shadow duration-500">
                                    <Image src={p} alt="Floorplan" width={800} height={800} className="object-contain opacity-80" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function DesignPage({ onBack }) {
    const containerRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const sections = [
        {
            title: "Where Vision",
            subtitle: "Finds Its Voice",
            content: [
                "Every idea begins as a whisper—",
                "a quiet shape in the mind,",
                "a colour without a name,",
                "a story waiting for its first breath."
            ],
            emphasis: "we listen to that whisper and give it a world"
        },
        {
            title: "The Art of",
            subtitle: "Making Thought Visible",
            content: [
                "Creativity is not an act of chance.",
                "It is intention, discipline,",
                "and the relentless pursuit of clarity."
            ],
            grid: ["A line becomes identity", "A frame becomes emotion", "A motion becomes meaning"]
        },
        {
            title: "Designing",
            subtitle: "Moments That Stay",
            content: [
                "Before anyone understands your work,",
                "they feel it."
            ],
            emphasis: "We shape that moment with care, so your story is remembered"
        },
        {
            title: "Imagery",
            subtitle: "That Breathes",
            services: [
                { name: "Identities", desc: "that feel inevitable" },
                { name: "2D Stories", desc: "that unfold like memory" },
                { name: "3D Worlds", desc: "sculpted with realism" },
                { name: "Renders", desc: "that hold silence" },
                { name: "Motion", desc: "that turns complexity into poetry" }
            ]
        },
        {
            title: "Crafted for",
            subtitle: "The Visionaries",
            content: [
                "We build for the ones who see further—",
                "the founders shaping tomorrow,",
                "the designers forging new forms,",
                "the dreamers who refuse simplicity."
            ]
        },
        {
            title: "Let Us Shape",
            subtitle: "Your Story",
            cta: true
        }
    ];

    return (
        <div ref={containerRef} className="relative bg-white text-black">
            {/* Fixed Header */}
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <nav className="max-w-[1400px] mx-auto px-8 py-6 flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
                    >
                        <ArrowLeft className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    </button>
                    <div className="text-white text-sm font-light tracking-[0.3em]">DESIGN</div>
                </nav>
            </motion.header>

            {/* Progress Indicator */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-black z-50"
                style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
            />

            {/* Sections */}
            {sections.map((section, index) => (
                <Section
                    key={index}
                    section={section}
                    index={index}
                    mousePosition={mousePosition}
                    progress={scrollYProgress}
                />
            ))}

            {/* Footer */}
            <footer className="py-16 text-center border-t border-black/10">
                <p className="text-xs tracking-[0.2em] text-gray-400">CLOUDS STUDIO © 2024</p>
            </footer>
        </div>
    );
}

function Section({ section, index, mousePosition, progress }) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const isEven = index % 2 === 0;
    const bgColor = section.cta ? 'bg-black text-white' : (isEven ? 'bg-white' : 'bg-gray-50');

    return (
        <motion.section
            ref={sectionRef}
            className={`min-h-screen flex items-center justify-center px-8 py-32 ${bgColor} relative overflow-hidden`}
            style={{ opacity, scale }}
        >
            {/* Decorative Elements */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                }}
            >
                <div className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full ${section.cta ? 'bg-white/5' : 'bg-black/2'} blur-3xl`} />
                <div className={`absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full ${section.cta ? 'bg-white/3' : 'bg-black/3'} blur-3xl`} />
            </motion.div>

            <div className="max-w-[900px] w-full relative z-10">
                {/* Title */}
                <motion.div
                    className="mb-16"
                    style={{ y }}
                >
                    <motion.h2
                        className="text-6xl md:text-8xl font-extralight tracking-tight leading-none mb-2"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        {section.title}
                    </motion.h2>
                    <motion.h3
                        className="text-6xl md:text-8xl font-extralight tracking-tight leading-none"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        {section.subtitle}
                    </motion.h3>
                </motion.div>

                {/* Content */}
                {section.content && (
                    <motion.div
                        className="space-y-4 text-xl md:text-2xl font-light text-gray-600 max-w-[600px]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        {section.content.map((line, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.7 + i * 0.1 }}
                                className="leading-relaxed"
                            >
                                {line}
                            </motion.p>
                        ))}
                    </motion.div>
                )}

                {/* Grid */}
                {section.grid && (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        {section.grid.map((item, i) => (
                            <motion.div
                                key={i}
                                className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <p className="text-lg font-light">{item}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Services Grid */}
                {section.services && (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        {section.services.map((service, i) => (
                            <motion.div
                                key={i}
                                className="group p-8 border border-black/5 hover:border-black/20 rounded-xl transition-all duration-300"
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
                                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                            >
                                <h4 className="text-2xl font-light mb-2 group-hover:text-gray-600 transition-colors">
                                    {service.name}
                                </h4>
                                <p className="text-gray-500 font-light">{service.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Emphasis */}
                {section.emphasis && (
                    <motion.p
                        className="text-3xl md:text-4xl font-light italic mt-16 leading-relaxed text-gray-700"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        {section.emphasis}
                    </motion.p>
                )}

                {/* CTA */}
                {section.cta && (
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        <p className="text-2xl md:text-3xl font-light mb-12 text-white/80 leading-relaxed max-w-[600px] mx-auto">
                            If you have a vision waiting for form,<br />
                            a message waiting for a moment—
                        </p>
                        <motion.button
                            className="px-12 py-4 bg-white text-black text-sm font-light tracking-[0.3em] hover:bg-gray-100 transition-colors duration-300 rounded-full"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            BEGIN THE JOURNEY
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
}

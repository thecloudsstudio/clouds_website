"use client";

import React from 'react';
import { motion } from 'framer-motion';

const services = [
    {
        id: "architecture",
        title: "Architectural Design",
        description: "We are committed to contemporary culture and its relationship to the built environment. Our architectural approach is rooted in a deep understanding of place, climate, and the specific needs of our clients.",
        details: [
            "Concept Design",
            "Planning Applications",
            "Detailed Design",
            "Construction Documentation",
            "Site Supervision"
        ]
    },
    {
        id: "interior",
        title: "Interior Design",
        description: "Our interior design practice is focused on the user experience. We create spaces that are tactile, atmospheric, and tailored to the individual. We believe in the power of materials and light to transform everyday rituals.",
        details: [
            "Space Planning",
            "Material Selection",
            "Bespoke Furniture Design",
            "Lighting Design",
            "Art Curation"
        ]
    },
    {
        id: "conservation",
        title: "Conservation & Heritage",
        description: "We have extensive experience in working with listed buildings and heritage sites particularly in Tamil Nadu. Our approach is one of sensitivity and respect, balancing the preservation of the past with the needs of the present.",
        details: [
            "Heritage Impact Assessments",
            "Restoration",
            "Adaptive Reuse",
            "Conservation Strategy"
        ]
    }
];

export default function ArchServices() {
    return (
        <div className="w-full bg-white pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-light tracking-tight text-black mb-24 uppercase"
                >
                    Our Expertise
                </motion.h1>

                <div className="space-y-32">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            id={service.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-100 pt-12"
                        >
                            <div>
                                <h2 className="text-2xl font-light mb-6 tracking-wide uppercase">{service.title}</h2>
                            </div>
                            <div>
                                <p className="text-gray-500 font-light leading-relaxed mb-8 text-lg">
                                    {service.description}
                                </p>
                                <ul className="space-y-3">
                                    {service.details.map((detail) => (
                                        <li key={detail} className="text-sm text-gray-400 tracking-widest uppercase flex items-center">
                                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

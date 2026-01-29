"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function ArchAbout() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl"
            >
                <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-12">
                    Studio
                </h1>

                <div className="space-y-8 text-lg font-light text-gray-600 leading-relaxed">
                    <p>
                        Minale + Mann is an award-winning architectural and interior design studio based in London.
                        Founded in 2001, we have established a reputation for creating elegant, modern spaces
                        that are rigorous in their detail and construction.
                    </p>
                    <p>
                        We believe that the quality of our surroundings has a direct influence on the quality of our lives,
                        whether at home, in the workplace, or the public realm.
                    </p>
                    <p>
                        Our approach is holistic, combining architecture, interior design, and furniture design to create cohesive
                        environments that are both functional and beautiful.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

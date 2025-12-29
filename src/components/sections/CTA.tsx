"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/Button";

export default function CTA() {
    return (
        <section id="contact" className="py-32 bg-gray-100 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/80 via-gray-100 to-gray-100 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                >
                    Ready to Prevent <br />
                    <span className="text-gray-500">Quality Issues?</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
                >
                    See how ARGIS transforms your production floor. No long sales pitch.
                    Just a 30-minute conversation about your specific challenges.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Button className="w-full sm:w-auto px-8 py-4 text-xl">
                        Book a Demo
                    </Button>
                    <Link href="/roi-calculator">
                        <Button variant="outline" className="w-full sm:w-auto px-8 py-4 text-xl">
                            Calculate ROI
                        </Button>
                    </Link>
                </motion.div>

                <p className="mt-8 text-sm text-gray-500">
                    "ARGIS gave us real-time visibility into assembly quality." — Plant Manager, Auto Components
                </p>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { Camera, BrainCircuit, MonitorPlay } from "lucide-react";



export default function Solution() {
    const steps = [
        {
            id: 1,
            title: "Watch Every Workstation",
            desc: "Edge cameras capture the assembly process as it happens. Every frame analyzed, every movement tracked.",
            icon: Camera,
            delay: 0.2
        },
        {
            id: 2,
            title: "Detect Errors in Real-Time",
            desc: "AI analyzes every assembly step. Detects incomplete or incorrect steps in 2 seconds.",
            icon: BrainCircuit,
            delay: 0.6 // Increased delay for distinct "one by one" feel
        },
        {
            id: 3,
            title: "Guide Operators Instantly",
            desc: "Operator sees instant alert on nearby display. Clear instructions on how to fix.",
            icon: MonitorPlay,
            delay: 1.0 // Increased delay
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[50%] left-0 w-full h-px bg-gray-200 -translate-y-1/2 z-0">
                <motion.div
                    className="h-full bg-gray-900"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                />
            </div>

            <div className="container mx-auto px-4 z-10 relative">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
                    >
                        How <span className="text-gray-500">ARGIS</span> Works
                    </motion.h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        ARGIS combines real-time computer vision + AI-powered operator guidance.
                        Catch errors the moment they start.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                            transition={{ duration: 0.6, delay: step.delay, ease: "easeOut" }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            {/* Simplified Icon Container */}
                            <div className="w-24 h-24 mb-8 relative rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-gray-900 group-hover:shadow-lg transition-all duration-300 z-10">
                                <div className="absolute inset-0 bg-gray-50 rounded-full scale-90 group-hover:scale-100 transition-transform duration-300" />
                                <step.icon className="w-10 h-10 text-gray-900 relative z-10" strokeWidth={1.5} />

                                {/* Orbiting Dot for subtle animation */}
                                <div className="absolute inset-0 rounded-full animate-[spin_8s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-2 h-2 bg-gray-900 rounded-full absolute -top-1 left-1/2 -translate-x-1/2" />
                                </div>
                            </div>

                            {/* Step Number */}
                            <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-4 w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center z-20 ring-4 ring-white">
                                {step.id}
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed max-w-sm">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

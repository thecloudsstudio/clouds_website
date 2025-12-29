"use client";

import { motion } from "framer-motion";
import { Share2, Zap, Globe } from "lucide-react";

export default function ConsciousFactory() {
    return (
        <section className="py-24 bg-white relative overflow-hidden border-t border-gray-200">
            {/* Background Grid - Reusing global pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left: Content Header */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                            className="mb-8"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <span className="h-px w-8 bg-gray-500"></span>
                                <span className="text-gray-400 text-sm uppercase tracking-widest">Industry 4.0 Ready</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Create a <span className="text-gray-500">Conscious Factory</span>
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                One workstation is smart. Connected together, they become a conscious organism.
                                ARGIS links every assembly step across your factory floor, creating a unified intelligence
                                that learns, adapts, and optimizes production in real-time.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right: Feature List (Pointers) */}
                    <div>
                        <ul className="space-y-8">
                            {[
                                { icon: Share2, title: "Inter-Station Intelligence", desc: "If Station A detects a recurring error, Station B is instantly alerted to check incoming parts." },
                                { icon: Zap, title: "Dynamic Balancing", desc: "Real-time cycle time analysis helps you rebalance lines instantly to remove bottlenecks." },
                                { icon: Globe, title: "Multi-Plant Sync", desc: "Push quality standards update to all your factories in Bangalore, Pune, and Chennai simultaneously." },
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="flex gap-4 group"
                                >
                                    <div className="mt-1 flex-shrink-0">
                                        <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 group-hover:border-gray-900 transition-colors">
                                            <item.icon className="w-6 h-6 text-gray-900" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}

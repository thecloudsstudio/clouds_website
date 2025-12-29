"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function Comparison() {
    return (
        <section className="py-24 bg-white border-t border-gray-200">
            <div className="container mx-auto px-4">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Why ARGIS Is Different</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Others do one thing well. We do three things together—and that changes everything.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Traditional */}
                    <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-500 mb-6">Traditional Approaches</h3>
                        <ul className="space-y-4 text-gray-500">
                            <li className="flex items-center gap-2"><X className="w-5 h-5 text-gray-400" /> Post-assembly inspection only</li>
                            <li className="flex items-center gap-2"><X className="w-5 h-5 text-gray-400" /> Manual work instructions</li>
                            <li className="flex items-center gap-2"><X className="w-5 h-5 text-gray-400" /> Errors caught too late</li>
                        </ul>
                    </div>

                    {/* Competitors */}
                    <div className="p-8 rounded-2xl bg-gray-100 border border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-600 mb-6">Current Competitors</h3>
                        <ul className="space-y-4 text-gray-600">
                            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-gray-500" /> Guides operators</li>
                            <li className="flex items-center gap-2"><X className="w-5 h-5 text-gray-500" /> Expensive Enterprise Only</li>
                            <li className="flex items-center gap-2"><X className="w-5 h-5 text-gray-500" /> High hardware cost</li>
                        </ul>
                    </div>

                    {/* ARGIS */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-2xl bg-gray-900 border-2 border-gray-900 relative shadow-xl"
                    >
                        <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
                        <h3 className="text-xl font-bold text-white mb-6">ARGIS</h3>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-white" /> Real-time detection & guidance</li>
                            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-white" /> Continuous AI learning</li>
                            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-white" /> SME-friendly pricing</li>
                            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-white" /> 4-8 week implementation</li>
                        </ul>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

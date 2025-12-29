"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";
import CountUp from "../ui/CountUp";

const KPI = ({ value, label, trend, trendDir, suffix, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -40% 0px" }}
        transition={{ duration: 0.4, delay }}
        className="bg-white rounded-xl p-6 border border-gray-200 backdrop-blur-sm hover:border-gray-300 transition-colors"
    >
        <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl lg:text-5xl font-bold text-gray-900">
                <CountUp
                    to={parseFloat(value)}
                    decimals={value.includes('.') ? 1 : 0}
                    delay={delay}
                    duration={2.5 - delay}
                />
            </span>
            <span className="text-xl text-gray-500 font-medium mb-1">{suffix}</span>
        </div>
        <div className="text-gray-600 font-medium mb-4">{label}</div>

        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${trend}%` }}
                viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                transition={{ duration: 1.5, delay: delay + 0.2 }}
                className={`h-full ${trendDir === 'up' ? 'bg-gray-900' : 'bg-gray-400'}`}
            />
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
            {trendDir === 'down' ? <ArrowDown className="w-3 h-3 text-gray-900" /> : <ArrowUp className="w-3 h-3 text-gray-900" />}
            <span>{trendDir === 'down' ? 'Reduced by' : 'Improved by'} {trend}%</span>
        </div>
    </motion.div>
);

export default function Results() {
    const metrics = [
        { value: "67", suffix: "%", label: "Defect Prevention Rate", trend: 67, trendDir: "up", delay: 0 },
        { value: "63", suffix: "%", label: "Training Time Reduction", trend: 63, trendDir: "down", delay: 0.1 },
        { value: "2", suffix: "sec", label: "Error Detection Latency", trend: 95, trendDir: "down", delay: 0.2 }, // relative improvement
        { value: "6.8", suffix: "mo", label: "Payback Period", trend: 80, trendDir: "down", delay: 0.3 },
        { value: "14", suffix: "Cr", label: "Annual Cost Reduction", trend: 40, trendDir: "up", delay: 0.4 },
        { value: "3.2", suffix: "%", label: "False Positive Rate", trend: 97, trendDir: "down", delay: 0.5 },
    ];

    return (
        <section id="results" className="py-24 bg-background relative border-t border-gray-200">
            <div className="container mx-auto px-4">

                <div className="mb-16">
                    <span className="text-gray-500 font-mono text-sm tracking-wider uppercase mb-2 block">Proven Impact</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Real Pilot Results</h2>
                    <p className="text-gray-400">
                        3-month pilot with mid-tier electronics manufacturer in Bangalore. <br />
                        15 workstations. 8-layer PCB assembly. 47-step process.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {metrics.map((m, i) => (
                        <KPI key={i} {...m} />
                    ))}
                </div>

                {/* Testimonial */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                    className="mt-16 p-8 md:p-12 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col md:flex-row items-center gap-8"
                >
                    <div className="flex-1">
                        <h3 className="text-2xl font-light text-gray-900 italic mb-6 leading-relaxed">
                            "We went from inspecting 18% of our production to catching defects real-time.
                            The first month alone saved us ₹18 lakhs in rework costs. More importantly, our team feels supported, not surveilled."
                        </h3>
                        <div>
                            <div className="font-bold text-gray-900">Quality Manager</div>
                            <div className="text-gray-500 text-sm">Electronics Assembly, Bangalore</div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 w-full md:w-64 h-48 bg-gray-200 rounded-lg overflow-hidden relative grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {/* Placeholder for factory image */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm border-2 border-dashed border-gray-300 m-2 rounded">
                            Factory Floor Image
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

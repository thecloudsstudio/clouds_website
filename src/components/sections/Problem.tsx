"use client";

import { motion } from "framer-motion";
import { AlertCircle, Clock, TrendingUp, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import CountUp from "../ui/CountUp";

const StatCard = ({ icon: Icon, value, label, subtext, delay, image }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -40% 0px" }}
        transition={{ duration: 0.5, delay }}
        className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors"
    >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Icon className="w-24 h-24 text-gray-900" />
        </div>

        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gray-100 text-gray-900">
                    <Icon className="w-6 h-6" />
                </div>
                <span className="text-gray-400 text-sm font-medium">{label}</span>
            </div>

            <div className="mb-2">
                <div className="mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-gray-900">
                        <CountUp
                            to={parseFloat(value.toString().replace(/[^0-9.]/g, ''))}
                            prefix={value.toString().includes('₹') ? '₹' : ''}
                            suffix={(value.toString().includes('Cr') ? ' Cr' : '') || (value.toString().includes('%') ? '%' : '') || (value.toString().includes('Months') ? ' Months' : '')}
                            decimals={value.toString().includes('.') ? 2 : 0}
                            delay={delay} // Start staggering same as card
                            duration={2.5 - delay} // Sync landing time: Duration + Delay = 2.5s
                        />
                    </span>
                </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed max-w-[80%]">
                {subtext}
            </p>
        </div>

        {/* Optional: Add image/illustration background overlay here if needed */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 pointer-events-none" />
    </motion.div>
);

export default function Problem() {
    const stats = [
        {
            icon: DollarSign,
            value: "₹21 Cr",
            label: "Annual Loss",
            subtext: "Lost revenue per ₹100 Cr facility due to preventable defects.",
            delay: 0.1
        },
        {
            icon: TrendingUp,
            value: "14.86%",
            label: "Rework Rate",
            subtext: "1 in 7 products require expensive rework or customer returns.",
            delay: 0.2
        },
        {
            icon: AlertCircle,
            value: "23%",
            label: "Human Errors",
            subtext: "Root cause: Operators working blind with zero feedback.",
            delay: 0.3
        },
        {
            icon: Clock,
            value: "3 Months",
            label: "Training Time",
            subtext: "Time for new operators to reach full proficiency without guidance.",
            delay: 0.4
        }
    ];

    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
                    >
                        The Real Cost of <span className="text-gray-500">Manual Assembly</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg"
                    >
                        Indian manufacturers lose crores annually. Manual inspection can't keep up.
                        Operators work blind. Defects slip through.
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                {/* Bottom Insight */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 p-8 rounded-2xl bg-gray-50 border border-gray-200 text-center"
                >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Why This Matters</h3>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        These aren't abstract numbers. 70-80% of these defects are preventable—they happen because
                        operators have zero real-time feedback about whether they're assembling correctly.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}

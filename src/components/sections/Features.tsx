"use client";

import { motion } from "framer-motion";
import { Lightbulb, Activity, Users, Network } from "lucide-react";

export default function Features() {
    const features = [
        {
            title: "Real-Time Operator Guidance",
            desc: "Live step-by-step instructions. Instant alerts on missed steps. No confusion.",
            icon: Lightbulb
        },
        {
            title: "Continuous Learning System",
            desc: "Every defect found trains the system. It gets smarter with every shift.",
            icon: Activity
        },
        {
            title: "Operator Analytics",
            desc: "Identify training needs automatically. Celebrate top performers.",
            icon: Users
        },
        {
            title: "Multi-Plant Intelligence",
            desc: "Scale across facilities. Share best practices and error patterns instantly.",
            icon: Network
        }
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-gray-500 font-medium">Features</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">Built for Your Shop Floor</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 rounded-2xl hover:bg-white border border-transparent hover:border-gray-200 transition-colors group cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-300 transition-colors">
                                <feature.icon className="w-6 h-6 text-gray-700" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const services = [
    {
        id: 1,
        title: "3D MODELING",
        description: "Precise CAD modeling and photorealistic visualization for complex engineering projects. From concept to production-ready specifications."
    },
    {
        id: 2,
        title: "PRODUCT DESIGN",
        description: "From concept to production-ready designs with attention to form, function, and manufacturability. Complete design lifecycle management."
    },
    {
        id: 3,
        title: "TECHNICAL ANALYSIS",
        description: "Structural analysis, simulation, and optimization for engineering excellence. FEA, CFD, and performance validation services."
    },
    {
        id: 4,
        title: "PROTOTYPING",
        description: "Rapid prototyping and testing to validate concepts and refine designs before full-scale production. Physical and digital validation."
    }
];

const projects = [
    {
        id: 1,
        name: "Industrial Machinery Design",
        type: "MANUFACTURING EQUIPMENT",
        description: "Complete redesign of manufacturing equipment improving efficiency by 40%. From concept design through production implementation and testing validation."
    },
    {
        id: 2,
        name: "Automotive Component",
        type: "PRECISION ENGINEERING",
        description: "High-precision component design for automotive industry applications. Advanced materials analysis and performance optimization."
    },
    {
        id: 3,
        name: "Medical Device Innovation",
        type: "HEALTHCARE TECHNOLOGY",
        description: "FDA-compliant medical device design with enhanced patient safety features. Biocompatible materials and ergonomic design optimization."
    }
];

export default function DesignPage({ onBack }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <motion.div
            className="min-h-screen w-full bg-white text-black font-['Inter'] selection:bg-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-black/5 z-50 h-16">
                <nav className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-black/60 hover:text-black transition-colors duration-200"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm font-light tracking-wide">CLOUDS</span>
                    </button>
                    <div className="flex gap-14">
                        <a href="#services" className="text-xs font-normal text-gray-600 hover:text-black transition-colors duration-200 tracking-widest uppercase">SERVICES</a>
                        <a href="#projects" className="text-xs font-normal text-gray-600 hover:text-black transition-colors duration-200 tracking-widest uppercase">PROJECTS</a>
                        <a href="#about" className="text-xs font-normal text-gray-600 hover:text-black transition-colors duration-200 tracking-widest uppercase">ABOUT</a>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-8 text-center bg-white min-h-[60vh] flex items-center justify-center">
                <div className="max-w-[1000px] mx-auto">
                    <motion.h1
                        className="text-[clamp(40px,5.5vw,72px)] font-extralight leading-[1.15] tracking-[-1px] mb-8"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 1 }}
                    >
                        ELEVATED ENGINEERING SOLUTIONS FOR COMPLEX CHALLENGES
                    </motion.h1>
                    <motion.p
                        className="text-lg font-light text-gray-600 max-w-[600px] mx-auto leading-relaxed"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        Advanced 3D modeling, product design, and innovative development services that transform ideas into reality with precision and excellence.
                    </motion.p>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 px-8 bg-[#fafafa]">
                <div className="max-w-[1400px] mx-auto">
                    <h2 className="text-[clamp(32px,4vw,48px)] font-extralight text-center mb-20 tracking-tight">Engineering Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white border border-black/8 overflow-hidden">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`p-12 border-r border-black/8 last:border-r-0 cursor-pointer transition-all duration-300 min-h-[320px] flex flex-col justify-between relative group ${activeTab === index ? 'bg-black text-white' : 'hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]'}`}
                                onMouseEnter={() => setActiveTab(index)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10">
                                    <h3 className="text-lg font-normal mb-5 tracking-wide">{service.title}</h3>
                                    <p className={`text-sm font-light leading-relaxed mb-8 flex-grow ${activeTab === index ? 'text-white/85' : 'text-gray-600'}`}>
                                        {service.description}
                                    </p>
                                </div>
                                <button className={`self-start px-4 py-2 border text-[11px] font-normal tracking-widest transition-all duration-250 relative overflow-hidden ${activeTab === index ? 'border-white/30 text-white hover:text-black' : 'border-black/15 text-black hover:text-white'}`}>
                                    <span className={`absolute inset-0 transition-transform duration-300 ${activeTab === index ? 'bg-white translate-x-[-100%] hover:translate-x-0' : 'bg-black translate-x-[-100%] hover:translate-x-0'}`} />
                                    <span className="relative z-10">LEARN MORE</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Spotlight */}
            <section id="projects" className="py-24 px-8 bg-white">
                <div className="max-w-[1400px] mx-auto">
                    <h2 className="text-[clamp(32px,4vw,48px)] font-extralight text-center mb-20 tracking-tight">PROJECT SPOTLIGHT</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="bg-white border border-black/8 overflow-hidden transition-all duration-400 hover:translate-y-[-8px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:border-black/12 relative group"
                                initial={{ y: 40, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-black/[0.0] to-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                <div className="w-full h-[280px] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] flex items-center justify-center text-gray-400 text-sm font-light relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
                                    Engineering Project
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-normal mb-1.5 leading-tight">{project.name}</h3>
                                    <p className="text-[11px] font-normal text-gray-400 tracking-widest mb-4 uppercase">{project.type}</p>
                                    <p className="text-sm font-light text-gray-600 leading-relaxed">{project.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <button className="px-6 py-3 border-2 border-black bg-transparent text-black text-[11px] font-normal tracking-widest transition-all duration-300 relative overflow-hidden group hover:text-white">
                            <span className="absolute inset-0 bg-black translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                            <span className="relative z-10">VIEW ALL PROJECTS</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Partnership Section */}
            <section id="about" className="py-24 px-8 bg-[#fafafa]">
                <div className="max-w-[800px] mx-auto text-center">
                    <h2 className="text-[clamp(32px,4vw,48px)] font-extralight mb-8 tracking-tight">Partnership Approach</h2>
                    <p className="text-lg font-light text-gray-600 leading-relaxed mb-12">
                        We believe in collaborative engineering that brings together technical expertise and creative innovation to solve complex challenges. Our mission is to deliver engineering solutions that exceed expectations and drive innovation.
                    </p>
                    <button className="px-6 py-3 border-2 border-black bg-black text-white text-[11px] font-normal tracking-widest transition-all duration-300 hover:bg-transparent hover:text-black">
                        REACH OUT
                    </button>
                </div>
            </section>

            {/* Careers Section */}
            <section className="py-24 px-8 bg-white">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div className="pr-10">
                        <h2 className="text-[clamp(32px,4vw,48px)] font-extralight mb-8 tracking-tight">Join Our Team</h2>
                        <p className="text-lg font-light text-gray-600 leading-relaxed mb-12">
                            We're looking for passionate engineers who share our commitment to excellence and innovation. Join our team of experts working on cutting-edge projects across multiple industries.
                        </p>
                        <button className="px-6 py-3 border-2 border-black bg-transparent text-black text-[11px] font-normal tracking-widest transition-all duration-300 relative overflow-hidden group hover:text-white">
                            <span className="absolute inset-0 bg-black translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                            <span className="relative z-10">OPEN POSITIONS</span>
                        </button>
                    </div>
                    <div className="w-full h-[400px] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] flex items-center justify-center text-gray-400 text-sm font-light border border-black/8">
                        Team Engineering
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 px-8 bg-[#fafafa]">
                <div className="max-w-[800px] mx-auto text-center">
                    <h2 className="text-[clamp(32px,4vw,48px)] font-extralight mb-8 tracking-tight">OUR PROCESS</h2>
                    <p className="text-lg font-light text-gray-600 leading-relaxed mb-12">
                        A systematic approach to engineering excellence, from initial consultation through final delivery. Our proven methodology ensures quality, efficiency, and innovation at every stage of the development process.
                    </p>
                    <button className="px-6 py-3 border-2 border-black bg-transparent text-black text-[11px] font-normal tracking-widest transition-all duration-300 relative overflow-hidden group hover:text-white">
                        <span className="absolute inset-0 bg-black translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                        <span className="relative z-10">LEARN MORE</span>
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-8 bg-black text-white">
                <div className="max-w-[1400px] mx-auto text-center">
                    <div className="mb-8">
                        <h3 className="text-base font-normal mb-4">Contact</h3>
                        <p className="text-sm font-light text-white/70 mb-1.5">projects@thecloudsstudio.com</p>
                        <p className="text-sm font-light text-white/70">+1 (555) 123-4567</p>
                    </div>
                    <div className="flex justify-center gap-8 mb-8">
                        <a href="#" className="text-white/70 text-sm font-light hover:text-white transition-colors duration-200">Instagram</a>
                        <a href="#" className="text-white/70 text-sm font-light hover:text-white transition-colors duration-200">LinkedIn</a>
                        <a href="#" className="text-white/70 text-sm font-light hover:text-white transition-colors duration-200">YouTube</a>
                    </div>
                    <div className="pt-8 border-t border-white/15 text-xs text-white/50">
                        © 2024 Clouds Studio. All rights reserved.
                    </div>
                </div>
            </footer>
        </motion.div>
    );
}

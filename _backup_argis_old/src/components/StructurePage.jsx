import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const benefits = [
    { title: "Complete Project Support", text: "Design help, permit assistance, and project management — all included." },
    { title: "Streamlined Operations", text: "Fast quoting, accurate deliveries, and less back-and-forth." },
    { title: "Professional-Grade Range", text: "From residential homes to commercial complexes, we've got your project covered." },
    { title: "Your Clients Stay Yours", text: "We support you, not compete with you. Relationships stay yours." },
    { title: "True Partnership Pricing", text: "Earn a real margin on architecture — no games, no retail markup." },
    { title: "Design Excellence", text: "Award-winning designs that balance aesthetics with functionality and sustainability." }
];

const services = [
    { icon: "🏠", title: "Residential Architecture", text: "Custom homes and residential complexes designed for modern living with contemporary aesthetics." },
    { icon: "🏢", title: "Commercial Design", text: "Office buildings, retail spaces, and mixed-use developments that maximize functionality." },
    { icon: "🏛️", title: "Public Buildings", text: "Educational institutions and civic buildings designed with accessibility and community focus." },
    { icon: "🏭", title: "Industrial Architecture", text: "Manufacturing facilities and industrial complexes optimized for operational efficiency." }
];

const audience = [
    { label: "You're in the right place if you're a...", title: "Architects", text: "We can assist in bringing your technical and custom designs to life with precision, care,and a design process you can count on." },
    { label: "You're in the right place if you're a...", title: "Custom Home Builders", text: "Build homes your clients will love — with curated styles, efficient design, and cost-conscious options that protect your bottom line." },
    { label: "You're in the right place if you're a...", title: "Interior Designers", text: "Let us help bring your creative vision to life. From space planning to design coordination, we're your behind-the-scenes partner in beautiful, buildable design." },
    { label: "You're in the right place if you're a...", title: "Contractors & Installers", text: "We can be your go-to design team — dependable plans, clear communication, and responsive support to keep your projects on track." }
];

export default function StructurePage({ onBack }) {
    const elementsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            },
            { threshold: 0.1 }
        );

        elementsRef.current.forEach(el => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            className="min-h-screen w-full bg-white text-[#333333] font-['Inter'] selection:bg-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 bg-white border-b border-[#f0f0f0] z-50 py-6">
                <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center">
                    <button onClick={onBack} className="flex items-center gap-2 text-[#666666] hover:text-black transition-colors duration-300">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-2xl font-bold tracking-tight">CLOUDS ARCH</span>
                    </button>
                    <div className="hidden md:flex gap-8">
                        <a href="#services" className="text-[#666666] hover:text-black transition-colors duration-300">Services</a>
                        <a href="#projects" className="text-[#666666] hover:text-black transition-colors duration-300">Projects</a>
                        <a href="#contact" className="text-[#666666] hover:text-black transition-colors duration-300">Contact</a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-40 pb-32 text-center bg-white">
                <div className="max-w-[800px] mx-auto px-8">
                    <h1 className="text-6xl md:text-7xl font-light tracking-tight leading-[1.1] mb-8 animate-on-scroll fade-up" ref={el => elementsRef.current[0] = el}>
                        Your Invitation to True Partnership
                    </h1>
                    <p className="text-xl text-[#666666] leading-relaxed mb-12 max-w-[600px] mx-auto animate-on-scroll fade-up" ref={el => elementsRef.current[1] = el}>
                        Architectural excellence delivers expert design solutions, creating beautiful and functional spaces with quality craftsmanship.
                    </p>
                    <a href="#contact" className="inline-block bg-black text-white px-8 py-4 font-medium transition-all duration-300 hover:bg-[#333] animate-on-scroll scale-in" ref={el => elementsRef.current[2] = el}>
                        Work with us
                    </a>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-white" id="services">
                <div className="max-w-[1400px] mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-light mb-6 animate-on-scroll fade-down" ref={el => elementsRef.current[3] = el}>Why Partner with Clouds Arch?</h2>
                        <p className="text-lg text-[#666666] max-w-[600px] mx-auto animate-on-scroll fade-up" ref={el => elementsRef.current[4] = el}>
                            We built the architectural service model that should've existed all along, one that supports your success without getting in your way.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="animate-on-scroll fade-up transition-all duration-400 hover:translate-y-[-8px] hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                                ref={el => elementsRef.current[5 + index] = el}
                                style={{ transitionDelay: `${index * 0.1}s` }}
                            >
                                <h3 className="text-xl font-semibold mb-4 leading-tight">{benefit.title}</h3>
                                <p className="text-[#666666] mb-6 leading-relaxed">{benefit.text}</p>
                                <a href="#services" className="text-black underline font-medium hover:opacity-70 transition-opacity duration-300">Read more</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 bg-[#f8f9fa]">
                <div className="max-w-[1400px] mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-light mb-6">Architecture & Design That Fits the Way You Work</h2>
                        <p className="text-lg text-[#666666]">Designed to move fast and look sharp.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white p-0 transition-all duration-400 hover:translate-y-[-6px] hover:scale-[1.015] hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
                            >
                                <div className="w-[60px] h-[60px] mb-6 bg-[#f0f0f0] rounded-lg flex items-center justify-center text-2xl">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-semibold mb-4 leading-tight">{service.title}</h3>
                                <p className="text-[#666666] mb-6 leading-relaxed">{service.text}</p>
                                <a href="#contact" className="text-black underline font-medium hover:opacity-70 transition-opacity duration-300">Explore Our Services</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Target Audience Section */}
            <section className="py-24 bg-white" id="projects">
                <div className="max-w-[1400px] mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {audience.map((item, index) => (
                            <div key={index} className="transition-all duration-400 overflow-hidden hover:translate-y-[-10px] hover:scale-[1.03] hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)]">
                                <div className="w-full h-[300px] bg-[#f0f0f0] mb-8 rounded-lg bg-cover bg-center transition-transform duration-600 hover:scale-110" />
                                <p className="text-sm text-[#666666] mb-2 leading-relaxed">{item.label}</p>
                                <h3 className="text-3xl font-semibold mb-6 leading-tight">{item.title}</h3>
                                <p className="text-[#666666] mb-8 leading-relaxed">{item.text}</p>
                                <a href="#contact" className="text-black underline font-medium hover:opacity-70 transition-opacity duration-300">See Contractor Services</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24 bg-black text-white text-center" id="contact">
                <div className="max-w-[1400px] mx-auto px-8">
                    <h2 className="text-5xl md:text-6xl font-light mb-8 leading-tight">Ready to Get Started?</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button className="bg-white text-black px-8 py-4 font-medium transition-all duration-300 hover:bg-[#f0f0f0]">Schedule a Consultation</button>
                        <button className="bg-transparent text-white border border-white px-8 py-4 font-medium transition-all duration-300 hover:bg-white hover:text-black">View Portfolio</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-black text-white text-center">
                <div className="flex justify-center gap-8 flex-wrap mb-8">
                    <a href="#" className="text-white underline hover:opacity-70 transition-opacity duration-300">About</a>
                    <a href="#" className="text-white underline hover:opacity-70 transition-opacity duration-300">Services</a>
                    <a href="#" className="text-white underline hover:opacity-70 transition-opacity duration-300">Portfolio</a>
                    <a href="#" className="text-white underline hover:opacity-70 transition-opacity duration-300">Contact</a>
                </div>
                <div className="flex justify-center gap-8 mt-8 pt-8 border-t border-[#333]">
                    <p className="text-[#666] text-sm">© 2024 Clouds Arch. All rights reserved.</p>
                </div>
            </footer>

            <style jsx>{`
                .animate-on-scroll {
                    opacity: 0;
                    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                .animate-on-scroll.animated {
                    opacity: 1;
                }
                .fade-up {
                    transform: translateY(60px);
                }
                .fade-up.animated {
                    transform: translateY(0);
                }
                .fade-down {
                    transform: translateY(-60px);
                }
                .fade-down.animated {
                    transform: translateY(0);
                }
                .scale-in {
                    transform: scale(0.9);
                }
                .scale-in.animated {
                    transform: scale(1);
                }
            `}</style>
        </motion.div>
    );
}

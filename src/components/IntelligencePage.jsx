import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const problems = [
    { icon: "⚠", title: "Manual Inspection", text: "Human inspectors can miss defects, leading to quality issues and inconsistent standards across production lines." },
    { icon: "◐", title: "Limited Visibility", text: "Lack of real-time data and insights makes it difficult to optimize processes and prevent issues before they occur." },
    { icon: "◷", title: "Reactive Approach", text: "Problems are discovered after they happen, leading to costly downtime, waste, and reduced productivity." }
];

const technologies = [
    { icon: "◉", title: "Computer Vision", text: "Advanced visual recognition systems that can detect defects, monitor processes, and ensure quality standards with superhuman accuracy." },
    { icon: "◎", title: "Custom LLMs", text: "Tailored language models trained on your specific manufacturing processes, providing contextual guidance and intelligent decision support." },
    { icon: "◈", title: "Real-time Analytics", text: "Continuous data processing and analysis that turns every data point into actionable insights for immediate optimization." }
];

const benefits = [
    { icon: "✓", title: "Zero-defect production", text: "through real-time quality monitoring and immediate corrective actions" },
    { icon: "◈", title: "Predictive maintenance", text: "that prevents downtime before issues occur" },
    { icon: "◗", title: "Continuous optimization", text: "as the system learns and improves processes automatically" },
    { icon: "◎", title: "Personalized guidance", text: "for workers at each station based on real-time conditions" },
    { icon: "◉", title: "Complete visibility", text: "into every aspect of your manufacturing process" },
    { icon: "◆", title: "Scalable intelligence", text: "that grows with your operation and adapts to new requirements" }
];

export default function IntelligencePage({ onBack }) {
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
            className="min-h-screen w-full bg-white text-[#333] font-['Inter'] selection:bg-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-[#e9ecef] z-50 py-4">
                <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center">
                    <button onClick={onBack} className="flex items-center gap-2 text-[#333] hover:text-black transition-colors duration-300">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-2xl font-medium tracking-[0.1em]">CLOUDS</span>
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-24 px-8 text-center bg-gradient-to-br from-[#f8f9fa] to-white min-h-screen flex items-center">
                <div className="max-w-[1200px] mx-auto">
                    <h1 className="text-6xl md:text-7xl font-extralight text-[#333] mb-6 tracking-[0.1em] animate-on-scroll" ref={el => elementsRef.current[0] = el}>
                        Clouds Automation
                    </h1>
                    <p className="text-2xl font-light text-[#666] mb-12 max-w-[800px] mx-auto animate-on-scroll" ref={el => elementsRef.current[1] = el}>
                        Revolutionizing manufacturing with AI-powered intelligence. Every workstation gets a brain, every factory becomes conscious.
                    </p>
                    <div className="w-[300px] h-[200px] mx-auto bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] border-2 border-[#dee2e6] rounded-lg flex items-center justify-center text-[#666] relative overflow-hidden">
                        <div className="absolute top-[20%] left-[20%] text-2xl float-animation">◉</div>
                        <div className="absolute top-[40%] right-[25%] text-xl pulse-animation">◈</div>
                        <div className="absolute bottom-[25%] left-[30%] text-xl float-animation">◎</div>
                        <span className="text-lg font-light z-10 relative">Intelligent Manufacturing</span>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-24 px-8 bg-white min-h-screen flex items-center">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-5xl font-light text-center mb-4">The Manufacturing Challenge</h2>
                    <p className="text-center text-[#666] text-lg max-w-[700px] mx-auto mb-16">
                        Traditional manufacturing lacks real-time intelligence, leading to inefficiencies, quality issues, and missed opportunities for optimization.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                        {problems.map((problem, index) => (
                            <div key={index} className="text-center p-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] border-2 border-[#dee2e6] rounded-full mx-auto mb-6 flex items-center justify-center text-3xl text-[#666] transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
                                    {problem.icon}
                                </div>
                                <h3 className="text-xl font-medium mb-4">{problem.title}</h3>
                                <p className="text-[#666] font-light">{problem.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-24 px-8 bg-[#f8f9fa] min-h-screen flex items-center">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-5xl font-light text-center mb-16">The ARGIS Solution</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-lg text-[#666] font-light mb-8 leading-relaxed">
                                Clouds Automation transforms manufacturing through our proprietary ARGIS algorithm - a revolutionary system that combines computer vision, custom LLMs, and augmented reality to create intelligent workstations.
                            </p>
                            <div className="bg-[#333] text-white p-8 rounded-lg mb-8">
                                <h3 className="text-3xl font-medium mb-4 tracking-wide">ARGIS Algorithm</h3>
                                <p className="font-light opacity-90">
                                    Augmented Reality Guidance and Inspection System - Our proprietary AI that provides real-time guidance, quality inspection, and intelligent decision-making at every workstation.
                                </p>
                            </div>
                            <p className="text-lg text-[#666] font-light leading-relaxed">
                                Each workstation becomes a smart node in your factory network, capable of learning, adapting, and providing valuable insights that contribute to a truly conscious manufacturing environment.
                            </p>
                        </div>
                        <div className="w-full h-[400px] bg-gradient-to-br from-white to-[#f8f9fa] border-2 border-[#dee2e6] rounded-lg flex items-center justify-center relative">
                            <div className="absolute w-[40px] h-[40px] bg-gradient-to-br from-[#333] to-[#666] rounded-full flex items-center justify-center text-white text-xl top-[15%] left-[15%] pulse-animation">◉</div>
                            <div className="absolute w-[40px] h-[40px] bg-gradient-to-br from-[#333] to-[#666] rounded-full flex items-center justify-center text-white text-xl top-[20%] right-[20%] float-animation">◈</div>
                            <div className="absolute w-[40px] h-[40px] bg-gradient-to-br from-[#333] to-[#666] rounded-full flex items-center justify-center text-white text-xl bottom-[30%] left-[25%] pulse-animation">◎</div>
                            <div className="absolute w-[40px] h-[40px] bg-gradient-to-br from-[#333] to-[#666] rounded-full flex items-center justify-center text-white text-xl bottom-[25%] right-[15%] float-animation">◆</div>
                            <span className="text-xl text-[#666] font-light z-10">Smart Workstation Network</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Section */}
            <section className="py-24 px-8 bg-white min-h-screen flex items-center">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-5xl font-light text-center mb-16">Core Technologies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {technologies.map((tech, index) => (
                            <div key={index} className="bg-[#f8f9fa] p-12 rounded-lg border border-[#e9ecef] text-center transition-all duration-400 hover:translate-y-[-10px] hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)]">
                                <div className="w-[100px] h-[100px] bg-gradient-to-br from-white to-[#f8f9fa] border-2 border-[#dee2e6] rounded-lg mx-auto mb-8 flex items-center justify-center text-4xl text-[#666]">
                                    {tech.icon}
                                </div>
                                <h3 className="text-2xl font-medium mb-4">{tech.title}</h3>
                                <p className="text-[#666] font-light">{tech.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 px-8 bg-[#f8f9fa] min-h-screen flex items-center">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-5xl font-light text-center mb-4">Creating Conscious Factories</h2>
                    <p className="text-center text-[#666] text-lg max-w-[800px] mx-auto mb-16">
                        When every workstation has intelligence, your entire factory becomes a self-aware ecosystem that continuously learns, adapts, and optimizes itself.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-[#333] text-white rounded-full flex items-center justify-center text-xl flex-shrink-0 mt-1">
                                    {benefit.icon}
                                </div>
                                <p className="text-[#666] font-light">
                                    <strong className="text-black">{benefit.title}</strong> {benefit.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-8 bg-[#333] text-white text-center min-h-[60vh] flex items-center">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-5xl font-light mb-6">Ready to Transform Your Factory?</h2>
                    <p className="text-xl font-light mb-12 opacity-90">
                        Let's discuss how ARGIS can bring intelligence to your manufacturing line.
                    </p>
                    <button className="bg-white text-[#333] px-12 py-4 text-lg font-medium rounded transition-all duration-300 hover:bg-[#f8f9fa] hover:translate-y-[-2px] hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
                        Schedule Demo
                    </button>
                </div>
            </section>

            <style jsx>{`
                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s ease-out;
                }
                .animate-on-scroll.animated {
                    opacity: 1;
                    transform: translateY(0);
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .float-animation {
                    animation: float 3s ease-in-out infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.05); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.8; }
                }
                .pulse-animation {
                    animation: pulse 2s ease-in-out infinite;
                }
            `}</style>
        </motion.div>
    );
}

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const services = [
    {
        title: "DESIGN",
        description: "Our select team of highly skilled designers are driven by creativity, yet our established and impactful design process is insightfully grounded in their innovation playbook.",
        icon: "◉"
    },
    {
        title: "ENGINEERING",
        description: "Our engineering team is heavily involved in the development of technical solutions, advanced tooling and manufacturing support, prototype development and validation.",
        icon: "◈"
    },
    {
        title: "UI / UX",
        description: "Our unique blend of both user interaction design and user visual design result in an optimal experience for the end user as we produce compelling digital solutions.",
        icon: "◎"
    },
    {
        title: "PROTOTYPING",
        description: "Our rapid prototyping and 3D printing service is designed to quickly produce functional prototypes with high levels of accuracy.",
        icon: "◆"
    }
];

const projects = [
    { title: "Industrial Equipment Design", category: "MANUFACTURING" },
    { title: "Medical Device Development", category: "HEALTHCARE" },
    { title: "Consumer Electronics", category: "TECHNOLOGY" },
    { title: "Automotive Components", category: "AUTOMOTIVE" },
    { title: "Aerospace Systems", category: "AEROSPACE" },
    { title: "Smart Home Products", category: "IOT" }
];

export default function DesignPage({ onBack }) {
    return (
        <motion.div
            className="min-h-screen w-full bg-white text-black font-['Inter'] selection:bg-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-black/5 z-50">
                <nav className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-3 group"
                    >
                        <div className="w-10 h-10 rounded-full bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-colors duration-300">
                            <ArrowLeft className="w-5 h-5 text-black" />
                        </div>
                    </button>
                    <div className="flex gap-12">
                        <a href="#services" className="text-sm font-light text-gray-600 hover:text-black transition-colors duration-200">Services</a>
                        <a href="#projects" className="text-sm font-light text-gray-600 hover:text-black transition-colors duration-200">Projects</a>
                        <a href="#about" className="text-sm font-light text-gray-600 hover:text-black transition-colors duration-200">About</a>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="pt-40 pb-24 px-8 text-center bg-white">
                <div className="max-w-[900px] mx-auto">
                    <motion.h1
                        className="text-5xl md:text-7xl font-extralight leading-tight tracking-tight mb-8 text-black"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 1 }}
                    >
                        ELEVATED DESIGN SOLUTIONS FOR COMPLEX CHALLENGES
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl font-light text-gray-600 leading-relaxed mb-12"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                    >
                        Point Innovation is a specialized product design and engineering firm leveraging over 25 years of experience visualizing, defining, and implementing industry-leading solutions for a global range of clientele.
                    </motion.p>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 px-8 bg-[#fafafa]">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extralight mb-4 text-black">our services</h2>
                        <a href="#about" className="text-sm text-gray-600 hover:text-black underline transition-colors duration-200">learn more</a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-8 text-center group hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
                                initial={{ y: 40, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center text-4xl text-gray-700 group-hover:scale-110 transition-transform duration-500">
                                    {service.icon}
                                </div>
                                <h3 className="text-lg font-medium tracking-wider mb-4 text-black">{service.title}</h3>
                                <p className="text-sm font-light text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Spotlight */}
            <section id="projects" className="py-24 px-8 bg-white">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extralight mb-4 text-black">project spotlight</h2>
                        <a href="#projects" className="text-sm text-gray-600 hover:text-black underline transition-colors duration-200">view all work</a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                className="group cursor-pointer"
                                initial={{ y: 40, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 mb-4 overflow-hidden">
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-light group-hover:scale-105 transition-transform duration-500">
                                        Project Image
                                    </div>
                                </div>
                                <p className="text-xs font-light text-gray-400 mb-1 tracking-wider">{project.category}</p>
                                <h3 className="text-lg font-light text-black group-hover:text-gray-600 transition-colors duration-300">{project.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-24 px-8 bg-[#fafafa]">
                <div className="max-w-[800px] mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-black">Partners</h2>
                    <p className="text-lg font-light text-gray-600 leading-relaxed mb-12">
                        We value respect internally and with our clients. Our mission is to guide you through the journey of product and experience design using a proven and successful process. We deliver an end result that stands apart for our clients.
                    </p>
                    <a href="#contact" className="inline-block px-8 py-3 bg-black text-white text-sm font-light tracking-wide hover:bg-gray-800 transition-colors duration-300">
                        reach out
                    </a>
                </div>
            </section>

            {/* Careers Section */}
            <section className="py-24 px-8 bg-white">
                <div className="max-w-[800px] mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-black">careers</h2>
                    <p className="text-lg font-light text-gray-600 leading-relaxed mb-12">
                        We are always open to new applicants. At Point Innovation, we guide some of the world's leading brands in aerospace, communications, medical technology, and transportation. Reach out if you are interested in joining our team.
                    </p>
                    <a href="#careers" className="inline-block px-8 py-3 bg-black text-white text-sm font-light tracking-wide hover:bg-gray-800 transition-colors duration-300">
                        Careers
                    </a>
                </div>
            </section>

            {/* Our Process Section */}
            <section className="py-24 px-8 bg-[#fafafa]">
                <div className="max-w-[800px] mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-black">Our process</h2>
                    <p className="text-lg font-light text-gray-600 leading-relaxed mb-12">
                        As a multi-disciplinary design consultancy, we blend creative and technical design to make your product vision become a successful reality. Our talented staff tailor our solutions to surpass your needs, meet your deadlines, and exceed your expectations.
                    </p>
                    <a href="#process" className="inline-block px-8 py-3 bg-black text-white text-sm font-light tracking-wide hover:bg-gray-800 transition-colors duration-300">
                        learn more
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-8 bg-black text-white">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                        <div>
                            <h3 className="text-sm font-light tracking-wider mb-4 opacity-70">CONTACT</h3>
                            <p className="text-sm font-light mb-2">projects@thecloudsstudio.com</p>
                            <p className="text-sm font-light">+1 (555) 123-4567</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-light tracking-wider mb-4 opacity-70">LINKS</h3>
                            <div className="flex gap-8">
                                <a href="#" className="text-sm font-light hover:opacity-70 transition-opacity duration-200">Instagram</a>
                                <a href="#" className="text-sm font-light hover:opacity-70 transition-opacity duration-200">LinkedIn</a>
                                <a href="#" className="text-sm font-light hover:opacity-70 transition-opacity duration-200">Facebook</a>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/10 text-center">
                        <p className="text-xs font-light opacity-50">© 2024 Clouds Studio. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </motion.div>
    );
}

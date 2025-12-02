import React, { useState } from 'react';
import AnimatedTabs from './AnimatedTabs';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import GetInTouchButton from './GetInTouchButton';
import logo from '../assets/images/LOGO_forwebsite.svg';

export default function Layout() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: ''
    });
    const [isSending, setIsSending] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.service || !formData.message) {
            alert('Please fill in all fields.');
            return;
        }
        if (!formData.email.includes('@') || !formData.email.includes('.')) {
            alert('Please enter a valid email address.');
            return;
        }

        setIsSending(true);
        // Simulate sending
        setTimeout(() => {
            setIsSending(false);
            closeModal();
            setFormData({ name: '', email: '', service: '', message: '' });
            alert('Message sent!');
        }, 1000);
    };

    return (
        <motion.div
            className="relative z-10 flex flex-col items-center justify-between min-h-screen px-4 py-8"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.3,
                        delayChildren: 0.2
                    }
                }
            }}
        >
            {/* Logo Section */}
            <motion.div
                className="mt-16 mb-12 flex flex-col items-center"
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1, ease: "easeOut" }
                    }
                }}
            >
                <img src={logo} alt="Clouds Logo" className="w-80 md:w-96 h-auto opacity-90 hover:opacity-100 transition-opacity duration-300" />
                <p className="text-sm md:text-base text-gray-600 font-light tracking-wide mt-3 text-center">A design & research studio</p>
            </motion.div>

            {/* Navigation Tabs */}
            <motion.div
                className="w-full max-w-4xl"
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1, ease: "easeOut" }
                    }
                }}
            >
                <AnimatedTabs />
            </motion.div>

            {/* Footer Section */}
            <motion.div
                className="mt-32 mb-12 flex flex-col items-center gap-8 w-full"
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1, ease: "easeOut" }
                    }
                }}
            >
                <div className="flex justify-center gap-6">
                    <a href="https://www.instagram.com/_cloudsstudio?igsh=MWppdmVveDVqMnN4bA" target="_blank" className="text-gray-500 transition-colors duration-300 hover:text-gray-900">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/company/c-l-o-u-d-s" target="_blank" className="text-gray-500 transition-colors duration-300 hover:text-gray-900">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://youtube.com/@clouds6996?si=l6_HjCVpdoDm64La" target="_blank" className="text-gray-500 transition-colors duration-300 hover:text-gray-900">
                        <Youtube className="w-5 h-5" />
                    </a>
                </div>
                <GetInTouchButton onClick={openModal} />
            </motion.div>

            {/* Contact Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={closeModal}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden relative animate-fade-in" onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-8">
                            <h2 className="text-2xl font-light text-center mb-2 text-[#333333]">Get in Touch</h2>
                            <p className="text-center text-gray-500 mb-6 font-light text-sm">We'd love to hear from you.</p>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors font-light"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors font-light"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                                    <select
                                        name="service"
                                        required
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors font-light bg-white"
                                    >
                                        <option value="">Select service</option>
                                        <option value="automation">Clouds Automation</option>
                                        <option value="architecture">Clouds Arch</option>
                                        <option value="engineering">Clouds Engineering</option>
                                        <option value="consultation">General consultation</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        required
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors font-light resize-none"
                                        placeholder="How can we help?"
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full bg-[#333333] text-white py-3 rounded font-medium hover:bg-[#555555] transition-colors duration-300 mt-2">
                                    {isSending ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

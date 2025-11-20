import React, { useState } from 'react';
import AnimatedTabs from './AnimatedTabs';

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
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8 text-center text-[#333333]">
            {/* Logo Section */}
            <div className="mb-8 mt-8">
                <h1 className="text-6xl md:text-7xl font-extralight tracking-[0.3em] uppercase mb-2 text-[#333333]">CLOUDS</h1>
                <p className="text-xl font-light text-[#666666] tracking-widest mb-8">Design and Research Studio</p>
            </div>

            {/* Services Section - Animated Tabs */}
            <div className="my-16 w-full max-w-4xl">
                <AnimatedTabs />
            </div>

            {/* Footer Section */}
            <div className="mt-12">
                <div className="flex justify-center gap-8 mb-8 flex-wrap">
                    <a href="https://www.instagram.com/_cloudsstudio?igsh=MWppdmVveDVqMnN4bA" target="_blank" className="text-[#666666] no-underline font-light text-sm tracking-wide transition-colors duration-300 hover:text-[#333333]">Instagram</a>
                    <a href="https://www.linkedin.com/company/c-l-o-u-d-s" target="_blank" className="text-[#666666] no-underline font-light text-sm tracking-wide transition-colors duration-300 hover:text-[#333333]">LinkedIn</a>
                    <a href="https://youtube.com/@clouds6996?si=l6_HjCVpdoDm64La" target="_blank" className="text-[#666666] no-underline font-light text-sm tracking-wide transition-colors duration-300 hover:text-[#333333]">YouTube</a>
                </div>
                <button onClick={openModal} className="bg-[#333333] text-white border-none py-4 px-10 text-base font-medium cursor-pointer tracking-wide transition-all duration-300 rounded hover:bg-[#555555] hover:-translate-y-0.5 hover:shadow-md">
                    Get in Touch
                </button>
            </div>

            {/* Contact Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn" onClick={(e) => e.target === e.currentTarget && closeModal()}>
                    <div className="bg-white p-12 rounded-lg w-[90%] max-w-[500px] relative animate-slideIn">
                        <span className="absolute right-4 top-4 text-3xl font-light cursor-pointer text-[#999999] transition-colors duration-300 hover:text-[#333333]" onClick={closeModal}>&times;</span>
                        <h3 className="text-3xl font-light text-[#333333] mb-8 tracking-widest text-center">Get In Touch</h3>
                        <form className="flex flex-col gap-6" onSubmit={handleSubmit} name="contact">
                            <div className="flex gap-4 flex-col sm:flex-row">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="flex-1 p-4 border border-[#dddddd] rounded font-inherit text-base bg-white text-[#333333] transition-colors duration-300 focus:outline-none focus:border-[#333333]"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="flex-1 p-4 border border-[#dddddd] rounded font-inherit text-base bg-white text-[#333333] transition-colors duration-300 focus:outline-none focus:border-[#333333]"
                                />
                            </div>
                            <div className="flex gap-4">
                                <select
                                    name="service"
                                    required
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    className="flex-1 p-4 border border-[#dddddd] rounded font-inherit text-base bg-white text-[#333333] transition-colors duration-300 focus:outline-none focus:border-[#333333]"
                                >
                                    <option value="">Select service</option>
                                    <option value="automation">Clouds Automation</option>
                                    <option value="architecture">Clouds Arch</option>
                                    <option value="engineering">Clouds Engineering</option>
                                    <option value="consultation">General consultation</option>
                                </select>
                            </div>
                            <div className="flex gap-4">
                                <textarea
                                    name="message"
                                    placeholder="Tell us about your project..."
                                    required
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="flex-1 p-4 border border-[#dddddd] rounded font-inherit text-base bg-white text-[#333333] transition-colors duration-300 focus:outline-none focus:border-[#333333] min-h-[120px] resize-y"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSending}
                                className="bg-[#333333] text-white border-none py-4 px-12 text-base font-medium cursor-pointer tracking-wide mt-4 transition-colors duration-300 rounded hover:bg-[#555555] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSending ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

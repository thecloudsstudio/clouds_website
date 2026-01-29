"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function ArchContact() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-16"
            >
                <div>
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-12">
                        Contact
                    </h1>

                    <div className="space-y-8 text-sm font-light text-gray-600 tracking-wide uppercase">
                        <div>
                            <h3 className="text-black mb-2">Address</h3>
                            <p>30-34 The Boulevard</p>
                            <p>London, SW1 1AB</p>
                        </div>

                        <div>
                            <h3 className="text-black mb-2">Enquiries</h3>
                            <a href="mailto:projects@thecloudsstudio.com" className="block hover:text-black transition-colors">
                                projects@thecloudsstudio.com
                            </a>
                            <p className="mt-1">+44 (0) 20 1234 5678</p>
                        </div>

                        <div>
                            <h3 className="text-black mb-2">Press</h3>
                            <a href="mailto:press@thecloudsstudio.com" className="block hover:text-black transition-colors">
                                press@thecloudsstudio.com
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bg-neutral-50 p-8 md:p-12">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-xs font-medium tracking-widest text-black uppercase mb-2">Name</label>
                            <input type="text" id="name" className="w-full bg-transparent border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs font-medium tracking-widest text-black uppercase mb-2">Email</label>
                            <input type="email" id="email" className="w-full bg-transparent border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-xs font-medium tracking-widest text-black uppercase mb-2">Message</label>
                            <textarea id="message" rows={4} className="w-full bg-transparent border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors resize-none"></textarea>
                        </div>
                        <button type="submit" className="bg-black text-white px-8 py-3 text-xs font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

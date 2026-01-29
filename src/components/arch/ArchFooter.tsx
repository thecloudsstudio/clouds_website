"use client";

import React from 'react';
import Link from 'next/link';

export default function ArchFooter() {
    return (
        <footer className="bg-neutral-50 py-16 px-6 border-t border-neutral-100">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <Link href="/arch" className="text-lg font-light tracking-[0.2em] text-black block mb-6">
                        CLOUDS
                    </Link>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                        A design & research studio focused on architectural excellence and interior innovation.
                    </p>
                </div>

                <div className="col-span-1">
                    <h4 className="text-xs font-medium tracking-widest text-black uppercase mb-6">Studio</h4>
                    <ul className="space-y-4">
                        <li><Link href="/arch/about" className="text-xs text-gray-500 hover:text-black transition-colors font-light">About Us</Link></li>
                        <li><Link href="/arch/services" className="text-xs text-gray-500 hover:text-black transition-colors font-light">Services</Link></li>
                        <li><Link href="/arch/portfolio" className="text-xs text-gray-500 hover:text-black transition-colors font-light">Portfolio</Link></li>
                    </ul>
                </div>

                <div className="col-span-1">
                    <h4 className="text-xs font-medium tracking-widest text-black uppercase mb-6">Connect</h4>
                    <ul className="space-y-4">
                        <li><a href="mailto:projects@thecloudsstudio.com" className="text-xs text-gray-500 hover:text-black transition-colors font-light">Email</a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-black transition-colors font-light">Instagram</a></li>
                        <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-black transition-colors font-light">LinkedIn</a></li>
                    </ul>
                </div>

                <div className="col-span-1">
                    <h4 className="text-xs font-medium tracking-widest text-black uppercase mb-6">Legal</h4>
                    <ul className="space-y-4">
                        <li><span className="text-xs text-gray-400 font-light">© {new Date().getFullYear()} Clouds Studio</span></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

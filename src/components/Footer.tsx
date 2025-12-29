import Link from "next/link";
import { Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white py-16 border-t border-gray-200">
            <div className="container mx-auto px-4">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold text-gray-900 mb-4 block">
                            ARGIS<span className="text-gray-400">.</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Empowering conscious factories with real-time AI guidance and quality control.
                        </p>
                    </div>

                    <div className="col-span-1 md:col-span-2"></div>

                    <div>
                        <h4 className="text-gray-900 font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> projects@thecloudsstudio.com</li>
                            <li>India</li>
                        </ul>
                        <div className="flex gap-4 mt-4">
                            <Link href="#" className="text-gray-400 hover:text-gray-900 transition-colors"><Twitter className="w-5 h-5" /></Link>
                            <Link href="#" className="text-gray-400 hover:text-gray-900 transition-colors"><Linkedin className="w-5 h-5" /></Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <div>&copy; 2025 ARGIS. All rights reserved.</div>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
                        <Link href="#" className="hover:text-gray-900">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}

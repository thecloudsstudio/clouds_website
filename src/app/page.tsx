"use client";

import React from 'react';
import AnimatedTabs from '@/components/home/AnimatedTabs';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import Background from '@/components/home/Background';

export default function Home() {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-between h-screen overflow-hidden px-4 py-8 bg-white"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.3, delayChildren: 0.2 }
        }
      }}
    >
      <Background />

      {/* Logo */}
      <motion.div
        className="mt-8 flex flex-col items-center"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
        }}
      >
        <img
          src="/images/LOGO_forwebsite.svg"
          alt="Clouds Studio"
          className="w-80 md:w-96 h-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
        <p className="text-sm md:text-base text-gray-500 font-light tracking-wide mt-2 text-center">
          A design & research studio
        </p>
      </motion.div>

      {/* Two sections */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl flex items-center justify-center px-8"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
        }}
      >
        <AnimatedTabs />
      </motion.div>

      {/* Social links */}
      <motion.div
        className="mb-8 flex gap-6"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
        }}
      >
        <a href="https://www.instagram.com/_cloudsstudio?igsh=MWppdmVveDVqMnN4bA" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800 transition-colors duration-300">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/company/c-l-o-u-d-s" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800 transition-colors duration-300">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="https://youtube.com/@clouds6996?si=l6_HjCVpdoDm64La" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800 transition-colors duration-300">
          <Youtube className="w-5 h-5" />
        </a>
      </motion.div>
    </motion.div>
  );
}

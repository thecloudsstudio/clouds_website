import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function GetInTouchButton({ onClick }) {
    return (
        <motion.button
            onClick={onClick}
            className="group relative flex items-center justify-center overflow-hidden rounded-full bg-[#333333] px-8 py-4 text-white transition-all duration-300 hover:bg-[#444444] hover:shadow-lg"
            whileHover="hover"
            initial="initial"
        >
            <motion.span
                className="inline-block font-medium tracking-wide"
                variants={{
                    initial: { x: 0 },
                    hover: { x: -12 },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                Get in Touch
            </motion.span>
            <motion.div
                className="absolute right-6 flex items-center"
                variants={{
                    initial: { opacity: 0, x: 20 },
                    hover: { opacity: 1, x: 0 },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <ArrowRight className="h-5 w-5" />
            </motion.div>
        </motion.button>
    );
}

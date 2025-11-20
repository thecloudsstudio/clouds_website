import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function GetInTouchButton({ onClick }) {
    return (
        <motion.button
            onClick={onClick}
            className="flex h-12 items-center rounded-xl bg-[#333333] text-white shadow-md transition-colors hover:bg-[#444444]"
            initial="initial"
            whileHover="hover"
        >
            <motion.div
                className="overflow-hidden whitespace-nowrap font-medium tracking-wide"
                variants={{
                    initial: { width: 0, opacity: 0 },
                    hover: { width: "auto", opacity: 1 },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <span className="pl-6">Get in Touch</span>
            </motion.div>

            <div className="flex h-12 w-12 items-center justify-center flex-shrink-0">
                <ArrowRight className="h-5 w-5" />
            </div>
        </motion.button>
    );
}

"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "outline";
    children: React.ReactNode;
    className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", children, ...props }, ref) => {
        const baseStyles = "px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2";

        const variants = {
            primary: "bg-black hover:bg-gray-800 text-white shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] border border-transparent",
            outline: "bg-transparent border border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900"
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(baseStyles, variants[variant], className)}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

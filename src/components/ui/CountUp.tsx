"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface CountUpProps {
    to: number;
    from?: number;
    direction?: "up" | "down";
    delay?: number;
    duration?: number;
    className?: string;
    decimals?: number;
    prefix?: string;
    suffix?: string;
}

export default function CountUp({
    to,
    from = 0,
    direction = "up",
    delay = 0,
    duration = 2,
    className = "",
    decimals = 0, // Target decimals
    prefix = "",
    suffix = ""
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -40% 0px" }); // Trigger when actually in view

    // Check if we should animate decimals (if target is integer but we want 'running numbers' effect)
    // User requested "instill decimal values... to run more numbers".
    // We will animate with 2 decimals, then snap to 'decimals' prop at the end.
    const animatingDecimals = 2;

    useEffect(() => {
        if (!isInView || !ref.current) return;

        // Set initial value
        ref.current.textContent = `${prefix}${from.toFixed(animatingDecimals)}${suffix}`;

        const controls = animate(from, to, {
            duration: duration,
            delay: delay,
            ease: "easeOut",
            onUpdate: (latest) => {
                if (ref.current) {
                    ref.current.textContent = `${prefix}${latest.toFixed(animatingDecimals)}${suffix}`;
                }
            },
            onComplete: () => {
                if (ref.current) {
                    // Snap to the final desired format (e.g. integer)
                    ref.current.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
                }
            }
        });

        return () => controls.stop();
    }, [isInView, from, to, delay, duration, prefix, suffix, decimals]);

    return <span className={className} ref={ref}>{prefix}{from.toFixed(decimals)}{suffix}</span>;
}

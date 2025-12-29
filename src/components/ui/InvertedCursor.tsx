"use client";

import React, { useState, useEffect, useRef } from "react";

interface CursorProps {
    size?: number;
}

const Cursor: React.FC<CursorProps> = ({ size = 60 }) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(0);
    const previousPos = useRef({ x: -size, y: -size }); // start off-screen

    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: -size, y: -size });

    useEffect(() => {
        // Animation loop for smooth cursor follow
        const animate = () => {
            if (!cursorRef.current) return;

            const currentX = previousPos.current.x;
            const currentY = previousPos.current.y;
            const targetX = position.x - size / 2;
            const targetY = position.y - size / 2;

            const deltaX = (targetX - currentX) * 0.2;
            const deltaY = (targetY - currentY) * 0.2;

            const newX = currentX + deltaX;
            const newY = currentY + deltaY;

            previousPos.current = { x: newX, y: newY };
            cursorRef.current.style.transform = `translate(${newX}px, ${newY}px)`;

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [position, size]); // Added dependency to position to trigger updates, but logically animate loop handles it. Re-checking effect logic.

    // Actually, standard approach is to update position ref in event and read in loop, but here state is used.
    // The original component had animate outside useEffect. Let's fix for React strict mode/hooks correctness.

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setVisible(true);
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => {
            setVisible(true);
        };

        const handleMouseLeave = () => {
            setVisible(false);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.documentElement.addEventListener("mouseenter", handleMouseEnter);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);

        document.body.style.cursor = "none"; // hide native cursor

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
            document.body.style.cursor = "auto"; // restore native cursor
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed pointer-events-none rounded-full bg-white mix-blend-difference z-50 transition-opacity duration-300 top-0 left-0"
            style={{
                width: size,
                height: size,
                opacity: visible ? 1 : 0,
            }}
            aria-hidden="true"
        />
    );
};

export default Cursor;

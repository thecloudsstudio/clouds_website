"use client";

import React, { useEffect, useState } from 'react';

export default function GlobalCursor() {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let cursorAnimationFrameId: number;
        let targetCursorX = 0;
        let targetCursorY = 0;
        let currentCursorX = 0;
        let currentCursorY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            targetCursorX = e.clientX;
            targetCursorY = e.clientY;
        };

        const smoothCursorFollow = () => {
            const smoothness = 0.15;
            currentCursorX += (targetCursorX - currentCursorX) * smoothness;
            currentCursorY += (targetCursorY - currentCursorY) * smoothness;

            setCursorPosition({ x: currentCursorX, y: currentCursorY });
            cursorAnimationFrameId = requestAnimationFrame(smoothCursorFollow);
        };

        cursorAnimationFrameId = requestAnimationFrame(smoothCursorFollow);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(cursorAnimationFrameId);
        };
    }, []);

    return (
        <div
            className="fixed pointer-events-none z-[9999] mix-blend-difference cursor-none"
            style={{
                left: cursorPosition.x,
                top: cursorPosition.y,
                transform: 'translate(-50%, -50%)',
                willChange: 'transform'
            }}
        >
            <div className="w-10 h-10 bg-white rounded-sm" />
        </div>
    );
}

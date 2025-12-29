"use client";

import { useState } from "react";
// @ts-ignore
import { MeshGradient } from "@paper-design/shaders-react";

export default function Background() {
    const [speed] = useState(1.0);

    return (
        <div className="fixed inset-0 w-full h-full bg-white -z-10 overflow-hidden">
            <MeshGradient
                className="w-full h-full absolute inset-0"
                colors={["#ffffff", "#e5e7eb", "#d1d5db", "#9ca3af"]}
                speed={speed * 0.8}
            />

            {/* Subtle lighting overlay for depth in light theme */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div
                    className="absolute top-1/4 left-1/3 w-64 h-64 bg-gray-100/50 rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: `${4 / speed}s` }}
                />
                <div
                    className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gray-50/50 rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: `${5 / speed}s`, animationDelay: "1s" }}
                />
            </div>
        </div>
    );
}

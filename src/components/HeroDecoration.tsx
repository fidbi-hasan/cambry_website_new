"use client";

import { motion } from "framer-motion";

interface HeroDecorationProps {
    children: React.ReactNode;
    color?: string;
    className?: string;
    delay?: number;
}

export const HighlightUnderline = ({ children, color = "var(--accent)", className = "", delay = 0.8 }: HeroDecorationProps) => {
    return (
        <span className={`relative inline-block ${className}`}>
            {children}
            <motion.svg
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 w-full h-[8px] z-[-1] pointer-events-none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay, ease: "easeOut" }}
            >
                <path
                    d="M 0 5 Q 25 2, 50 5 T 100 5"
                    fill="none"
                    stroke={color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="opacity-60"
                />
            </motion.svg>
        </span>
    );
};

export const HighlightCircle = ({ children, color = "var(--brand-blue)", className = "", delay = 1 }: HeroDecorationProps) => {
    return (
        <span className={`relative inline-block px-2 ${className}`}>
            {children}
            <motion.svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full z-[-1] scale-110 pointer-events-none"
                initial={{ pathLength: 0, opacity: 0, rotate: -5 }}
                animate={{ pathLength: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.2, delay, ease: "easeInOut" }}
            >
                <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="opacity-30"
                />
            </motion.svg>
        </span>
    );
};

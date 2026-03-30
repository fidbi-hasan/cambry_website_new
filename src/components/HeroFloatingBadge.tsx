"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Star, Users, GraduationCap, Award, Headset, Globe, ShieldCheck } from "lucide-react";

interface HeroFloatingBadgeProps {
    type: "students" | "success" | "rating" | "scholarship" | "support" | "partner" | "destinations";
    className?: string;
    delay?: number;
}

const badgeConfigs = {
    students: {
        icon: Users,
        label: "5,000+",
        sublabel: "Students Guided",
        color: "amber",
    },
    success: {
        icon: Award,
        label: "98%",
        sublabel: "Visa Success",
        color: "blue",
    },
    rating: {
        icon: Star,
        label: "4.9/5",
        sublabel: "Student Rating",
        color: "emerald",
    },
    scholarship: {
        icon: GraduationCap,
        label: "Full Support",
        sublabel: "Scholarship Aid",
        color: "violet",
    },
    support: {
        icon: Headset,
        label: "24/7",
        sublabel: "Expert Support",
        color: "red",
    },
    partner: {
        icon: Award,
        label: "50+",
        sublabel: "Partner Unis",
        color: "cyan",
    },
    destinations: {
        icon: Globe,
        label: "5+",
        sublabel: "Study Countries",
        color: "amber",
    },
};

export default function HeroFloatingBadge({ type, className = "", delay = 0 }: HeroFloatingBadgeProps) {
    const config = badgeConfigs[type];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
                duration: 0.6, 
                delay, 
                ease: [0.22, 1, 0.36, 1],
                y: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                }
            }}
            className={`absolute flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-20 ${className}`}
        >
            <div className={`w-10 h-10 rounded-xl bg-${config.color}-500/20 border border-${config.color}-500/30 flex items-center justify-center`}>
                <Icon className={`w-5 h-5 text-${config.color}-400`} />
            </div>
            <div>
                <p className="text-sm font-black text-white leading-none mb-0.5">{config.label}</p>
                <p className="text-[10px] text-blue-100/60 font-semibold uppercase tracking-wider leading-none">
                    {config.sublabel}
                </p>
            </div>
        </motion.div>
    );
}



import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";
import type { LucideIcon } from "lucide-react";
import HeroFloatingBadge from "./HeroFloatingBadge";

interface PageHeroProps {
    badge: string;
    badgeIcon: LucideIcon;
    title: React.ReactNode;
    subtitle: string;
    backgroundImage: string | null;
    backgroundAlt: string;
    cta?: { label: string; href: string };
    children?: React.ReactNode;
    // New props for split-screen layout
    isSplit?: boolean;
    mainImage?: string | null;
    stats?: ("students" | "success" | "rating" | "scholarship" | "support" | "partner" | "destinations")[];
}

export default function PageHero({
    badge,
    badgeIcon: BadgeIcon,
    title,
    subtitle,
    backgroundImage,
    backgroundAlt,
    cta,
    children,
    isSplit = true,
    mainImage,
    stats = ["students", "success"],
}: PageHeroProps) {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-28 pb-32 bg-[#0A1628] overflow-hidden">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage || ""}
                    alt=""
                    className="w-full h-full object-cover opacity-20 mix-blend-soft-light scale-110 blur-[2px]"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0A1628]/95 to-[#0A1628]/80" />
            </div>

            {/* Radiant Nebula Effect */}
            <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[160px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

            <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
                <div className={`grid grid-cols-1 ${isSplit ? "lg:grid-cols-2" : ""} gap-16 items-center`}>
                    
                    {/* Content Section */}
                    <div className={!isSplit ? "text-center max-w-4xl mx-auto" : "max-w-2xl"}>
                        <FadeIn direction="right" delay={0.1}>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] backdrop-blur-3xl border border-white/[0.1] text-[11px] text-amber-400 mb-8 font-bold uppercase tracking-[0.2em] shadow-2xl">
                                <BadgeIcon className="w-4 h-4" />
                                {badge}
                            </div>
                            
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-8 drop-shadow-2xl">
                                {title}
                            </h1>
                            
                            <p className="text-blue-100/70 text-lg md:text-xl leading-relaxed font-medium mb-10 max-w-xl">
                                {subtitle}
                            </p>

                            <div className="flex flex-wrap gap-5">
                                {cta && (
                                    <Link
                                        href={cta.href}
                                        className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-[0_20px_60px_rgba(245,158,11,0.3)] hover:shadow-[0_25px_70px_rgba(245,158,11,0.5)] hover:-translate-y-1 text-lg group"
                                    >
                                        {cta.label} 
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                                
                                {isSplit && (
                                    <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                                        <div className="flex -space-x-3">
                                            {[1,2,3].map(i => (
                                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0A1628] bg-gray-600 overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" />
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-sm leading-none">Joined 500+</p>
                                            <p className="text-blue-100/40 text-[10px] font-bold uppercase tracking-wider mt-1">International Students</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </FadeIn>
                        
                        {!isSplit && children}
                    </div>

                    {/* Imagery Section (Split Layout) */}
                    {isSplit && (
                        <div className="relative hidden lg:block">
                            <FadeIn direction="left" delay={0.3}>
                                <div className="relative aspect-[4/5] w-full max-w-[500px] ml-auto">
                                    {/* The ARCH shape container */}
                                    <div className="absolute inset-0 rounded-t-[200px] rounded-b-3xl overflow-hidden border-[12px] border-white/5 backdrop-blur-sm shadow-2xl">
                                        <img
                                            src={mainImage || backgroundImage || ""}
                                            alt={backgroundAlt}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 via-transparent to-transparent" />
                                    </div>

                                    {/* Floating Badges */}
                                    {stats.includes("students") && (
                                        <HeroFloatingBadge type="students" className="-left-12 top-[20%]" delay={0.8} />
                                    )}
                                    {stats.includes("success") && (
                                        <HeroFloatingBadge type="success" className="-right-8 top-[45%]" delay={1.1} />
                                    )}
                                    {stats.includes("rating") && (
                                        <HeroFloatingBadge type="rating" className="-left-8 bottom-[15%]" delay={1.4} />
                                    )}
                                    
                                    {/* Decorative sparkes */}
                                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl animate-pulse" />
                                    <Sparkles className="absolute -top-6 -right-6 w-12 h-12 text-amber-400/40" />
                                </div>
                            </FadeIn>
                            
                            {/* Nested children for split layout */}
                            <div className="mt-10">
                                {children}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

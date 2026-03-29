"use client";

import { motion } from "framer-motion";
import { Award, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

interface ScholarshipItem {
    country: string;
    highlight: string;
    flag: string;
    amount: string;
    details: string;
    slug: string;
}

const defaultScholarships: ScholarshipItem[] = [
    { country: "United Kingdom", highlight: "Up to 50% tuition fee reduction", flag: "https://flagcdn.com/w80/gb.png", amount: "50%", details: "Chancellor's scholarships, merit-based awards, and university-specific bursaries available for international students.", slug: "united-kingdom" },
    { country: "Australia", highlight: "Up to 30% scholarships available", flag: "https://flagcdn.com/w80/au.png", amount: "30%", details: "Government-funded scholarships, university merit awards, and destination-specific financial aid programs.", slug: "australia" },
    { country: "Canada", highlight: "Scholarships up to CAD 20,000", flag: "https://flagcdn.com/w80/ca.png", amount: "CAD 20K", details: "Entrance scholarships, provincial grants, and co-op program incentives across top Canadian institutions.", slug: "canada" },
    { country: "New Zealand", highlight: "Scholarships up to NZD 20,000", flag: "https://flagcdn.com/w80/nz.png", amount: "NZD 20K", details: "New Zealand Excellence Awards, university scholarships, and government-backed financial aid options.", slug: "new-zealand" },
    { country: "Malaysia", highlight: "Affordable tuition from MYR 15,000/yr", flag: "https://flagcdn.com/w80/my.png", amount: "MYR 15K", details: "One of Asia's most affordable quality education destinations with merit and need-based scholarships.", slug: "malaysia" },
];

export default function ScholarshipSpotlight({ scholarships = defaultScholarships }: { scholarships?: ScholarshipItem[] }) {
    return (
        <section className="py-28 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 relative overflow-hidden">
            {/* Ambient decorations */}
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-amber-100/40 to-orange-50/20 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-50/40 to-violet-50/20 rounded-full blur-[130px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-50/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 text-amber-700 text-[11px] font-extrabold uppercase tracking-[0.2em] mb-6 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" /> Scholarship & Financial Aid
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#0A1628] tracking-tight leading-tight">
                        Invest in Your Future with<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">Generous Scholarships</span>
                    </h2>
                    <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">Don&apos;t let finances hold you back. Our partner universities offer substantial financial aid to help make your study abroad dream a reality.</p>
                </motion.div>

                {/* Featured scholarship — first item gets hero treatment */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="mb-6"
                >
                    <Link href={`/destinations/${scholarships[0].slug}`} className="block group">
                        <div className="relative bg-white rounded-2xl border border-gray-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.1)] transition-all duration-700 overflow-hidden">
                            <div className="grid lg:grid-cols-[1fr_auto] items-center">
                                {/* Content side */}
                                <div className="p-10 sm:p-12 lg:p-14">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-9 rounded-md overflow-hidden shadow-md border border-gray-100/50 flex-shrink-0">
                                            <img src={scholarships[0].flag} alt={`${scholarships[0].country} flag`} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                                            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                                            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Most Popular</span>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A1628] mb-3 tracking-tight group-hover:text-blue-700 transition-colors duration-300">
                                        Study in {scholarships[0].country}
                                    </h3>
                                    <p className="text-gray-500 text-base leading-relaxed mb-6 max-w-xl">{scholarships[0].details}</p>
                                    <div className="flex flex-wrap items-center gap-4">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200/60 rounded-lg text-amber-700 font-bold text-sm">
                                            <Award className="w-4 h-4" />
                                            {scholarships[0].highlight}
                                        </span>
                                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                                            Explore scholarships
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </span>
                                    </div>
                                </div>

                                {/* Visual side — large amount display */}
                                <div className="hidden lg:flex items-center justify-center p-14 relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-orange-50/50 to-amber-50/30 rounded-r-2xl" />
                                    <div className="relative text-center">
                                        <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-orange-600 leading-none mb-2">
                                            {scholarships[0].amount}
                                        </div>
                                        <p className="text-sm font-bold text-amber-700/60 uppercase tracking-widest">Tuition Reduction</p>
                                    </div>
                                </div>
                            </div>

                            {/* Hover glow */}
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-amber-200/0 to-orange-200/0 group-hover:from-amber-200/20 group-hover:to-orange-200/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all duration-700 pointer-events-none" />
                        </div>
                    </Link>
                </motion.div>

                {/* Remaining scholarships — refined card grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {scholarships.slice(1).map((item, i) => (
                        <motion.div
                            key={item.country}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + i * 0.08 }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/destinations/${item.slug}`} className="block group h-full">
                                <div className="bg-white border border-gray-100/80 rounded-xl p-7 shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)] hover:-translate-y-1.5 transition-all duration-500 h-full relative overflow-hidden">
                                    {/* Decorative top gradient strip */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Flag + Country */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-7 rounded overflow-hidden shadow-sm border border-gray-100/50 flex-shrink-0">
                                            <img src={item.flag} alt={`${item.country} flag`} className="w-full h-full object-cover" />
                                        </div>
                                        <h3 className="font-bold text-[#0A1628] text-base group-hover:text-blue-700 transition-colors duration-300">{item.country}</h3>
                                    </div>

                                    {/* Amount badge */}
                                    <div className="mb-4">
                                        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 leading-none">{item.amount}</span>
                                    </div>

                                    {/* Highlight */}
                                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{item.highlight}</p>

                                    {/* Link */}
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                                        <span>View details</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                                    </div>

                                    {/* Hover glow */}
                                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-amber-200/0 to-orange-200/0 group-hover:from-amber-200/20 group-hover:to-orange-200/15 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-14"
                >
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-[0_12px_40px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm tracking-wide shadow-lg shadow-amber-500/15 animate-gradient bg-[length:200%_200%]"
                    >
                        <Award className="w-5 h-5" />
                        Check Your Scholarship Eligibility
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <p className="text-gray-400 text-sm mt-4">Free assessment • No obligations • Results within 24 hours</p>
                </motion.div>
            </div>
        </section>
    );
}

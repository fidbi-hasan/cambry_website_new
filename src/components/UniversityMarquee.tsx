"use client";

import { GraduationCap, MapPin } from "lucide-react";

interface University {
    name: string;
    imageUrl: string;
    country?: string;
}

export default function UniversityMarquee({ universities }: { universities: University[] }) {
    if (universities.length === 0) return null;

    // Split into two rows for a staggered dual-marquee effect
    const mid = Math.ceil(universities.length / 2);
    const row1 = universities.slice(0, mid);
    const row2 = universities.slice(mid);

    const items1 = [...row1, ...row1, ...row1];
    const items2 = [...row2, ...row2, ...row2];

    return (
        <div className="relative overflow-hidden" role="region" aria-label="Partner Universities">
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />

            {/* Row 1 — scrolls left */}
            <div className="flex animate-marquee whitespace-nowrap mb-4">
                {items1.map((university, i) => (
                    <UniversityChip key={`r1-${university.name}-${i}`} university={university} />
                ))}
            </div>

            {/* Row 2 — scrolls right (reverse direction) */}
            <div className="flex animate-marquee-reverse whitespace-nowrap">
                {items2.map((university, i) => (
                    <UniversityChip key={`r2-${university.name}-${i}`} university={university} />
                ))}
            </div>
        </div>
    );
}

function UniversityChip({ university }: { university: University }) {
    return (
        <div className="inline-flex items-center gap-3.5 mx-2 sm:mx-3 px-4 sm:px-5 py-3 bg-white/80 backdrop-blur-sm border border-gray-100/60 rounded-full shadow-[0_1px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-gray-200/80 hover:-translate-y-0.5 transition-all duration-300 shrink-0 group cursor-default">
            {/* Logo */}
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden bg-gradient-to-br from-slate-50 to-gray-50 border border-gray-100/60 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <img
                    src={university.imageUrl}
                    alt={`${university.name}`}
                    onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                    }}
                    className="h-full w-full object-cover"
                />
                <div className="items-center justify-center hidden w-full h-full bg-gradient-to-br from-violet-50 to-blue-50">
                    <GraduationCap className="w-4 h-4 text-violet-400" />
                </div>
            </div>

            {/* Name + country */}
            <div className="flex flex-col min-w-0">
                <span className="text-[13px] sm:text-sm font-semibold text-[#0A1628] whitespace-nowrap leading-tight">{university.name}</span>
                {university.country && (
                    <span className="text-[10px] sm:text-[11px] text-gray-400 font-medium mt-0.5 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5" />
                        {university.country}
                    </span>
                )}
            </div>
        </div>
    );
}

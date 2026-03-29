"use client";

import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./MotionWrappers";

interface Testimonial {
    studentName: string;
    studentCourse: string;
    universityName: string;
    targetCountry: string;
    quote: string;
    imageUrl?: string;
}

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
    if (testimonials.length === 0) return null;

    return (
        <section className="py-28 bg-[#0A1628] relative overflow-hidden">
            {/* Subtle ambient glows */}
            <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
                    <FadeIn direction="up">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-amber-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-5">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                Testimonials
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                                What Our Students <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Say</span>
                            </h2>
                            <p className="text-blue-100/40 text-lg max-w-xl">Hear directly from students who transformed their futures through Cambry.</p>
                        </div>
                    </FadeIn>
                </div>

                {/* Testimonial Cards */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, i) => (
                        <StaggerItem key={i}>
                            <div className="group h-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-7 hover:bg-white/[0.07] hover:border-white/[0.12] hover:-translate-y-1 transition-all duration-500 flex flex-col relative overflow-hidden">
                                {/* Hover glow */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-amber-400/[0.06] to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                {/* Quote */}
                                <div className="flex-1 relative z-10">
                                    <svg className="w-7 h-7 text-amber-400/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                                    </svg>
                                    <p className="text-white/70 leading-relaxed text-[15px] font-light">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </p>
                                </div>

                                {/* Author */}
                                <div className="mt-7 pt-5 border-t border-white/[0.06] flex items-center gap-3.5 relative z-10">
                                    <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/[0.08] bg-white/[0.05]">
                                        <img 
                                            src={testimonial.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.studentName)}&background=1e293b&color=94a3b8&size=100&bold=true`}
                                            alt={testimonial.studentName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-white text-sm truncate">{testimonial.studentName}</p>
                                        <p className="text-[13px] text-white/30 truncate mt-0.5">{testimonial.studentCourse}</p>
                                    </div>
                                    <div className="flex-shrink-0 px-2.5 py-1 bg-amber-400/[0.08] border border-amber-400/[0.12] rounded-md">
                                        <span className="text-[10px] font-bold text-amber-400/80 uppercase tracking-wider whitespace-nowrap">{testimonial.universityName}</span>
                                    </div>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}

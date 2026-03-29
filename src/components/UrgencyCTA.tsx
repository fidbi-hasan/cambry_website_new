"use client";

import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";

export default function UrgencyCTA() {
    return (
        <section className="py-24 sm:py-32 relative overflow-hidden">
            {/* Multi-layered gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.1)_0%,transparent_60%)]" />

            {/* Floating orbs */}
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-yellow-300/20 rounded-full blur-[80px] translate-y-1/2 pointer-events-none" />

            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    
                    {/* Left content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md shadow-lg">
                            <Clock className="w-3.5 h-3.5" /> Limited Time
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                            Intakes Are
                            <br />
                            <span className="relative">
                                Filling Fast
                                <Sparkles className="absolute -top-3 -right-10 w-8 h-8 text-yellow-200 animate-pulse hidden sm:block" />
                            </span>
                        </h2>
                        <p className="text-white/90 mt-6 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            Don&apos;t miss the upcoming semester deadlines. Secure your spot at a top international university today. Let our experts guide your application.
                        </p>
                        
                        <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-white/95 transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.25)] hover:-translate-y-1 text-base group"
                            >
                                Book Free Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                            </Link>
                        </div>
                        <p className="text-white/70 text-sm mt-5 font-semibold tracking-wide text-center lg:text-left">
                            No fees &bull; No obligations &bull; Active Intakes
                        </p>
                    </div>

                    {/* Right Image/Graphic area */}
                    <div className="relative mx-auto lg:mx-0 lg:ml-auto max-w-xl lg:max-w-none w-full mt-8 lg:mt-0">
                         {/* Decorative background behind image */}
                         <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-white/5 rounded-3xl -rotate-3 lg:-rotate-6 scale-[1.03] backdrop-blur-sm border border-white/20 transition-all duration-700 hover:rotate-0" />
                         
                         {/* The Image Wrapper */}
                         <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 group bg-white/10">
                              <img 
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop" 
                                alt="Students happy at university campus" 
                                className="w-full h-[350px] sm:h-[450px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              
                              {/* Glass overlay block on the image */}
                              <div className="absolute bottom-6 left-6 right-6 lg:left-8 lg:right-8 p-5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-5 transition-transform duration-500 group-hover:-translate-y-2 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg text-orange-500 shrink-0">
                                      <Clock className="w-7 h-7" />
                                  </div>
                                  <div>
                                      <p className="text-white font-extrabold text-base">Next Intake Starting Soon</p>
                                      <p className="text-white/90 text-sm font-semibold mt-0.5">Accepting Applications Now</p>
                                  </div>
                              </div>
                         </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, MessageCircle, Plane, Home, BookOpen, CreditCard, ArrowRight, CheckCircle2, Shield, Users, GraduationCap, Award, Globe, Building, Scale, FileCheck, Luggage, BedDouble, Headset, Smartphone, ClipboardCheck, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import TrustBanner from "@/components/TrustBanner";
import UniversityMarquee from "@/components/UniversityMarquee";
import UrgencyCTA from "@/components/UrgencyCTA";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";
import { HighlightCircle } from "@/components/HeroDecoration";
import { getTopUniversities } from "@/actions/universities";
import { getCountries } from "@/actions/countries";
import { getFaqs } from "@/actions/faqs";

// Helper for rendering high-quality SVG flags instead of OS-dependent text emojis
const getTwemojiUrl = (emoji: string) => {
    const codePoint = Array.from(emoji).map(char => char.codePointAt(0)?.toString(16)).join('-');
    return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codePoint}.svg`;
};

export const metadata: Metadata = {
    title: "Our Services | Cambry International Admission Centre",
    description: "Comprehensive study abroad services: university admissions, visa processing, counseling, accommodation, and more.",
};

const services = [
    { icon: MessageCircle, title: "Free Counseling", desc: "One-on-one sessions with expert counselors to understand your academic goals, preferences, and budget.", features: ["Career assessment", "University shortlisting", "Course matching", "Budget planning"], gradient: "from-blue-500 to-cyan-400" },
    { icon: BookOpen, title: "University Admissions", desc: "End-to-end application support including SOP writing, recommendation letters, and interview preparation.", features: ["SOP & essay writing", "Document preparation", "Application tracking", "Interview coaching"], gradient: "from-purple-500 to-violet-400" },
    { icon: FileText, title: "Visa Processing", desc: "Expert visa application guidance with a 98% success rate across all destination countries.", features: ["Document checklist", "Application filing", "Mock interviews", "Appeal assistance"], gradient: "from-amber-500 to-yellow-400" },
    { icon: CreditCard, title: "Scholarship Guidance", desc: "We help you identify and apply for scholarships, grants, and financial aid opportunities.", features: ["Scholarship search", "Application support", "Financial planning", "Loan guidance"], gradient: "from-green-500 to-emerald-400" },
    { icon: Plane, title: "Pre-Departure Support", desc: "Comprehensive pre-departure orientation covering travel, cultural adjustment, and forex.", features: ["Travel planning", "Forex assistance", "Cultural orientation", "Packing guide"], gradient: "from-rose-500 to-pink-400" },
    { icon: Home, title: "Accommodation Help", desc: "Safe, affordable accommodation arranged near your university before you arrive.", features: ["Housing search", "Roommate matching", "Lease review", "Area guides"], gradient: "from-indigo-500 to-blue-400" },
];

export default async function ServicesPage() {
    let universities: any[] = [];
    let faqs: any[] = [];
    let countries: any[] = [];
    try {
        [universities, faqs, countries] = await Promise.all([
            getTopUniversities(10),
            getFaqs("General"),
            getCountries()
        ]);
    } catch { }

    const destinations = [
        { name: "United Kingdom", slug: "united-kingdom", flagUrl: "https://flagcdn.com/w80/gb.png", fact: "2-year post-study work visa", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800" },
        { name: "Australia", slug: "australia", flagUrl: "https://flagcdn.com/w80/au.png", fact: "2-4 year post-study work rights", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800" },
        { name: "Canada", slug: "canada", flagUrl: "https://flagcdn.com/w80/ca.png", fact: "3-year PGWP available", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800" },
        { name: "Malaysia", slug: "malaysia", flagUrl: "https://flagcdn.com/w80/my.png", fact: "Affordable quality education", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800" },
        { name: "New Zealand", slug: "new-zealand", flagUrl: "https://flagcdn.com/w80/nz.png", fact: "3-year post-study work visa", image: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=800" },
        { name: "South Korea", slug: "south-korea", flagUrl: "https://flagcdn.com/w80/kr.png", fact: "Top tech & innovation hub", image: "https://images.unsplash.com/photo-1546874177-9e664107314e?w=800" },
        { name: "Japan", slug: "japan", flagUrl: "https://flagcdn.com/w80/jp.png", fact: "MEXT scholarships available", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800" },
        { name: "Italy", slug: "italy", flagUrl: "https://flagcdn.com/w80/it.png", fact: "Low tuition at public universities", image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800" },
        { name: "Malta", slug: "malta", flagUrl: "https://flagcdn.com/w80/mt.png", fact: "English-speaking EU destination", image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800" },
        { name: "Cyprus", slug: "cyprus", flagUrl: "https://flagcdn.com/w80/cy.png", fact: "Affordable EU education", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800" },
        { name: "Finland", slug: "finland", flagUrl: "https://flagcdn.com/w80/fi.png", fact: "Tuition-free at public universities", image: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=800" },
    ].map(dest => {
        const dbCountry = countries.find(c => c.slug.toLowerCase().trim() === dest.slug.toLowerCase().trim());
        return {
            ...dest,
            flagUrl: (dbCountry?.flagUrl && dbCountry.flagUrl.startsWith('http')) ? dbCountry.flagUrl : dest.flagUrl,
            image: dest.image || dbCountry?.imageUrl,
        };
    });

    return (
        <>
            {/* 1. Hero */}
            <PageHero
                badge="End-to-End Support"
                badgeIcon={Globe}
                title={<>Our <HighlightCircle color="var(--accent)">Services</HighlightCircle></>}
                subtitle="Comprehensive guidance for your study abroad journey, from counseling to post-arrival."
                backgroundImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80"
                mainImage="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800"
                backgroundAlt="International students studying"
                cta={{ label: "Get Started Today", href: "/contact" }}
                isSplit={true}
                stats={["students", "success", "scholarship"]}
            />

            {/* 2. Trust */}
            <TrustBanner />

            {/* 3. Services Grid */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/60 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <Globe className="w-3.5 h-3.5" /> What We Offer
                            </div>
                            <h2 className="text-3xl sm:text-3xl font-extrabold text-[#0A1628] tracking-tight">Comprehensive Study Abroad <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Services</span></h2>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <StaggerItem key={service.title}>
                            <div className="bg-white border border-gray-100/60 rounded-xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group h-full">
                                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <service.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-[#0A1628] mb-3">{service.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.desc}</p>
                                <ul className="space-y-2.5">
                                    {service.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 5. Stats */}
            <section className="py-20 bg-[#0A1628] relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                        {[
                            { value: "500+", label: "Students Placed", icon: Users, gradient: "from-blue-500 to-cyan-400" },
                            { value: "98%", label: "Visa Success", icon: Shield, gradient: "from-green-500 to-emerald-400" },
                            { value: "50+", label: "Partner Unis", icon: GraduationCap, gradient: "from-purple-500 to-violet-400" },
                            { value: "200+", label: "Scholarships", icon: Award, gradient: "from-amber-500 to-yellow-400" },
                        ].map((s) => (
                            <div key={s.label} className="p-8 bg-white/[0.06] backdrop-blur-2xl rounded-xl border border-white/[0.08] group hover:-translate-y-1 transition-all duration-300">
                                <div className={`w-14 h-14 bg-gradient-to-br ${s.gradient} rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <s.icon className="w-7 h-7 text-white" />
                                </div>
                                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Why Cambry vs Others */}
            <section className="py-28 bg-gradient-to-b from-[var(--off-white)] to-white relative">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100/60 text-emerald-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                            <Shield className="w-3.5 h-3.5" /> Why Us
                        </div>
                        <h2 className="text-3xl sm:text-3xl font-extrabold text-[#0A1628] tracking-tight">Why Cambry Stands Out</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                        {[
                            { title: "Dedicated Counselors", desc: "A personal expert counselor assigned to guide you from start to finish.", icon: Users, gradient: "from-blue-500 to-cyan-400", shadow: "shadow-blue-500/20" },
                            { title: "50+ Direct Partnerships", desc: "Direct priority partnerships with top-tier universities across the globe.", icon: Building, gradient: "from-purple-500 to-violet-400", shadow: "shadow-purple-500/20" },
                            { title: "98% Visa Approval", desc: "Industry-leading visa success rate across all our study destinations.", icon: Shield, gradient: "from-green-500 to-emerald-400", shadow: "shadow-green-500/20" },
                            { title: "Free Initial Consultation", desc: "Start your journey immediately with a comprehensive, no-obligation session.", icon: MessageCircle, gradient: "from-amber-500 to-orange-400", shadow: "shadow-amber-500/20" },
                            { title: "End-to-End Support", desc: "We meticulously handle everything from application to post-arrival settlement.", icon: CheckCircle2, gradient: "from-rose-500 to-pink-400", shadow: "shadow-rose-500/20" },
                            { title: "Transparent Process", desc: "Absolutely no hidden fees or surprises. You know exactly what you're paying for.", icon: Scale, gradient: "from-indigo-500 to-blue-500", shadow: "shadow-indigo-500/20" },
                        ].map((item) => (
                            <div key={item.title} className="p-8 bg-white border border-gray-100/60 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg ${item.shadow} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                    <item.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-[#0A1628] mb-3">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. University Marquee */}
            <UniversityMarquee universities={universities.length > 0 
                ? universities.map((u: any) => ({ name: u.name, imageUrl: u.imageUrl })) 
                : [
                    { name: "University of Oxford", imageUrl: "https://logo.clearbit.com/ox.ac.uk" }, 
                    { name: "Imperial College London", imageUrl: "https://logo.clearbit.com/imperial.ac.uk" }, 
                    { name: "University of Melbourne", imageUrl: "https://logo.clearbit.com/unimelb.edu.au" }
                  ]
            } />

            {/* 11. Destinations Links */}
            <section className="py-28 bg-[#0A1628] relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/[0.06] rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[130px] pointer-events-none" />

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.08] text-amber-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                                <Globe className="w-3.5 h-3.5" /> Explore Destinations
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Top Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Destinations</span>
                            </h2>
                            <p className="text-blue-200/40 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">Discover world-class education opportunities across our partner countries, each offering unique advantages for international students.</p>
                        </div>
                    </FadeIn>

                    {/* Featured row — first 3 destinations */}
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                        {destinations.slice(0, 3).map((dest) => (
                            <StaggerItem key={dest.slug}>
                                <Link
                                    href={`/destinations/${dest.slug}`}
                                    className="block group relative h-[320px] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-amber-400/30 transition-all duration-500"
                                >
                                    <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/50 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Flag chip */}
                                    {dest.flagUrl && dest.flagUrl.startsWith('http') && (
                                        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-white/[0.1] backdrop-blur-xl border border-white/[0.15] rounded-full">
                                            <img src={dest.flagUrl} alt={`${dest.name} flag`} className="w-5 h-4 rounded-[2px] object-cover shadow-sm" />
                                            <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider">{dest.name}</span>
                                        </div>
                                    )}

                                    {/* Arrow indicator */}
                                    <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.1] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-400">
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                        <h3 className="font-extrabold text-white text-2xl mb-2 drop-shadow-lg tracking-tight">{dest.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-amber-400" />
                                            <p className="text-amber-300/80 text-sm font-semibold">{dest.fact}</p>
                                        </div>
                                    </div>
                                </Link>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    {/* Remaining destinations — 4 per row */}
                    <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                        {destinations.slice(3).map((dest) => (
                            <StaggerItem key={dest.slug}>
                                <Link
                                    href={`/destinations/${dest.slug}`}
                                    className="block group relative h-[240px] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-amber-400/30 transition-all duration-500"
                                >
                                    <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent" />

                                    {/* Flag chip */}
                                    {dest.flagUrl && dest.flagUrl.startsWith('http') && (
                                        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.1] backdrop-blur-xl border border-white/[0.15] rounded-full">
                                            <img src={dest.flagUrl} alt={`${dest.name} flag`} className="w-4 h-3 rounded-[2px] object-cover" />
                                        </div>
                                    )}

                                    {/* Arrow indicator */}
                                    <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.1] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-400">
                                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                                        <h3 className="font-bold text-white text-lg mb-1 drop-shadow-lg">{dest.name}</h3>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1 h-1 rounded-full bg-amber-400" />
                                            <p className="text-amber-300/70 text-xs font-semibold">{dest.fact}</p>
                                        </div>
                                    </div>
                                </Link>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    {/* Explore all CTA */}
                    <FadeIn direction="up" delay={0.3}>
                        <div className="text-center mt-14">
                            <Link
                                href="/destinations"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-white/[0.06] backdrop-blur-md border border-white/[0.1] text-white font-bold rounded-xl hover:bg-white/[0.12] hover:border-amber-400/30 transition-all duration-300 group text-sm tracking-wide"
                            >
                                Explore All Destinations
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 12. Test Prep Services */}
            <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-3xl font-extrabold text-[#0A1628] tracking-tight">IELTS & PTE Support Services</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">From exam registration to score improvement plans, we provide complete support.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Exam Registration", desc: "Guided IELTS/PTE exam booking with date and center selection.", icon: FileText },
                            { title: "Course Enrollment", desc: "Join regular, weekend, or crash-course batches online/offline.", icon: BookOpen },
                            { title: "Mock Test Analysis", desc: "Detailed section-wise feedback and improvement roadmap.", icon: Shield },
                        ].map((item) => (
                            <div key={item.title} className="p-7 bg-white border border-gray-100 rounded-xl shadow-[0_2px_14px_rgba(0,0,0,0.04)]">
                                <item.icon className="w-8 h-8 text-[var(--brand-blue)] mb-4" />
                                <h3 className="font-bold text-[#0A1628] text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 13. Scholarship Strategy */}
            <section className="py-24 bg-white">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-10 lg:items-stretch items-center">
                        <div className="flex flex-col justify-center py-4">
                            <h2 className="text-3xl sm:text-3xl font-extrabold text-[#0A1628] tracking-tight">Scholarship Strategy Service</h2>
                            <p className="text-gray-500 mt-4 leading-relaxed">We build an application plan for scholarship-heavy destinations and help optimize profile, SOP, and references for better outcomes.</p>
                            <ul className="mt-6 space-y-3 text-sm text-gray-600">
                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Merit + need-based scholarship mapping</li>
                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Budget-aware university shortlisting</li>
                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Deadline tracking and submission planning</li>
                            </ul>
                        </div>
                        <div className="h-full flex flex-col justify-center p-8 sm:p-10 rounded-2xl bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(245,158,11,0.08)] transition-all duration-500 relative overflow-hidden group/card">
                            {/* Ambient background glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover/card:bg-amber-400/20 transition-colors duration-700" />
                            
                            <div className="flex items-center gap-4 mb-10 relative z-10">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/20 text-white">
                                    <Award className="w-6 h-6" />
                                </div>
                                <h3 className="font-extrabold text-[#0A1628] text-xl">Result-Oriented Workflow</h3>
                            </div>

                            <div className="relative z-10">
                                {/* Vertical Connector Line */}
                                <div className="absolute top-6 bottom-8 left-[1.375rem] w-[2px] bg-gradient-to-b from-amber-300 via-amber-200 to-transparent" />
                                
                                <div className="space-y-2">
                                    {[
                                        { title: "Profile Audit", desc: "Evaluating your academic & extracurricular strengths" },
                                        { title: "Scholarship Matrix", desc: "Mapping the best-fit funding opportunities" },
                                        { title: "Writing Support", desc: "Crafting compelling SOPs & application essays" },
                                        { title: "Reviewer Feedback", desc: "Expert assessment and refinement loop" },
                                    ].map((item, index) => (
                                        <div key={item.title} className="relative flex items-start gap-6 py-3 group">
                                            {/* Step Circle */}
                                            <div className="relative z-10 flex items-center justify-center w-11 h-11 rounded-full border-[3px] border-white bg-amber-50 shadow-sm shrink-0 group-hover:bg-amber-100 group-hover:border-amber-100 group-hover:scale-110 transition-all duration-300">
                                                <span className="text-amber-600 font-extrabold text-sm">{index + 1}</span>
                                            </div>
                                            {/* Card Content */}
                                            <div className="pt-1.5 pb-2">
                                                <h4 className="font-bold text-[#0A1628] text-[15px] group-hover:text-amber-600 transition-colors duration-300">{item.title}</h4>
                                                <p className="text-gray-500 text-sm mt-1.5 leading-relaxed pr-4">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 14. Visa File Optimization */}
            <section className="py-24 bg-[#0A1628] relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:70px_70px] pointer-events-none" />
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.08] text-amber-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                                <FileCheck className="w-3.5 h-3.5" /> Visa Processing
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Visa File Optimization</h2>
                            <p className="text-blue-200/50 mt-4 max-w-2xl mx-auto text-lg">We craft a bulletproof visa application, ensuring high approval success by covering every detail meticulously.</p>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Financial File Review", desc: "Expert assessment of sponsorship, bank statements, and tax documents to ensure embassy compliance.", icon: CreditCard, gradient: "from-blue-500 to-cyan-400" },
                            { title: "Interview Simulation", desc: "Rigorous mock visa interviews building confidence to face the High Commission naturally and correctly.", icon: Users, gradient: "from-amber-500 to-yellow-400" },
                            { title: "Compliance Checklist", desc: "A strict multi-layer verification of your total document stack before making the final visa lodgement.", icon: ClipboardCheck, gradient: "from-emerald-500 to-teal-400" },
                        ].map((item) => (
                            <StaggerItem key={item.title}>
                                <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm group hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 hover:-translate-y-1 h-full shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                        <item.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="font-bold text-white text-xl mb-3">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 15. Pre-Departure & Arrival Package */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-50/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100/60 text-amber-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <Luggage className="w-3.5 h-3.5" /> Next Steps
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1628] tracking-tight">Pre-Departure & Arrival Package</h2>
                            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">Your journey doesn't end with a visa. We ensure you land smoothly and settle perfectly into your new life.</p>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Flight & Baggage", desc: "Expert guidance on route selection, student baggage allowances, and transit instructions.", icon: Plane, glow: "shadow-blue-500/20", gradient: "from-blue-500 to-cyan-400" },
                            { title: "Accommodation Setup", desc: "Assistance locking in campus, homestay, or rental housing before you arrive.", icon: BedDouble, glow: "shadow-purple-500/20", gradient: "from-purple-500 to-violet-400" },
                            { title: "Airport Pickup", desc: "Direct logistical coordination ensuring guaranteed transport straight to your new home.", icon: Home, glow: "shadow-amber-500/20", gradient: "from-amber-500 to-orange-400" },
                            { title: "30-Day Settlement", desc: "Guidance on opening bank accounts, getting a mobile SIM, and using public transport.", icon: Headset, glow: "shadow-emerald-500/20", gradient: "from-emerald-500 to-teal-400" },
                        ].map((item) => (
                            <StaggerItem key={item.title}>
                                <div className="p-8 bg-white border border-gray-100/60 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 h-full group">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center mb-6 shadow-lg ${item.glow} group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-[#0A1628] text-[17px] mb-3 leading-snug">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 16. Parent Support Desk */}
            <section className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50 border-y border-blue-100/60 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/40 rounded-full blur-[100px] opacity-70 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/30 rounded-full blur-[80px] pointer-events-none" />
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn direction="up">
                        <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-10 md:p-16 rounded-[2rem] shadow-[0_20px_60px_rgba(10,22,40,0.05)] text-center relative max-w-5xl mx-auto overflow-hidden group">
                            <div className="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-1000 ease-in-out"><Smartphone className="w-96 h-96 text-blue-900" /></div>
                            
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/20 relative z-10 group-hover:scale-110 transition-transform duration-500">
                                <Smartphone className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1628] tracking-tight relative z-10">Parent Support Desk</h2>
                            <p className="text-gray-600 mt-5 max-w-2xl mx-auto text-lg leading-relaxed relative z-10">Sending a child abroad is a big step. We provide dedicated, real-time updates for parents on the application progress, visa stage, payment milestones, and departure timeline to ensure complete peace of mind.</p>
                            
                            <div className="mt-10 relative z-10">
                                <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#0A1628] text-white font-bold hover:bg-[#0A1628]/90 hover:shadow-[0_10px_40px_rgba(10,22,40,0.3)] hover:-translate-y-1 transition-all duration-300 group/btn shadow-md">
                                    Talk to Support Team <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 17. Urgency CTA */}
            <UrgencyCTA />
        </>
    );
}

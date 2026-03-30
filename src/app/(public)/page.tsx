/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";
import Link from "next/link";
import { ArrowRight, GraduationCap, Globe, Users, Award, CheckCircle2, Star, Briefcase, Plane, Home, Shield, TrendingUp, Clock, Headphones, Target, Sparkles, Building2, MapPin, Search, Play } from "lucide-react";
import { getTopUniversities } from "@/actions/universities";
import { getCountries } from "@/actions/countries";
import { getFeaturedTestimonials } from "@/actions/testimonials";
import { getCounselors } from "@/actions/counselors";
import { getFaqs } from "@/actions/faqs";
import { getActiveAnnouncements } from "@/actions/announcements";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import TrustBanner from "@/components/TrustBanner";
import ScholarshipSpotlight from "@/components/ScholarshipSpotlight";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import UniversityMarquee from "@/components/UniversityMarquee";
import UrgencyCTA from "@/components/UrgencyCTA";
import UniversityFinder from "@/components/UniversityFinder";
import AnnouncementMarquee from "@/components/AnnouncementMarquee";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/MotionWrappers";
import { HighlightUnderline } from "@/components/HeroDecoration";

export default async function HomePage() {
    let universities: Awaited<ReturnType<typeof getTopUniversities>> = [];
    let countries: Awaited<ReturnType<typeof getCountries>> = [];
    let testimonials: any[] = [];
    let counselors: any[] = [];
    let faqs: any[] = [];
    let announcements: any[] = [];

    try {
        [universities, countries, testimonials, counselors, faqs, announcements] = await Promise.all([
            getTopUniversities(100),
            getCountries(),
            getFeaturedTestimonials(),
            getCounselors(),
            getFaqs("General"),
            getActiveAnnouncements(),
        ]);
    } catch {
        // DB not available yet
    }

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

    const valueProps = [
        { icon: Briefcase, title: "End-to-End Support", desc: "From course selection to arrival at your university, we handle everything.", gradient: "from-blue-500 to-cyan-400" },
        { icon: Award, title: "Scholarship Guidance", desc: "Access exclusive scholarships and financial aid worth thousands.", gradient: "from-amber-500 to-orange-400" },
        { icon: Plane, title: "Visa Assistance", desc: "98% visa approval rate with expert documentation and interview prep.", gradient: "from-emerald-500 to-teal-400" },
        { icon: Home, title: "Accommodation Help", desc: "Safe, affordable housing near your campus arranged before arrival.", gradient: "from-purple-500 to-violet-400" },
    ];

    const processSteps = [
        { step: "01", title: "Free Consultation", desc: "Book a call with our expert counselors to discuss your goals and preferences.", icon: Headphones },
        { step: "02", title: "University Matching", desc: "We shortlist the best universities and programs based on your profile.", icon: Target },
        { step: "03", title: "Application & Visa", desc: "Complete application support including SOP, documents, and visa filing.", icon: Shield },
        { step: "04", title: "Fly & Study", desc: "Pre-departure orientation, accommodation setup, and airport assistance.", icon: Plane },
    ];

    return (
        <>
            {/* ===== HERO (DARK) ===== */}
            <PageHero
                badge="Trusted by 5,000+ Students Worldwide"
                badgeIcon={GraduationCap}
                title={
                    <>
                        Your Global Future<br />
                        <HighlightUnderline color="var(--accent)">Starts Here</HighlightUnderline>
                    </>
                }
                subtitle="Cambry is your trusted International Admission Centre. We guide you from course selection to visa approval across top universities in the UK, Australia, Canada, Malaysia & New Zealand."
                backgroundImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80"
                mainImage="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800"
                backgroundAlt="Students on university campus"
                cta={{ label: "Book Free Consultation", href: "/contact" }}
                isSplit={true}
                stats={["students", "success", "rating"]}
            />

            {/* ===== ANNOUNCEMENT MARQUEE (DARK STRIP) ===== */}
            <AnnouncementMarquee announcements={announcements} />

            {/* ===== TRUST BANNER (DARK STRIP) ===== */}
            <TrustBanner />


            {/* ===================================================================== */}
            {/* ===== LIGHT ZONE: Why Choose Us + How It Works ===== */}
            {/* ===================================================================== */}

            {/* ===== WHY CHOOSE US (LIGHT) ===== */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-50/80 to-purple-50/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-xs font-bold uppercase tracking-widest mb-6">
                                <Sparkles className="w-3.5 h-3.5" /> Why Choose Us
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1628] tracking-tight">
                                Why Students Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-blue)] to-[var(--accent)]">Cambry</span>
                            </h2>
                            <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">We make studying abroad simple, affordable, and stress-free with our comprehensive premium support services.</p>
                        </div>
                    </FadeIn>

                    <div className="grid lg:grid-cols-[1fr_auto] gap-14 items-center">
                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {valueProps.map((item) => (
                                <StaggerItem key={item.title}>
                                    <HoverCard className="bg-white border border-gray-100/80 rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 h-full group relative overflow-hidden">
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.06] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-opacity duration-500`} />
                                        <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <item.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="font-bold text-[#0A1628] text-xl mb-3">{item.title}</h3>
                                        <p className="text-gray-500 leading-relaxed text-[15px]">{item.desc}</p>
                                    </HoverCard>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>

                        {/* Student image alongside cards */}
                        <FadeIn direction="left" delay={0.2} className="hidden lg:block">
                            <div className="relative w-[320px] h-[480px] rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.12)]">
                                <img
                                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=640&q=80"
                                    alt="International students celebrating on campus"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <p className="text-white font-bold text-lg">Your dream campus awaits</p>
                                    <p className="text-white/60 text-sm mt-1">Join 500+ successful students</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ===== HOW IT WORKS (LIGHT — subtle gradient) ===== */}
            <section className="py-28 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.06),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.06),transparent_40%)] pointer-events-none" />

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
                                <Target className="w-3.5 h-3.5" /> How It Works
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1628] tracking-tight">Your Journey in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">4 Simple Steps</span></h2>
                        </div>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((item, i) => (
                            <StaggerItem key={item.step} className="relative text-center group">
                                {/* Connector line (desktop only) */}
                                {i < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-14 left-[calc(50%+50px)] w-[calc(100%-100px)] h-px bg-gradient-to-r from-gray-200 via-blue-200 to-gray-200" />
                                )}

                                <div className="relative inline-flex flex-col items-center">
                                    <div className="relative w-28 h-28 rounded-2xl bg-white border border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex items-center justify-center mx-auto mb-8 group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] group-hover:-translate-y-2 transition-all duration-500">
                                        <item.icon className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                                        <div className="absolute -top-3 -right-3 w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-violet-500 flex items-center justify-center text-white font-extrabold text-sm shadow-lg">
                                            {item.step}
                                        </div>
                                    </div>
                                    <h3 className="text-[#0A1628] font-bold text-xl mb-3">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed px-2 text-[15px]">{item.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>


            {/* ===================================================================== */}
            {/* ===== DARK ZONE: Destinations + University Finder transition ===== */}
            {/* ===================================================================== */}

            {/* ===== TOP DESTINATIONS (DARK) ===== */}
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


            {/* ===================================================================== */}
            {/* ===== LIGHT ZONE: University Finder + Lead Form ===== */}
            {/* ===================================================================== */}

            {/* ===== UNIVERSITY FINDER (LIGHT) ===== */}
            <UniversityFinder
                universities={universities.map(u => ({
                    id: u.id,
                    name: u.name,
                    slug: u.slug,
                    location: u.location,
                    tuitionEstimate: u.tuitionEstimate,
                    website: u.website,
                    imageUrl: u.imageUrl,
                    country: { name: u.country.name, slug: u.country.slug, flagUrl: u.country.flagUrl },
                }))}
                countries={countries.map(c => ({
                    id: c.id,
                    name: c.name,
                    slug: c.slug,
                }))}
            />

            {/* ===== LEAD FORM (LIGHT) ===== */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-amber-50/60 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-50/60 rounded-full blur-[100px] translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeIn direction="right">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-xs font-bold uppercase tracking-widest mb-6">
                                <Sparkles className="w-3.5 h-3.5" /> Get Started
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1628] tracking-tight leading-tight">
                                Ready to Start Your<br />Study Abroad Journey?
                            </h2>
                            <p className="text-gray-500 mt-6 leading-relaxed text-lg">
                                Fill out the form and one of our expert counselors will get in touch within 24 hours. Our consultation is completely free.
                            </p>
                            <div className="mt-10 space-y-4">
                                {["Free personalized counseling", "No hidden fees", "Expert visa guidance", "24/7 support"].map((item) => (
                                    <div key={item} className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <span className="text-gray-700 font-semibold">{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Student image strip */}
                            <div className="mt-10 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)] hidden sm:block">
                                <img
                                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=640&q=80"
                                    alt="International students studying together on campus"
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                        </FadeIn>

                        <FadeIn direction="left" delay={0.2}>
                            <div className="bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] rounded-xl p-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-50 to-purple-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <h3 className="text-2xl font-bold text-[#0A1628] mb-8 relative z-10 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-gradient-to-b from-amber-500 to-amber-400 rounded-full" />
                                    Book Free Consultation
                                </h3>
                                <div className="relative z-10">
                                    <LeadForm />
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>


            {/* ===================================================================== */}
            {/* ===== DARK ZONE: Testimonials ===== */}
            {/* ===================================================================== */}

            {/* ===== TESTIMONIALS (DARK) ===== */}
            <TestimonialsCarousel testimonials={testimonials.length > 0 ? testimonials : [
                {
                    studentName: "Rahul Sharma",
                    studentCourse: "MSc Data Science",
                    universityName: "Imperial College London",
                    targetCountry: "UK",
                    quote: "Cambry made my UK dream possible. The team offered end-to-end support, from university selection to visa guidance. Their precision and dedication were truly impressive.",
                    imageUrl: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?q=80&w=800"
                },
                {
                    studentName: "Amara Khan",
                    studentCourse: "BEng Mechanical",
                    universityName: "University of Toronto",
                    targetCountry: "Canada",
                    quote: "I received a fast-track offer and a CAD 10,000 scholarship thanks to my counselor at Cambry. They understood my profile perfectly and suggested the best possible match.",
                    imageUrl: "https://images.unsplash.com/photo-1590518712792-74737d6e467d?q=80&w=800"
                },
                {
                    studentName: "Arjun Das",
                    studentCourse: "MBA Global Management",
                    universityName: "University of Melbourne",
                    targetCountry: "Australia",
                    quote: "Expert visa guidance and genuine care for students' success. I felt confident throughout the entire application process. Highly recommended for any study abroad aspirant.",
                    imageUrl: "https://images.unsplash.com/photo-1627551776582-591629ed324d?q=80&w=800"
                },
            ]} />


            {/* ===================================================================== */}
            {/* ===== LIGHT ZONE: Scholarships + Partners + FAQ ===== */}
            {/* ===================================================================== */}

            {/* ===== SCHOLARSHIP SPOTLIGHT (LIGHT) ===== */}
            <ScholarshipSpotlight />

            {/* ===== ACCREDITATIONS & PARTNER UNIVERSITIES (LIGHT) ===== */}
            <section className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
                {/* Vibrant background orbs for glassmorphism */}
                <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[100px] -translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px] translate-x-1/4 pointer-events-none" />

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* ────── ACCREDITATIONS OVERHAUL ────── */}
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-widest mb-6 border border-slate-200">
                                <Shield className="w-3.5 h-3.5" /> Official Partnerships
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight mb-5">
                                Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Accreditations</span>
                            </h2>
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                                Trusted by the world's leading educational authorities. We are strictly vetted and officially recognized to ensure your future is secure.
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.1}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {[
                                {
                                    name: "British Council",
                                    role: "Platinum Partner",
                                    desc: "Certified student recruitment partner for UK education.",
                                    logo: "https://www.britishcouncil.in/profiles/solas2/themes/solas_ui/images/desktop/britishcouncil_indigo_logo.jpg",
                                    color: "#004CB2", // British Council Blue
                                },
                                {
                                    name: "IDP Education",
                                    role: "Official Partner",
                                    desc: "Authorized global admissions & recruitment agency.",
                                    logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://idp.com&size=128",
                                    color: "#008269", // IDP Teal/Green
                                },
                                {
                                    name: "IELTS Official",
                                    role: "Test Centre",
                                    desc: "Trusted and authorized center for IELTS booking.",
                                    logo: "https://1000logos.net/wp-content/uploads/2021/03/IELTS-logo.jpg",
                                    color: "#E51D3A", // IELTS Red
                                },
                                {
                                    name: "ICEF",
                                    role: "Certified Agency",
                                    desc: "Recognized for highest standards in international education.",
                                    logo: "https://www.icef.com/academy/wp-content/uploads/2020/02/ICEF-Academy-Logo-Blue.png",
                                    color: "#0077C8", // ICEF Blue
                                },
                                {
                                    name: "Pearson PTE",
                                    role: "Registration Partner",
                                    desc: "Official partner for PTE Academic test registration.",
                                    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Pearson_logo.svg/1280px-Pearson_logo.svg.png",
                                    color: "#00898C", // Pearson Dark Cyan
                                },
                                {
                                    name: "Linguaskill",
                                    role: "Testing Partner",
                                    desc: "Authorized test center for Cambridge Linguaskill exams.",
                                    logo: "https://www.bltc.nl/wp-content/uploads/Linguaskill_logo.png",
                                    color: "#DE1F26", // Cambridge Red
                                },
                                {
                                    name: "UCAS",
                                    role: "Registered Centre",
                                    desc: "Approved application center for UK universities.",
                                    logo: "https://placehold.co/300x120/transparent/003366.svg?text=UCAS&font=Montserrat",
                                    color: "#003366", // UCAS Navy
                                },
                                {
                                    name: "English UK",
                                    role: "Partner Agency",
                                    desc: "Recognized partner for prestigious English language schools.",
                                    logo: "https://www.englishuk.com/images/2019/English%20UK%20logo%20RGB%202018%201000w.png",
                                    color: "#E60050", // English UK Magenta
                                }
                            ].map((acc, index) => (
                                <div key={index} className="group rounded-xl overflow-hidden flex flex-col h-full bg-white/40 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-white/60 hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)] hover:border-white transition-all duration-500 hover:-translate-y-2">

                                    {/* Top Half: Glassy Logo Display */}
                                    <div className="flex-1 min-h-[160px] flex items-center justify-center p-8 relative z-10 transition-colors duration-500 group-hover:bg-white/50">
                                        <img src={acc.logo} alt={acc.name} className="max-w-[140px] max-h-[80px] object-contain group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] drop-shadow-sm" />
                                    </div>

                                    {/* Bottom Half: Official Color Block */}
                                    <div className="p-6 sm:p-8 flex-shrink-0 transition-all duration-500 relative overflow-hidden flex flex-col justify-end min-h-[170px]" style={{ backgroundColor: acc.color }}>
                                        {/* Abstract background highlight */}
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                        <div className="relative z-10 w-full mb-3">
                                            <span className="inline-block px-3 py-1 bg-white/20 text-white rounded text-[10px] font-bold uppercase tracking-[0.15em] backdrop-blur-md border border-white/10">
                                                {acc.role}
                                            </span>
                                        </div>
                                        <h3 className="relative z-10 text-xl font-extrabold text-white mb-2">{acc.name}</h3>
                                        <p className="relative z-10 text-sm text-white/90 leading-relaxed font-medium">
                                            {acc.desc}
                                        </p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Elegant divider */}
                    <div className="my-16 sm:my-20 flex items-center gap-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                        <div className="flex items-center gap-2 px-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-300" />
                            <div className="w-1 h-1 rounded-full bg-gray-300" />
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-300" />
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    </div>

                    {/* ────── PARTNER UNIVERSITIES ────── */}
                    <FadeIn direction="up">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50/80 border border-violet-100/50 text-violet-600 text-[11px] font-bold uppercase tracking-[0.15em] mb-5">
                                <GraduationCap className="w-3.5 h-3.5" /> Partner Institutions
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A1628] tracking-tight">
                                Partner Universities Worldwide
                            </h3>
                            <p className="text-gray-400 mt-4 max-w-lg mx-auto text-base leading-relaxed">
                                50+ prestigious universities across 11 countries, handpicked for your success.
                            </p>
                        </div>
                    </FadeIn>
                </div>

                {/* Full-width dual-row marquee */}
                <div className="mt-2">
                    <UniversityMarquee universities={universities.length > 0
                        ? universities.map(u => ({
                            name: u.name,
                            imageUrl: u.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=f1f5f9&color=334155&size=128&font-size=0.33&bold=true`,
                            country: u.country.name,
                        }))
                        : [
                            { name: "Imperial College London", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Imperial_College_London_crest.svg/800px-Imperial_College_London_crest.svg.png", country: "United Kingdom" },
                            { name: "University of Melbourne", imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/University_of_Melbourne_coat_of_arms.svg/800px-University_of_Melbourne_coat_of_arms.svg.png", country: "Australia" },
                            { name: "University of Toronto", imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/800px-Utoronto_coa.svg.png", country: "Canada" },
                            { name: "University of Auckland", imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/University_of_Auckland_coat_of_arms.svg/800px-University_of_Auckland_coat_of_arms.svg.png", country: "New Zealand" },
                            { name: "University of Malaya", imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/University_of_Malaya_coat_of_arms.svg/800px-University_of_Malaya_coat_of_arms.svg.png", country: "Malaysia" },
                            { name: "Seoul National University", imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Seoul_National_University_emblem.svg/800px-Seoul_National_University_emblem.svg.png", country: "South Korea" },
                        ]
                    } />
                </div>
            </section>

            {/* ===== COUNSELORS & FAQ (LIGHT) ===== */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-50/60 rounded-full blur-[120px] translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Counselors */}
                        <div>
                            <FadeIn direction="up">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-xs font-bold uppercase tracking-widest mb-6">
                                    <Users className="w-3.5 h-3.5" /> Our Team
                                </div>
                                <h2 className="text-3xl font-extrabold text-[#0A1628] mb-10 tracking-tight">Certified Counselors</h2>
                            </FadeIn>
                            <StaggerContainer className="grid grid-cols-2 gap-5">
                                {(counselors.length > 0 ? counselors.slice(0, 4) : [
                                    { name: "British Council Certified Counselor" },
                                    { name: "ABC Certified Counselor" },
                                    { name: "NZQA Certified Counselor" },
                                    { name: "ICEF Certified Counselor" },
                                ]).map((c: any) => (
                                    <StaggerItem key={c.name}>
                                        <div className="bg-white border border-gray-100/80 rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 group text-center h-full flex flex-col items-center justify-center">
                                            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <Award className="w-7 h-7 text-white" />
                                            </div>
                                            <p className="font-bold text-[#0A1628] text-base leading-snug">{c.name}</p>
                                        </div>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>

                        {/* FAQ */}
                        <div>
                            <FadeIn direction="up" delay={0.2}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
                                    <Star className="w-3.5 h-3.5" /> FAQ
                                </div>
                                <h2 className="text-3xl font-extrabold text-[#0A1628] mb-10 tracking-tight">Common Questions</h2>
                            </FadeIn>
                            <div className="space-y-3">
                                {(faqs.length > 0 ? faqs.slice(0, 5) : [
                                    { question: "Can I apply without IELTS?", answer: "Many universities accept MOI (Medium of Instruction) or alternative tests like Duolingo depending on the country." },
                                    { question: "What is the study gap limit?", answer: "Most countries accept study gaps with proper justification. UK is generally lenient with 5-10+ year gaps." },
                                    { question: "How long does the process take?", answer: "From initial consultation to receiving your offer letter, it typically takes 4-8 weeks depending on the university and program." },
                                    { question: "Is the consultation really free?", answer: "Yes! Our initial consultation is completely free with no obligations. We only charge service fees after you decide to proceed." },
                                ]).map((faq: any, i: number) => (
                                    <FadeIn direction="up" delay={0.3 + (i * 0.1)} key={i}>
                                        <details className="group bg-white border border-gray-100/80 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden">
                                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                                <span className="font-bold text-[#0A1628] text-[15px] pr-4">{faq.question}</span>
                                                <div className="w-8 h-8 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-open:bg-amber-500 group-open:border-amber-500 group-open:text-white transition-all duration-300">
                                                    <span className="text-lg leading-none transform group-open:rotate-45 transition-transform duration-300">+</span>
                                                </div>
                                            </summary>
                                            <div className="px-6 pb-6 text-[15px] text-gray-500 leading-relaxed border-t border-gray-50">
                                                {faq.answer}
                                            </div>
                                        </details>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== URGENCY CTA (GRADIENT) ===== */}
            <UrgencyCTA />
        </>
    );
}

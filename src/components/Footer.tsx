import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, MessageCircle, Clock, ChevronRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0A1628] text-white relative overflow-hidden border-t border-white/5">
            {/* Ambient lighting */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[100px] pointer-events-none translate-y-1/3 translate-x-1/3" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

                    {/* Brand Column (Spans 3) */}
                    <div className="lg:col-span-3 pr-0 lg:pr-6">
                        <Link href="/" className="flex items-center gap-3 group inline-flex mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
                                <Image
                                    src="https://i.postimg.cc/DyrWZMyx/cambry-logo.png"
                                    alt="Cambry Logo"
                                    width={56}
                                    height={56}
                                    className="h-14 w-14 object-contain relative z-10 group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex flex-col justify-center w-max">
                                <span className="text-[32px] md:text-[38px] font-black tracking-[0.12em] text-white uppercase leading-none ml-1 mb-1.5 md:mb-2">CAMBRY</span>
                                <div className="flex items-center gap-1.5 md:gap-2 ml-1 text-[8px] md:text-[9.5px] text-white/40 font-bold tracking-[0.02em] uppercase leading-none">
                                    <span>International</span>
                                    <span>Admission</span>
                                    <span>Center</span>
                                </div>
                            </div>
                        </Link>
                        <p className="text-white/60 text-base leading-relaxed mb-6 font-medium">
                            Your trusted gateway to global education. We expertly match ambitious students with top-tier international universities.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { Icon: Facebook, href: "#", color: "bg-[#1877F2] shadow-[0_4px_12px_rgba(24,119,242,0.3)] hover:brightness-110" },
                                { Icon: Instagram, href: "#", color: "bg-[#E4405F] shadow-[0_4px_12px_rgba(228,64,95,0.3)] hover:brightness-110" },
                                { Icon: Linkedin, href: "#", color: "bg-[#0077B5] shadow-[0_4px_12px_rgba(0,119,181,0.3)] hover:brightness-110" },
                                { Icon: Youtube, href: "#", color: "bg-[#FF0000] shadow-[0_4px_12px_rgba(255,0,0,0.3)] hover:brightness-110" },
                            ].map(({ Icon, href, color }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-white transition-all duration-300 ${color} hover:-translate-y-1`}
                                >
                                    <Icon className="w-5 h-5" strokeWidth={2.5} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Wrapper (Side-by-side on mobile) */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-4 sm:gap-8">
                        {/* Discover */}
                        <div>
                            <h3 className="text-white font-bold tracking-widest uppercase text-xs sm:text-sm mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3">
                                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
                                Discover
                            </h3>
                            <ul className="space-y-2.5 sm:space-y-3">
                                {[
                                    { href: "/about", label: "About Us" },
                                    { href: "/services", label: "Our Services" },
                                    { href: "/destinations", label: "Destinations" },
                                    { href: "/universities", label: "Universities" },
                                    { href: "/contact", label: "Contact Us" },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="group flex items-center gap-2 text-white/50 hover:text-amber-400 font-medium text-[13px] sm:text-sm transition-colors">
                                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -ml-5 sm:-ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-amber-500" />
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Top Regions */}
                        <div>
                            <h3 className="text-white font-bold tracking-widest uppercase text-xs sm:text-sm mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3">
                                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                                Top Regions
                            </h3>
                            <ul className="space-y-2.5 sm:space-y-3">
                                {[
                                    { href: "/destinations/united-kingdom", label: "United Kingdom" },
                                    { href: "/destinations/australia", label: "Australia" },
                                    { href: "/destinations/canada", label: "Canada" },
                                    { href: "/destinations/usa", label: "United States" },
                                    { href: "/destinations/malaysia", label: "Malaysia" },
                                ].map((d) => (
                                    <li key={d.href}>
                                        <Link href={d.href} className="group flex items-center gap-2 text-white/50 hover:text-blue-400 font-medium text-[13px] sm:text-sm transition-colors">
                                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -ml-5 sm:-ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-blue-500" />
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">{d.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info & Hours Wrapper (Side-by-side on mobile) */}
                    <div className="lg:col-span-5 grid grid-cols-5 gap-2 sm:gap-8">
                        {/* Contact Info Column (Spans 3/5) */}
                        <div className="col-span-3">
                            <h3 className="text-white font-bold tracking-widest uppercase text-[10px] sm:text-sm mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3">
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                                Contact Us
                            </h3>

                            <div className="space-y-3 sm:space-y-4">
                                <a href="mailto:info@cambrybd.com" className="flex items-start gap-2 sm:gap-4 text-white/60 hover:text-white transition-colors group">
                                    <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors border border-white/5">
                                        <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </div>
                                    <div className="pt-1.5 sm:pt-2">
                                        <p className="text-[11px] sm:text-sm font-semibold leading-none">info@cambrybd.com</p>
                                    </div>
                                </a>

                                <a href="tel:+8801700000000" className="flex items-center gap-2 sm:gap-4 text-white/60 hover:text-white transition-colors group">
                                    <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors border border-white/5">
                                        <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </div>
                                    <p className="text-[11px] sm:text-sm font-semibold">+880 1700-000000</p>
                                </a>

                                <div className="flex items-start gap-2 sm:gap-4 text-white/60 pt-1 sm:pt-2">
                                    <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/5 mt-0.5 sm:mt-1">
                                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </div>
                                    <div className="pt-0.5 sm:pt-0">
                                        <p className="text-[11px] sm:text-[13px] font-bold text-white mb-0.5 sm:mb-1">398 Rd 29,</p>
                                        <p className="text-[10px] sm:text-[13px] leading-tight sm:leading-snug text-white/40">Dhaka 1206, Bangladesh</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Office Hours Column (Spans 2/5) */}
                        <div className="col-span-2">
                            <h3 className="text-white font-bold tracking-widest uppercase text-[10px] sm:text-sm mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3">
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]"></span>
                                Office Hours
                            </h3>

                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <div className="flex items-center gap-1.5 sm:gap-3 mb-1 sm:mb-1.5">
                                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                                        <span className="text-[11px] sm:text-[13px] font-bold text-white leading-none">Sat – Thu</span>
                                    </div>
                                    <p className="text-[10px] sm:text-[13.5px] text-white/50 font-medium ml-4 sm:ml-7 leading-none">10:00 AM – 7:00 PM</p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-1.5 sm:gap-3 mb-1 sm:mb-1.5">
                                        <div className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                                        <span className="text-[11px] sm:text-[13px] font-bold text-white leading-none">Friday</span>
                                    </div>
                                    <p className="text-[10px] sm:text-[13.5px] text-red-400 font-medium ml-4 sm:ml-7 leading-none">Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Simple & Professional Copyright Area */}
            <div className="relative z-10 w-full py-4 mt-4 border-t border-white/5 bg-black/40 backdrop-blur-md">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                        {/* Copyright */}
                        <div className="text-[13px] text-white/40 font-medium text-center md:text-left">
                            Copyright &copy; {new Date().getFullYear()} <span className="text-white/60 font-semibold">Cambry</span>. All right reserved.
                        </div>

                        {/* Links in Center */}
                        <div className="flex items-center gap-8">
                            <Link href="/privacy" className="text-[13px] text-white/40 hover:text-white transition-colors font-medium underline-offset-4 hover:underline">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-[13px] text-white/40 hover:text-white transition-colors font-medium underline-offset-4 hover:underline">
                                Terms of Service
                            </Link>
                        </div>

                        {/* TechWisdom Credit - Last & Tiny */}
                        <div className="text-[10px] uppercase font-bold text-white/[0.15] tracking-[0.1em] transition-colors hover:text-white/40 group flex items-center gap-1.5">
                            <span>Developed by</span>
                            <a
                                href="https://www.techwisdom.site/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-amber-500/80 transition-colors"
                            >
                                techwisdom technologies
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
}

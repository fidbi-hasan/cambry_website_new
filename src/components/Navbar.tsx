"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, MapPin, Info, ShieldCheck } from "lucide-react";

const getFlagImageUrl = (flagStr: string | null | undefined) => {
    if (!flagStr) return null;
    if (flagStr.startsWith('http')) return flagStr;
    const codePoints = Array.from(flagStr).map(c => c.codePointAt(0)?.toString(16));
    if (codePoints.length && codePoints.every(c => c)) {
        return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codePoints.join('-')}.svg`;
    }
    return null;
};

export default function Navbar({ countries = [] }: { countries?: { name: string, slug: string, flagUrl?: string | null }[] }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [destDropdownOpen, setDestDropdownOpen] = useState(false);
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [mobileDestOpen, setMobileDestOpen] = useState(false);
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

    const destRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        const handleClickOutside = (event: MouseEvent) => {
            if (destRef.current && !destRef.current.contains(event.target as Node)) setDestDropdownOpen(false);
            if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) setAboutDropdownOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [open]);

    const isActive = (path: string) => pathname === path;
    const navLinkClass = (path: string) =>
        `relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive(path)
            ? "text-white bg-white/10 ring-1 ring-white/20 shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
            : "text-white/70 hover:text-white hover:bg-white/5"
        }`;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
                    ? "bg-[#0A1628]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-1"
                    : "bg-transparent py-3"
                }`}
        >
            <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-purple-500 rounded-md opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" />
                            <Image
                                src="https://i.postimg.cc/DyrWZMyx/cambry-logo.png"
                                alt="Cambry Logo"
                                width={42}
                                height={42}
                                className="h-10 w-10 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                                priority
                            />
                        </div>
                        <div className="flex flex-col justify-center w-max">
                            <span className="text-[22px] font-black text-white tracking-[0.1em] uppercase leading-none px-1 mb-1">CAMBRY</span>
                            <div className="flex items-center gap-1 px-1 text-[6.5px] text-white/40 font-bold tracking-[0.02em] uppercase leading-none">
                                <span>International</span>
                                <span>Admission</span>
                                <span>Center</span>
                            </div>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        <Link href="/" className={navLinkClass("/")}>Home</Link>

                        <div className="relative" ref={aboutRef}>
                            <button
                                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                                onMouseEnter={() => setAboutDropdownOpen(true)}
                                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${(isActive("/about") || isActive("/certifications")) ? "text-white bg-white/10 ring-1 ring-white/20 shadow-[0_2px_10px_rgba(255,255,255,0.1)]" : "text-white/70 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                About <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <div
                                onMouseLeave={() => setAboutDropdownOpen(false)}
                                className={`absolute top-full left-0 mt-3 w-72 bg-white/95 backdrop-blur-2xl rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.15)] ring-1 ring-black/5 transition-all duration-300 origin-top-left ${aboutDropdownOpen ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible -translate-y-2'}`}
                            >
                                <div className="p-2.5 space-y-1">
                                    <Link href="/about" className="flex items-center gap-3 p-3.5 rounded-md hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all group/item">
                                        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center group-hover/item:scale-110 transition-all shadow-sm">
                                            <Info className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">About Us</p>
                                            <p className="text-xs text-gray-500">Our mission and values</p>
                                        </div>
                                    </Link>
                                    <Link href="/certifications" className="flex items-center gap-3 p-3.5 rounded-md hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all group/item">
                                        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center group-hover/item:scale-110 transition-all shadow-sm">
                                            <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Certifications</p>
                                            <p className="text-xs text-gray-500">Our agency accreditations</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link href="/services" className={navLinkClass("/services")}>Services</Link>

                        <div className="relative" ref={destRef}>
                            <button
                                onClick={() => setDestDropdownOpen(!destDropdownOpen)}
                                onMouseEnter={() => setDestDropdownOpen(true)}
                                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${pathname.startsWith("/destinations") ? "text-white bg-white/10 ring-1 ring-white/20 shadow-[0_2px_10px_rgba(255,255,255,0.1)]" : "text-white/70 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                Destinations <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${destDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <div
                                onMouseLeave={() => setDestDropdownOpen(false)}
                                className={`absolute top-full left-0 mt-3 w-[30rem] max-h-[70vh] overflow-y-auto bg-white/95 backdrop-blur-2xl rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.15)] ring-1 ring-black/5 transition-all duration-300 origin-top-left ${destDropdownOpen ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible -translate-y-2'}`}
                            >
                                <div className="p-2.5 space-y-0.5">
                                    <Link href="/destinations" className="flex items-center gap-3 p-3.5 rounded-md hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all group/item">
                                        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center group-hover/item:scale-110 transition-all shadow-sm">
                                            <MapPin className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">All Destinations</p>
                                            <p className="text-xs text-gray-500">View all study countries</p>
                                        </div>
                                    </Link>
                                    <div className="h-px bg-gray-100 mx-3 my-1" />
                                    <div className="grid grid-cols-2 gap-1">
                                        {(countries || []).map((country) => (
                                            <Link key={country.slug} href={`/destinations/${country.slug}`} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-700 rounded-md transition-all">
                                                {getFlagImageUrl(country.flagUrl) && (
                                                    <img src={getFlagImageUrl(country.flagUrl)!} alt={`${country.name} flag`} className="w-5 h-4 object-cover rounded shadow-sm" />
                                                )}
                                                <span className="truncate">Study in {country.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link href="/ielts-booking" className={navLinkClass("/ielts-booking")}>IELTS & PTE</Link>
                        <Link href="/contact" className={navLinkClass("/contact")}>Contact</Link>

                        <Link
                            href="/contact"
                            className="ml-3 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold rounded-full hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ring-1 ring-white/20 shadow-lg shadow-amber-500/20"
                        >
                            Apply Now
                        </Link>
                    </div>

                    <button onClick={() => setOpen(true)} className="md:hidden text-white hover:text-white/80 p-2.5 rounded-md hover:bg-white/10 transition-all">
                        <Menu className="w-7 h-7" />
                    </button>
                </div>

            </nav>

            {/* Full-Screen Mobile Menu Drawer */}
            <div
                className={`fixed inset-0 z-[100] bg-[#0A1628] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${open ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                        <Image src="https://i.postimg.cc/DyrWZMyx/cambry-logo.png" alt="Cambry Logo" width={36} height={36} className="h-9 w-9 object-contain" priority />
                        <span className="text-[22px] font-black text-white tracking-[0.15em] uppercase leading-none mt-1">CAMBRY</span>
                    </div>
                    <button onClick={() => setOpen(false)} className="text-white hover:text-white/80 p-2.5 rounded-full hover:bg-white/10 transition-all">
                        <X className="w-7 h-7" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-8">
                    <div className="flex flex-col gap-6">
                        <Link href="/" onClick={() => setOpen(false)} className="text-2xl font-bold text-white hover:text-amber-400 transition-colors">Home</Link>

                        <div className="flex flex-col gap-2">
                            <button onClick={() => setMobileAboutOpen(!mobileAboutOpen)} className="flex items-center justify-between w-full text-2xl font-bold text-white hover:text-amber-400 transition-colors text-left">
                                <span>About</span>
                                <ChevronDown className={`w-6 h-6 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${mobileAboutOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="flex flex-col gap-4 pl-4 pt-4">
                                    <Link href="/about" onClick={() => setOpen(false)} className="text-lg text-white/70 hover:text-white transition-colors">About Us</Link>
                                    <Link href="/certifications" onClick={() => setOpen(false)} className="text-lg text-white/70 hover:text-white transition-colors">Certifications</Link>
                                </div>
                            </div>
                        </div>

                        <Link href="/services" onClick={() => setOpen(false)} className="text-2xl font-bold text-white hover:text-amber-400 transition-colors">Services</Link>

                        <div className="flex flex-col gap-2">
                            <button onClick={() => setMobileDestOpen(!mobileDestOpen)} className="flex items-center justify-between w-full text-2xl font-bold text-white hover:text-amber-400 transition-colors text-left">
                                <span>Destinations</span>
                                <ChevronDown className={`w-6 h-6 transition-transform ${mobileDestOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${mobileDestOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="flex flex-col gap-4 pl-4 pt-4 pb-2">
                                    <Link href="/destinations" onClick={() => setOpen(false)} className="text-lg text-amber-400 hover:text-amber-300 font-semibold transition-colors">All Destinations</Link>
                                    {(countries || []).map((country) => (
                                        <Link key={country.slug} href={`/destinations/${country.slug}`} onClick={() => setOpen(false)} className="flex items-center gap-3 text-lg text-white/70 hover:text-white transition-colors">
                                            {getFlagImageUrl(country.flagUrl) && (
                                                <img src={getFlagImageUrl(country.flagUrl)!} alt={`${country.name} flag`} className="w-6 h-4 object-cover rounded shadow-sm" />
                                            )}
                                            Study in {country.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Link href="/ielts-booking" onClick={() => setOpen(false)} className="text-2xl font-bold text-white hover:text-amber-400 transition-colors">IELTS & PTE</Link>
                        <Link href="/contact" onClick={() => setOpen(false)} className="text-2xl font-bold text-white hover:text-amber-400 transition-colors">Contact</Link>
                    </div>
                </div>

                <div className="p-6 border-t border-white/[0.08] bg-[#0A1628]">
                    <Link href="/contact" onClick={() => setOpen(false)} className="flex justify-center items-center w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-bold rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-[1.02] active:scale-95 transition-all">
                        Apply Now
                    </Link>
                </div>
            </div>
        </header>
    );
}

"use client"

import {
    ArrowUpRight,
    Mail,
    MapPin,
    ShieldCheck
} from "lucide-react"
import { usePathname } from "next/navigation"

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.67.33-1 1-1Z" />
    </svg>
)

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            stroke="currentColor"
            strokeWidth="2"
        />
        <circle
            cx="12"
            cy="12"
            r="4"
            stroke="currentColor"
            strokeWidth="2"
        />
        <circle
            cx="17.5"
            cy="6.5"
            r="1"
            fill="currentColor"
        />
    </svg>
)

const YoutubeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.5v-7l6.2 3.5-6.2 3.5Z" />
    </svg>
)

const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
            d="M5 4l14 16M19 4L5 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
)

const LinkedinIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M5.2 3.5A2.5 2.5 0 1 1 .2 3.5a2.5 2.5 0 0 1 5 0ZM.5 8h4.8v15H.5V8ZM8 8h4.6v2.1h.1c.6-1.2 2.2-2.5 4.6-2.5 4.9 0 5.8 3.2 5.8 7.4V23h-4.8v-7.1c0-1.7 0-3.9-2.4-3.9s-2.8 1.9-2.8 3.8V23H8V8Z" />
    </svg>
)

export default function Footer() {
    const pathName = usePathname()
    return (
        
        <footer className={pathName=="/login" || pathName == "/signup"?"hidden":"mt-20 border-t border-slate-200 bg-white text-slate-900"}>

            <section className="mx-auto max-w-7xl px-6 pt-12 lg:px-8">

                <div className="relative overflow-hidden rounded-[2rem] bg-slate-50">

                    <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-100 blur-2xl" />

                    <div className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />

                    <div className="relative grid items-center gap-8 px-7 py-10 sm:px-10 lg:grid-cols-[1fr_0.9fr] lg:px-14 lg:py-12">

                        <div className="relative z-10 max-w-xl">

                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-cyan-700 shadow-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                                GIVE IT A SECOND LIFE
                            </div>

                            <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                                Your unused stuff
                                <span className="text-cyan-600">
                                    {" "}deserves a new owner.
                                </span>
                            </h2>

                            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
                                Sell the things you no longer need and discover
                                products worth buying from people around you.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">

                                <a
                                    href="/sell"
                                    className="group inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-700"
                                >
                                    Post an Ad

                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </a>

                                <a
                                    href="/products"
                                    className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-cyan-200 hover:text-cyan-600"
                                >
                                    Explore Listings
                                </a>

                            </div>

                        </div>


                        <div className="relative mx-auto flex h-[280px] w-full max-w-[480px] items-end justify-center lg:h-[330px]">

                            <div className="absolute bottom-4 h-40 w-64 rounded-full bg-cyan-200/50 blur-3xl" />

                            <img
                                src="/footer/footer.png"
                                alt="PreXchange marketplace"
                                className="relative z-10 h-full w-full object-contain object-bottom drop-shadow-xl"
                            />

                        </div>

                    </div>

                </div>

            </section>


            <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">

                    <div>

                        {/* <a
                            href="/"
                            className="inline-flex items-center gap-2"
                        >

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600 text-lg font-black text-white shadow-lg shadow-cyan-600/20">
                                P
                            </div>

                            <span className="text-xl font-black tracking-tight">
                                Pre<span className="text-cyan-600">X</span>change
                            </span>

                        </a> */}

                        <img src="/logo.png"  alt="logo" width={140} />


                        <p className="mt-5 max-w-xs text-sm leading-6 text-slate-500">
                            A smarter marketplace for buying and selling
                            quality pre-owned products.
                        </p>

                        <div className="mt-6 space-y-3">

                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <ShieldCheck className="h-4 w-4 text-cyan-600" />
                                Safer local marketplace
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <MapPin className="h-4 w-4 text-cyan-600" />
                                Discover products near you
                            </div>

                        </div>

                    </div>


                    <div>

                        <h3 className="text-sm font-bold text-slate-900">
                            Marketplace
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">

                            <li>
                                <a href="/category/2" className="text-slate-500 transition hover:text-cyan-600">
                                    Mobiles
                                </a>
                            </li>

                            <li>
                                <a href="/category/3" className="text-slate-500 transition hover:text-cyan-600">
                                    Cars
                                </a>
                            </li>

                            <li>
                                <a href="/category/4" className="text-slate-500 transition hover:text-cyan-600">
                                    Bikes
                                </a>
                            </li>

                            <li>
                                <a href="/category/5" className="text-slate-500 transition hover:text-cyan-600">
                                    Electronics
                                </a>
                            </li>

                            <li>
                                <a href="/category/6" className="text-slate-500 transition hover:text-cyan-600">
                                    Properties
                                </a>
                            </li>

                        </ul>

                    </div>


                    <div>

                        <h3 className="text-sm font-bold text-slate-900">
                            Company
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">

                            <li>
                                <a href="/about" className="text-slate-500 transition hover:text-cyan-600">
                                    About Us
                                </a>
                            </li>

                            <li>
                                <a href="/contact" className="text-slate-500 transition hover:text-cyan-600">
                                    Contact Us
                                </a>
                            </li>

                            <li>
                                <a href="/blog" className="text-slate-500 transition hover:text-cyan-600">
                                    Blog
                                </a>
                            </li>

                            <li>
                                <a href="/sell" className="text-slate-500 transition hover:text-cyan-600">
                                    Sell on PreXchange
                                </a>
                            </li>

                        </ul>

                    </div>


                    <div>

                        <h3 className="text-sm font-bold text-slate-900">
                            Support
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">

                            <li>
                                <a href="/help" className="text-slate-500 transition hover:text-cyan-600">
                                    Help Center
                                </a>
                            </li>

                            <li>
                                <a href="/safety" className="text-slate-500 transition hover:text-cyan-600">
                                    Safety Center
                                </a>
                            </li>

                            <li>
                                <a href="/faq" className="text-slate-500 transition hover:text-cyan-600">
                                    FAQs
                                </a>
                            </li>

                            <li>
                                <a href="/contact" className="text-slate-500 transition hover:text-cyan-600">
                                    Report a Problem
                                </a>
                            </li>

                        </ul>

                    </div>


                    <div>

                        <h3 className="text-sm font-bold text-slate-900">
                            Get in touch
                        </h3>

                        <div className="mt-5 space-y-4">

                            <a
                                href="mailto:support@prexchange.com"
                                className="flex items-start gap-3 text-sm text-slate-500 transition hover:text-cyan-600"
                            >
                                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                                support@prexchange.com
                            </a>

                            <div className="flex items-start gap-3 text-sm text-slate-500">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />

                                <span>
                                    Bhopal, Madhya Pradesh
                                    <br />
                                    India
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            <div className="border-t border-slate-200">

                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">

                    <p className="text-sm text-slate-400">
                        © 2026 PreXchange. All rights reserved.
                    </p>

                    <div className="flex items-center gap-2">

                        <a
                            href="#"
                            aria-label="Facebook"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-cyan-600 hover:text-white"
                        >
                            <FacebookIcon />
                        </a>

                        <a
                            href="#"
                            aria-label="Instagram"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-cyan-600 hover:text-white"
                        >
                            <InstagramIcon />
                        </a>

                        <a
                            href="#"
                            aria-label="YouTube"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-cyan-600 hover:text-white"
                        >
                            <YoutubeIcon />
                        </a>

                        <a
                            href="#"
                            aria-label="X"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-cyan-600 hover:text-white"
                        >
                            <XIcon />
                        </a>

                        <a
                            href="#"
                            aria-label="LinkedIn"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-cyan-600 hover:text-white"
                        >
                            <LinkedinIcon />
                        </a>

                    </div>

                </div>

            </div>

        </footer>
    )
}
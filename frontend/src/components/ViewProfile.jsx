"use client"

import React, { useEffect, useState } from "react"
import { getCurrentUser } from "../services/me.js"
import Image from "next/image"
import Link from "next/link"
import {
    User2,
    Mail,
    Phone,
    MapPin,
    CalendarDays,
    Pencil,
    Package,
    Heart,
    ChevronRight,
} from "lucide-react"

function ViewProfile() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getCurrentUser()

            if (!data) {
                console.log("failed to get user profile")
                return
            }

            console.log(data)
            setUser(data)
        }

        fetchUser()
    }, [])

    if (!user) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 py-10">
                <div className="mx-auto max-w-5xl animate-pulse">
                    <div className="h-32 rounded-3xl bg-slate-200" />

                    <div className="mt-4 rounded-3xl bg-white p-6">
                        <div className="h-24 w-24 rounded-2xl bg-slate-200" />
                        <div className="mt-5 h-6 w-40 rounded bg-slate-200" />
                        <div className="mt-3 h-4 w-60 rounded bg-slate-200" />
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        My Profile
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your profile and account information
                    </p>
                </div>

                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="relative h-32 w-full overflow-hidden bg-gradient-to-r from-cyan-600 via-cyan-200 to-sky-100 sm:h-40">
                        <Image
                            src="/logo.png"
                            alt="preXchange"
                            fill
                            priority
                            sizes="100vw"
                            className="object-contain  px-8 opacity-90 sm:px-12"
                        />
                    </div>
                    <div className="px-5 pb-7 sm:px-8">

                        <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

                                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-cyan-50 shadow-lg sm:h-32 sm:w-32">

                                    {user.avatar ? (
                                        <Image
                                            src={user.avatar}
                                            alt="Profile Photo"
                                            fill
                                            sizes="128px"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <User2 className="h-14 w-14 text-cyan-600" />
                                    )}

                                </div>

                                <div className="pb-1">
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        {user.userName || "User"}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        preXchange member
                                    </p>
                                </div>

                            </div>

                            <Link
                                href="/user/updateprofile"
                                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-cyan-700 hover:shadow-md active:scale-[0.98] sm:w-auto"
                            >
                                <Pencil className="h-4 w-4" />
                                Edit Profile
                            </Link>

                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">

                            <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-200 hover:bg-cyan-50/40">
                                <div className="flex items-start gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm">
                                        <Mail className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                            Email
                                        </p>

                                        <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                                            {user.email || "Not provided"}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-200 hover:bg-cyan-50/40">
                                <div className="flex items-start gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm">
                                        <Phone className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                            Phone
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-800">
                                            {user.phone || "Not provided"}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-200 hover:bg-cyan-50/40">
                                <div className="flex items-start gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm">
                                        <MapPin className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                            Location
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-800">
                                            {user.location || "Not provided"}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div className="group rounded-2xl border border-[#B8860B]/30 bg-gradient-to-br from-[#1C1608] via-[#5C4315] to-[#B8860B] p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:shadow-lg hover:shadow-[#D4AF37]/10">
                                <div className="flex items-start gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#F4D58D]/10 text-[#F4D58D] shadow-inner">
                                        <CalendarDays className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#E8D39A]/70">
                                            Account
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-[#FFF4CC]">
                                            preXchange member
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                <section className="mt-6">

                    <h2 className="mb-3 px-1 text-lg font-bold text-slate-900">
                        Your Activity
                    </h2>

                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                        <Link
                            href="/user/my-ads"
                            className="flex items-center gap-4 border-b border-slate-100 p-5 transition hover:bg-slate-50"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                                <Package className="h-5 w-5" />
                            </div>

                            <div className="flex-1">
                                <p className="font-semibold text-slate-900">
                                    My Listings
                                </p>

                                <p className="mt-0.5 text-sm text-slate-500">
                                    Manage products you've posted
                                </p>
                            </div>

                            <ChevronRight className="h-5 w-5 text-slate-400" />
                        </Link>

                        <Link
                            href="/wishlist"
                            className="flex items-center gap-4 p-5 transition hover:bg-slate-50"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                                <Heart className="h-5 w-5" />
                            </div>

                            <div className="flex-1">
                                <p className="font-semibold text-slate-900">
                                    Wishlist
                                </p>

                                <p className="mt-0.5 text-sm text-slate-500">
                                    View products you've saved
                                </p>
                            </div>

                            <ChevronRight className="h-5 w-5 text-slate-400" />
                        </Link>

                    </div>
                </section>

            </div>
        </main>
    )
}

export default ViewProfile
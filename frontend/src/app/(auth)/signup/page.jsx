"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from 'next/navigation'

import { handleSubmit } from "../../../services/auth.service/handleSubmitSignup"

function signup() {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [location, setLocation] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-slate-100 overflow-hidden">

                <div className="grid md:grid-cols-2">

                    <div className="hidden md:flex bg-gradient-to-br from-cyan-50 via-white to-slate-50 p-12 text-slate-900 flex-col justify-between relative overflow-hidden">

                        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-100/60" />
                        <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-cyan-100/50" />

                        <div className="relative z-10">

                            <div className="flex items-center mb-12">
                                <Image
                                    src="/logo.png"
                                    alt="preXchange"
                                    width={190}
                                    height={55}
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            <h1 className="text-4xl font-bold leading-tight text-slate-900">
                                Buy. Sell.
                                <br />
                                <span className="text-[#0891B2]">
                                    Exchange.
                                </span>
                            </h1>

                            <p className="mt-5 text-slate-500 leading-7 max-w-sm">
                                Create your account and discover a smarter way
                                to buy and sell pre-owned products around you.
                            </p>

                        </div>

                        <div className="relative z-10">

                            <div className="h-px bg-slate-200 mb-5" />

                            <p className="text-sm text-slate-500">
                                Join the preXchange community today.
                            </p>

                        </div>

                    </div>

                    <div className="p-7 sm:p-10 md:p-12">

                        <div className="max-w-md mx-auto">

                            <div className="mb-8">

                                <p className="text-sm font-semibold text-[#0891B2] mb-2">
                                    GET STARTED
                                </p>

                                <h2 className="text-3xl font-bold text-slate-900">
                                    Create your account
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    Enter your details to get started with preXchange.
                                </p>

                            </div>

                            <form
                                onSubmit={(e) =>
                                    handleSubmit(
                                        e,
                                        userName,
                                        email,
                                        password,
                                        location,
                                        phone,
                                        router
                                    )
                                }
                                className="space-y-5"
                            >

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Username{" "}
                                        <span className="text-[#0891B2]">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        onChange={(e) =>
                                            setUserName(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Enter username"
                                        minLength={3}
                                        className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-[#0891B2] focus:ring-4 focus:ring-cyan-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Email{" "}
                                        <span className="text-[#0891B2]">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        type="text"
                                        placeholder="you@example.com"
                                        pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
                                        className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-[#0891B2] focus:ring-4 focus:ring-cyan-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Password{" "}
                                        <span className="text-[#0891B2]">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        type="text"
                                        placeholder="At least 6 characters"
                                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$"
                                        className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-[#0891B2] focus:ring-4 focus:ring-cyan-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Phone{" "}
                                        <span className="text-[#0891B2]">
                                            *
                                        </span>
                                    </label>

                                    <div className="flex h-12">

                                        <div className="flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-sm font-semibold text-slate-600">
                                            +91
                                        </div>

                                        <input
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            type="number"
                                            placeholder="Enter phone number"
                                            minLength={10}
                                            maxLength={10}
                                            className="w-full px-4 rounded-r-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-[#0891B2] focus:ring-4 focus:ring-cyan-500/10"
                                        />

                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Location{" "}
                                        <span className="text-[#0891B2]">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        onChange={(e) =>
                                            setLocation(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Enter your location"
                                        className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-[#0891B2] focus:ring-4 focus:ring-cyan-500/10"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full h-12 mt-2 rounded-xl bg-[#0891B2] text-white font-semibold shadow-lg shadow-cyan-600/20 transition-all duration-200 hover:bg-[#0e7490] hover:shadow-cyan-600/30 active:scale-[0.98]"
                                >
                                    Create Account
                                </button>

                                <p className="text-center text-xs text-slate-400 pt-2">
                                    By creating an account, you agree to use
                                    preXchange responsibly.
                                </p>

                            </form>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default signup
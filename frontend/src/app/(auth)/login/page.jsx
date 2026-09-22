"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import Link from "next/link.js"
import { handleSubmit } from "../../../services/auth.service/handleSubmitlogin.js"

function login() {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
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

                            <div className="flex items-center mb-14">

                                <Image
                                    src="/logo.png"
                                    alt="preXchange"
                                    width={190}
                                    height={55}
                                    className="object-contain"
                                    priority
                                />

                            </div>

                            <div className="max-w-sm">

                                <p className="text-sm font-semibold text-[#0891B2] mb-4 tracking-wide">
                                    WELCOME BACK
                                </p>

                                <h1 className="text-4xl font-bold leading-tight text-slate-900">
                                    Your marketplace,
                                    <br />
                                    <span className="text-[#0891B2]">
                                        your way.
                                    </span>
                                </h1>

                                <p className="mt-5 text-slate-500 leading-7">
                                    Buy, sell and discover pre-owned products
                                    from people around you with preXchange.
                                </p>

                            </div>

                        </div>

                        <div className="relative z-10">

                            <div className="h-px bg-slate-200 mb-5" />

                            <p className="text-sm text-slate-500">
                                Welcome back to the preXchange community.
                            </p>

                        </div>

                    </div>



                    <div className="p-7 sm:p-10 md:p-14 flex items-center">

                        <div className="w-full max-w-md mx-auto">


                            <div className="flex justify-center mb-8 md:hidden">

                                <Image
                                    src="/logo.png"
                                    alt="preXchange"
                                    width={180}
                                    height={55}
                                    className="object-contain"
                                    priority
                                />

                            </div>



                            <div className="mb-8">

                                <p className="text-sm font-semibold text-[#0891B2] mb-2 tracking-wide">
                                    WELCOME BACK
                                </p>

                                <h2 className="text-3xl font-bold text-slate-900">
                                    Sign in to your account
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    Enter your details to continue to preXchange.
                                </p>

                            </div>



                            <form
                                onSubmit={(e) =>
                                    handleSubmit(
                                        e,
                                        userName,
                                        email,
                                        password,
                                        router
                                    )
                                }
                                className="space-y-5"
                            >


                                <div>

                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Username
                                    </label>

                                    <input
                                        onChange={(e) =>
                                            setUserName(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Enter username"
                                        className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-[#0891B2] focus:ring-4 focus:ring-cyan-500/10"
                                    />

                                </div>



                                <div>

                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Email
                                    </label>

                                    <input
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-[#0891B2] focus:ring-4 focus:ring-cyan-500/10"
                                    />

                                </div>



                                <div>

                                    <div className="flex items-center justify-between mb-2">

                                        <label className="block text-sm font-semibold text-slate-700">
                                            Password
                                        </label>

                                        <button
                                            type="button"
                                            className="text-xs font-semibold text-[#0891B2] hover:text-[#0e7490] transition-colors"
                                        >
                                            Forgot password?
                                        </button>

                                    </div>

                                    <input
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        type="password"
                                        placeholder="Enter your password"
                                        className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-[#0891B2] focus:ring-4 focus:ring-cyan-500/10"
                                    />

                                </div>



                                <button
                                    type="submit"
                                    className="w-full h-12 mt-2 rounded-xl bg-[#0891B2] text-white font-semibold shadow-lg shadow-cyan-600/20 transition-all duration-200 hover:bg-[#0e7490] hover:shadow-cyan-600/30 active:scale-[0.98]"
                                >
                                    Sign In
                                </button>



                                <div className="flex items-center gap-4 py-2">

                                    <div className="h-px bg-slate-200 flex-1" />

                                    <span className="text-xs text-slate-400">
                                        OR
                                    </span>

                                    <div className="h-px bg-slate-200 flex-1" />

                                </div>



                                <div className="text-center">

                                    <p className="text-sm text-slate-500">
                                        Don't have an account?{" "}
                                        <Link href={"/signup"} >
                                        <button
                                            type="button"

                
                                            className="font-semibold text-[#0891B2] hover:text-[#0e7490] hover:cursor-pointer transition-colors"
                                        >
                                            Create account
                                        </button>
                                        </Link>

                                    </p>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default login
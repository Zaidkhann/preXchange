"use client"

import React, { useEffect, useState } from "react"
import updateProfile from "../../../services/updateProfile.js"
import {User2Icon} from "lucide-react"
import {getCurrentUser} from "../../../services/me.js"

function UpdateProfile() {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [location, setLocation] = useState("")
    const [avatar, setAvatar] = useState("")
    useEffect(()=>{
        const fetchUser = async()=>{
            const user = await getCurrentUser()
            setUserName(user.userName)
            setAvatar(user.avatar)
            setEmail(user.email)
            setLocation(user.location)
            setPhone(user.phone)
        }
        fetchUser()
    },[])

    const inputClass =
        "w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#0891B2] focus:bg-white focus:ring-4 focus:ring-cyan-500/10"

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">

                <div className="mb-8">
                    <p className="mb-2 text-sm font-medium text-[#0891B2]">
                        Account settings
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Update your profile
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Keep your personal information up to date.
                    </p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        updateProfile(
                            userName,
                            email,
                            phone,
                            password,
                            location,
                            avatar
                        )
                    }}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                    <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
                        <h2 className="text-base font-semibold text-slate-900">
                            Profile information
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Update your photo and personal details.
                        </p>
                    </div>

                    <div className="space-y-7 px-5 py-6 sm:px-8 sm:py-8">

                        <div>
                            <label className="mb-3 block text-sm font-semibold text-slate-700">
                                Profile photo
                            </label>

                            <div className="flex items-center gap-4">
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-cyan-50">
                                    {avatar ? (
                                        <img
                                            src={avatar}
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-2xl font-bold text-[#0891B2]">
                                            <User2Icon/>
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="avatar"
                                        className="inline-flex cursor-pointer items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-[#0891B2]"
                                    >
                                        Choose photo
                                    </label>

                                    <input
                                        id="avatar"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) {
                                                setAvatar(URL.createObjectURL(file))
                                            }
                                        }}
                                    />

                                    <p className="mt-2 text-xs text-slate-400">
                                        JPG, PNG or WEBP
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Username
                                </label>

                                <input
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                    value={userName}
                                    type="text"
                                    placeholder="Enter username"
                                    minLength={3}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Email
                                </label>

                                <input
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    value={email}
                                    type="email"
                                    placeholder="you@example.com"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Phone number
                                </label>

                                <div className="flex h-12">
                                    <div className="flex items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 px-4 text-sm font-semibold text-slate-600">
                                        +91
                                    </div>

                                    <input
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        value={phone}
                                        type="tel"
                                        inputMode="numeric"
                                        placeholder="Enter phone number"
                                        minLength={10}
                                        maxLength={10}
                                        className="w-full rounded-r-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-[#0891B2] focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Location
                                </label>

                                <input
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    value={location}
                                    type="text"
                                    placeholder="Enter your location"
                                    className={inputClass}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    New password
                                </label>

                                <input
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    type="password"
                                    placeholder="Leave blank to keep current password"
                                    minLength={6}
                                    className={inputClass}
                                />

                                <p className="mt-2 text-xs text-slate-400">
                                    Only enter a password if you want to change it.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-8">
                        <button
                            type="button"
                            className="h-11 rounded-xl px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="h-11 rounded-xl bg-[#0891B2] px-6 text-sm font-semibold text-white shadow-sm shadow-cyan-600/20 transition-all duration-200 hover:bg-[#0e7490] hover:shadow-md hover:shadow-cyan-600/20 active:scale-[0.98]"
                        >
                            Update profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile
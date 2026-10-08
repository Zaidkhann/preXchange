"use client"

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"
import { Button, Dropdown, Label } from "@heroui/react";
import { handleLogout } from "@/services/auth.service/handleLogout.js"
import { getCurrentUser } from "@/services/me.js"
import { getLocation } from "@/services/locationFetch.js"
import LocationByCityApi from "@/components/location.jsx"


import {
    MessagesCircle,
    MapPin,
    Search,
    User,
    Plus,
    ChevronDown,
    Package,
    Settings,
    LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [location, setLocation] = useState(null)
    const [search, setSearch] = useState("")
    const [showLocation, setShowLocation] = useState(false)
    const[showLogoutModal,setShowLogoutModal] = useState(false)


    const handleLocation = () => {
        getLocation(setLocation)
    }

    const handleSearch = (e) => {
        e.preventDefault()

        const params = new URLSearchParams(searchParams.toString())

        if (search.trim()) {
            params.set("search", search.trim())
        } else {
            params.delete("search")
        }

        router.push(`/?${params.toString()}`)
        window.scrollTo({
            top: 800,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        setSearch("")
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser()
                setUser(currentUser)
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        fetchUser()
    }, [])

    useEffect(() => {
        const savedLocation = localStorage.getItem("location_getProducts")
        if (savedLocation && savedLocation !== "undefined") {
            try {
                setLocation(JSON.parse(savedLocation))
            } catch {
                localStorage.removeItem("location_getProducts")
            }
        }
        
    }, [])


   useEffect(() => {
    if (location) {
        const value = JSON.stringify(location)
        localStorage.setItem(
            "location_getProducts",
            value
        )
        document.cookie = `location_getProducts=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`

        window.dispatchEvent(new Event("locationChanged"))
    }
    router.refresh()
}, [location])

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="relative h-10 w-10">
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-cyan-100/20 border-t-cyan-400" />
                    <div className="absolute inset-1 animate-pulse rounded-full bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.35)]" />
                </div>
            </div>
        )
    }

    return (
        <div>

        {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Logout 
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Are you sure you want to Logout?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick=
                                    {() => setShowLogoutModal(false)}
                                
                                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={async () => {
                            await handleLogout(router)
                            setShowLogoutModal(false)
                        }}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_1px_8px_rgba(15,23,42,0.04)] backdrop-blur-xl">
            <nav className="relative mx-auto flex min-h-[128px] max-w-7xl flex-wrap items-start gap-2 px-3 py-3 sm:min-h-[72px] sm:items-center sm:gap-3 sm:px-5 sm:py-2 lg:h-[72px] lg:flex-nowrap lg:gap-5 lg:px-6 lg:py-0">
            <Link href={"/"} className="cursor-pointer">
                <div className="shrink-0">
                    <Image
                        src="/logo.png"
                        alt="preXchange"
                        width={150}
                        height={40}
                        className="h-auto w-24 transition-opacity duration-200 hover:opacity-90 sm:w-32 lg:w-40"
                    />
                </div>
            </Link>


                <div className="relative ml-auto shrink-0 sm:ml-0">
                    <button
                        type="button"
                        onClick={() => setShowLocation(!showLocation)}
                        className="group flex items-center justify-center gap-2 rounded-xl border border-transparent px-2 py-2.5 text-sm text-slate-600 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50 sm:px-2.5 lg:px-3"
                    >
                        <MapPin className="h-[20px] w-[20px] shrink-0 text-[#0891B2] transition-transform duration-200 group-hover:scale-105" />

                        <div className="flex max-w-[90px] flex-col text-left sm:max-w-none">
                            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                                {location ? location.city : "Set"}
                            </p>

                            <p className="flex items-center gap-1 font-semibold text-slate-700">
                                {location ? location.state : "Location"}

                                <ChevronDown
                                    className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${showLocation ? "rotate-180" : ""}`}
                                />
                            </p>
                        </div>
                    </button>

                    {showLocation && (
                        <div className="absolute right-0 top-full z-[100] mt-2 max-w-[calc(100vw-1rem)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 sm:left-0 sm:right-auto">
                            <LocationByCityApi
                                onSelectLocation={(selectedLocation) => {
                                    setLocation(selectedLocation)
                                    setShowLocation(false)
                                }}
                                onCurrentLocation={() => {
                                    handleLocation()
                                    setShowLocation(false)
                                    
                                }}
                            />
                        </div>
                    )}
                </div>

                <form
                    onSubmit={handleSearch}
                    className="order-last relative mt-1 w-full min-w-0 sm:order-none sm:mt-0 sm:flex-1"
                >
                    <Search className="absolute left-4 top-1/2 h-[19px] w-[19px] -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        placeholder="Search for products..."
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-11 pr-14 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-[#0891B2] focus:bg-white focus:ring-4 focus:ring-[#0891B2]/10 sm:h-11"
                    />

                    <button
                        type="submit"
                        className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-[#0891B2] text-white transition-all duration-200 hover:bg-[#07819e] active:scale-95"
                        aria-label="Search"
                    >
                        <Search className="h-4 w-4" />
                    </button>
                </form>

                <Link
                    href={`/chatpanel?uid=${user?.id}`}
                    className={!user ? "hidden" : "shrink-0"}
                >
                    <button
                        className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-transparent text-slate-500 transition-all duration-200 hover:border-cyan-100 hover:bg-cyan-50 hover:text-[#0891B2] active:scale-95 sm:h-11 sm:w-11"
                    >
                        <MessagesCircle className="h-[19px] w-[19px] transition-transform duration-200 group-hover:scale-110" />
                    </button>
                </Link>

                {user ? (
                    <Dropdown>
                        <Button
                            aria-label="Profile menu"
                            variant="secondary"
                            className="group flex shrink-0 items-center gap-2 rounded-xl border border-transparent bg-transparent px-1.5 py-1.5 text-slate-700 shadow-none transition-all duration-200 hover:border-slate-200 hover:bg-slate-50"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-[#0891B2] ring-1 ring-cyan-100 transition-all duration-200 group-hover:bg-cyan-100 group-hover:ring-cyan-200 sm:h-9 sm:w-9">
                                {user?.avatar ? (
                                    <Image
                                        src={user.avatar}
                                        alt={user.userName[0]}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <User className="h-[18px] w-[18px]" />
                                )}
                            </div>

                            <span className="hidden max-w-28 truncate text-sm font-semibold text-slate-700 xl:block">
                                {user.userName.charAt(0).toUpperCase() + user.userName.slice(1)}
                            </span>

                            <ChevronDown className="hidden h-4 w-4 text-slate-400 transition-all duration-200 group-hover:text-slate-600 xl:block" />
                        </Button>

                        <Dropdown.Popover
                            placement="bottom end"
                            className="min-w-60 rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl shadow-slate-900/10"
                        >
                            <Dropdown.Menu
                                aria-label="Profile menu"
                                onAction={(key) => console.log(`Selected: ${key}`)}
                            >
                                <Dropdown.Item
                                    id="view-profile"
                                    textValue="View and Edit Profile"
                                    className="rounded-xl px-3 py-2.5 outline-none transition-colors hover:bg-cyan-50"
                                >
                                    <Link
                                        href="/user/profile"
                                        className="flex w-full items-center gap-3"
                                    >
                                        <User className="h-[18px] w-[18px] text-slate-500" />

                                        <span className="text-sm font-medium text-slate-700">
                                            View and Edit Profile
                                        </span>
                                    </Link>
                                </Dropdown.Item>

                                <Dropdown.Item
                                    id="my-ads"
                                    textValue="My Ads"
                                    className="rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-slate-50"
                                >
                                    <Link
                                        href="/user/my-ads"
                                        className="flex w-full items-center gap-3"
                                    >
                                    <Package className="h-[18px] w-[18px] text-slate-500" />
                                    <Label>My Ads</Label>
                                    </Link>
                                </Dropdown.Item>

          

                                <Dropdown.Item
                                    id="logout"
                                    textValue="Logout"
                                    onClick={()=>setShowLogoutModal(true)}
                                    variant="danger"
                                    className="mt-1 rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-red-50"
                                >
                                    <LogOut className="h-[18px] w-[18px]" />
                                    <Label>Logout</Label>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                ) : (
                    <Link href="/login" className="shrink-0">
                        <button
                            type="button"
                            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-200 bg-cyan-50 text-cyan-700 shadow-sm transition-all duration-200 hover:border-[#0891B2] hover:bg-[#0891B2] hover:text-white hover:shadow-md hover:shadow-cyan-200/40 active:scale-[0.97] sm:h-auto sm:w-auto sm:gap-2 sm:px-4.5 sm:py-2.5"
                        >
                            <User className="h-[17px] w-[17px] transition-transform duration-200 group-hover:scale-105" />

                            <span className="hidden sm:inline">
                                Login
                            </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="hidden h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:block"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                />
                            </svg>
                        </button>
                    </Link>
                )}

                {user ? (
                    <Link
                        href="/post"
                        className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 lg:static lg:translate-x-0"
                    >
                        <button className="group hidden h-12 items-center gap-2 rounded-full bg-[#0891B2] px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-200/50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#07819e] hover:shadow-xl hover:shadow-cyan-200/60 active:translate-y-0 active:scale-[0.98] lg:flex lg:h-11 lg:rounded-xl lg:px-4.5 lg:shadow-sm">
                            <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
                            <span>Sell</span>
                        </button>
                    </Link>
                ) : null}

            </nav>
        </header>
        </div>
    );


}

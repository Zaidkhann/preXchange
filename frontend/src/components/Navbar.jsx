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

    }
        , [])


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
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
            <nav className="mx-auto flex h-18 max-w-7xl items-center gap-5 px-6">

                <div className="shrink-0">
                    <Image
                        src="/logo.png"
                        alt="preXchange"
                        width={150}
                        height={40}
                        className="h-auto w-40"
                    />
                </div>


                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowLocation(!showLocation)}
                        className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
                    >
                        <MapPin className="h-5 w-5 text-[#0891B2]" />

                        <div className="hidden text-left lg:block">
                            <p className="text-[11px] text-slate-400">
                                {location ? location.city : "Set"}
                            </p>

                            <p className="flex items-center gap-1 font-medium text-slate-700">
                                {location ? location.state : "Location"}

                                <ChevronDown
                                    className={`h-3.5 w-3.5 transition-transform ${showLocation ? "rotate-180" : ""
                                        }`}
                                />
                            </p>
                        </div>
                    </button>

                    {showLocation && (
                        <div className="absolute left-0 top-full z-[100] mt-2">
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

                <form onSubmit={handleSearch} className="relative min-w-0 flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        placeholder="Search for products..."
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0891B2] focus:bg-white focus:ring-4 focus:ring-[#0891B2]/10"
                    />
                </form>
                <Link href={`/chatpanel?uid=${user.id}`}>
                <button className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-600 transition hover:bg-cyan-50 hover:text-[#0891B2]">
                    <MessagesCircle className="h-5 w-5 transition group-hover:scale-110" />
                </button>
                </Link>

                {user ? (
                    <Dropdown>
                        <Button
                            aria-label="Profile menu"
                            variant="secondary"
                            className="group flex shrink-0 items-center gap-2 rounded-xl bg-transparent px-1.5 py-1.5 text-slate-700 shadow-none transition-colors hover:bg-slate-50"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-50 text-[#0891B2] ring-1 ring-cyan-100 transition-all duration-200 group-hover:bg-cyan-100 group-hover:ring-cyan-200">
                                <User className="h-[18px] w-[18px]" />
                            </div>

                            <span className="hidden max-w-28 truncate text-sm font-semibold text-slate-700 xl:block">
                                {user.userName.charAt(0).toUpperCase() + user.userName.slice(1)}
                            </span>

                            <ChevronDown className="hidden h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:text-slate-600 xl:block" />
                        </Button>

                        <Dropdown.Popover
                            placement="bottom end"
                            className="min-w-60 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-200/50"
                        >
                            <Dropdown.Menu
                                aria-label="Profile menu"
                                onAction={(key) => console.log(`Selected: ${key}`)}
                            >
                                <Dropdown.Item
                                    id="view-profile"
                                    textValue="View and Edit Profile"
                                    className="rounded-lg px-3 py-2.5"
                                >
                                    <User className="h-[18px] w-[18px] text-slate-500" />
                                    <Label>View and Edit Profile</Label>
                                </Dropdown.Item>

                                <Dropdown.Item
                                    id="my-ads"
                                    textValue="My Ads"
                                    className="rounded-lg px-3 py-2.5"
                                >
                                    <Package className="h-[18px] w-[18px] text-slate-500" />
                                    <Label>My Ads</Label>
                                </Dropdown.Item>

                                <Dropdown.Item
                                    id="settings"
                                    textValue="Settings"
                                    className="rounded-lg px-3 py-2.5"
                                >
                                    <Settings className="h-[18px] w-[18px] text-slate-500" />
                                    <Label>Settings</Label>
                                </Dropdown.Item>

                                <Dropdown.Item
                                    id="logout"
                                    textValue="Logout"
                                    onClick={() => handleLogout(router)}
                                    variant="danger"
                                    className="mt-1 rounded-lg px-3 py-2.5"
                                >
                                    <LogOut className="h-[18px] w-[18px]" />
                                    <Label>Logout</Label>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                ) : (
                    <Link href="/login">
                        <button
                            type="button"
                            className="group flex items-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 px-5 py-2.5 text-sm font-semibold text-cyan-700 transition-all duration-200 hover:border-cyan-500 hover:bg-cyan-500 hover:text-white hover:shadow-md hover:shadow-cyan-200/50 active:scale-[0.98]"
                        >
                            <User className="h-[17px] w-[17px] transition-transform duration-200 group-hover:scale-105" />
                            <span>Login</span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                />
                            </svg>

                        </button> </Link>)
                }
                {user ? (<Link href={"/post"}><button className="group flex h-11 shrink-0 items-center gap-2 rounded-xl bg-[#0891B2] px-5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#07819e] hover:shadow-md active:translate-y-0">
                    <Plus className="h-5 w-5 transition group-hover:rotate-90" />
                    Sell
                </button></Link>)
                    : (
                        null
                    )}



            </nav>
        </header>
    );
}


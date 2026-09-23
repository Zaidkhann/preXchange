"use client"
import Image from "next/image";
import {getCurrentUser} from "@/services/me.js"
import {
    Heart,
    MapPin,
    Search,
    User,
    Plus,
    ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Navbar() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
  

    useEffect(()=>{
        const fetchUser = async ()=>{
            try{
                const currentUser = await getCurrentUser()
                setUser(currentUser)
            }catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        fetchUser()
    }
,[])
    if(loading){
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
                        // src="/preXchangeLogo.png"
                        alt="preXchange"
                        width={150}
                        height={40}
                        className="h-auto w-40"
                    />
                </div>

                <button className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50">
                    <MapPin className="h-5 w-5 text-[#0891B2]" />
                    <div className="hidden text-left lg:block">
                        <p className="text-[11px] text-slate-400">Location</p>
                        <p className="flex items-center gap-1 font-medium text-slate-700">
                            Madhya pradesh
                            <ChevronDown className="h-3.5 w-3.5" />
                        </p>
                    </div>
                </button>

                <div className="relative min-w-0 flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0891B2] focus:bg-white focus:ring-4 focus:ring-[#0891B2]/10"
                    />
                </div>
        
                <button className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-600 transition hover:bg-cyan-50 hover:text-[#0891B2]">
                    <Heart className="h-5 w-5 transition group-hover:scale-110" />
                </button>
            {user?(
                <button className="group flex shrink-0 items-center gap-2 rounded-xl px-2.5 py-2 transition hover:bg-slate-50">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition group-hover:bg-cyan-50 group-hover:text-[#0891B2]">
                        <User className="h-5 w-5" />
                    </div>
                
                    <span className="hidden text-sm font-medium text-slate-700 xl:block">
                       {user.userName.charAt(0).toUpperCase() + user.userName.slice(1)}
                    </span>
                </button>
            ):(<Link href={"/login"}><button
  type="button"
  className="group flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-5 py-2.5 text-sm font-semibold text-cyan-700 transition-all duration-300 hover:border-cyan-500 hover:bg-cyan-500 hover:text-white hover:shadow-lg hover:shadow-cyan-200 active:scale-95"
>
  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
    Login
  </span>


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
            {user?(<Link href={"/post"}><button className="group flex h-11 shrink-0 items-center gap-2 rounded-xl bg-[#0891B2] px-5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#07819e] hover:shadow-md active:translate-y-0">
                    <Plus className="h-5 w-5 transition group-hover:rotate-90" />
                    Sell
                </button></Link>)
                :(
                    null
                )}
       
                
            </nav>
        </header>
    );
}


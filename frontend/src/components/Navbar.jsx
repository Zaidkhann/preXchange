import Image from "next/image";
import {
    Heart,
    MapPin,
    Search,
    User,
    Plus,
    ChevronDown,
} from "lucide-react";

export default function Navbar() {
    const cookies = req.cookie
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

                <button className="group flex shrink-0 items-center gap-2 rounded-xl px-2.5 py-2 transition hover:bg-slate-50">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition group-hover:bg-cyan-50 group-hover:text-[#0891B2]">
                        <User className="h-5 w-5" />
                    </div>
                    <span className="hidden text-sm font-medium text-slate-700 xl:block">
                        Profile
                    </span>
                </button>

                <button className="group flex h-11 shrink-0 items-center gap-2 rounded-xl bg-[#0891B2] px-5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#07819e] hover:shadow-md active:translate-y-0">
                    <Plus className="h-5 w-5 transition group-hover:rotate-90" />
                    Sell {cookies}
                </button>
            </nav>
        </header>
    );
}


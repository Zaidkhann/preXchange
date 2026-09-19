"use client"
import Image from "next/image"
export default function Hero() {
    return (
        <section className="relative w-full h-[220px] sm:h-[280px] lg:h-[340px] overflow-hidden">
    <Image
        src="/herosection.png"
        alt="PreXchange - Buy and sell used products"
        width={2048}
        height={768}
        priority
        sizes="100vw"
        className="h-full w-full object-cover"
    />

    <div className="absolute bottom-6 left-6 flex gap-4 sm:bottom-8 sm:left-8 ml-8">
        <button
        onClick={()=>window.scrollBy({top:500, behavior: "smooth"})}
        className="rounded-4xl border border-gray-200 w-28 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-lg transition hover:bg-gray-100 sm:px-6">
            Explore
        </button>

        <button className="rounded-4xl border border-gray-200 w-28 bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-cyan-700 sm:px-6">
            Sell
        </button>
    </div>
</section>
    )
}
"use client"

import Image from "next/image"
import Link from "next/link"

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden bg-gray-100">
            <Image
                src="/herosection.png"
                alt="PreXchange - Buy and sell used products"
                width={2048}
                height={768}
                priority
                sizes="100vw"
                className="h-auto w-full object-contain sm:h-[280px] sm:object-cover lg:h-[340px]"
            />

            <div className="absolute bottom-4 left-4 flex gap-3 sm:bottom-6 sm:left-6 sm:gap-4 lg:bottom-8 lg:left-8">
                <button
                    onClick={() =>
                        window.scrollBy({
                            top: 500,
                            behavior: "smooth",
                        })
                    }
                    className="w-24 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg transition hover:bg-gray-100 sm:w-28 sm:px-6 sm:py-2.5"
                >
                    Explore
                </button>

                <Link href="/post">
                    <button className="w-24 rounded-full border border-gray-200 bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-cyan-700 sm:w-28 sm:px-6 sm:py-2.5"
                >
                    Sell
                </button>
                </Link>
            </div>
        </section>
    )
}

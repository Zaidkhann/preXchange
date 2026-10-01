"use client"

import React, { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { SlidersHorizontal, RotateCcw } from "lucide-react"

function Filters() {
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(5000000)
    const [afterYear, setAfterYear] = useState(1950)
    const [beforeYear, setBeforeYear] = useState(2026)

    const router = useRouter()
    const pathName = usePathname()

    const formatPrice = (price) => {
        return `₹${Number(price).toLocaleString("en-IN")}`
    }

    const handleYearSubmit = (e) => {
        e.preventDefault()

        const params = new URLSearchParams({
            min_price_: minPrice,
            max_price_: maxPrice,
            after_year: afterYear,
            before_year: beforeYear
        })

        router.push(`${pathName}?${params.toString()}`)
    }

    const handleReset = () => {
        setMinPrice(500000)
        setMaxPrice(10000000)
        setAfterYear(1950)
        setBeforeYear(2026)

        router.push(pathName)
    }

    return (
        <aside className="w-full max-w-sm">
            <form
                onSubmit={handleYearSubmit}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50">
                            <SlidersHorizontal className="h-4.5 w-4.5 text-cyan-600" />
                        </div>

                        <div>
                            <h2 className="text-base font-semibold text-slate-900">
                                Filters
                            </h2>
                            <p className="text-xs text-slate-400">
                                Refine your search
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-50 hover:text-cyan-600"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset
                    </button>
                </div>

                <div className="space-y-7 p-5">

                    <section>
                        <div className="mb-4 flex items-end justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Price
                                </p>
                                <p className="mt-0.5 text-xs text-slate-400">
                                    Set your budget
                                </p>
                            </div>

                            <span className="rounded-lg bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                                {formatPrice(minPrice)} - {formatPrice(maxPrice)}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="mb-2 flex justify-between text-xs">
                                    <span className="font-medium text-slate-500">
                                        Minimum
                                    </span>
                                    <span className="font-semibold text-slate-700">
                                        {formatPrice(minPrice)}
                                    </span>
                                </div>

                                <input
                                    type="range"
                                    step={20000}
                                    value={minPrice}
                                    min={20000}
                                    max={5000000}
                                    onChange={(e) => {
                                        const value = Number(e.target.value)
                                        if (value <= maxPrice) {
                                            setMinPrice(value)
                                        }
                                    }}
                                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-cyan-600"
                                />
                            </div>

                            <div>
                                <div className="mb-2 flex justify-between text-xs">
                                    <span className="font-medium text-slate-500">
                                        Maximum
                                    </span>
                                    <span className="font-semibold text-slate-700">
                                        {formatPrice(maxPrice)}
                                    </span>
                                </div>

                                <input
                                    type="range"
                                    step={20000}
                                    value={maxPrice}
                                    min={20000}
                                    max={5000000}
                                    onChange={(e) => {
                                        const value = Number(e.target.value)
                                        if (value >= minPrice) {
                                            setMaxPrice(value)
                                        }
                                    }}
                                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-cyan-600"
                                />
                            </div>
                        </div>
                    </section>

                    <div className="h-px bg-slate-100" />

                    <section>
                        <div className="mb-4">
                            <p className="text-sm font-semibold text-slate-800">
                                Year
                            </p>
                            <p className="mt-0.5 text-xs text-slate-400">
                                Select a manufacturing year range
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                                <label className="mb-1.5 block text-xs font-medium text-slate-500">
                                    From
                                </label>

                                <input
                                    type="number"
                                    value={afterYear}
                                    min={1900}
                                    max={2026}
                                    onChange={(e) =>
                                        setAfterYear(Number(e.target.value))
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                                    placeholder="1950"
                                />
                            </div>

                            <span className="mt-6 text-sm text-slate-300">
                                —
                            </span>

                            <div className="flex-1">
                                <label className="mb-1.5 block text-xs font-medium text-slate-500">
                                    To
                                </label>

                                <input
                                    type="number"
                                    value={beforeYear}
                                    min={1900}
                                    max={2026}
                                    onChange={(e) =>
                                        setBeforeYear(Number(e.target.value))
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                                    placeholder="2026"
                                />
                            </div>
                        </div>
                    </section>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-cyan-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700 active:scale-[0.98]"
                    >
                        Apply Filters
                    </button>
                </div>
            </form>
        </aside>
    )
}

export default Filters
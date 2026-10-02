"use client"

import { getCurrentUser } from "../services/me"
import React, { useEffect, useState } from "react"
import {useRouter} from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MoreVertical, Pencil, CheckCircle2, Trash2 } from "lucide-react"

function MyAds() {
    const [user, setUser] = useState(null)
    const [products, setProducts] = useState([])
    const [openMenu, setOpenMenu] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getCurrentUser()

            if (!data) {
                console.log("failed to get user profile")
                return
            }

            setUser(data)
            setProducts(data.products || [])
        }

        fetchUser()
    }, [])

    return (
        <section className="w-full">
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    My Ads
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Manage the products you have listed on preXchange
                </p>
            </div>

            {products.length === 0 ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-6 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-50 text-2xl">
                        📦
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900">
                        No ads yet
                    </h3>

                    <p className="mt-1 max-w-sm text-sm text-slate-500">
                        Start selling your unused products on preXchange.
                    </p>

                    <Link
                        href="/post"
                        className="mt-5 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
                    >
                        Post an Ad
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group relative"
                        >
                            <Link
                                href={`/product/${product.id}`}
                                className="block"
                            >
                                <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 pr-14 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md sm:flex-row sm:items-center">

                                    <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-28 sm:w-36">
                                        {product.image?.[0]?.url ? (
                                            <Image
                                                src={product.image[0].url}
                                                alt={product.adTitle}
                                                fill
                                                className="object-cover transition duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-slate-400">
                                                No Image
                                            </div>
                                        )}

                                        <div
                                            className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-xs font-bold shadow-sm ${
                                                product.isSold
                                                    ? "bg-green-500 text-white"
                                                    : "bg-white/95 text-cyan-700"
                                            }`}
                                        >
                                            {product.isSold ? "Sold" : "Active"}
                                        </div>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="min-w-0">
                                                <h3 className="truncate text-lg font-semibold text-slate-900 transition group-hover:text-cyan-700">
                                                    {product.adTitle}
                                                </h3>

                                                <p className="mt-1 text-xl font-bold text-slate-900">
                                                    ₹{product.price?.toLocaleString("en-IN")}
                                                </p>
                                            </div>

                                            <span
                                                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                                                    product.isSold
                                                        ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                                                        : "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200"
                                                }`}
                                            >
                                                {product.isSold
                                                    ? "✓ Sold"
                                                    : "● Active"}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                                            {product.location && (
                                                <span className="flex items-center gap-1">
                                                    📍 {product.location}
                                                </span>
                                            )}

                                            <span>
                                                Listed{" "}
                                                {new Date(
                                                    product.createdAt
                                                ).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="hidden shrink-0 text-slate-300 transition group-hover:text-cyan-500 sm:block">
                                        →
                                    </div>
                                </div>
                            </Link>

                            <div className="absolute right-3 top-3 z-20">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setOpenMenu(
                                            openMenu === product.id
                                                ? null
                                                : product.id
                                        )
                                    }}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                                    aria-label="Ad options"
                                >
                                    <MoreVertical size={20} />
                                </button>

                                {openMenu === product.id && (
                                    <div
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                        }}
                                        className="absolute right-0 top-11 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-200/60"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => {
                                                router.push(`/user/my-ads/update-product?prodId=${product.id}`)
                                                setOpenMenu(null)
                                            }}
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                        >
                                            <Pencil
                                                size={17}
                                                className="text-slate-500"
                                            />
                                            Edit
                                        </button>

                                        {!product.isSold && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    console.log(
                                                        "Mark as sold:",
                                                        product.id
                                                    )
                                                    setOpenMenu(null)
                                                }}
                                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-green-700 transition hover:bg-green-50"
                                            >
                                                <CheckCircle2 size={17} />
                                                Mark as Sold
                                            </button>
                                        )}

                                        <div className="my-1 border-t border-slate-100" />

                                        <button
                                            type="button"
                                            onClick={() => {
                                                console.log(
                                                    "Delete product:",
                                                    product.id
                                                )
                                                setOpenMenu(null)
                                            }}
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                        >
                                            <Trash2 size={17} />
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default MyAds

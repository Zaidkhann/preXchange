"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams,useRouter } from "next/navigation.js"
import {toast} from "@heroui/react"
import { editProduct } from "../../../../services/productService.js"
import { getProductById } from "../../../../services/productService.js"
import {
    ArrowLeft,
    Check,
    FileText,
    IndianRupee,
    MapPin,
    Pencil,
    Save,
    Tag,
    CalendarDays,
} from "lucide-react"

function UpdateProduct() {
    const [adTitle, setAdTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [location, setLocation] = useState("")
    const [year, setYear] = useState("")
    const [attributes, setAttributes] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const router = useRouter()
    const searchParams = useSearchParams()
    const productId = Number(searchParams.get("prodId"))

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProductById(productId)

                setAdTitle(product?.adTitle ?? "")
                setDescription(product?.description ?? "")
                setPrice(product?.price ?? "")
                setLocation(product?.location ?? "")
                setYear(product?.year ?? "")
                setAttributes(product?.attributes ?? "")
            } catch (error) {
                console.error("Failed to fetch product:", error)
            } finally {
                setLoading(false)
            }
        }

        if (productId) {
            fetchProduct()
        }
    }, [productId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setSaving(true)

            await editProduct(
                productId,
                adTitle,
                description,
                Number(price),
                location,
                Number(year),
                attributes
            )
            toast.success("Your ad has been updated.")
            router.back()
        } catch (error) {
            console.error("Failed to update product:", error)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 py-8">
                <div className="mx-auto max-w-5xl animate-pulse">
                    <div className="mb-8 h-8 w-64 rounded-lg bg-slate-200" />

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-8 h-20 rounded-2xl bg-slate-100" />

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="h-20 rounded-xl bg-slate-100" />
                            <div className="h-20 rounded-xl bg-slate-100" />
                            <div className="h-20 rounded-xl bg-slate-100" />
                            <div className="h-20 rounded-xl bg-slate-100" />
                            <div className="h-32 rounded-xl bg-slate-100 md:col-span-2" />
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

                <div className="mb-8 flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
                    >
                        <ArrowLeft size={19} />
                    </button>

                    <div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                                <Pencil size={18} />
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Edit your ad
                            </h1>
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                            Update your listing details and keep your ad accurate.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-100 bg-gradient-to-r from-cyan-50/70 via-white to-white px-5 py-6 sm:px-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-600/20">
                                    <FileText size={22} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">
                                        Listing information
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Make changes to the information buyers see on your listing.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 p-5 sm:p-8">

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                                        <Tag size={16} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900">
                                            Basic details
                                        </h3>

                                        <p className="text-xs text-slate-500">
                                            Tell buyers what you are selling.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">

                                    <div className="space-y-2 md:col-span-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-semibold text-slate-800">
                                                Ad title
                                            </label>

                                            <span className="text-xs text-slate-400">
                                                {adTitle.length}/70
                                            </span>
                                        </div>

                                        <input
                                            type="text"
                                            maxLength={70}
                                            value={adTitle}
                                            onChange={(e) => setAdTitle(e.target.value)}
                                            placeholder="e.g. Samsung Galaxy S24 5G"
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                            <IndianRupee size={15} className="text-cyan-600" />
                                            Price
                                        </label>

                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">
                                                ₹
                                            </span>

                                            <input
                                                type="number"
                                                min={0}
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                placeholder="Set your price"
                                                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                            <CalendarDays size={15} className="text-cyan-600" />
                                            Year
                                        </label>

                                        <input
                                            type="number"
                                            min={1900}
                                            max={2026}
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                            placeholder="e.g. 2022"
                                            className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                        />
                                    </div>

                                </div>
                            </section>

                            <div className="h-px bg-slate-100" />

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                                        <FileText size={16} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900">
                                            Description
                                        </h3>

                                        <p className="text-xs text-slate-500">
                                            Give buyers useful information about your item.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-semibold text-slate-800">
                                            Product description
                                        </label>

                                        <span className="text-xs text-slate-400">
                                            {description.length}/1000
                                        </span>
                                    </div>

                                    <textarea
                                        maxLength={1000}
                                        rows={6}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe the condition, usage, accessories, defects, warranty, etc."
                                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                                    />
                                </div>
                            </section>

                            <div className="h-px bg-slate-100" />

                            <section>
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                                        <MapPin size={16} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900">
                                            Location
                                        </h3>

                                        <p className="text-xs text-slate-500">
                                            Help nearby buyers find your listing.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-800">
                                        Location
                                        <span className="ml-1 text-cyan-600">*</span>
                                    </label>

                                    <div className="relative">
                                        <MapPin
                                            size={17}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="e.g. Bhopal, Madhya Pradesh"
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="h-px bg-slate-100" />

                            <section>
                                <div className="mb-5">
                                    <h3 className="text-sm font-bold text-slate-900">
                                        Additional information
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Update any extra product information associated with this listing.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-800">
                                        Attributes
                                    </label>

                                    <input
                                        type="text"
                                        value={attributes}
                                        onChange={(e) => setAttributes(e.target.value)}
                                        placeholder="e.g. 8GB RAM, 256GB Storage"
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                                    />
                                </div>
                            </section>

                        </div>

                        <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-8">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
                                    <Check size={15} className="text-emerald-500" />
                                    Your existing images and category will remain unchanged.
                                </div>

                                <div className="flex w-full gap-3 sm:w-auto">
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="h-12 flex-1 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:flex-none"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
                                    >
                                        <Save size={17} />

                                        {saving ? "Saving..." : "Save changes"}
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>

                </form>

            </div>
        </main>
    )
}

export default UpdateProduct

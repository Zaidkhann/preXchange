"use client"

import React, { useState } from 'react'
import { handleSubmit } from "../../services/handleSubmitPostAttributes.js"
import { useSearchParams } from 'next/navigation.js'

function FashionForm() {
    const [images, setImages] = useState([])
    const [adTitle, setAdTitle] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const resetForm = () => {
        setImages([])
        setAdTitle("")
        setLocation("")
        setDescription("")
        setPrice(0)
    }
    const attributes = {
        undefined
    }
    const categoryId = searchParams.get("categoryId")
    return (
        <div className="min-h-screen w-full bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <form className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                onSubmit={(e) => handleSubmit(
                    e,
                    attributes,
                    adTitle,
                    description,
                    price,
                    location,
                    images,
                    categoryId,
                    setLoading,
                    resetForm
                )}
            >
                <div className="border-b border-gray-100 pb-5">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900">
                        Fashion Details
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Add information about what you're selling
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">

    

                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-800">
                        Ad Title <span className="text-cyan-600">*</span>
                    </label>

                    <input
                        onChange={(e) => setAdTitle(e.target.value)}
                        type="text"
                        maxLength={70}
                        placeholder="e.g. An oversized tshirt with minimal print"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-800">
                        Description <span className="text-cyan-600">*</span>
                    </label>

                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={1000}
                        placeholder="Describe the Product condition, etc."
                        rows={5}
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-800">
                        Price <span className="text-cyan-600">*</span>
                    </label>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                            ₹
                        </span>

                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                            min={0}
                            placeholder="Set your price"
                            className="[appearance:textfield] h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-800">
                        Location <span className="text-cyan-600">*</span>
                    </label>

                    <input
                        onChange={(e) => setLocation(e.target.value)}
                        type="text"
                        placeholder="Bhopal"
                        className="[appearance:textfield] h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="text-sm font-semibold text-gray-800">
                            Photos
                        </label>
                        <p className="mt-1 text-xs text-gray-400">
                            Upload up to 6 photos. The first photo will be your cover.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <label
                                key={index}
                                className={`relative aspect-square cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-200 ${index === 0
                                    ? "border-cyan-500"
                                    : "border-gray-200 hover:border-cyan-400"
                                    }`}
                            >
                                {index < images.length ? (
                                    <>
                                        <img
                                            src={URL.createObjectURL(images[index])}
                                            alt={`Product ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />

                                        {index === 0 && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-cyan-600 px-2 py-1.5 text-center text-xs font-bold text-white">
                                                COVER
                                            </div>
                                        )}

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setImages(
                                                    images.filter((_, i) => i !== index)
                                                )
                                            }}
                                            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-lg font-medium text-white backdrop-blur-sm transition hover:bg-red-500"
                                        >
                                            ×
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex h-full flex-col items-center justify-center bg-gray-50 transition-colors hover:bg-cyan-50">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-2xl font-light text-cyan-700">
                                                +
                                            </div>

                                            <span className="mt-2 text-xs font-semibold text-gray-500">
                                                Add Photo
                                            </span>
                                        </div>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={(e) => {
                                                const selectedImages = Array.from(
                                                    e.target.files
                                                )

                                                const remainingSlots = 6 - images.length

                                                setImages([
                                                    ...images,
                                                    ...selectedImages.slice(0, remainingSlots),
                                                ])
                                            }}
                                        />
                                    </>
                                )}
                            </label>
                        ))}
                    </div>

                    <p className="text-right text-xs font-medium text-gray-400">
                        {images.length}/6 photos
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 h-12 w-full rounded-xl bg-cyan-600 px-6 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-cyan-700 hover:shadow-md active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-cyan-100"
                >
                    {loading ? 'posting...' : 'Post Now'}
                </button>

            </form>
        </div>
    )
}

export default FashionForm
"use client"
import React, { useState } from 'react'
import { handleSubmit } from '../../services/handleSubmitPostAttributes'
import { useSearchParams } from 'next/navigation'
function MobileForm() {

    const [brand, setBrand] = useState("")
    const [images, setImages] = useState([])
    const [adTitle, setAdTitle] = useState("")
    const [description, setDescription] = useState("")
    const [year, setYear] = useState(1900)
    const [price, setPrice] = useState(0)
    const [location, setLocation] = useState("")
    const [loading,setLoading] = useState(false)
    const searchParams = useSearchParams()
    const categoryId = searchParams.get('categoryId')
    const resetForm = ()=>{
        setBrand("")
        setImages([])
        setAdTitle("")
        setDescription("")
        setPrice(0)
    }
    const attributes = {
        brand
    }



    return (
        <form
            onSubmit={(e)=>handleSubmit(
                e,
                attributes,
                adTitle,
                description,
                price,
                location,
                year,
                images,
                categoryId,
                setLoading,
                resetForm,
            )}
           
            className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
            <div className="border-b border-gray-100 pb-5">
                <h2 className="text-xl font-bold tracking-tight text-gray-900">
                    Mobile Details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Add details about the mobile you want to sell
                </p>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">
                    Brand
                </label>

                <select
                    onChange={(e) => setBrand(e.target.value)}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-800 outline-none transition-all duration-200 hover:border-gray-300 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                >
                    <option>Brand</option>
                    <option>Redmi</option>
                    <option>Realme</option>
                    <option>Samsung</option>
                    <option>Motorola</option>
                    <option>Vivo</option>
                    <option>Oppo</option>
                    <option>Iphone</option>
                    <option>Poco</option>
                    <option>Google</option>
                    <option>Nothing</option>
                    <option>AI</option>
                    <option>Oneplus</option>
                    <option>Xiaomi</option>
                    <option>Lava</option>
                    <option>Lenovo</option>
                    <option>Nokia</option>
                    <option>Huawei</option>
                    <option>Micromax</option>
                    <option>Jio</option>
                </select>
            </div>

            <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">
              Year <span className="text-cyan-600">*</span>
            </label>

            <input
              onChange={(e) => setYear(e.target.value)}
              type="number"
              min={1900}
              max={2026}
              placeholder="e.g. 2022"
              className="[appearance:textfield] h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">
                    Ad Title
                </label>

                <input
                    onChange={(e)=>setAdTitle(e.target.value)}
                    placeholder="e.g. Samsung Galaxy S24 5G"
                    type="text"
                    max={70}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">
                    Description
                </label>

                <input
                onChange={(e)=>setDescription(e.target.value)}
                    placeholder="Describe the condition, usage, accessories, etc."
                    type="text"
                    max={1000}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">
                    Price
                </label>

                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                        ₹
                    </span>

                    <input
                    onChange={(e)=>setPrice(e.target.value)}
                        placeholder="Set your price"
                        type="number"
                        min={0}
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
              placeholder="Delhi"
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
                className={`relative aspect-square cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                    index === 0
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
                {loading?'posting...':'Post Now'}
            </button>
        </form>
    )
}

export default MobileForm
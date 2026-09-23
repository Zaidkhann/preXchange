"use client"

import React,{useState} from 'react'
import {handleSubmit} from "../../services/handleSubmitPostAttributes.js"
import { useSearchParams } from 'next/navigation.js'

function BikeForm() {
    const [brand, setBrand] = useState("")
    const [images, setImages] = useState([])
    const [adTitle, setAdTitle] = useState("")
    const [year, setYear] = useState(1900)
    const [location,setLocation] = useState("")
    const [owner, setOwner] = useState(1)
    const [fuelType, setFuelType] = useState("petrol")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [loading,setLoading] = useState(false)
    const searchParams = useSearchParams()
    const resetForm = () => {
    setBrand("")
    setImages([])
    setAdTitle("")
    setYear(1900)
    setLocation("")
    setOwner(1)
    setFuelType("petrol")
    setDescription("")
    setPrice(0)
}
    const attributes = {
                    brand,
                    owner,
                    fuelType,
                    year,
                }
    const categoryId = searchParams.get("categoryId")
    return (
        <div className="min-h-screen w-full bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <form className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
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
                          resetForm
                        )}
                        >
                <div className="border-b border-gray-100 pb-5">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900">
                        Bike Details
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Add information about the bike you're selling
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-800">
                            Brand <span className="text-cyan-600">*</span>
                        </label>

                        <select
                            onChange={(e) => setBrand(e.target.value)}
                            name="Brand"
                            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-800 outline-none transition-all duration-200 hover:border-gray-300 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                        >
                            <option value="">Select Brand</option>
                            <option value="Hero">Hero</option>
                            <option value="Honda">Honda</option>
                            <option value="Bajaj">Bajaj</option>
                            <option value="TVS">TVS</option>
                            <option value="Royal Enfield">Royal Enfield</option>
                            <option value="Yamaha">Yamaha</option>
                            <option value="Suzuki">Suzuki</option>
                            <option value="KTM">KTM</option>
                            <option value="Kawasaki">Kawasaki</option>
                            <option value="BMW Motorrad">BMW Motorrad</option>
                            <option value="Jawa">Jawa</option>
                            <option value="Yezdi">Yezdi</option>
                            <option value="Harley-Davidson">Harley-Davidson</option>
                            <option value="Triumph">Triumph</option>
                            <option value="Ducati">Ducati</option>
                            <option value="Aprilia">Aprilia</option>
                            <option value="Benelli">Benelli</option>
                            <option value="Ola Electric">Ola Electric</option>
                            <option value="Revolt">Revolt</option>
                            <option value="Ultraviolette">Ultraviolette</option>
                            <option value="Ather">Ather</option>
                            <option value="Oben">Oben</option>
                            <option value="Vida">Vida</option>
                            <option value="Other">Other</option>

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

                </div>

                <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-800">
                        Fuel Type <span className="text-cyan-600">*</span>
                    </label>

                    <div className="flex flex-wrap gap-3">
                        <button
                            value="Electric"
                            onClick={(e) => setFuelType(e.target.value)
                            }
                            type='button'
                            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700"
                        >
                            Electric
                        </button>
                    
                    <button
                        value="CNG"
                        onClick={(e) => setFuelType(e.target.value)}
                        type='button'
                        className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700"
                    >
                        CNG
                    </button>
                    <button
                        value="Petrol"
                        onClick={(e) => setFuelType(e.target.value)}
                        type='button'
                        className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700"
                    >
                        Petrol
                    </button>
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-800">
                        Number of Owners <span className="text-cyan-600">*</span>
                    </label>

                    <div className="flex flex-wrap gap-3">
                        <button
                            value='1'
                            onClick={(e) => setOwner(e.target.value)}

                            type='button'
                            className="flex h-11 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700"
                        >
                            1
                        </button>

                        <button
                            value='2'
                            onClick={(e) => setOwner(e.target.value)}

                            type='button'
                            className="flex h-11 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700"
                        >
                            2
                        </button>

                        <button
                            value='3'
                            onClick={(e) => setOwner(e.target.value)}
                            type='button'
                            className="flex h-11 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700"
                        >
                            3
                        </button>

                        <button
                            value='4+'
                            onClick={(e) => setOwner(e.target.value)}
                            type='button'
                            className="flex h-11 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700"
                        >
                            4+
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-800">
                        Ad Title <span className="text-cyan-600">*</span>
                    </label>

                    <input
                        onChange={(e) => setAdTitle(e.target.value)}
                        type="text"
                        maxLength={70}
                        placeholder="e.g. Hyundai Creta 2022 Petrol"
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
                        placeholder="Describe the car's condition, features, service history, etc."
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

export default BikeForm
"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Heart,
  MapPin,
  Phone,
  Mail,
  UserRound,
  CalendarDays,
  ShieldCheck,
  MessageCircle,
  Share2,
  Car,
  Home,
  Package,
} from "lucide-react"

function ProductPageComp({
  adTitle,
  description,
  price,
  location,
  attributes,
  createdAt,
  image,
  user,
}) {
  const [currentImage, setCurrentImage] = useState(0)
  const [liked, setLiked] = useState(false)
  const [showPhone, setShowPhone] = useState(false)
  const router = useRouter()

  const images = Array.isArray(image) ? image : []

  const getImageUrl = (item) => {
    if (typeof item === "string") return item
    return item?.url || item?.secure_url || ""
  }

  const validImages = images
    .map(getImageUrl)
    .filter(Boolean)

  const nextImage = () => {
    if (validImages.length > 1) {
      setCurrentImage((prev) =>
        prev === validImages.length - 1 ? 0 : prev + 1
      )
    }
  }

  const previousImage = () => {
    if (validImages.length > 1) {
      setCurrentImage((prev) =>
        prev === 0 ? validImages.length - 1 : prev - 1
      )
    }
  }

  const formatPrice = (value) => {
    if (value === undefined || value === null) return "Price on request"

    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (date) => {
    if (!date) return ""

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const attributeLabels = {
    brand: "Brand",
    owner: "Owner",
    fuelType: "Fuel Type",
    year: "Year",
    transmission: "Transmission",
    type: "Property Type",
    BHK: "BHK",
    furnishing: "Furnishing",
    ownerName: "Owner Name",
    builtupArea: "Built-up Area",
    floors: "Floors",
    facing: "Facing",
  }

  const attributeIcons = {
    brand: Car,
    owner: UserRound,
    fuelType: Package,
    year: CalendarDays,
    transmission: Car,
    type: Home,
    BHK: Home,
    furnishing: Home,
    ownerName: UserRound,
    builtupArea: Home,
    floors: Home,
    facing: Home,
  }

  const visibleAttributes = attributes
    ? Object.entries(attributes).filter(
        ([, value]) =>
          value !== undefined &&
          value !== null &&
          value !== ""
      )
    : []

  return (
    <div className="min-h-screen bg-[#f6f8fa] text-slate-900">
      <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8">

        <button
        onClick={()=>
        (router.back())
        }
          type="button"
          className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-cyan-600"
        >
          <ChevronLeft size={19} />
          Back to listings
        </button>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_370px]">

          <main className="min-w-0">

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="relative flex h-[300px] items-center justify-center bg-slate-950 sm:h-[440px] lg:h-[540px]">

                {validImages.length > 0 ? (
                  <Image
                    src={validImages[currentImage]}
                    alt={adTitle || "Product image"}
                    fill
                    priority
                    className="object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-500">
                    <Package size={42} />
                    <span>No image available</span>
                  </div>
                )}

                {validImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={previousImage}
                      className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg backdrop-blur transition hover:bg-white"
                    >
                      <ArrowLeft size={20} />
                    </button>

                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg backdrop-blur transition hover:bg-white"
                    >
                      <ArrowRight size={20} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                      {currentImage + 1} / {validImages.length}
                    </div>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setLiked(!liked)}
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-lg transition hover:scale-105"
                >
                  <Heart
                    size={21}
                    className={
                      liked
                        ? "fill-red-500 text-red-500"
                        : "text-slate-700"
                    }
                  />
                </button>
              </div>

              {validImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto border-t border-slate-100 bg-white p-3">
                  {validImages.map((img, index) => (
                    <button
                      key={`${img}-${index}`}
                      type="button"
                      onClick={() => setCurrentImage(index)}
                      className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                        currentImage === index
                          ? "border-cyan-500"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                      VERIFIED LISTING
                    </span>

                    {attributes?.year && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {attributes.year}
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                    {adTitle}
                  </h1>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                    {location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-cyan-600" />
                        {location}
                      </span>
                    )}

                    {createdAt && (
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={16} />
                        Posted {formatDate(createdAt)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600"
                >
                  <Share2 size={18} />
                </button>
              </div>

              <div className="mt-7 border-t border-slate-100 pt-6">
                <p className="text-3xl font-bold text-slate-950">
                  ₹{formatPrice(price)}
                </p>
              </div>
            </section>

            {visibleAttributes.length > 0 && (
              <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                  <h2 className="text-xl font-bold text-slate-950">
                    Details
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Key information about this listing
                  </p>
                </div>

                <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
                  {visibleAttributes.map(([key, value]) => {
                    const Icon =
                      attributeIcons[key] || Package

                    return (
                      <div
                        key={key}
                        className="flex items-center gap-4 px-5 py-4 sm:px-6"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                          <Icon size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-400">
                            {attributeLabels[key] || key}
                          </p>

                          <p className="mt-0.5 truncate text-sm font-semibold capitalize text-slate-800">
                            {String(value)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                <h2 className="text-xl font-bold text-slate-950">
                  Description
                </h2>
              </div>

              <div className="px-5 py-6 sm:px-7">
                {description ? (
                  <p className="whitespace-pre-line text-[15px] leading-7 text-slate-600">
                    {description}
                  </p>
                ) : (
                  <p className="text-sm text-slate-400">
                    No description provided.
                  </p>
                )}
              </div>
            </section>

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-950">
                  Location
                </h2>

                <MapPin
                  size={21}
                  className="text-cyan-600"
                />
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <MapPin
                  size={19}
                  className="mt-0.5 shrink-0 text-cyan-600"
                />

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {location || "Location not available"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Exact location will be shared by the seller.
                  </p>
                </div>
              </div>
            </section>

          </main>

          <aside className="lg:sticky lg:top-5 lg:h-fit">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 bg-gradient-to-r from-cyan-50 to-white p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600 text-white">
                    <ShieldCheck size={21} />
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      Safe & secure deal
                    </p>

                    <p className="text-xs text-slate-500">
                      Connect directly with the seller
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5">

                <div className="flex items-center gap-4">
                  {user?.avatar ? (
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border border-slate-200">
                      <Image
                        src={user.avatar}
                        alt={user.userName || "Seller"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                      <UserRound size={25} />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-base font-bold text-slate-900">
                      {user?.userName || "Seller"}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-600">
                      <ShieldCheck size={14} />
                      Verified seller
                    </div>
                  </div>
                </div>

                <div className="my-5 h-px bg-slate-100" />

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-cyan-700"
                >
                  <MessageCircle size={19} />
                  Chat with seller
                </button>

                <button
                  type="button"
                  onClick={() => setShowPhone(!showPhone)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-cyan-600 px-5 py-3 text-sm font-bold text-cyan-700 transition hover:bg-cyan-50"
                >
                  <Phone size={18} />
                  {showPhone
                    ? user?.phone || "Phone unavailable"
                    : "Show phone number"}
                </button>

                {user?.email && (
                  <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <Mail
                      size={17}
                      className="shrink-0 text-slate-400"
                    />

                    <span className="truncate text-xs text-slate-600">
                      {user.email}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-100 bg-cyan-50/60 p-5">
              <div className="flex gap-3">
                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-cyan-600"
                />

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Stay safe while buying
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Never share OTPs, passwords or sensitive banking
                    information with anyone.
                  </p>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  )
}

export default ProductPageComp
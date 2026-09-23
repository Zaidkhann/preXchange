"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"

function ProductCard({ productDetails }) {
  
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {productDetails?.map((product) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          className="group relative overflow-hidden rounded-2xl border border-gray-200 border-l-4 border-l-cyan-500 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:border-l-cyan-500 hover:shadow-xl hover:shadow-cyan-100/40"
        >
          <div className="relative h-60 w-full overflow-hidden bg-gray-100">
            {product.image?.[0]?.url ? (
              <Image
                src={product.image[0].url}
                alt={product.adTitle}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                No Image
              </div>
            )}

           <div className="absolute right-3 top-3">
    <button
        className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-sm ring-1 ring-black/5 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#0891B2] hover:shadow-lg hover:ring-cyan-100 active:scale-95"
    >
        <Heart className="h-[18px] w-[18px] transition-all duration-300 group-hover:scale-110 group-hover:fill-cyan-100" />
    </button>
</div>

            {product.image?.length > 1 && (
              <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                {product.image.length} Photos
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xl font-bold tracking-tight text-gray-900">
                  ₹{product.price?.toLocaleString("en-IN")}
                </p>

                <h2 className="mt-1 line-clamp-1 text-[15px] font-semibold text-gray-800">
                  {product.adTitle}
                </h2>
              </div>

          
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <span className="max-w-[65%] truncate">
                {product.location}
              </span>

              {product.year && (
                <>
                  <span className="text-gray-300">•</span>
                  <span>{product.year}</span>
                </>
              )}
            </div>

            <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
              {product.description}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
              <span className="text-xs text-gray-400">
                {new Date(product.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })}
              </span>

              <span className="text-sm font-semibold text-cyan-600 transition-all group-hover:translate-x-0.5">
                View details →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductCard

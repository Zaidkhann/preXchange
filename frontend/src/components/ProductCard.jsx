"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

function ProductCard({ productDetails }) {
  return (<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {productDetails?.map((product) => (
      <Link
        href={`/product/${product.id}`}
        key={product.id}
        className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      >
         <div className="relative h-56 w-full overflow-hidden bg-gray-100">
          {product.image?.[0]?.url ? (<Image
            src={product.image[0].url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          ) : (<div className="flex h-full items-center justify-center text-sm text-gray-400">
            No Image </div>
          )} </div>

        <div className="p-4">
          <div className="mb-1">
            <span className="text-lg font-bold tracking-tight text-gray-900">
              ₹{product.price?.toLocaleString("en-IN")}
            </span>
          </div>

          <h2 className="line-clamp-1 text-base font-medium text-gray-800">
            {product.name}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
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
              {new Date(product.createdAt).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                }
              )}
            </span>

            <span className="text-sm font-medium text-gray-700 transition-colors hover:text-cyan-500">
              View details
              <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    ))}
  </div>
  )

}

export default ProductCard

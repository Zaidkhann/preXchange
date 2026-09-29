import React from "react"
import { productsByCategoryId } from "@/services/productService.js"
import ProductCard from "../../../components/ProductCard.jsx"
import Filters from "../../../components/filters.jsx"

async function page({ params, searchParams }) {
    const { categoryId } = await params

    const productsResponse = await productsByCategoryId(
        categoryId,
        searchParams
    )

    const products = productsResponse?.data || []

    return (
        <main className="min-h-screen bg-[#f8fafc] px-4 pb-10 pt-28 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-7">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Explore Products
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Find products available in this category
                    </p>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">

                        <div className="lg:sticky lg:top-28">
                            <Filters />
                        </div>

                        <div className="min-w-0">
                            <ProductCard productDetails={products} />
                        </div>

                    </div>
                ) : (
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center">
                            <h2 className="text-lg font-semibold text-slate-900">
                                No products found
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                There are no products available in this category yet.
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </main>
    )
}

export default page
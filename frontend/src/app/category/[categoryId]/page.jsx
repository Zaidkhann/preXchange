import React from "react"
import { productsByCategoryId } from "@/services/productService.js"
import ProductCard from "../../../components/ProductCard.jsx"

async function page({ params }) {
const { categoryId } = await params


const productsResponse = await productsByCategoryId(categoryId)
const products = productsResponse?.data || []

return (
    <main className="min-h-screen bg-[#fdfdff] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
            <div className="mb-7">
                <h1 className="text-2xl font-bold text-black sm:text-3xl">
                    Explore Products
                </h1>

                <p className="mt-1 text-sm text-gray-600">
                    Find products available in this category
                </p>
            </div>
            {products?.length > 0 ? (
    <ProductCard productDetails={products} />
) : (
    <div className="flex min-h-75 items-center justify-center">
        <div className="rounded-xl border border-gray-200 bg-white px-8 py-10 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
                No products found
            </h2>

            <p className="mt-1 text-sm text-gray-500">
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

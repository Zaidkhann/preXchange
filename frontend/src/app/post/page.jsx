// "use client"
// import React from 'react'
// import { useState,useEffect } from 'react'
// import {Smartphone,Car,Motorbike,BuildingComplex,Refrigerator,Armchair,Cat,Guitar,Shirt } from "lucide-react"

// function Post() {
//     const [categories, setCategories] = useState([])
//     const [loading, setLoading] = useState(true)

    
//     const categoryDetail = async () => {
//         try {
//             const res = await fetch("http://localhost:5000/api/categories", {
//                 credentials: "include",
//                 cache: "force-cache",
//             })
//             if (!res.ok) {
//                 console.log("Failed to get category Detail")
//                 return
//             }
            
//             const data = await res.json()

//             setCategories(data.category)
//         } catch (err) {
//             console.log("Failed to fetch category Detail Internal ERROR: ", err)
//             return
//         }finally {
//             setLoading(false)
//         }
//     }
//     useEffect(() => {
//         categoryDetail()
//     }, [])
//     if (loading) {
//         return (
//             <div className="flex min-h-[60vh] items-center justify-center">
//                 <div className="relative h-10 w-10">
//                     <div className="absolute inset-0 animate-spin rounded-full border-4 border-cyan-100/20 border-t-cyan-400" />
//                     <div className="absolute inset-1 animate-pulse rounded-full bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.35)]" />
//                 </div>
//             </div>
//         )
//     }
// return (
//     <div className='flex-col justify-center items-center'>
//         <h1 className='text-2xl font-bold'>POST YOUR AD</h1>
//         <div>
//             {categories.map((category)=>(
//                 <div key={category.id}
//                 className='
//                     w-45
//                     h-18
//                     border
//                     border-gray-500
//                     rounded-lg
//                     bg-white
//                     text-gray-500
//                     hover:bg-gray-800
//                     hover:text-white
//                 '>
//                     <div className="flex items-center gap-2">
//     {category.name.toLowerCase() === "mobiles" && <Smartphone />}
//     <span>{category.name}</span>
// </div>

//                 </div>
//             ))}
//         </div>
        
//     </div>
//   )
// }

// export default Post

"use client"

import React, { useEffect, useState } from "react"
import {
    Smartphone,
    Car,
    Motorbike,
    Building2,
    Refrigerator,
    Armchair,
    Cat,
    Guitar,
    Shirt,
    ChevronRight,
} from "lucide-react"

function Post() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    const categoryDetail = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/categories", {
                credentials: "include",
                cache: "force-cache",
            })

            if (!res.ok) {
                console.log("Failed to get category Detail")
                return
            }

            const data = await res.json()
            setCategories(data.category)
        } catch (err) {
            console.log(
                "Failed to fetch category Detail Internal ERROR: ",
                err
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        categoryDetail()
    }, [])

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-white">
                <div className="relative h-12 w-12">
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-100 border-t-cyan-500" />
                    <div className="absolute inset-2 rounded-full bg-cyan-50" />
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

                <div className="mb-10 text-center">
                    <div className="mb-4 inline-flex items-center rounded-full border border-cyan-100 bg-cyan-50 px-4 py-1.5">
                        <span className="mr-2 h-2 w-2 rounded-full bg-cyan-500" />
                        <span className="text-sm font-medium text-cyan-700">
                            Create a new listing
                        </span>
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Post Your Ad
                    </h1>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                        Choose a category to get started with your posting.
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

                    <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-5">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                Select Category
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                What are you selling?
                            </p>
                        </div>

                        <div className="hidden rounded-lg bg-gray-50 px-3 py-2 text-sm font-medium text-gray-500 sm:block">
                            {categories.length} Categories
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="group flex min-h-[82px] cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50/50 hover:shadow-md"
                            >
                                <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-600 transition-all duration-200 group-hover:bg-cyan-100 group-hover:text-cyan-600">

                                        {category.name.toLowerCase() === "mobiles" && (
                                            <Smartphone className="h-6 w-6" />
                                        )}

                                        {category.name.toLowerCase() === "cars" && (
                                            <Car className="h-6 w-6" />
                                        )}

                                        {category.name.toLowerCase() === "bikes" && (
                                            <Motorbike className="h-6 w-6" />
                                        )}

                                        {category.name.toLowerCase() === "properties" && (
                                            <Building2 className="h-6 w-6" />
                                        )}

                                        {category.name.toLowerCase() === "electronics & appliances" && (
                                            <Refrigerator className="h-6 w-6" />
                                        )}

                                        {category.name.toLowerCase() === "furnitures" && (
                                            <Armchair className="h-6 w-6" />
                                        )}

                                        {category.name.toLowerCase() === "pets" && (
                                            <Cat className="h-6 w-6" />
                                        )}

                                        {category.name.toLowerCase() === "books, sports & hobbies" && (
                                            <Guitar className="h-6 w-6" />
                                        )}

                                        {category.name.toLowerCase() === "fashion" && (
                                            <Shirt className="h-6 w-6" />
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-800 transition-colors group-hover:text-cyan-700">
                                            {category.name}
                                        </h3>

                                        <p className="mt-0.5 text-xs text-gray-400">
                                            Post your {category.name.toLowerCase()}
                                        </p>
                                    </div>
                                </div>

                                <ChevronRight className="h-5 w-5 text-gray-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-cyan-500" />
                            </div>
                        ))}
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-gray-400">
                    Select the category that best matches your item.
                </p>

            </div>
        </main>
    )
}

export default Post
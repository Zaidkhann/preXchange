"use client"
import React from 'react'
import Image from "next/image"
import Link from 'next/link'
import { useState, useEffect } from 'react'


function CategoryCard() {
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
            console.log("Failed to fetch category Detail Internal ERROR: ", err)
            return
        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        categoryDetail()
    }, [])
    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="relative h-10 w-10">
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-cyan-100/20 border-t-cyan-400" />
                    <div className="absolute inset-1 animate-pulse rounded-full bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.35)]" />
                </div>
            </div>
        )
    }
    return (
        <section className="mx-auto max-w-7xl px-6 py-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Explore Categories
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Find what you’re looking for
                </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
                {categories.map((category) => (
                    
                    <div
                        key={category.id}
                        className="group w-30 cursor-pointer"
                    >
                        <Link href={`/category/${category.id}`}>
                        <div className="relative h-30 w-30 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#0891B2]/30 group-hover:shadow-lg">
                            <Image
                                src={category.imageUrl}
                                alt={category.name}
                                fill
                                className="object-contain p-2 transition duration-500 group-hover:scale-105"
                            />
                        </div>
                        

                        <p className="mt-3 text-center text-sm font-semibold text-slate-800 transition-colors duration-300 group-hover:text-[#0891B2]">
                            {category.name}
                        </p>
                    </Link>
                    </div>
                
                    
                ))}
            </div>
        </section>
    );
}

export default CategoryCard
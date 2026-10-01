"use client"
import { usePathname, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { getAllProducts } from "../services/productService"
import ProductCard from "./ProductCard"
import LoadMore from "./LoadMore"

function GetProducts() {
    const [products, setProducts] = useState([])
    const searchParams = useSearchParams()
    const search = searchParams.get("search") || ""
    const [page, setPage] = useState(1)


  
    

    useEffect(() => {
        async function fetchProducts() {
            const productResponse = await getAllProducts(search,page)
            const productDetail = productResponse?.data?.products
        if (page === 1) {
    setProducts(productDetail || [])
} else {
    setProducts(prev => [...prev, ...(productDetail || [])])
}

        }

        fetchProducts()
    }, [search,page])

    useEffect(() => {
    setPage(1)
    setProducts([])
}, [search])

    return (
    <div className="flex flex-col items-center gap-4">
        <ProductCard productDetails={products} />
        <LoadMore setPage={setPage}/>

        
    </div>
)


}

export default GetProducts

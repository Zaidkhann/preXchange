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
    const [location,setLocation] = useState(null)
    const [hasNextPage,setHasNextPage] = useState(false)


    useEffect(() => {
    const updateLocation = () => {
        const savedLocation = localStorage.getItem("location_getProducts")

        if (savedLocation) {
            setLocation(JSON.parse(savedLocation))
        } else {
            setLocation(null)
        }
    }

    updateLocation()

    window.addEventListener("locationChanged", updateLocation)

    return () => {
        window.removeEventListener("locationChanged", updateLocation)
    }
}, [])
    

    useEffect(() => {
        async function fetchProducts() {
            const productResponse = await getAllProducts(search,page)
            const productDetail = productResponse?.data?.products
            const pagination = productResponse?.data?.pagination
            setHasNextPage(pagination?.hasNextPage || false)
        if (page === 1) {
    setProducts(productDetail || [])
} else {
    setProducts(prev => [...prev, ...(productDetail || [])])
}

        }

        fetchProducts()
    }, [search,page,location])

    useEffect(() => {
    setPage(1)
    setProducts([])
}, [search,location])

    return (
    <div className="flex flex-col items-center gap-4">
        <ProductCard productDetails={products} />
        {hasNextPage?(
            <LoadMore setPage={setPage}/>

        ):""}
        
        
    </div>
)


}

export default GetProducts

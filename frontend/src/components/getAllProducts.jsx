"use client"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { getAllProducts } from "../services/productService"
import ProductCard from "./ProductCard"
import { Pagination } from "@heroui/react"

function GetProducts() {
    const [products, setProducts] = useState([])
    const searchParams = useSearchParams()
    const search = searchParams.get("search") || ""

    useEffect(() => {
        async function fetchProducts() {
            const productResponse = await getAllProducts(search)

            const productDetail = productResponse?.data?.products
            setProducts(productDetail || [])
        }

        fetchProducts()
    }, [search])

    return (
        <div>
        <ProductCard productDetails={products} />
        <Pagination/>
        </div>
    )


}

export default GetProducts

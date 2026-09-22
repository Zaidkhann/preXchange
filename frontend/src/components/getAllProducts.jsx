"use client"

import React, { useEffect, useState } from "react"
import { getAllProducts } from "../services/productService"
import ProductCard from "./ProductCard"

function GetProducts() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchProducts() {
            const productResponse = await getAllProducts()

            const productDetail = productResponse?.data?.products
            setProducts(productDetail || [])
        }

        fetchProducts()
    }, [])

    return (
        <ProductCard productDetails={products} />
    )


}

export default GetProducts

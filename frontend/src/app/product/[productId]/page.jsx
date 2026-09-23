"use client"
import React, { useEffect, useState } from 'react'
import {getProductById} from "../../../services/productService.js"
import ProductPageComp from '../../../components/ProductPageComp.jsx'
import {useParams} from "next/navigation"
function productPage() {
    const { productId } = useParams()
    const [product, setProduct] = useState(null)
    useEffect(()=>{
        const fetchProduct = async()=>{
            const data = await getProductById(productId)
            setProduct(data)
        }
        if(productId){
            fetchProduct()
        }
    },[productId])

if(!product){
    return <h2>Loading ...</h2>
}
  return (
    <div>
        {product && 
        <ProductPageComp 
        adTitle = {product.adTitle} 
        description={product.description} 
        price = {product.price} 
        location={product.location} 
        attributes={product.attributes} 
        createdAt={product.createdAt} 
        image={product.image} 
        user={product.user} 
        />}
    </div>
  )
}

export default productPage
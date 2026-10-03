
async function productsByCategoryId(categoryId,searchParams){
    const params = await searchParams
    const minPrice = params?.min_price_
    const maxPrice = params?.max_price_
    const afterYear = params?.after_year
    const beforeYear = params?.before_year

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/fetchProductsByFilter/${categoryId}?min_price_=${minPrice}&max_price_=${maxPrice}&after_year=${afterYear}&before_year=${beforeYear}`,
        {
            credentials:"include",
            cache:"no-store"
        }
    )
    if(!res.ok){
        console.log("Failed to get products by categoryId")
        return {
            success:false,       
            message:"Failed to get products by categoryId"
        }
    }
    const data = await res.json()
    return data

}

async function getAllProducts(search="",page){
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/products/fetch-products?page=${page}`)
    if(search.trim()){
        url.searchParams.set("search",search.trim())
    }
    const res = await fetch(url,{
        cache:"no-store"
    })
    if(!res.ok){
        console.log("Failed to get products")
        return{
            success:false,       
            message:"Failed to get products"
        }
    }
    const data = await res.json()
    return data
}
async function getProductById(productId){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/fetchProductById/${productId}`,{
        cache:"no-store"
    })
    if(!res.ok){
        console.log("Failed to get products")
        return{
            success:false,       
            message:"Failed to get products"
        }
    }
    const data = await res.json()
    return data.product
}


const editProduct = async(
    productId,
    adTitle,
    description,
    price,
    location,
    year,
    attributes,
    isSold

)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/update-product/${productId}`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                ...(adTitle && { adTitle }),
                ...(description && { description }),
                ...(price !== undefined && { price }),
                ...(location && { location }),
                ...(year && { year }),
                // ...(image && { image }),
                ...(attributes && { attributes }),
                ...(isSold !== undefined && { isSold }),

            })
            ,
            headers: {
                "Content-Type": "application/json"
            }

        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log("Failed to update product Internal error ", error)
        return ""
    }
}



const deleteProduct = async(productId)=>{
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/delete-product/${productId}`,{
            credentials:"include",
            method:"DELETE",
        })
        const data = res.json()
        return data
    } catch (error) {
        console.log("Failed to delete product Internal error ", error)
        return ""
    }
}



export {productsByCategoryId,getAllProducts,getProductById,editProduct, deleteProduct}


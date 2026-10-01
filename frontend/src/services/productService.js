
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






export {productsByCategoryId,getAllProducts,getProductById}
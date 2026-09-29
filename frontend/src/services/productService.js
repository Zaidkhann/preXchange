async function productsByCategoryId(categoryId){
    const res = await fetch(`http://localhost:5000/api/products/fetchProductsByFilter/${categoryId}`,
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

async function getAllProducts(search=""){
    const url = new URL("http://localhost:5000/api/products/fetch-products")
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
    const res = await fetch(`http://localhost:5000/api/products/fetchProductById/${productId}`,{
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
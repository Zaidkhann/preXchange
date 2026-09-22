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

async function getAllProducts(){
    const res = await fetch("http://localhost:5000/api/products/fetch-products",{
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




export {productsByCategoryId,getAllProducts}
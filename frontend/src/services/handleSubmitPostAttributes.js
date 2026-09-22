const handleSubmit = async (e,attributes,adTitle,description,price,location,year,images,categoryId,setLoading,resetForm) => {
    e.preventDefault();
    setLoading(true)
    try {
        const formData = new FormData()
        formData.append("adTitle", adTitle)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("location", location)
        formData.append("year", year)
        formData.append("categoryId", categoryId)
        formData.append("attributes", JSON.stringify(attributes))
        images.forEach((image) => {
            formData.append("image",image)
            
        });
        const res = await fetch("http://localhost:5000/api/products/product-post", {
            credentials: "include",
            method: "POST",
            body: formData
        })
        const data = await res.json()
        if (!res.ok) {
            console.log("Failed to post Ad",data)
            return {
                status: false,
                message: data.message || "Failed to post Ad"
            }
        }
        alert("Advertisement Posted Successfully")
        resetForm()
    } catch (err) {
        console.log("Internal DATA ", err)
        alert("Failed to post Ad")
        return
    }
    finally{
        setLoading(false)
    }

}
export {handleSubmit}
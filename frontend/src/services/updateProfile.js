const updateProfile = async (userName, phone, password, location, avatar,setLoading) => {
    try {
        setLoading(true)
        const res = await fetch("http://localhost:5000/api/user/updateprofile", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                ...(userName && { userName }),
                ...(phone && { phone }),
                ...(password && { password }),
                ...(location && { location }),
                ...(avatar && { avatar })
            })
            ,
            headers: {
                "Content-Type": "application/json"
            }

        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log("Failed to update profile Internal error ", error)
        return ""
    }
    finally{
        setLoading(false)
    }
}
export default updateProfile
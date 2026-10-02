const updateProfile = async (userName, email, phone, password, location, avatar) => {
    try {
        const res = await fetch("http://localhost:5000/api/user/updateprofile", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                ...(userName && { userName }),
                ...(email && { email }),
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
}
export default updateProfile
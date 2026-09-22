const handleSubmit = async (e, userName, email, password,router) => {
    e.preventDefault()
    try {
        const res = await fetch("http://localhost:5000/api/auth/login",
            {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    userName,
                    password,

                }

                )
            }
        )
        const data = await res.json()
        if (!res.ok) {
            alert("Failed to find user with this email or username")
            console.log("Failed to find user with email")
            return data.message
        }
        alert("Login Successfully")
        router.push("/")
        router.refresh()

    } catch (err) {
        console.log("INTERNAL ERROR TO LOGIN : ", err)
        return
    }
}
export { handleSubmit }
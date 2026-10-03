import {toast} from "@heroui/react"

const handleSubmit = async (e, userName, email, password,router) => {
    e.preventDefault()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
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
        toast.success("Login Succesfully")
        router.push("/")
        router.refresh()
        setTimeout(()=>{
            window.location.reload()
        },500)

    } catch (err) {
        console.log("INTERNAL ERROR TO LOGIN : ", err)
        toast.danger("Login Failed")
        return
    }
}
export { handleSubmit }
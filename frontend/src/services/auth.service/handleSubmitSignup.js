import {toast} from "@heroui/react"
const handleSubmit = async (e,userName,email,password,location,phone,router)=>{
    e.preventDefault()
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
            credentials:"include",
            method:"POST",
            headers: {
    "Content-Type": "application/json",
  },
            body:JSON.stringify({
                email,
                userName,
                password,
                location,
                phone,
            }

            )
        }
    )
    const data = await res.json()
    if(!res.ok){
        console.log("Failed to create user")
        return data.message
    }
    toast.success("Signup Successfully")
    router.push("/")
    router.refresh()

    }catch(err){
        console.log("INTERNAL ERROR TO CREATE USER: ",err)
        toast.danger("Signup Failed")
        return
    }
}
export {handleSubmit}
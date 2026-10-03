export const handleLogout = async(router) =>{
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,{
            method:"POST",
            credentials:"include"
        })
        const data = await res.json()
        setTimeout(()=>{
        window.location.reload()

    },200)
            router.push("/login")
        return data.message   
    }catch(err){
        console.log("failed to logout")
        return
    }   
}



export {handleLogout}
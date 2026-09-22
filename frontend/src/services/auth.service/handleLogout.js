export const handleLogout = async(router) =>{
    e.preventDefault()
    try{
        const res = await fetch("http://localhost:5000/api/auth/logout",{
            method:"POST",
            credentials:"include"
        })
        const data = await res.json()
        router.push("/login")
        return data.message   
    }catch(err){
        console.log("failed to logout")
        return
    }
}



export {handleLogout}
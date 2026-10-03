import prisma from "../lib/prisma.js";

export const updateprofile = async(req,res)=>{
    try{
        const
        {userName, 
        email, 
        avatar, 
        location, 
        password, 
        phone} = req.body
        const userId = req.user.userId
        const updatedUser = await prisma.user.update({
            
                where:{
                    id:userId
                },
                data:{
                    ...(userName !== undefined && {userName}),
                    ...(email !== undefined && {email}),
                    ...(avatar !== undefined && {avatar}),
                    ...(location !== undefined && {location}),
                    ...(password !== undefined && {password}),
                    ...(phone !== undefined && {phone}),
                }
        })    
        

        return res.status(200).json({
            success:true,
            message: "Profile updated successfully",
            user: updatedUser
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message: "Failed to update profile",
            error: error.message})
        }   
    
    
}

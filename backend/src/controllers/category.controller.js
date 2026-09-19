import prisma from "../lib/prisma.js"

export const fetchCategory = async(req,res)=>{
    try{
        const category = await prisma.category.findMany()
        return res.status(200).json({
            success: true,
            message:"Fetched category",
            category
        })
    }catch(err){
        console.log("Failed to fetch category: ",err)
        return res.status(500).json({
            success:false,
            message:"Failed to fetch category"
        })
    }

}

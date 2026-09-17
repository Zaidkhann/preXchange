import jwt from "jsonwebtoken"

export const authMiddleware = async(req,res,next) =>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                success: false,
                message: "User is not authenticated"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = decoded   
        next()
    }catch(err){
        console.log(`Failed to authorization check: ${err}`)
        return res.status(500).json({
            success:false,
            message:"Failed to authorization check Internal ERROR"
        })
    }
}
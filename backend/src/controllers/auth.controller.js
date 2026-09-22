import jwt from "jsonwebtoken"
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs"
import { response } from "express";
export const signupUser = async (req,res)=>{
    try{
        let {
            email,
            password,
            userName,
            phone,
            location,
            avatar,
        } = req.body

        if(!email || !password || !userName || !location){
            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });

        }
        email = email.trim().toLowerCase();
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                email:email
            }
        })
        if (existingUser){
            return res.status(409).json({
                success:false,
                message: "User already exist with same email address."
            })
        }
        const hashed_password = await bcrypt.hash(
            password,10
        )


        const user = await prisma.user.create({
            data:{
                email,
                password: hashed_password,
                userName,
                phone,
                location,
                avatar,

            }
        })
        const token = jwt.sign(
            {
                userId: user.id
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn:'3d'}
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 3 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({ 
            success: true, 
            message: "User created successfully",
            user: { 
                id: user.id, 
                email: user.email, 
                userName: user.userName, 
                phone: user.phone, 
                location: user.location, 
                avatar: user.avatar, 
            }, 
        });

    }catch(err){
        console.log("Failed to create User ",err)
        return res.status(500).json({
            success: false,
            message:"Failed to create User"
        })
    }
    
}


export const loginUser = async(req,res)=>{
    try{
        let{email,password,userName} = req.body
        
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });
        }
        const user = await prisma.user.findFirst({
            where:{
                OR: [
                    { email: email },
                    { userName: userName }
        ]
            }
        })  
        if(!user){
            return res.status(404).json({
                success:false,
                message: "User not exist with this email address."
            })
            
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect) {
            return res.status(401).json({
                success:false,
                message: "Incorrect password "
            })
        }
        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET_KEY,
            {expiresIn:'3d'}

        )
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 3 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({ 
            success: true, 
            message: "User logged in successfully",
            user: { 
                id: user.id, 
                email: user.email, 
                userName: user.userName, 
                phone: user.phone, 
                location: user.location, 
                avatar: user.avatar, 
            }, 
        });

    }catch(err){
        console.log("Failed to create User ",err)
        return res.status(500).json({
            success: false,
            message:"Failed to create User"
        })
    }
    
}

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (err) {
        console.log("Logout failed:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to logout user"
        });
    }
};
    

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                userName: true,
                phone: true,
                location: true,
                avatar: true
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        console.log("Failed to get current user:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to get current user"
        });
    }
};  
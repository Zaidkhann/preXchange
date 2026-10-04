import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

export const updateprofile = async (req, res) => {
    try {
        const {
            userName,
            email,
            avatar,
            location,
            password,
            phone
        } = req.body

        const userId = req.user.userId

        const data = {
            ...(userName !== undefined && { userName }),
            ...(email !== undefined && { email }),
            ...(avatar !== undefined && { avatar }),
            ...(location !== undefined && { location }),
            ...(phone !== undefined && { phone })
        }

        if (password !== undefined && password !== "") {
            data.password = await bcrypt.hash(password, 10)
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data
        })

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        })

    } catch (error) {
        console.log("Update profile error:", error)

        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message
        })
    }
}
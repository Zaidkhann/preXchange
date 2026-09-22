import express from "express"
import {signupUser,loginUser, logoutUser, getCurrentUser} from "../controllers/auth.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/signup",signupUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.get("/me",authMiddleware, getCurrentUser)

export default router;
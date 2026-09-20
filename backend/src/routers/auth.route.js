import express from "express"
import {signupUser,loginUser, logoutUser, getCurrentUser} from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/signup",signupUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.get("/me", getCurrentUser)

export default router;
import express from "express"
import {signupUser,loginUser, logoutUser, getCurrentUser, googleCallback} from "../controllers/auth.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import passport from "../config/passport.js"


const router = express.Router()

router.post("/signup",signupUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.get("/me",authMiddleware, getCurrentUser)
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false
    })
)
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "https://prexchange.vercel.app/login"
    }),
    googleCallback
)

export default router;
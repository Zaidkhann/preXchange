import { updateprofile } from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js"
import express from "express"

const router = express.Router()

router.post("/updateprofile",authMiddleware,updateprofile)

export default router
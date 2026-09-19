import express from "express"
import { fetchCategory } from "../controllers/category.controller.js"

const router = express.Router()

router.get("/categories",fetchCategory)

export default router
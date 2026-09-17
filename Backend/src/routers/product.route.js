import express from "express"
import { fetchAllProducts, productPost} from "../controllers/product.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/product-post",authMiddleware,productPost)
router.get("/fetch-products",fetchAllProducts)

export default router
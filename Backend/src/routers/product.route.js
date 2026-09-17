import express from "express"
import { fetchAllProducts, fetchProductsByFilter, productPost} from "../controllers/product.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/product-post",authMiddleware,productPost)
router.get("/fetch-products",fetchAllProducts)
router.get("/fetchProductsByFilter/:categoryId",fetchProductsByFilter)

export default router
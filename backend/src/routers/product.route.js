import express from "express"
import { fetchAllProducts, fetchProductsByFilter, productPost} from "../controllers/product.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import upload from "../middlewares/upload.middleware.js"

const router = express.Router()

router.post("/product-post",authMiddleware,upload.array("image",6),productPost)
router.get("/fetch-products",fetchAllProducts)
router.get("/fetchProductsByFilter/:categoryId",fetchProductsByFilter)

export default router
import express from "express"
import { deleteProduct, editProduct, fetchAllProducts, fetchProductById, fetchProductsByFilter, productPost} from "../controllers/product.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import upload from "../middlewares/upload.middleware.js"

const router = express.Router()

router.post("/product-post",authMiddleware,upload.array("image",6),productPost)
router.get("/fetch-products",fetchAllProducts)
router.get("/fetchProductById/:productId",fetchProductById)
router.get("/fetchProductsByFilter/:categoryId",fetchProductsByFilter)
router.post("/update-product/:productId",authMiddleware,editProduct)
router.delete("/delete-product/:productId",authMiddleware,deleteProduct)

export default router
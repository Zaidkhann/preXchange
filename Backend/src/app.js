import express from "express"
import cookieParser from "cookie-parser"
import productRoute from "./routers/product.route.js"
import authRoute from "./routers/auth.route.js"
const app = express()

app.use(express.json())
app.use(cookieParser())


app.use("/api/products",productRoute)
app.use("/api/auth",authRoute)

export default app 
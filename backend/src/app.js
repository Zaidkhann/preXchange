import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import productRoute from "./routers/product.route.js"
import authRoute from "./routers/auth.route.js"
import categoryRoute from "./routers/category.route.js"
import userRoute from "./routers/user.route.js"
import conversationRoute from "./routers/conversation.route.js"
const app = express()

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);

app.use(express.json())
app.use(cookieParser())


app.use("/api/products",productRoute)
app.use("/api/auth",authRoute)
app.use("/api",categoryRoute)
app.use("/api/user",userRoute)
app.use("/api",conversationRoute)

export default app 
import "dotenv/config"
import app from "./src/app.js"
const startServer = ()=>{
    try{
        const PORT = process.env.PORT || 3000;
        app.listen(PORT,()=>{
            console.log("Server is started on PORT: ",PORT)
        })
    }catch(err){
        console.log("Server Failed to Start ❌ ",err)
}
}

startServer()
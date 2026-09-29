import "dotenv/config"
import app from "./src/app.js"
import { createServer } from "node:http";
import {Server} from "socket.io"
const startServer = ()=>{
    const ROOM = "ROOM A"
    try{
        const PORT = process.env.PORT || 3000;
        const server = createServer(app)
        const io = new Server(server,
            {
                cors:{
                    origin:"http://localhost:3000",
                    credentials:true
                }
            }
        )
        io.on("connection",(socket)=>{
            console.log("Client connected: ",socket.id)
            socket.join(ROOM)
            socket.on("chatMessages",(msg)=>{
                socket.to(ROOM).emit("chatMessages",msg)
            })
        })
        io.on("disconnect",(socket)=>{
            console.log("Disconnected ",socket.id
            )
        })
        server.listen(PORT,()=>{
            console.log("Server is started on PORT: ",PORT)
        })
    }catch(err){
        console.log("Server Failed to Start ❌ ",err)
}
}

startServer()
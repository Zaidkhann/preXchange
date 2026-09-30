import "dotenv/config"
import app from "./src/app.js"
import { createServer } from "node:http";
import {Server} from "socket.io"
import prisma from "./src/lib/prisma.js";
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

            socket.on("joinConversation", (conversationId) => {
                socket.join(`conversation-${conversationId}`)
            })


            socket.on("sendMessage",async({conversationId,text,userId})=>{
                try{
                    const message = await prisma.message.create({
                        data:{
                            conversationId,
                            text,
                            senderId:userId

                        }
                    })
                    io.to(`conversation-${conversationId}`).emit("newMessage", message)
                }catch(err){
                    console.log("Failed to save message in db")
                    return
                }
            })


            socket.on("disconnect",(socket)=>{
                console.log("Disconnected ",socket.id
                )
            })
        })
        server.listen(PORT,()=>{
            console.log("Server is started on PORT: ",PORT)
        })
    }catch(err){
        console.log("Server Failed to Start ❌ ",err)
}
}

startServer()
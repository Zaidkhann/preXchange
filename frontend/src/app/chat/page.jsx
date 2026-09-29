"use client"
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { connectWs } from '../../ws'
import {SendIcon} from "lucide-react"


function Chat() {
    const [messages,setMessages] = useState([])
    const [text,setText] = useState("")

    const socket = useRef(null)
    const [status,setStatus] = useState(false)
    const [userName, setUsername] = useState("") 
    
    // useEffect(()=>{
    //     socket.current = connectWs()
    //     socket.current.on("connect",(userName)=>{
    //         console.log(`${userName} is online`)
    //         setStatus(true)
    //     })
    //     socket.current.on("chatMessages",(msg)=>{
    //         setMessages(prev => [...prev, msg])
    //         console.log(messages)
    //     })
 

    // },[])
    useEffect(() => {
    socket.current = connectWs()

    socket.current.on("connect", () => {
        console.log(`${userName} is online`)
        setStatus(true)
    })

    socket.current.on("disconnect", () => {
        console.log(`${userName} is offline`)
        setStatus(false)
    })

    socket.current.on("chatMessages", (msg) => {
        setMessages(prev => [...prev, msg])
    })

    return () => {
        socket.current.disconnect()
        socket.current = null
    }
}, [])
   
    const handleSendButton = ()=>{
        if (!text.trim()) return
    const msg = {
        id:Date.now(),
        sender:userName,
        text:text
    }
    setMessages(prev => [...prev, msg])
    socket.current.emit("chatMessages",msg)
    setText("")

    }
    
  return (
    <div className='flex flex-col gap-3'>Chat
        <input
            onChange={(e)=>setUsername(e.target.value)}
            className='p-2 rounded-2xl bg-cyan-100 text-black mt-8'
            placeholder='Username'
      />
            {status&& <h2>{userName} is Online</h2>}
             <div className='mb-8 overflow-y-auto pb-20'> 
    
                {messages.map(msg => (
                    <div key={msg.id}
                        className={`flex ${msg.sender.toLowerCase() === userName.toLowerCase() ? "justify-end" : "justify-start "}`}
                    >
                        <div
            className={`w-fit max-w-[65%] break-words rounded-2xl p-2 m-2 ${
                msg.sender.toLowerCase() === userName.toLowerCase()
                    ? "bg-cyan-200"
                    : "bg-gray-200"
            }`}
        >
                        <strong>{msg.sender}</strong> {msg.text}
                        </div>
                    </div>
                ))}
            </div>
    <div className='flex mt-5 fixed bottom-3 self-center gap-3 '>
    <input
    className='border bg-white text-black p-3 border-gray-100 rounded-xl w-134'
    type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder='Type a message'  />
    <button className='bg-cyan-900 text-white p-2 rounded-xl   ' onClick={handleSendButton} ><SendIcon/></button>
    </div>
    </div>
  )
}
export default Chat
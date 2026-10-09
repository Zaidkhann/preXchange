"use client"

import React, { useEffect, useRef, useState } from "react"
import { connectWs } from "../../../ws"
import { SendIcon, ArrowLeft, MoreVertical } from "lucide-react"
import { getCurrentUser } from "../../../services/me.js"
import { useSearchParams, useParams, useRouter } from "next/navigation.js"
import { getConversationById } from "../../../services/conversation-frontend.js"

function Chat() {
    const [messages, setMessages] = useState([])
    const [text, setText] = useState("")
    const socket = useRef(null)
    const [status, setStatus] = useState(false)
    const [userName, setUsername] = useState("")
    const [userId, setUserId] = useState(null)
    const [typer, setTyper] = useState("")
    const typingTimer = useRef(null)

    const searchParams = useSearchParams()
    const params = useParams()
    const router = useRouter()

    const sellerName = searchParams.get("seller")
    const price = searchParams.get("pr")
    const productId = searchParams.get("prodId")
    const productTitle = searchParams.get("prodTitle")
    const conversationId = Number(params.id)

    useEffect(() => {
        const fetchMessages = async () => {
            const data = await getConversationById(conversationId)

            if (data) {
                setMessages(data.messages)
            }
        }

        fetchMessages()

        socket.current = connectWs()

        const fetchUser = async () => {
            const user = await getCurrentUser()

            setUsername(user?.userName)
            setUserId(Number(user?.id))
        }

        fetchUser()

        socket.current.on("connect", () => {
            setStatus(true)
            socket.current.emit("joinConversation", conversationId)
        })

        socket.current.on("disconnect", () => {
            setStatus(false)
        })

        socket.current.on("newMessage", (msg) => {
            setMessages((prev) => [...prev, msg])
        })

        socket.current.on("typing", (userName) => {
            setTyper(userName)
        })


        socket.current.on("stopTyping", () => {
            setTyper("")
        })


        return () => {
    socket.current?.off("connect")
    socket.current?.off("disconnect")
    socket.current?.off("newMessage")
    socket.current?.off("typing")
    socket.current?.off("stopTyping")

    socket.current?.disconnect()
    socket.current = null
        }
    }, [])

    useEffect(() => {
        if (text) {
            socket.current.emit("typing", {
                conversationId,
                userName
            })
            clearTimeout(typingTimer.current)
        }
        typingTimer.current = setTimeout(() => {
            socket.current.emit("stopTyping", {
                conversationId
            })
        }, 2000)

        return ()=>{
            clearTimeout(typingTimer.current)
        }
    }, [text, conversationId, userName])



    const handleSendButton = () => {
        if (!text.trim()) return

        socket.current.emit("sendMessage", {
            conversationId,
            text,
            userId
        })

        setText("")
    }

    return (
        <div className="flex h-screen w-full flex-col bg-slate-50">

            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 shadow-sm">

                <div className="flex items-center gap-3">

                    <button onClick={() => router.back()} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100">
                        <ArrowLeft size={19} />
                    </button>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 text-sm font-semibold text-cyan-700">
                        {sellerName?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-slate-900">
                            {sellerName} | {productTitle}
                        </h2>

                        <div className="flex items-center gap-1.5">

                            <span
                                className={`h-2 w-2 rounded-full ${status
                                    ? "bg-emerald-500"
                                    : "bg-slate-300"
                                    }`}
                            />

                            <span className="text-xs text-slate-500">
                                {status ? "Online" : "Offline"}
                            </span>

                            {typer && (
                                <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-medium text-cyan-600">
                                    <span className="flex items-center gap-0.5">
                                        <span className="h-1 w-1 animate-bounce rounded-full bg-cyan-500 [animation-delay:-0.3s]" />
                                        <span className="h-1 w-1 animate-bounce rounded-full bg-cyan-500 [animation-delay:-0.15s]" />
                                        <span className="h-1 w-1 animate-bounce rounded-full bg-cyan-500" />
                                    </span>
                                    {typer} is typing
                                </span>
                            )}

                        </div>
                    </div>

                </div>

                <button className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100">
                    <MoreVertical size={19} />
                </button>

            </div>

            <div className="border-b border-slate-200 bg-white px-5 py-3">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                            Product
                        </p>

                        <p className="mt-0.5 text-sm font-medium text-slate-800">
                            Product #{productTitle || productId}
                        </p>
                    </div>

                    {price && (
                        <div className="text-right">
                            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                                Price
                            </p>

                            <p className="mt-0.5 text-sm font-semibold text-cyan-700">
                                ₹{price}
                            </p>
                        </div>
                    )}

                </div>

            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">

                <div className="mx-auto flex max-w-3xl flex-col">

                    <div className="mb-6 flex items-center justify-center">
                        <span className="rounded-full bg-white px-3 py-1 text-[11px] text-slate-400 shadow-sm">
                            Conversation started
                        </span>
                    </div>

                    {messages.map((msg) => {

                        const isMine = msg.senderId === userId

                        return (
                            <div
                                key={msg.id}
                                className={`mb-2 flex ${isMine
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}
                            >

                                <div
                                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-5 shadow-sm sm:max-w-[60%] ${isMine
                                        ? "rounded-br-md bg-cyan-600 text-white"
                                        : "rounded-bl-md border border-slate-200 bg-white text-slate-800"
                                        }`}
                                >
                                    <p className="wrap-break-word">
                                        {msg.text}
                                    </p>

                                    <div
                                        className={`mt-1 text-[10px] ${isMine
                                            ? "text-cyan-100"
                                            : "text-slate-400"
                                            }`}
                                    >
                                        {new Date(
                                            msg.createdAt
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </div>

                                </div>

                            </div>
                        )
                    })}

                </div>

            </div>

            <div className="border-t border-slate-200 bg-white px-4 py-3 sm:px-6">

                <div className="mx-auto flex max-w-3xl items-end gap-3">

                    <div className="flex min-h-[46px] flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-cyan-100">

                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSendButton()
                                }
                            }}
                            placeholder="Write a message..."
                            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                        />

                    </div>

                    <button
                        onClick={handleSendButton}
                        disabled={!text.trim()}
                        className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-cyan-600 text-white shadow-sm transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    >
                        <SendIcon size={19} />
                    </button>

                </div>

                <p className="mx-auto mt-2 max-w-3xl text-[10px] text-slate-400">
                    Press Enter to send
                </p>

            </div>

        </div>
    )
}

export default Chat
"use client"

import React, { useEffect, useState } from "react"
import { getConversationsPanel, postConversation } from "../../services/conversation-frontend"
import { useSearchParams,useRouter } from "next/navigation"
import {
    Search,
    MessageSquare,
    MoreHorizontal,
    Plus,
    ChevronRight
} from "lucide-react"

function ChatPanel() {
    const [chats, setChats] = useState([])
    const [search, setSearch] = useState("")
    const [selectedChat, setSelectedChat] = useState(null)

    const searchParams = useSearchParams()
    const router = useRouter()
    const userId = Number(searchParams.get("uid"))

    useEffect(() => {
        const getChats = async () => {
            try {
                const chats = await getConversationsPanel()
                setChats(chats)
            } catch (error) {
                console.log(error)
            }
        }

        getChats()
    }, [])

    const handleChat = async (chat) => {
        setSelectedChat(chat.id)
    
    // const data = await postConversation(productId)

    // console.log("conversation response:", data)

    router.push(`/conversation/${chat.id}`)
    }


    const filteredChats = chats.filter((chat) => {
        const otherUser =
            chat.sellerId === userId
                ? chat.buyer
                : chat.seller

        return otherUser?.userName
            ?.toLowerCase()
            .includes(search.toLowerCase())
    })

    return (
        <div className="flex h-full min-h-[600px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">

            {/* LEFT INBOX */}
            <div className="flex w-[380px] shrink-0 flex-col border-r border-slate-200">

                {/* Header */}
                <div className="border-b border-slate-200 px-5 py-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">
                                Inbox
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Your conversations
                            </p>
                        </div>

                        <button
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600"
                        >
                            <Plus size={18} />
                        </button>

                    </div>

                    {/* Search */}
                    <div className="relative mt-5">

                        <Search
                            size={17}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search messages"
                            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                        />

                    </div>

                    {/* Filter */}
                    <div className="mt-4 flex items-center gap-5 text-sm">

                        <button className="border-b-2 border-cyan-600 pb-2 font-medium text-cyan-700">
                            All
                        </button>

                        <button className="pb-2 text-slate-500 transition hover:text-slate-800">
                            Unread
                        </button>

                    </div>

                </div>

                {/* Conversations */}
                <div className="flex-1 overflow-y-auto">

                    {filteredChats.length === 0 ? (

                        <div className="flex h-full flex-col items-center justify-center px-8 text-center">

                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                                <MessageSquare
                                    size={23}
                                    className="text-slate-400"
                                />
                            </div>

                            <h3 className="text-sm font-semibold text-slate-800">
                                No conversations
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                Conversations with buyers and sellers will appear here.
                            </p>

                        </div>

                    ) : (

                        filteredChats.map((chat) => {

                            const otherUser =
                                chat.sellerId === userId
                                    ? chat.buyer
                                    : chat.seller

                            const lastMessage =
                                chat.messages?.[0]

                            const isSelected =
                                selectedChat === chat.id

                            return (
                                <button
                                    key={chat.id}
                                    onClick={() => handleChat(chat)}
                                    className={`w-full border-b border-slate-100 px-4 py-4 text-left transition ${
                                        isSelected
                                            ? "bg-cyan-50/70"
                                            : "hover:bg-slate-50"
                                    }`}
                                >

                                    <div className="flex gap-3">

                                        {/* Avatar */}
                                        <div className="relative shrink-0">

                                            {otherUser?.avatar ? (

                                                <img
                                                    src={otherUser.avatar}
                                                    alt={otherUser.userName}
                                                    className="h-11 w-11 rounded-full object-cover"
                                                />

                                            ) : (

                                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                                                    {otherUser?.userName
                                                        ?.charAt(0)
                                                        ?.toUpperCase()}
                                                </div>

                                            )}

                                        </div>

                                        {/* Content */}
                                        <div className="min-w-0 flex-1">

                                            <div className="flex items-center justify-between gap-3">

                                                <h3 className="truncate text-sm font-semibold text-slate-900">
                                                    {otherUser?.userName}
                                                </h3>

                                                <span className="shrink-0 text-[11px] text-slate-400">
                                                    {new Date(
                                                        lastMessage?.createdAt ||
                                                        chat.updatedAt
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "2-digit",
                                                            month: "short"
                                                        }
                                                    )}
                                                </span>

                                            </div>

                                            <div className="mt-1 flex items-center gap-2">

                                                <p className="truncate text-[13px] text-slate-500">
                                                    {lastMessage?.text ||
                                                        "Start a conversation"}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </button>
                            )
                        })

                    )}

                </div>

            </div>

            {/* RIGHT EMPTY / SELECTED AREA */}
            <div className="flex flex-1 flex-col bg-slate-50">

                {selectedChat ? (

                    <div className="flex h-full flex-col">

                        {(() => {

                            const chat = chats.find(
                                (item) => item.id === selectedChat
                            )

                            const otherUser =
                                chat.sellerId === userId
                                    ? chat.buyer
                                    : chat.seller

                            return (
                                <>
                                    {/* Chat Header */}
                                    <div className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-6">

                                        <div className="flex items-center gap-3">

                                            {otherUser?.avatar ? (
                                                <img
                                                    src={otherUser.avatar}
                                                    alt={otherUser.userName}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-600">
                                                    {otherUser?.userName
                                                        ?.charAt(0)
                                                        ?.toUpperCase()}
                                                </div>
                                            )}

                                            <div>
                                                <h2 className="text-sm font-semibold text-slate-900">
                                                    {otherUser?.userName}
                                                </h2>

                                                <p className="text-xs text-slate-500">
                                                    Conversation
                                                </p>
                                            </div>

                                        </div>

                                        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
                                            <MoreHorizontal size={19} />
                                        </button>

                                    </div>

                                    {/* Messages placeholder */}
                                    <div className="flex flex-1 items-center justify-center">

                                        <div className="text-center">

                                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                                                <MessageSquare
                                                    size={23}
                                                    className="text-cyan-600"
                                                />
                                            </div>

                                            <h3 className="text-sm font-semibold text-slate-800">
                                                Your conversation with{" "}
                                                {otherUser?.userName}
                                            </h3>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Select the conversation to continue chatting.
                                            </p>

                                        </div>

                                    </div>
                                </>
                            )
                        })()}

                    </div>

                ) : (

                    /* No conversation selected */
                    <div className="flex h-full flex-col items-center justify-center">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                            <MessageSquare
                                size={27}
                                className="text-cyan-600"
                            />
                        </div>

                        <h2 className="mt-5 text-lg font-semibold text-slate-800">
                            Your messages
                        </h2>

                        <p className="mt-1 max-w-sm text-center text-sm text-slate-500">
                            Select a conversation from your inbox to view your messages.
                        </p>

                    </div>

                )}

            </div>

        </div>
    )
}

export default ChatPanel
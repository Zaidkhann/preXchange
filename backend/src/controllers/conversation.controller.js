import prisma from "../lib/prisma.js"
export const postConversation = async (req, res) => {
    try {

        const buyerId = req.user.userId


        const product = await prisma.product.findUnique({
            where: {
                id: Number(req.body.productId)
            }
        })
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        const sellerId = product.userId;
        const productId = product.id;
        if (buyerId === sellerId) {
            return res.status(400).json({
                message: "You cannot chat with yourself"
            })
        }

        const conversation = await prisma.conversation.upsert({
            where: {
                buyerId_sellerId_productId: {
                    buyerId,
                    sellerId,
                    productId,
                }
            },
            create: {
                buyerId,
                sellerId,
                productId,
            },
            update: {}
        })
        return res.status(200).json(conversation)
    } catch (err) {
        console.log("Failed to update conversation ", err)
        return
    }
}

export const messages = async (req, res) => {
    try {
        const { conversationId, text } = req.body
        if (!conversationId || !text?.trim()) {
            return res.status(400).json({
                message: "conversationId and text are required"
            })
        }

        const message = await prisma.message.create({
            data: {
                text: text.trim(),
                senderId: Number(req.user.userId),
                conversationId: Number(conversationId)


            }
        })
        return res.status(201).json(message)

    } catch (err) {
        console.log("Failed to send message ", err)
        return res.status(500).json({
            message: "Failed to send message"
        })
    }
}

export const getConversation = async (req, res) => {
    try {
        const conversationId = Number(req.params.id)
        const userId = Number(req.user.userId)

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    }
                },
                product: true,
                buyer: true,
                seller: true
            }
        })
        if (!conversation) {
            return res.status(404).json({
                message: "Conversation not found"
            })
        }
        if (
            conversation.buyerId !== userId &&
            conversation.sellerId !== userId
        ) {
            return res.status(403).json({
                message: "You are not part of this conversation"
            })
        }

        return res.status(200).json(conversation)
    } catch (err) {
        console.log("Failed to get conversation", err)

        return res.status(500).json({
            message: "Failed to get conversation"
        })
    }
}


export const getConversationsPanel = async (req, res) => {
    try {
        const userId = Number(req.user.userId)
        const conversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        sellerId: userId
                    },
                    {
                        buyerId: userId
                    }
                ]
            },
            include: {
                buyer: {
                    select: {
                        id: true,
                        userName: true,
                        avatar: true
                    }
                },

                seller: {
                    select: {
                        id: true,
                        userName: true,
                        avatar: true
                    }
                },
                messages:{
                    orderBy:{
                        createdAt:"desc"
                    }
                },
            },
                orderBy: {
                    updatedAt: "desc"
                }
            })
        if (!conversations) {
            return res.status(404).json({
                message: "Conversation not found"
            })
        }
        return res.status(200).json(conversations)
    } catch (err) {
        console.log("Failed to get conversation", err)

        return res.status(500).json({
            message: "Failed to get conversation"
        })
    }

}
import express from "express"
import { getConversation, getConversationsPanel, postConversation } from "../controllers/conversation.controller.js"
import {authMiddleware} from "../middlewares/auth.middleware.js"
const router = express.Router()

router.post("/conversation",authMiddleware,postConversation)
router.get("/conversation/:id",authMiddleware,getConversation)
router.get("/getConversations",authMiddleware,getConversationsPanel)


export default router
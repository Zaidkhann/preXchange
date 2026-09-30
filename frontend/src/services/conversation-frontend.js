const postConversation = async(productId)=>{
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/conversation`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                productId,
             
            })
        })
        if(!res.ok){
            console.log("Failed to post conversation")
            return 
        }
        const data = await res.json()
        return data
        
    }catch(err){
        console.log("Failed to post Conversation Internal error ",err)
        return
    }
}

const getConversationById = async (conversationId) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/conversation/${conversationId}`,
            {
                method: "GET",
                credentials: "include",
            }
        )

        const data = await res.json()

        if (!res.ok) {
            console.log("No conversation found")
            return
        }

        return data
    } catch (err) {
        console.log("Failed to get messages Internal error:", err)
        return
    }
}


const getConversationsPanel = async()=>{
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getConversations`,{
            method:"GET",
            credentials:"include"
        })
        const data = await res.json()
        if(!res.ok){
            console.log("Failed to get conversation panel")
            return
        }
        return data

    }catch(err){
        console.log("Internal error Failed to fetch COnversation Panel ERROR ",err)
        return
    }
}

export {postConversation,getConversationById,getConversationsPanel}


import {io} from "socket.io-client"

export function connectWs(){
return io(`${process.env.NEXT_PUBLIC_API_URL}`)
}
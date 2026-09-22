"use client"
import { handleLogout } from '../../../services/auth.service/handleLogout'
import {useRouter} from "next/navigation"
function page() {
    const router = useRouter()
  return (
    <button onClick={()=>handleLogout(router)}>Logout</button>
  )
}

export default page
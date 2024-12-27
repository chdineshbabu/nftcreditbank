"use client"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

function Page() {
  interface User {
    role: string;
  }
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const { publicKey } = useWallet()
  const pub = publicKey?.toString()
  async function getUser() {
    const user = await axios.get(`/api/users/${pub}`)
    setUser(user.data)
    if(user.data.role === "Admin") {
      router.push("/admin")
    }
    if(user.data.role === "Student") {
      router.push("/student")
    }
  }
  useEffect(() => {
    getUser()
  }, [publicKey])
  console.log(user?.role)
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4">
      <h1 className="text-xl">User Not Found</h1>
      <p>Disconnect, Try another Registered account</p>
      <WalletDisconnectButton onClick={()=>router.push('/')}/>
    </div>
  )
}

export default Page
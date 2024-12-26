"use client"
import { useWallet } from "@solana/wallet-adapter-react"
import axios from "axios"
import { useEffect, useState } from "react"

function Page() {
  const [user, setUser] = useState()
  const { publicKey } = useWallet()
  const pub = publicKey?.toString()
  async function getUser() {
    const user = await axios.get(`/api/users/${pub}`)
    setUser(user.data)
  }
  useEffect(() => {
    getUser()
  }, [publicKey])
  console.log(user)
  return (
    <div>

    </div>
  )
}

export default Page
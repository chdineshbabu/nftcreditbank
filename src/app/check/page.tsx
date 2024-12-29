'use client'

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { AlertCircle, ArrowLeft } from "lucide-react"

function UserPage() {
  interface User {
    role: string
  }

  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const { publicKey } = useWallet()
  const pub = publicKey?.toString()

  async function getUser() {
    if (!pub) return
    try {
      const response = await axios.get(`/api/users/${pub}`)
      setUser(response.data)

      if (response.data.role === "Admin") {
        router.push("/admin")
      } else if (response.data.role === "Student") {
        router.push("/student")
      }
    } catch (error) {
      console.error("User not found or API error:", error)
    }
  }

  useEffect(() => {
    getUser()
  }, [publicKey])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {user ? (
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg">Welcome, {user.role}!</h3>
            <p>You will be redirected shortly.</p>
          </div>
        ) : (
          <div className="flex items-start bg-red-500 text-white p-4 rounded-lg shadow-md mb-6">
            <AlertCircle className="h-6 w-6 mr-4 mt-1" />
            <div>
              <h3 className="font-bold text-lg">User Not Found</h3>
              <p className="text-sm">
                We couldn&apos;t find a user associated with the connected wallet address.
              </p>
            </div>
          </div>
        )}

        <div className="bg-gray-800 p-8 rounded-2xl flex flex-col items-center justify-center shadow-2xl border border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-center">Connect Another Wallet</h1>
          <p className="text-gray-400 mb-6 text-center">
            The wallet you&apos;ve connected doesn&apos;t have an associated account. Try connecting a different wallet.
          </p>
          <WalletDisconnectButton
          className="mt-4 text-cyan-400 hover:text-cyan-300 flex items-center justify-center"
          onClick={() => router.push("/")}
        />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 text-center flex flex-col items-center"
      >
        <p className="text-gray-400">
          If you believe this is an error, please contact our support team.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-4 text-cyan-400 hover:text-cyan-300 flex items-center justify-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </button>
      </motion.div>
    </div>
  )
}

export default UserPage

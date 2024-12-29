'use client'
import { WalletDisconnectButton } from '@solana/wallet-adapter-react-ui'
import { useRouter } from 'next/navigation'
import React from 'react'

function AdminNav() {
  const router = useRouter()

  return (
    <div className="flex justify-between items-center py-8 px-6 ">
      <div>
        <h1 className="text-3xl font-thin text-white">
          NFTCreditBank
        </h1>
      </div>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => router.push('/addStudent')}
          className="py-2 px-6 rounded-lg text-white font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 transition-all shadow-md"
        >
          Add Student
        </button>
        <button
          onClick={() => router.push('/addCourse')}
          className="py-2 px-6 rounded-lg text-white font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 transition-all shadow-md"
        >
          Add Course
        </button>
        <WalletDisconnectButton onClick={()=>{
            localStorage.removeItem('wallet')
            router.push('/')
        }} className="text-cyan-400 hover:text-cyan-300 hover:scale-105 transition-all" />
      </div>
    </div>
  )
}

export default AdminNav

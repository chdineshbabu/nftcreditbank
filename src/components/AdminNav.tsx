"use client"
import { WalletDisconnectButton } from '@solana/wallet-adapter-react-ui'
import { useRouter } from 'next/navigation'
import React from 'react'

function AdminNav() {
    const router = useRouter()
  return (
    <div className='flex justify-between items-center py-8'>
        <div>
            <h1 className='text-3xl font-bold font-serif'>
                NftCreditBank
            </h1>
        </div>
        <div className='flex gap-4'>
            <button onClick={()=> router.push('/addStudent')} className='border rounded-md py-2 px-4 hover:bg-gray-200 hover:text-black transition-all delay-75'>Add Student</button>
            <button onClick={()=> router.push('/addCourse')}className='border rounded-md py-2 px-4 hover:bg-gray-200 hover:text-black transition-all delay-75'>Add course</button>
            <WalletDisconnectButton onClick={()=>router.push('/')}/>
        </div>
    </div>
  )
}

export default AdminNav
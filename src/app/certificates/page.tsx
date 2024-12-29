"use client"
import Certificate from '@/src/components/Cerificate'
import { useWallet } from '@solana/wallet-adapter-react'
import axios from 'axios'
import {  ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Page() {
  const [user, setUser] = useState<{ name: string } | null>(null)
  const {wallet} = useWallet();
    const router = useRouter()
    async function getUser(){
        const res = await axios.get(`/api/users/${wallet?.adapter.publicKey?.toString()}`)
        setUser(res.data)
        console.log(res.data)
    }
    useEffect(()=>{
        getUser()
    },[])
  return (
    <div className='p-8 flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'> 
        <Certificate 
            studentName={user?.name || 'Unknown Student'}
            courseName="Bachelor of Technology" 
            description="Computer Science and Engineering" 
            issueDate="2024-10-01" 
            certificateId='vtu154215811'
        />
        <button onClick={()=>router.push("/student")} className='absolute top-8 left-8 flex items-center gap-2 p-4 bg-white rounded-full shadow-lg text-purple-900 hover:scale-110 hover:border hover:text-white hover:bg-purple-900 transition-all duration-75'>
            <ArrowLeft /> Back
        </button>
    </div>
  )
}

export default Page
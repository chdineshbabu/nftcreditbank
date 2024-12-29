"use client"
import { StudentForm } from '@/src/components/StudentForm'
import { useWallet } from '@solana/wallet-adapter-react'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Page() {
    interface UserData {
        role: string;
    }
    const router = useRouter()
    const [data, setData] = useState<UserData | null>(null)
    const {publicKey} = useWallet()
    const pub = publicKey?.toString()
    useEffect(() => {
        async function check(){
            const data = await axios.get(`/api/users/${pub}`)
            setData(data.data)
        }
        check()
    }, [pub])
  return (
    <div className='h-screen flex  items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'>
        {data && data.role === "Admin" ? <StudentForm /> : <h1>You are not an Admin</h1>}
        <button onClick={()=>router.push("/admin")} className='absolute top-8 left-8 flex items-center gap-2 p-4 bg-white rounded-full shadow-lg text-purple-900 hover:scale-110 hover:border hover:text-white hover:bg-purple-900 transition-all duration-75'>
            <ArrowLeft /> Back
        </button>
    </div>
  )
}

export default Page
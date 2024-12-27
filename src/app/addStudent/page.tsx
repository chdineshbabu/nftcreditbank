"use client"
import { StudentForm } from '@/src/components/StudentForm'
import { useWallet } from '@solana/wallet-adapter-react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Page() {
    interface UserData {
        role: string;
    }

    const [data, setData] = useState<UserData | null>(null)
    const {publicKey} = useWallet()
    const pub = publicKey?.toString()
    async function check(){
        const data = await axios.get(`/api/users/${pub}`)
        setData(data.data)
    }
    useEffect(() => {
        check()
    }, [publicKey])
  return (
    <div className='h-screen flex  items-center justify-center'>
        {data && data.role === "Admin" ? <StudentForm /> : <h1>You are not an Admin</h1>}
    </div>
  )
}

export default Page
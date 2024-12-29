import { CourseForm } from '@/src/components/CourseForm'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function Page() {
  const router = useRouter()
  return (
    <div className='h-screen flex  items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'>
        <CourseForm />
        <button onClick={()=>router.push("/admin")} className='absolute top-8 left-8 flex items-center gap-2 p-4 bg-white rounded-full shadow-lg text-purple-900 hover:scale-110 hover:border hover:text-white hover:bg-purple-900 transition-all duration-75'>
            <ArrowLeft /> Back
        </button>
    </div>
    
  )
}

export default Page
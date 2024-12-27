'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function StudentForm() {
    const router = useRouter()
  const [formData, setFormData] = useState({
    walletAddress: '',
    name: '',
    email: '',
    role:"Student"
  })
  const [isLoading, setIsLoading] = useState(false)

interface FormData {
    walletAddress: string
    name: string
    email: string
    role:string
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prevData: FormData) => ({ ...prevData, [name]: value }))
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsLoading(true)
    const data = await axios.post('/api/admin/student', formData)
    if (data.data) {
        alert("Student Added Successfully")
    } else {
        alert("Error Adding Student")
    }
    setIsLoading(false)
    setFormData({
        walletAddress: '',
        name: '',
        email: '',
        role:"Student"
    })
    router.push("/admin")

}

  return (
    <div className=" p-12 w-96 border shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Add Student</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="walletAddress">
            Wallet Address
          </label>
          <input
            id="walletAddress"
            name="walletAddress"
            type="text"
            value={formData.walletAddress}
            onChange={handleChange}
            placeholder="0x..."
            className="w-full text-gray-800 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder=""
            className="w-full px-3 text-gray-800 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=""
            className="w-full px-3 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 text-white font-semibold rounded-md ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Adding...' : 'Add Student'}
        </button>
      </form>
    </div>
  )
}

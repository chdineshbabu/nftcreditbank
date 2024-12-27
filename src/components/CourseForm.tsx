'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function CourseForm() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        courseName: '',
        courseDescription: '',
        credits: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setIsLoading(true)
        const data = await axios.post('/api/admin/course', formData)
        if (data.data) {
            alert("Course Added Successfully")
        } else {
            alert("Error Adding Course")
        }
        setIsLoading(false)
        setFormData({
            courseName: '',
            courseDescription: '',
            credits: ''
        })
        router.push("/admin")
    }

    return (
        <div className="p-12 w-96 border shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Add Course</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="courseName">
                        Course Name
                    </label>
                    <input
                        id="courseName"
                        name="courseName"
                        type="text"
                        value={formData.courseName}
                        onChange={handleChange}
                        placeholder="Course Name"
                        className="w-full text-gray-800 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="courseDescription">
                        Course Description
                    </label>
                    <input
                        id="courseDescription"
                        name="courseDescription"
                        type="text"
                        value={formData.courseDescription}
                        onChange={handleChange}
                        placeholder="Course Description"
                        className="w-full px-3 text-gray-800 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="credits">
                        Credits
                    </label>
                    <input
                        id="credits"
                        name="credits"
                        type="text"
                        value={formData.credits}
                        onChange={handleChange}
                        placeholder="Credits"
                        className="w-full px-3 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full px-4 py-2 text-white font-semibold rounded-md ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                >
                    {isLoading ? 'Adding...' : 'Add Course'}
                </button>
            </form>
        </div>
    )
}
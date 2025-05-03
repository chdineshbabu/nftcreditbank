"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Course {
  _id: string; 
  courseName: string;
}

function CourseList() {
    const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]); 

  async function getCourses() {
    try {
      const res = await axios.get("/api/course");
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

  useEffect(() => {
    getCourses();
  }, []);

  return (
<div className="w-full max-w-md h-96 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-xl p-6 shadow-lg overflow-y-scroll border border-gray-700">
  <h1 className="text-2xl font-bold text-white mb-4">Courses</h1>
  <ul className="divide-y divide-gray-600">
    {courses.length === 0 ? (
      <li className="text-gray-400 text-center py-4"></li>
    ) : (
      courses.map((course) => (
        <li
          key={course._id}
          onClick={() => router.push(`/course/${course._id}`)}
          className="text-white py-2 px-4 rounded-lg hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-black transition-all cursor-pointer shadow-md mb-2"
        >
          {course?.courseName}
        </li>
      ))
    )}
  </ul>
</div>

  );
}

export default CourseList;

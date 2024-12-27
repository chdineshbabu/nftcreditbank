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
  console.log(courses);

  return (
    <div className="border px-8 py-6 rounded-md w-1/3 h-96 overflow-y-scroll shadow-md">
      <h1 className="text-xl pb-2 font-bold">Courses</h1>
      <ul className=" border-gray-500">
        {courses.length === 0 ? (
          <li>Loading...</li>
        ) : (
          courses.map((course) => (
            <li key={course._id} onClick={()=>router.push(`/course/${course._id}`)} className="text-md border-b p-2 rounded-sm hover:scale-105 transition-all delay-75">
              {course?.courseName}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default CourseList;

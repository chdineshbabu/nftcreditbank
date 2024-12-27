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
      const res = await axios.get("/api/issue");
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
    <div className="border text-gray-300 px-8 py-6 rounded-md w-full h-96 overflow-y-scroll shadow-md">
      <h1 className="text-xl pb-2 font-bold">Pending Approvel&apos;s</h1>
      <ul className=" border-gray-500">
        {courses.length === 0 ? (
          <li>Loading...</li>
        ) : (
          courses.map((course) => (
            <li
              key={course._id}
              onClick={() => router.push(`/course/${course._id}`)}
              className="text-md border-b p-2 rounded-sm hover:scale-105 transition-all delay-75 flex justify-between items-center"
            >
                <div className="flex gap-3">
              <p>{course?.name}</p>
              <p>{course?.courseName}</p>
              <p>{course?.credits} Credits</p>
              </div>
              <button className="border p-1 px-3 rounded-md hover:bg-gray-200 hover:text-gray-900">
                Approve Nft
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default CourseList;

"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const { id } = useParams() as { id: string };
  const [data, setData] = useState<{ courseName?: string; courseDescription?: string; credits?: number } | null>(null);
  const [student, setStudent] = useState<{ _id: string; name: string; email: string }[]>([]);

  async function getCourse() {
    try {
      const res = await axios.get(`/api/course/${id}`);
      setData(res.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  }
  async function getStudent() {
    try {
      const res = await axios.get(`/api/users`);
      setStudent(res.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  }
  async function issueCredits(studentId: string) {
      try {
        const res = await axios.post(`/api/issue`, {
          studentId: studentId,
          courseId: id,
        });
        console.log(res.data);
      } catch (error) {
        console.error("Error issuing credits:", error);
      }
    }
  useEffect(() => {
    getCourse();
    getStudent();
  }, []);
  console.log(student);
  console.log(data);
  return (
    <div className="mx-96 my-12">
      <div>
      <h1 className="text-3xl pb-2 font-serif text-gray-200">{data?.courseName ?? "Course Name"}</h1>
      <p className="text-sm font-thin italic text-gray-400">{data?.courseDescription}</p>
      <p className="text-sm font-thin italic text-gray-400">Credits: {data?.credits}</p>
      </div>
      <div className="border my-4">
        <h1 className="text-2xl font-serif text-gray-200 p-4">Students</h1>
        <div className="flex flex-col">
          {student.map((student) => (
            <div key={student._id} className="border p-2 flex justify-between items-center">
              <div className="flex gap-4">
              <p className="text-gray-200">{student?.name}</p>
              </div>
              <div>
                <button onClick={() => issueCredits(student._id)} className="px-4 py-2 border rounded-md hover:bg-gray-200 hover:text-gray-800">
                  Issue Credits
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;

"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const { id } = useParams() as { id: string };
  const [data, setData] = useState<{ courseName?: string; courseDescription?: string; credits?: number } | null>(null);
  const [student, setStudent] = useState<{ _id: string; walletAddress: string; name: string; email: string; role: string }[]>([]);
  const [issues, setIssues] = useState<{ _id: string; walletAddress: string; name: string; courseName: string; email: number; status: string }[]>([]);

  const filteredStudents = student.filter(
    (studentItem) =>
      studentItem.role !== "Admin" &&
      !issues.some(
        (issue) =>
          issue.walletAddress === studentItem.walletAddress &&
          issue.courseName === data?.courseName
      )
  );

  async function getCourse() {
    try {
      const res = await axios.get(`/api/course/${id}`);
      setData(res.data);
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

  async function getIssues() {
    try {
      const res = await axios.get(`/api/issue/`);
      setIssues(res.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  }

  async function issueCredits(studentId: string) {
    try {
      await axios.post(`/api/issue`, {
        studentId: studentId,
        courseId: id,
      });
      alert("Credits issued successfully!");
      // Refresh issues after issuing credits
      getIssues();
    } catch (error) {
      console.error("Error issuing credits:", error);
    }
  }

  useEffect(() => {
    getCourse();
    getStudent();
    getIssues();
  }, []);

  return (
    <div className="max-w-4xl max-h-screen mx-auto my-12 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 text-gray-300">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white font-serif pb-2">
          {data?.courseName ?? "Course Name"}
        </h1>
        <p className="text-sm italic text-gray-400">{data?.courseDescription ?? "No description available"}</p>
        <p className="text-sm italic text-gray-400">Credits: {data?.credits ?? 0}</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-inner border border-gray-600">
        <h1 className="text-2xl font-bold text-white font-serif pb-4">Students</h1>
        <div className="flex flex-col space-y-4">
          {filteredStudents.length === 0 ? (
            <p className="text-gray-400">No eligible students available for this course.</p>
          ) : (
            filteredStudents.map((student) => (
              <div
                key={student._id}
                className="flex justify-between items-center bg-gray-700 hover:bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg transition-all"
              >
                <div className="flex gap-4 items-center">
                  <p className="text-white font-medium">{student?.name ?? "Unknown Student"}</p>
                </div>
                <button
                  onClick={() => issueCredits(student._id)}
                  className="text-sm font-medium bg-gray-800 border border-cyan-500 hover:bg-cyan-500 hover:text-black text-cyan-400 px-4 py-2 rounded-lg transition-all"
                >
                  Issue Credits
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;

"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Course = {
  id: string;
  courseName: string;
  credits: number;
  status: string;
};

function Page() {
  const { publicKey } = useWallet();
  const pub = publicKey?.toString();
  const [user, setUser] = useState();
  const [sub, setSub] = useState<Course[]>([]);
  async function getUser() {
    const user = await axios.get(`/api/users/${pub}`);
    setUser(user.data);
  }
  async function getSubjects() {
    const subjects = await axios.get(`/api/issue/${pub}`);
    setSub(subjects.data);
  }
  useEffect(() => {
    getUser();
    getSubjects();
  }, [publicKey]);
  console.log(sub);
  return (
    <div className="mx-96 my-16">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-serif">Welcome, {user?.name} 👋</h1>
        <WalletDisconnectButton />
      </div>
      <div className="py-12 flex justify-between gap-4">
        <div className="border w-full rounded-md p-4 flex items-center  gap-2 text-sm font-thin shadow-md">
          Subjects<br/> Enrolled<span className="text-5xl">0</span>
        </div>
        <div className="border w-full rounded-md p-4 flex items-center gap-2 text-sm font-thin shadow-md">
          Subjects<br/> Completed<span className="text-5xl">0</span>
        </div>
        <div className="border w-full rounded-md p-4 flex items-center gap-2 text-sm font-thin shadow-md">
          Get<br/> Certificate<span className="text-5xl">0/164</span>
        </div>
        <div className="w-full rounded-md flex flex-col items-center gap-2 text-sm font-thin shadow-md">
          <button className="border p-2 rounded-md hover:bg-gray-200 w-full hover:text-gray-800">Redeem Certificate</button>
          <button className="border p-2 rounded-md hover:bg-gray-200 w-full hover:text-gray-800">Get Certificate</button>
        </div>
      </div>
      <div className="border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className=" text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Course Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Credits
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {sub?.map((course: Course) => (
              <tr key={course.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{course.courseName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{course.credits}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{course.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;

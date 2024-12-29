import AdminHeader from "@/src/components/AdminHeader";
import AdminNav from "@/src/components/AdminNav";
import Approve from "@/src/components/Approve";
import CourseList from "@/src/components/CourseList";
import React from "react";

function Page() {
  return (
    <div className="px-36 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white min-h-screen">
      <AdminNav />
      <AdminHeader />
      <div className="flex justify-around">
      <CourseList />
      <Approve />
      </div>
    </div>
  );
}

export default Page;

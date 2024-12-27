import AdminNav from "@/src/components/AdminNav";
import Approve from "@/src/components/Approve";
import CourseList from "@/src/components/CourseList";
import React from "react";

function Page() {
  return (
    <div className="px-36">
      <AdminNav />
      <div className="flex gap-8">
      <CourseList />
      <Approve />
      </div>
    </div>
  );
}

export default Page;

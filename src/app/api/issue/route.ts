import connectMongoDB from "@/src/libs/mongo";
import Course from "@/src/models/course.model";
import Issue from "@/src/models/issue.model";
import User from "@/src/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {studentId, courseId} = await req.json();
    try{
        connectMongoDB();
        const student = await User.findById(studentId);
        const course = await Course.findById(courseId);
        const issue = new Issue({
            name: student?.name,
            walletAddress: student?.walletAddress,
            courseName: course?.courseName,
            credits: course?.credits,
            email: student?.email,
            status: "Issue"
        })
        const resp = await issue.save();
        return NextResponse.json({resp});
    }catch(error){
        console.error("Error issuing credits:", error);
    }
}
export async function GET(){
    try{
        connectMongoDB();
        const issues = await Issue.find({status: "Issue"});
        return NextResponse.json(issues);
    }catch(error){
        console.error("Error fetching issues:", error);
    }
}
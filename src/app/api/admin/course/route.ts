import connectMongoDB from "@/src/libs/mongo"
import { NextResponse } from "next/server";
import Course from "@/src/models/course.model";

export async function POST(req:Request){
    const { courseName, courseDescription, credits } = await req.json()
    const course = new Course({
        courseName,
        courseDescription,
        credits
    })
    try{
        connectMongoDB()
        const savedCourse = await course.save();
        return NextResponse.json({ savedCourse })
    } catch (error) {
        return NextResponse.json({ error},{ status: 500 });
    }

}
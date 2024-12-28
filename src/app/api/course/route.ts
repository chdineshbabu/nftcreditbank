import connectMongoDB from "@/src/libs/mongo";
import Course from "@/src/models/course.model";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        connectMongoDB()
        const course = await Course.find();
        return NextResponse.json(course);
    }catch(err){
        console.log(err);
    }
}
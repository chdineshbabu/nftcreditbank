import connectMongoDB from "@/src/libs/mongo";
import Course from "@/src/models/course.model";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    connectMongoDB();
    const course = await Course.findById(id);
    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json(error);
  }
}

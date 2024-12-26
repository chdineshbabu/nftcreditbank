import connectMongoDB from "@/src/libs/mongo"
import User from "@/src/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req:Request, res:Response){
    const {walletAddress, name, email, role} = await req.json()
    try{
        connectMongoDB();
        const student =new User({
            walletAddress,
            name,
            email,
            role
        });
        await student.save();
        return NextResponse.json({ message: "New student added", student: student })
    }catch(e){
        console.log(e)
    }
}
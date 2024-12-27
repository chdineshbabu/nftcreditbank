import connectMongoDB from "@/src/libs/mongo";
import User from "@/src/models/user.model";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        connectMongoDB();
        const users = await User.find();
        return NextResponse.json(users);
    }catch(e){
        console.log(e);
    } 
}
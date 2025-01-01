import { NextResponse } from "next/server";
import connectMongoDB from "@/src/libs/mongo";
import Issue from "@/src/models/issue.model";

export async  function GET(req: Request, { params }: { params: Promise<{ walletAddress: string }> }){
    const {walletAddress} = await params;
    try{
        connectMongoDB();
        const user = await Issue.find({walletAddress});
        if(!user){return NextResponse.json({message: "User not found"}, {status: 404});}
        return NextResponse.json(user);
    }catch(err){
        console.log(err);
    }
    
}

export async function PUT(req:Request, { params }: { params: Promise<{ walletAddress: string }> }){
    const {walletAddress} = await params;
    const {status} = await req.json();
    try{
        connectMongoDB();
        const user = await Issue.findOneAndUpdate({walletAddress}, {status}, {new: true});
        if(!user){return NextResponse.json({message: "User not found"}, {status: 404});}
        return NextResponse.json(user);
    }catch(err){
        console.log(err);
    }
}
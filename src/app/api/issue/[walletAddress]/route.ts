import { NextResponse } from "next/server";
import connectMongoDB from "@/src/libs/mongo";
import Issue from "@/src/models/issue.model";

export async  function GET(req: Request, { params }: { params: { walletAddress: string } }){
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
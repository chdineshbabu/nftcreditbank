import { NextResponse } from "next/server";
import User from "@/src/models/user.model";
import connectMongoDB from "@/src/libs/mongo";

export async  function GET(req: Request, { params }: { params: { walletAddress: string } }){
    const {walletAddress} = await params;
    try{
        connectMongoDB();
        const user = await User.findOne({walletAddress});
        if(!user){return NextResponse.json({message: "User not found"}, {status: 404});}
        return NextResponse.json(user);
    }catch(err){
        console.log(err);
    }
    
}
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { Address } from "@/models/address";

export async function GET(request){
    console.log("Still no problem")
    await mongooseConnect();
    const {user} = await getServerSession(authOptions);
    const address = await Address.findOne({userEmail:user.email});
    return NextResponse.json(address);
};


export async function PUT(request){
    const data = await request.json();
    await mongooseConnect();
    const {user} = await getServerSession(authOptions);
    const address = await Address.findOne({userEmail:user.email});
    if(address){
        return NextResponse.json(await Address.findByIdAndUpdate(address._id, data));
        
    } else {
        return NextResponse.json(await Address.create({userEmail:user.email, ...data}));
    }
};


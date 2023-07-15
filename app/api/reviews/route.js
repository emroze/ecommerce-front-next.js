import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/review";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request){
    await mongooseConnect();
    const data = await request.json();
    const session = await getServerSession(authOptions);
    const {title,description,stars,product} = data;
    if(session){
        return NextResponse.json(await Review.create({title,description,stars,product}));
    }
    return NextResponse.json('unauthorized access',{status:401 });
}

export async function GET(request){
    await mongooseConnect();
    // const data = await request.json();
    const product = request.nextUrl.searchParams.get('product');
    return NextResponse.json(await Review.find({product:product},null,{sort:{createdAt:-1}}));
}
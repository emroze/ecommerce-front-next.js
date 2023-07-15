import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/review";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request){
    await mongooseConnect();
    const data = await request.json();
    const session = await getServerSession(authOptions);
    const email = session?.user.email;
    const {title,description,stars,product} = data;
    if(session){
        return NextResponse.json(await Review.create({title,description,stars,email,product}));
    }
    return NextResponse.json('unauthorized access',{status:401 });
}

export async function GET(request){
    await mongooseConnect();
    // const data = await request.json();
    const product_id = request.nextUrl.searchParams.get('product');
    const data = await Review.find({product:product_id},null,{sort:{createdAt:-1}})
    const return_data = data.map(review=>{
        const {title,description,stars,email,product,createdAt} = review;
        return{email:email.slice(0,3),title,description,stars,product,createdAt}
    })
    return NextResponse.json(return_data);
}
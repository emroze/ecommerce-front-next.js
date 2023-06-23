import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(request){
    await mongooseConnect();
    const data = await request.json();
    const {ids} = data;
    return NextResponse.json(await Product.find({_id:ids}));
}
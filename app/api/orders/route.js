import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/models/order";

export async function GET(request){
    await mongooseConnect();
    const session = await getServerSession(authOptions);
    return NextResponse.json(
        await Order.find({userEmail:session?.user?.email})
    )
}
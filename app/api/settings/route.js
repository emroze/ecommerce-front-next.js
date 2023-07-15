import { mongooseConnect } from "@/lib/mongoose";
import { Setting } from "@/models/setting";
import { NextResponse } from "next/server";

export async function GET(request){
    await mongooseConnect();
    const allSearchParams = {};
    for (const [key,value] of request.nextUrl.searchParams.entries()){
        allSearchParams[key] = value
    }
    const {name} = allSearchParams;
    return NextResponse.json(await Setting.findOne({name}));
}
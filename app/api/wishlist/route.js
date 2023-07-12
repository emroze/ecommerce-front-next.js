import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { WishedProduct } from "@/models/wishedProduct";

export async function GET(request){
    await mongooseConnect();   
    const allSearchParams = {};
    for (const [key, value] of request.nextUrl.searchParams.entries()) {       
        allSearchParams[key] = value
    }
    const {product} = allSearchParams;
    if(product){
        const session = await getServerSession(authOptions);
        const wishedProducts = await WishedProduct.find({
            userEmail: session?.user.email,
        }).populate('product');
        
        return NextResponse.json(wishedProducts.map(wp => wp.product));
    }

    const session = await getServerSession(authOptions);
    const wishedProducts = await WishedProduct.find({
        userEmail: session?.user.email,
    })
    const productList = wishedProducts?.map(i=>i.product.toString());
    return NextResponse.json(productList);
}

export async function POST(request){
    await mongooseConnect();
    const {product} = await request.json();
    const session = await getServerSession(authOptions);
    const wishedDoc = await WishedProduct.findOne({
        userEmail:session?.user.email,
        product,
    });
    if(wishedDoc){
        await WishedProduct.findByIdAndDelete(wishedDoc._id);
        return NextResponse.json("deleted");
    } else {
        await WishedProduct.create({
            userEmail:session?.user.email,
            product,
        })
        return NextResponse.json("created")
    }
    

}
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(request){
    await mongooseConnect();
    const allSearchParams = {};
    for (const [key, value] of request.nextUrl.searchParams.entries()) {       
        allSearchParams[key] = value
    }
    const {categories,sort, ...filters} = allSearchParams
    const [sortField,sortOrder] = sort.split('-')
    const productsQuery = {
        category: categories.split(','),
    }
    if(Object.keys(filters).length>0){
        Object.keys(filters).forEach(filterName => {
            productsQuery['properties.'+filterName] = filters[filterName];
        });
    }

    return NextResponse.json(await Product.find(
        productsQuery,
        null,
        {sort:{[sortField]:sortOrder==='asc' ? 1 : -1}},
    ))
}
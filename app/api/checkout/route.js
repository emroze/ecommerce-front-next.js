import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/order";
import { Product } from "@/models/product";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Setting } from "@/models/setting";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(request){
    await mongooseConnect();
    const data = await request.json();
    const {name, email, city, postalCode, streetAddress, country, productIds} = data;
    const uniqueIds = [...new Set(productIds)];
    const productInfos = await Product.find({_id:uniqueIds})
    
    let line_items = []
    for (const productId of uniqueIds){
        const productInfo = productInfos.find(p => p._id.toString() === productId);
        const quantity = productIds.filter(id => id===productId)?.length || 0;
        if(quantity>0 && productInfo){
            line_items.push({
                quantity,
                price_data:{
                    currency: 'USD',
                    product_data: {name:productInfo.title},
                    unit_amount: productInfo.price * 100,
                }
            })
        }
    }

    const session = await getServerSession(authOptions);

    const shippingFeeSetting = await Setting.findOne({name:'shippingFee'});
    const shippingFeeCents = parseInt(shippingFeeSetting.value || '0')*100

    const orderDoc = await Order.create({
        line_items,
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        paid:false,
        userEmail:session?.user?.email,
    })
    
    const stripeSession = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/cart?success=1',
        cancel_url: process.env.PUBLIC_URL + '/cart?cancel=1',
        metadata: {orderId:orderDoc._id.toString(),test:'ok'},
        allow_promotion_codes: true,
        shipping_options: [
            {
                shipping_rate_data:{
                    display_name: 'shipping fee',
                    type: 'fixed_amount',
                    fixed_amount:{amount: shippingFeeCents, currency:'USD'},
                },
            }
        ]
    })
    
    return NextResponse.json({
        url:stripeSession.url,
    })
}
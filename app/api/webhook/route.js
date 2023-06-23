import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/order";
import { headers } from 'next/headers'
const stripe = require('stripe')(process.env.STRIPE_SK);

import { NextResponse } from "next/server";
const endpointSecret = "whsec_c1a60cbf062d914eefd14618e44e11cac9c4cc5f3cf7211dd4630f44ba2feb31";

export async function POST(request){
    await mongooseConnect();
    const body = await request.text();
    const headersList = headers();
    const sig = headersList.get('stripe-signature');
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      return NextResponse.json(`Webhook Error: ${err.message}`,{ status:400});
    }
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        // Then define and call a function to handle the event payment_intent.succeeded
        const data = event.data.object;
        const orderId = data.metadata.orderId
        const paid = data.payment_status === 'paid';
        if(orderId && paid){
            await Order.findByIdAndUpdate(orderId,{
                paid:true,
            })
        }
        break;
      // ... handle other event types
      default:
        // console.log(`Unhandled event type ${event.type}`);
        console.log("Not important event")
    }
    NextResponse.json("Ok",{status:200})
}

// bravo-bliss-strong-joyful
// acct_1NM5sjGBA3cgIHWy
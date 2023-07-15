import { Schema, model, models } from "mongoose";

const reviewSchema = new Schema({
    title:String,
    description:String,
    stars: Number,
    email: String,
    product: {type:Schema.Types.ObjectId},
},{timestamps:true})

export const Review = models?.Review || model('Review',reviewSchema);
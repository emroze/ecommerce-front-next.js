'use server'
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export async function getProduct(){
    const featuredProductId = '64913c54248c4894b430a17d';
    await mongooseConnect();
    const featuredProduct = await Product.findById(featuredProductId);
    const newProducts = await Product.find({}, null, {sort: {'_id':-1}});
    return {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    }
  }
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


export async function getAllProduct(){
    await mongooseConnect();
    const products = await Product.find({},null,{sort:{'_id':-1}})
    return {products: JSON.parse(JSON.stringify(products)),}
}


export async function getSingleProduct(id){
    await mongooseConnect();
    const product = await Product.findById(id)
  return {product:JSON.parse(JSON.stringify(product))}
}
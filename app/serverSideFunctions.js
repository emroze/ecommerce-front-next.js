"use server";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { Product } from "@/models/product";

export async function getProduct() {
  const featuredProductId = "64913c54248c4894b430a17d";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
    newProducts: JSON.parse(JSON.stringify(newProducts)),
  };
}

export async function getAllProduct() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return { products: JSON.parse(JSON.stringify(products)) };
}

export async function getSingleProduct(id) {
  await mongooseConnect();
  const product = await Product.findById(id);
  return { product: JSON.parse(JSON.stringify(product)) };
}

export async function getCategories() {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);

  const categoriesProducts = {};
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map(c => c._id.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 3,
      sort: { _id: -1 },
    });
    categoriesProducts[mainCat._id] = products;
  }

  return {
    mainCategories: JSON.parse(JSON.stringify(mainCategories)),
    categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
  };
}


export async function getSingleCategory(id){
  await mongooseConnect();
  const category = await Category.findById(id);
  const subCategories = await Category.find({parent:category._id});
  const catIds = [category._id, ...subCategories.map(c => c._id)];
  const products = await Product.find({category:catIds});
  return{
    category: JSON.parse(JSON.stringify(category)),
    subCategories: JSON.parse(JSON.stringify(subCategories)),
    products: JSON.parse(JSON.stringify(products)),
  };
}
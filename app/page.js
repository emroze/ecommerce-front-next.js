"use client"
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import {getProduct} from './serverSideFunctions'
import { useEffect, useState } from "react";
import NewProducts from "@/components/NewProducts";


export default function Home() {
  // const product = await getData();
  // console.log(product)
  const [featuredProduct,setFeaturedProduct] = useState({});
  const [newProducts,setNewProducts] = useState({});
  useEffect(()=>{
    getProduct().then(result =>{
      setFeaturedProduct(result.featuredProduct);
      setNewProducts(result.newProducts);
    }   
    )
  },[])

  return (
    <div>
      
        <Header/>
        <Featured product={featuredProduct}/>
        <NewProducts products={newProducts}/>
     
    </div>
  )
}



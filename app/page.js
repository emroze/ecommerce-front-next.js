"use client"
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { createGlobalStyle } from "styled-components"
import {getProduct} from './getProduct'
import { useEffect, useState } from "react";
import NewProducts from "@/components/NewProducts";
import { CustomFont } from "@/components/fonts/CustomFont";




const GlobalStyle = createGlobalStyle`
  body{
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: ${CustomFont.className}, sans-serif;
  }
`;

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
    <div className={CustomFont.className}>
      <GlobalStyle/>
      <Header/>
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts}/>
    </div>
  )
}



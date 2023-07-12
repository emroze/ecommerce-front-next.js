"use client"
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import {getProduct} from './serverSideFunctions'
import { useEffect, useState } from "react";
import NewProducts from "@/components/NewProducts";
import axios from "axios";


export default function Home() {
  const [featuredProduct,setFeaturedProduct] = useState({});
  const [newProducts,setNewProducts] = useState({});
  const [wishedProducts,setWishedProducts] = useState([]);
  useEffect(()=>{
    axios.get('/api/wishlist').then(response =>{
      setWishedProducts(response.data);

      getProduct().then(result =>{ //this part is inside cause we need to update wished products first
        setFeaturedProduct(result.featuredProduct);
        setNewProducts(result.newProducts);
      }   

      );
    });
    
    
  },[])


  return (
    <div>
      
        <Header/>
        <Featured product={featuredProduct}/>
        <NewProducts products={newProducts} wishedProducts={wishedProducts}/>
     
    </div>
  )
}



"use client"
import Center from "@/components/Center";
import Header from "@/components/Header";
import { styled } from "styled-components";
import { getAllProduct } from "../serverSideFunctions";
import { useEffect, useState } from "react";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import axios from "axios";

export default function ProductsPage(){
    const [wishedProducts,setWishedProducts] = useState([]);
    const [products,setProducts] = useState({});
    useEffect(()=>{
        axios.get('/api/wishlist').then(response =>{
            setWishedProducts(response.data);

            getAllProduct().then(result =>{//this part is inside cause we need to update wished products first
            setProducts(result.products);
            })
        })
    },[])
    return(
        <div>
            <Header/>
            <Center>
                <Title>All Products</Title>
                <ProductsGrid products={products} wishedProducts={wishedProducts}/>
            </Center>
        </div>
    )
}
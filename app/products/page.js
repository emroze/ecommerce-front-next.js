"use client"
import Center from "@/components/Center";
import Header from "@/components/Header";
import { styled } from "styled-components";
import { getAllProduct } from "../getProduct";
import { useEffect, useState } from "react";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

export default function ProductsPage(){
    const [products,setProducts] = useState({});
    useEffect(()=>{
        getAllProduct().then(result =>{
        setProducts(result.products);
        }   
        )
    },[])
    return(
        <div>
            <Header/>
            <Center>
                <Title>All Products</Title>
                <ProductsGrid products={products}/>
            </Center>
        </div>
    )
}
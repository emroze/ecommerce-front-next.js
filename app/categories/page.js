"use client";

import Center from "@/components/Center";
import Header from "@/components/Header";
import { getCategories } from "../serverSideFunctions";
import { useEffect, useState } from "react";
import ProductBox from "@/components/ProductBox";
import { styled } from "styled-components";
import Link from "next/link";
import { RevealWrapper } from "next-reveal";
import axios from "axios";

const CategoryGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

`;

const CategoryTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 0px;
    a{
        color: #555;
    }
    h2{
        margin-bottom: 10px;
        margin-top: 10px;
    }
`;

const CategoryWrapper = styled.div`
    margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
    background-color: #ddd;
    height: 160px;
    border-radius: 10px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #555;

`;


export default function Categories() {
  const [mainCategories, setMainCategories] = useState();
  const [categoriesProducts, setCategoriesProducts] = useState();
  const [wishedProducts,setWishedProducts] = useState([]);
  useEffect(() => {
    axios.get('/api/wishlist').then(response =>{
      setWishedProducts(response.data);

      getCategories().then((response) => {
        setMainCategories(response.mainCategories);
        setCategoriesProducts(response.categoriesProducts);
      });
    })
  }, []);
  return (
    <>
      <Header />
      <Center>
        {mainCategories?.map((cat) => (
          <CategoryWrapper key={cat._id}>
            <CategoryTitle>
                <h2>{cat.name}</h2>
                <div>
                    <Link href={'/category/'+cat._id}>Show All</Link>
                </div>
            </CategoryTitle>
            
            <CategoryGrid>
              {categoriesProducts[cat._id].map((p,index) => (
                <RevealWrapper key={p._id} delay={index*50}>
                  <ProductBox {...p} wished={wishedProducts.includes(p._id)}/>
                </RevealWrapper>
              ))}
              <RevealWrapper delay={categoriesProducts[cat._id].length*50}>
                <ShowAllSquare href={'/category/'+cat._id}>
                  Show All &rarr;  
                </ShowAllSquare>
              </RevealWrapper>
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
    </>
  );
}

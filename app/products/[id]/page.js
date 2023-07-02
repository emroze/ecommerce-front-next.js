"use client"
import { getSingleProduct } from "@/app/serverSideFunctions"
import Button from "@/components/Button"
import { CartContext } from "@/components/CartContext"
import Center from "@/components/Center"
import Header from "@/components/Header"
import ProductImages from "@/components/ProductImages"
import Title from "@/components/Title"
import WhiteBox from "@/components/WhiteBox"
import Cart from "@/components/icons/CartIcon"
import { useContext, useEffect, useState } from "react"
import { styled } from "styled-components"

const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px) {
        grid-template-columns: .8fr 1.2fr;
    }
    gap: 40px;
    margin: 40px 0;
`;

const PriceRow= styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const Price = styled.span`
    font-size: 1.5rem;
`;


export default function ProductPage({params}){
    const {addProduct} = useContext(CartContext);
    const id = params.id;
    const [singleProduct,setSingleProduct] = useState({})
    useEffect(() => {
        getSingleProduct(id).then(respense => {
            setSingleProduct(respense.product)
        })
    },[])
     
    return(
        <>
            <Header/>
            <Center>
                <ColumnWrapper>
                    <WhiteBox>
                        <ProductImages images={singleProduct?.images}/>
                    </WhiteBox>
                    <div>
                        <Title>{singleProduct?.title}</Title>
                        <p>{singleProduct.description}</p> 
                        <PriceRow>
                            <div>
                                <Price>
                                    ${singleProduct.price}
                                </Price>
                            </div>
                            <div>
                                <Button primary={1} onClick={() => addProduct(singleProduct._id)}><Cart/>Add to cart</Button>
                            </div>
                        </PriceRow>
                    </div>
                </ColumnWrapper>
            </Center>
        </>
    )
}
import { styled } from "styled-components"
import Button, { ButtonStyle } from "./Button";
import CartIcon from "./icons/CartIcon"
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import FlyingButton from "./FlyingButton";




const ProductWrapper = styled.div`
    button{
        width: 100%;
        text-align: center;
        justify-content: center;
    }
`;

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 20px;
    height: 120px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{
        max-width: 100%;
        max-height: 80px;
    }
`;
const Title = styled(Link)`
    font-weight: normal;
    font-size: 0.9rem;
    margin:0;
    color:inherit;
    text-decoration: none;
    margin: 0;
`;

const ProductInfoBox = styled.div`
    margin-top: 5px;
`;

const PriceRow = styled.div`
    display: block;
    @media screen and (min-width: 768px){
        display: flex;
        gap: 5px;
    }
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
`;

const Price = styled.div`
    font-size: 1rem;
    font-weight: 400;
    text-align: right;
    @media screen and (min-width: 768px){
        font-size: 1.2rem;
        font-weight: 600;
        text-align: left;
    }

`;




export default function ProductBox({_id,title,description,price,images}){
    // console.log(_id, title, images);
    const url = '/products/'+_id;
    

    return(
        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    <img src={images?.[0]} alt=''></img>  
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>{title.length > 20 ? (title.slice(0,20).toString()+'.....') : title}</Title>
                <PriceRow>
                    <Price>
                        ${price}
                    </Price>
                    <FlyingButton _id={_id} src={images?.[0]}>Add to cart</FlyingButton>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    )
}
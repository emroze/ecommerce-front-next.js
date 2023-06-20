import { styled } from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    padding-top: 30px;
`;

const Title = styled.h2`
    font-size: 2rem;
    margin: 30px 0 20px 0;
    font-weight: 400;
`;
export default function NewProducts({products}){
    // console.log(products)
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductGrid>
                {products?.length > 0 && products.map(product => (
                    <ProductBox key={product._id} {...product}/>
                ))}
            </ProductGrid>
        </Center>
    )
}
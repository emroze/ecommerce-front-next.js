import { styled } from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";




const Title = styled.h2`
    font-size: 2rem;
    margin: 30px 0 20px 0;
    font-weight: 400;
`;
export default function NewProducts({products, wishedProducts}){
    if(products?.length>0){
        return (
            <Center>
                <Title>New Arrivals</Title>
                <ProductsGrid products={products} wishedProducts={wishedProducts}/>
            </Center>
        )
    }
    
}
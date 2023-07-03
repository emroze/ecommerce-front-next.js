import { styled } from "styled-components";
import ProductBox from "./ProductBox";
import { RevealWrapper } from "next-reveal";

const StyledProductGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding-top: 10px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

export default function ProductsGrid({products}){
    return(
        <StyledProductGrid>
                {products?.length > 0 && products.map((product,index) => (
                        <RevealWrapper key={product._id} delay={index*50}>
                            <ProductBox {...product}/>
                        </RevealWrapper>
                        
                    ))}
        </StyledProductGrid>
    )
}
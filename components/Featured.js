import { styled } from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import Cart from "./icons/CartIcon";

const Bg = styled.div`
    background-color: #222;
    color:#fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin:0;
    font-weight: normal;
    font-size:3rem;
`;

const Desc = styled.p`
    color: #aaa;
    font-size: 0.8rem;
`;

const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap:40px;
    img{
        max-width: 100%;
    }
`;

const Column = styled.div`
    display: flex;
    align-items: center;
    /* flex-direction: column; */
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 25px;
`;

export default function Featured({product}){
    // console.log(product)
    return (
        <Bg>
            <Center>
                <ColumnWrapper>
                    <Column>
                        <div>
                            <Title>{product?.title}</Title>
                            <Desc>
                                {product?.description}
                            </Desc>
                            <ButtonWrapper>
                                <ButtonLink href={'/products/'+product?._id} outline={1} white={1}>Read more</ButtonLink>
                                <Button white={1} >
                                <Cart/>
                                Add to cart</Button>
                            </ButtonWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src="https://ecommerce-nextjs-emroze.s3.amazonaws.com/9b5ea7d3-f0ab-4f9b-8832-fd5d4d4d1e71.png" alt=""/>
                    </Column>
                </ColumnWrapper>
                
            </Center>
        </Bg>
    )
}
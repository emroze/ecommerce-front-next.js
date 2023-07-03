import { styled } from "styled-components";
import Center from "./Center";
import ButtonLink from "./ButtonLink";
import Cart from "./icons/CartIcon";
import FlyingButton from "./FlyingButton";
import { RevealWrapper } from "next-reveal";

const Bg = styled.div`
    background-color: #222;
    color:#fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin:0;
    font-weight: normal;
    font-size:1.5;
    @media screen and (min-width: 768px) {
        font-size:3rem;
    }
`;

const Desc = styled.p`
    color: #aaa;
    font-size: 0.8rem;
`;

const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap:40px;
    img.main{
        max-width: 100%;
        max-height: 200px;
        display: block;
        margin: 0 auto;
    }
    div:nth-child(1){
        order: 2;
    }
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.1fr 0.9fr;
        div:nth-child(1){
            order: 0;
        }
        img{
            max-width: 100%;
        }
    }
`;

const Column = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    /* flex-direction: column; */
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 25px;
    align-items: center;
`;

export default function Featured({product}){
    return (
        <Bg>
            <Center>
                <ColumnWrapper>
                    <Column>
                        <div>                           
                            <RevealWrapper origin={'left'} delay={100}>
                                <Title>{product?.title}</Title>
                                <Desc>{product?.description}</Desc>
                                <ButtonWrapper>
                                    <ButtonLink href={'/products/'+product?._id} outline={1} white={1}>Read more</ButtonLink>
                                    <FlyingButton white _id={product._id} src={product?.images?.[0]}>
                                        <Cart/>
                                        Add to cart
                                    </FlyingButton>
                                </ButtonWrapper>
                            </RevealWrapper>
                        </div>
                    </Column>
                    <Column>
                        <RevealWrapper delay={0}>
                            <img className="main" src={product?.images?.[0]} alt=""/>
                        </RevealWrapper>                      
                    </Column>
                </ColumnWrapper>
                
            </Center>
        </Bg>
    )
}
import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";


const StyledHeader = styled.header`
    background-color: #222;
`;

const Logo = styled(Link)`
    position: relative;
    z-index: 3;
    color: #fff;
    text-decoration: none;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    
    ${props => props.mobilenavactive ? `
        position: fixed;
        top: 0;
        left: 20px;
        right: 20px;
        
    ` : `
        position: static;
    `}
`;

const StyledNav = styled.nav`
    ${props => props.mobilenavactive ? `
        display:block;
    ` : `
        display:none;
    `}
    
    gap: 15px;
    position: fixed;
    top: 0px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 70px 20px 20px;
    background-color: #222;
    
    @media screen and (min-width: 768px){
        display   : flex;
        position: static;
        padding: 0;
    }

`;

const NavLink = styled(Link)`
    display: block;
    color: #aaa;
    text-decoration: none;
    padding: 10px 0;
`;

const NavButton = styled.button`
    background-color: transparent;
    width: 30px;
    height: 30px;
    border: 0;
    color: white;
    cursor: pointer;
    position: relative;
    z-index: 3;
    
    @media screen and (min-width: 768px) {
        display: none;
    }
`;

export default function Header(){
    const [mobileNavActive, setMobileNavActive] = useState(false);
    const {cartProducts} = useContext(CartContext);
    return(
        <>
            
            <StyledHeader>
                <Center>
                    <Wrapper mobilenavactive={mobileNavActive===true ? "true":undefined}>
                        <Logo href={'/'}>Ecommerce</Logo>
                        <StyledNav mobilenavactive={mobileNavActive===true ? "true":undefined}>
                            <NavLink href={'/'}>Home</NavLink>
                            <NavLink href={'/products'}>All Products</NavLink>
                            <NavLink href={'/categories'}>Categories</NavLink>
                            <NavLink href={'/account'}>Account</NavLink>
                            <NavLink href={'/cart'}>Cart ({cartProducts?.length})</NavLink>
                        </StyledNav>
                        <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                            <BarsIcon/>
                        </NavButton>
                    </Wrapper>
                </Center>
            </StyledHeader>
            
        </>
    )
}
import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import SearchIcon from "./icons/SearchIcon";


const StyledHeader = styled.header`
    background-color: #222;
    position: sticky;
    top: 0;
    z-index: 10;
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
    padding: 10px 0;
    align-items: center;
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
    min-width: 20px;
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
    display: flex;
    align-items: center;
    @media screen and (min-width: 768px) {
        display: none;
    }
`;

const SideIcons = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    a{
        display: flex;
        align-items: center;
        min-width: 20px;
        color: white;
        svg{
            height: 16px;
            width: 16px;
        }
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
                        <SideIcons>
                            <Link href={'/search'}><SearchIcon/></Link>
                            <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                                <BarsIcon/>
                            </NavButton>
                        </SideIcons>
                    </Wrapper>
                </Center>
            </StyledHeader>
            
        </>
    )
}
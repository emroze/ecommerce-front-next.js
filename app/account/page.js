"use client"
import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import SingleOrder from "@/components/SingleOrder";
import ProductBox from "@/components/ProductBox";
import Spinner from "@/components/Spinner";
import Tabs from "@/components/Tabs";
import WhiteBox from "@/components/WhiteBox";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import { useEffect, useState } from "react";
import { styled } from "styled-components";


const ColsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 20px;
    margin: 40px 0px;
    p{
        margin: 10px;
    }
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;

const WishedProductGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
`;

export default function Account(){
    // const session = useSession();
    const [wishedProducts,setWishedProducts] = useState('');
    const { data:session } = useSession();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [city,setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country,setCountry] = useState('');
    const [addressLoaded,setAddressLoaded] = useState(false);
    const [wishlistLoaded,setWishlistLoaded] = useState(false);
    const [ordersLoaded, setOrdersLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('Order(s)'); 
    const [orders, setOrders] = useState([]);
    async function logout(){
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL,

        });
    }

    async function login(){
        await signIn('google');
    }

    async function saveAddress(){
        const data = {name, email, city, postalCode, streetAddress, country};
        const response = await axios.put('/api/address',data);
        if(response.data?._id){
            alert("Address saved")
        }
    }

    useEffect(() => {
            axios.get('/api/address').then(response => {
                setName(response.data?.name);
                setEmail(response.data?.email);
                setCity(response.data?.city);
                setPostalCode(response.data?.postalCode);
                setStreetAddress(response.data?.streetAddress);
                setCountry(response.data?.country);
                setAddressLoaded(true);
            }); 


            // let url = new URL("/api/wishlist");
            // let params = new URLSearchParams(url.search);
            // params.append("product", true);
            axios.get('/api/wishlist?product=true').then(response =>{
                setWishedProducts(response.data);
                setWishlistLoaded(true);
            });

            axios.get('/api/orders').then(response => {
                setOrders(response.data);
                setOrdersLoaded(true);
            });
    },[])
    
    function productRemovedFromWishlist(idToBeRemove){
        setWishedProducts(prev => {
            return [...prev.filter(p=>p._id.toString() !== idToBeRemove)]
        })
    }

    return(
        <>
            <Header/>
            <Center>
                <ColsWrapper>
                    <div>
                        <RevealWrapper delay={0}>
                            <WhiteBox>
                                <Tabs 
                                    tabs={['Order(s)','Wishlist']} 
                                    active={activeTab} 
                                    onChange={setActiveTab}>
                                </Tabs>
                                {activeTab==='Order(s)' && (
                                    <>
                                        {!ordersLoaded && (
                                            <Spinner fullwidth={1}/>
                                        )}
                                        {ordersLoaded && (
                                            <>
                                                {orders.length===0 && (
                                                    <>
                                                        {session && (
                                                            <p>You haven't placed any order yet</p>
                                                        )}
                                                        {!session && (
                                                            <p>Login to see your order(s)</p>
                                                        )}
                                                    </>
                                                )}
                                                {orders.length>0 && orders.map(o =>(
                                                    <SingleOrder key={o._id} {...o}/>
                                                ))}
                                            </>
                                        )}
                                    </>
                                )}
                                {activeTab==='Wishlist' && (
                                    <>
                                        {!wishlistLoaded && (
                                            <Spinner fullwidth={1}/>
                                        )}
                                        {wishlistLoaded && (
                                            <>
                                            <WishedProductGrid>
                                                {wishedProducts.length>0 && wishedProducts.map(wp => (
                                                    <ProductBox key={wp._id} {...wp} wished={1} onRemoveFromWishlist={productRemovedFromWishlist}/>
                                                ))}                                        
                                            </WishedProductGrid>
                                            {wishedProducts.length===0 && (
                                                    <>
                                                        {session && (
                                                            <p>Your wishlist is empty</p>
                                                        )}
                                                        {!session && (
                                                            <p>Login to see your wishlist</p>
                                                        )}
                                                    </>
                                            )}
                                            </>
                                        )}
                                    </>
                                )}
                            </WhiteBox>
                        </RevealWrapper>
                    </div>
                    <div>
                        <RevealWrapper delay={100}>
                            <WhiteBox>
                                {!addressLoaded && (
                                    <Spinner fullwidth={1}/>
                                )}
                                
                                {addressLoaded && session && (
                                    <>
                                        <h2>Account Details</h2>
                                        <Input type="text" 
                                                placeholder="Name" 
                                                value={name} 
                                                onChange={(ev) => {setName(ev.target.value)}}/>
                                        <Input type="email" 
                                                placeholder="Email" 
                                                value={email} 
                                                required
                                                onChange={(ev) => {setEmail(ev.target.value)}}/>
                                        <CityHolder>
                                            <Input 
                                                type="text" 
                                                placeholder="City" 
                                                value={city} 
                                                onChange={(ev) => {setCity(ev.target.value)}}/>
                                            <Input type="text" 
                                                placeholder="Postal Code" 
                                                value={postalCode} 
                                                onChange={(ev) => {setPostalCode(ev.target.value)}}/>
                                        </CityHolder>
                                        <Input type="text" 
                                                placeholder="Street Address" 
                                                value={streetAddress} 
                                                onChange={(ev) => {setStreetAddress(ev.target.value)}}/>
                                        <Input type="text" 
                                                placeholder="Country" 
                                                value={country} 
                                                onChange={(ev) => {setCountry(ev.target.value)}}/> 
                                        <Button black={1} block={1} onClick={saveAddress}>Save</Button>
                                        <hr/>
                                    </>                                   
                                )}
                                {session && (
                                            <Button primary={1} onClick={()=> logout()}>Logout</Button>
                                        )}
                                {!session && (
                                            <>
                                                <h2>Login</h2>
                                                <Button primary={1} onClick={()=> login()}>Login with Google</Button>
                                            </>
                                        )}
                                
                            </WhiteBox>
                        </RevealWrapper>
                    </div>
                </ColsWrapper>
                
                
            </Center>
        </>
    )
}
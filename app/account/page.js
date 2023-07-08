"use client"
import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
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
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;


export default function Account(){
    // const session = useSession();
    const { data:session } = useSession();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [city,setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country,setCountry] = useState('');
    const [loaded,setLoaded] = useState(false);
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
        console.log(response)
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
                setLoaded(true);
            }); 
    },[])
    
    return(
        <>
            <Header/>
            <Center>
                <ColsWrapper>
                    <div>
                        <RevealWrapper delay={0}>
                            <WhiteBox>
                                <h2>Wishlist</h2>
                            </WhiteBox>
                        </RevealWrapper>
                    </div>
                    <div>
                        <RevealWrapper delay={100}>
                            <WhiteBox>
                                {!loaded && (
                                    <Spinner fullWidth={true}/>
                                )}
                                
                                {loaded && (
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
                                            <Button primary={1} onClick={()=> login()}>Login</Button>
                                        )}
                                
                            </WhiteBox>
                        </RevealWrapper>
                    </div>
                </ColsWrapper>
                
                
            </Center>
        </>
    )
}
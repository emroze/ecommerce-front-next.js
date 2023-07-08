import { useEffect, useState } from "react";
import Input from "./Input";
import { styled } from "styled-components";
import Button from "./Button";
import axios from "axios";

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;
export default function CheckoutForm({cartProducts}){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [city,setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country,setCountry] = useState('');

    useEffect(() => {
        axios.get('/api/address').then(response => {
            setName(response.data?.name);
            setEmail(response.data?.email);
            setCity(response.data?.city);
            setPostalCode(response.data?.postalCode);
            setStreetAddress(response.data?.streetAddress);
            setCountry(response.data?.country);
        }); 
    },[])

    async function goToPayment(ev){
        ev.preventDefault()
        const response = await axios.post('/api/checkout',{
            name,
            email,
            city,
            postalCode,
            streetAddress,
            country,
            productIds:cartProducts
        });
        if(response.data.url){
            window.location = response.data.url;
        }
    }
    
    return(
        <form onSubmit={goToPayment}>
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
                                <Button black={1} block={1} type='submit'>Continue to payment</Button>
                            </form>
    )
}
'use client'
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";

const SearchInput = styled(Input)`
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 1rem;
`;

const InputWrapper = styled.div`
    position: sticky;
    top: 50px;
    margin: 0 0;
    padding:5px 0px;
    background-color: #eeeeeeaa;
`;

export default function SearchPage(){
    const [phrase,setPhrase] = useState('');
    const [products,setProducts] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const debouncedSearch = useCallback(
        debounce(searchProducts,500)
        ,[]);
    
    useEffect(() => {
        if(phrase.length>0){
            setIsLoading(true);
            debouncedSearch(phrase);
        } else if(phrase.length===0){
            setProducts([])
        }
    },[phrase]);


    function searchProducts(phrase){
        axios.get('/api/products?phrase='+encodeURIComponent(phrase))
            .then(response => {
                if(phrase.length > 0) {
                    setProducts(response.data);
                }
                
                setIsLoading(false);
            });
    };

    return(
        <>
            <Header/>
            <Center>
                <InputWrapper>
                    <SearchInput
                        placeholder="Type to search products" 
                        autoFocus
                        value={phrase}
                        onChange={ev => setPhrase(ev.target.value)}
                    />
                </InputWrapper>
                
                {!isLoading && phrase.length!==0 && products.length===0 && (
                    <h2>No product found</h2>
                )}

                {isLoading && (
                    <Spinner fullWidth={true}/>
                )}

                {!isLoading && products.length>0 && phrase.length>0 && (
                    <ProductsGrid products={products}/>
                )}
                
            </Center>
        </>
    )
}
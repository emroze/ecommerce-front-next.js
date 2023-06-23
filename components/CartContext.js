"use client"
import { createContext, useEffect, useState } from "react"

export const CartContext = createContext({});

export function CartContextProviders({children}){
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    // const defaultProduct = ls ? JSON.parse(ls?.getItem('cart')) : []
    const [cartProducts,setCartProducts] = useState([]);

    useEffect(() => {
        if(cartProducts?.length > 0){
            ls?.setItem('cart',JSON.stringify(cartProducts));
        }
    },[cartProducts])

    useEffect(() => {
        if(ls && ls.getItem('cart')){
            setCartProducts(JSON.parse(ls.getItem('cart')))
        }
    },[])

    function addProduct(productId){
        setCartProducts(prev => [...prev, productId]);
    }

    function removeProduct(productId){
        setCartProducts(prev => {
            const position = prev.indexOf(productId);
            
            if(position !== -1){
                const final = prev.filter((value,index) => index !== position);
                if(final.length == 0){
                    ls.removeItem('cart')
                }
                return final;
            }
            return prev;
        });
    }
    return (
        <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct}}>{children}</CartContext.Provider>
    )
}
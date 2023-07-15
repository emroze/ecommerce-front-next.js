"use client"
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import CheckoutForm from "@/components/CheckoutForm";
import Header from "@/components/Header";
import Table from "@/components/Table";
import axios from "axios";
import { RevealWrapper } from "next-reveal";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";


const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.2fr .8fr;
    }
    gap: 40px;
    margin-top: 40px;
    table thead tr th:nth-child(3),
    table tbody tr td:nth-child(3),
    table tbody tr.subtotal td:nth-child(2){
        text-align: right;
    }
    table tr.subtotal td{
        padding: 15px 0;
    }
    table tbody tr.subtotal td:nth-child(2){
        font-size: 1.4rem;
    }
    table tr.total{
        font-weight: bold;
    }
`;

const Box = styled.div`
    background-color: #fff;
    border-radius:  10px;
    padding: 30px;
`;

const QuantityLebel = styled.span`
    padding: 0 15px;
    display: block;
    @media screen and (min-width: 768px){
        display: inline-block;
        padding: 0 12px;
    }

`;


const ProductInfoCell = styled.td`
    padding: 10px 0;
`;

const ProductImageBox = styled.div`
    width: 70px;
    height: 100px;
    padding: 2px;
    /* box-shadow: 0 0 10px rgba(0,0,0,.1); */
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        max-width: 60px;
        max-height: 60px;
    }

    @media screen and (min-width: 768px){
        padding: 10px;
        img{
            max-width: 80px;
            max-height: 80px;
        }
        width: 100px;
    }
`;

export default function Cart(){
    const {cartProducts,addProduct,removeProduct,clearCart} = useContext(CartContext);
    const [products,setProducts] = useState([]);
    const [isSuccess,setIsSuccess] = useState(false);
    const [shippingFee, setShippingFee] = useState(null);
    useEffect(() => {
        if(cartProducts?.length >0 ){
            axios.post('/api/cart',{ids:cartProducts})
            .then(response => {
                setProducts(response.data);
            });
        }else{
            setProducts([]);
        }
    },[cartProducts]);

    useEffect(()=>{
        if(typeof window === 'undefined'){
            return;
        }
        if(window?.location.href.includes('success')){
            setIsSuccess(true);
            clearCart();
        }
        axios.get('api/settings?name=shippingFee').then(response => {
            setShippingFee(response?.data.value)
        })
    },[])
    
    function moreOfThisProduct(id){
        addProduct(id);
    }

    function lessOfThisProduct(id){
        removeProduct(id)
    }

    let productsTotal = 0;
    for (const productId of cartProducts){
        const price = products.find(p => p._id === productId)?.price || 0;
        productsTotal += price
    }

    if(isSuccess){
        return(
            <>
                <Header />
                <Center>
                    <ColumnWrapper>
                        <Box>
                            <h1>Thanks for your order!</h1>
                            <p>We will notify you via email when your order will be sent</p>
                        </Box>
                    </ColumnWrapper>
                </Center>
            </>
        )
    }

    return(
        <>
            <Header/>
            <Center>
             
                <ColumnWrapper>
                    <RevealWrapper delay={0}>
                        <Box>
                            {!cartProducts?.length && (
                                <div>Your cart is empty</div>
                            )}
                            <h2>Cart</h2>
                            {products?.length>0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.map(product => (
                                        <tr key={product._id}>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} alt=''/>
                                                </ProductImageBox>
                                                {product.title.length > 20 ? (product.title.slice(0,20).toString()+'....') : product.title}                                          
                                            </ProductInfoCell>
                                            <td>
                                                <Button
                                                onClick={()=>lessOfThisProduct(product._id)}>-</Button>
                                                <QuantityLebel>
                                                    {cartProducts.filter(id => id===product._id).length}
                                                </QuantityLebel>
                                                <Button
                                                    onClick={() => moreOfThisProduct(product._id)}>+</Button>
                                            </td>
                                            <td>${cartProducts.filter(id => id===product._id).length * product.price}</td>
                                        </tr>
                                    ))}
                                    <tr className="subtotal">
                                        <td colSpan={2}>Products Cost</td>
                                        <td>${productsTotal}</td>
                                    </tr>
                                    <tr className="subtotal">
                                        <td colSpan={2}>Shipping Cost</td>
                                        <td>${shippingFee}</td>
                                    </tr>
                                    <tr className="subtotal total">
                                        <td colSpan={2}>Total</td>
                                        <td>${productsTotal+parseInt(shippingFee || 0)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>(Use "FIVE" as coupon code on checkout page to get 5 percent discount)</td>
                                    </tr>
                                </tbody>
                            </Table>
                            )}
                        </Box>
                    </RevealWrapper>
                    {!!cartProducts?.length && (
                        <RevealWrapper delay={100}>
                            <Box>
                                <h2>Order Information</h2>
                                <CheckoutForm cartProducts={cartProducts}/>
                            </Box>
                        </RevealWrapper>
                        
                    )}
                    
                    
                </ColumnWrapper>
            </Center>
        </>
    )
}



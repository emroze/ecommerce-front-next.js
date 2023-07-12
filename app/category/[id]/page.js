"use client"
import { getSingleCategory } from "@/app/serverSideFunctions";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";


const CategoryHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    h1{
        font-size: 1.5em;
    }
`;

const FilterWrapper = styled.div`
    display: flex;
    gap: 5px;

`;

const Filter = styled.div`
    background-color: #ddd;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    gap: 5px;
    color: #444;
    select{
        background-color: transparent;
        border-color: #bbb;
        border-radius: 5px;
        font-size:inherit;
        color: #444;
    }
    option{
        background-color: #ddd;
        
    }
`;

export default function Category({params}){
    const defaultSorting = '_id-desc'
    const [category,setCategory] = useState({});
    const [defaultFilterValues, setDefaultFilterValues] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [products,setProducts] = useState(null);
    const [filterValues, setFilterValues] = useState([]);
    const [sort,setSort] = useState(defaultSorting);
    const [loadingProducts,setLoadingProducts] = useState(false);
    const [filtersChanged,setFiltersChanged] = useState(false);
    const [wishedProducts,setWishedProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/wishlist').then(response =>{
            setWishedProducts(response.data);

            getSingleCategory(params?.id).then((response) => {
                setCategory(response.category);
                setSubCategories(response.subCategories);
                setProducts(response.products);
                setFilterValues(
                    response?.category?.properties.map(
                        p => (
                            {name:p.name, value:'all'}
                        )
                    )
                );
                setDefaultFilterValues(filterValues);
            }
            )
        })

    },[])

    useEffect(()=>{
        if(!filtersChanged){
            return;
        }
        setLoadingProducts(true);
        const catIds = [category?._id, ...(subCategories?.map(c => c._id) || [])];
        const params = new URLSearchParams;
        params.set('categories',catIds.join(','))
        params.set('sort',sort)
        filterValues.forEach(f => {
            if(f.value !== 'all'){
                params.set(f.name,f.value);
            }
        })

        const url = `/api/products?` + params.toString();

        axios.get(url).then(response => {
            console.log(response.data);
            setProducts(response.data);
        })
        
        setLoadingProducts(false);
        
    },[filterValues, sort, filtersChanged])
    
    function handleFilterChange(filterName, filterValue){
        setFilterValues(prev => {
            const newValues = prev.map(p => ({
                name: p.name,
                value: p.name===filterName ? filterValue : p.value,
            }))
            return newValues;
         })
         setFiltersChanged(true); 
    }

    return (
        <>
            <Header/>
            <Center>
                <CategoryHeader>
                    <h1>{category?.name}</h1>
                    <FilterWrapper>
                        {category?.properties?.map(prop => (
                                <Filter key={prop.name}>
                                    <span>{prop.name}:</span>
                                    <select
                                        onChange={(ev) => {handleFilterChange(prop.name, ev.target.value)}} 
                                        value={filterValues.find(f=>f.name===prop.name).value}>
                                        <option value='all'>All</option>
                                        {prop.values.map(val => (
                                            <option key={val} value={val}>{val}</option>
                                        ))}
                                    </select>
                                </Filter>
                            ))}
                        <Filter>
                            <span>Sort:</span>
                            <select 
                                value={sort} 
                                onChange={ev => {
                                    setSort(ev.target.value);
                                    setFiltersChanged(true);
                                }}>
                                <option value="price-asc">Price, lowest First</option>
                                <option value="price-desc">Price, Highest First</option>
                                <option value='_id-desc'>Newest First</option>
                                <option value='_id-asc'>Oldest First</option>
                            </select>
                        </Filter>
                    </FilterWrapper>
                </CategoryHeader>
                {loadingProducts && (
                    <Spinner fullWidth/>
                )}
                {!loadingProducts && (
                    <div>
                        {products?.length>0 && (
                                <ProductsGrid products={...products} wishedProducts={wishedProducts}/>
                        )}
                        {products?.length ===0 && (
                            <div>
                                Sorry, No Product Found
                            </div>
                        )}
                    </div>
                )}
            </Center>            
        </>
    )
}
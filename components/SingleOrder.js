import { styled } from "styled-components";

const StyledOrder = styled.div`
    margin: 5px 0;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    time{
        font-size: 0.8rem;
        color: #555;
    }
`;

const ProductRow = styled.div`
    span{
        color: #aaa;
    }
`;
const Address = styled.div`
    font-size: 0.8rem;
    line-height: 0.8rem;
    margin-top: 10px;
    color: #888;
`;


export default function SingleOrder({line_items,createdAt,...rest}){
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
    return (
        <StyledOrder>
            <div>
                <time>{dateTimeFormat.format((new Date(createdAt)))}</time>
                <Address>
                {rest.name}<br/>
                {rest.email}<br/>
                {rest.streetAddress}<br/>
                {rest.postalCode}, {rest.city}, {rest.country}
                </Address>
            </div>
            <div>
                {line_items?.map(item => (
                    <ProductRow>
                        <span>{item?.quantity} x </span>
                        {item?.price_data.product_data.name.length>15 
                        ? (item.price_data.product_data.name.slice(0,15)+'...') 
                        : item?.price_data.product_data.name}
                    </ProductRow>
                ))}
            </div>
        </StyledOrder>
    )
}
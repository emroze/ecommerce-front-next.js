import { styled } from "styled-components";

const StyledTable = styled.table`
    width: 100%;
    border: 1px;
    th{
        text-align: left;
        text-transform: uppercase;
        color: #aaa;
        font-weight: normal;
        font-size: 600;
        
    }
    td{
        border-top: 1px solid rgba(0,0,0,.1);
        
    }
   


`;

export default function Table(props){
    return <StyledTable {...props}/>
}
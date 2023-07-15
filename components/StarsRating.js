import { styled } from "styled-components";
import StarOutline from "./icons/StarOutline";
import { useState } from "react";
import StarSolid from "./icons/StarSolid";

const StarsWrapper = styled.div`
    display: flex;
    gap: 3px;
    padding: 2px;
    align-items: center;
`;

const StarWrapper = styled.button`
    ${props => props.size==='md' && `
        height:1.4rem;
        width:1.4rem;
    `}
    ${props => props.size==='sm' && `
        height:1rem;
        width:1rem;
    `}
    ${props => !props.disabled && `
        cursor: pointer;
    `}
    display: inline-block;
    align-items: center;
    /* cursor: pointer; */
    padding: 0;
    border: 0;
    background-color: transparent;
    color:black;
`;
export default function StarsRating({
    size='md',
    defaultHowMany=0,
    onChange=()=>{},
    disabled=undefined
}){
    const [howMany, setHowMany] = useState(defaultHowMany)
    const five = [1,2,3,4,5]
    function handleClick(n){
        if(disabled){
            return
        }
        setHowMany(n);
        onChange(n);
    }
    return (
        <StarsWrapper>
        {five.map(n => (
            <div key={n}>
                <StarWrapper size={size} disabled={disabled} onClick={()=>handleClick(n)}>
                    {howMany>=n ? <StarSolid/>:<StarOutline/>}
                </StarWrapper>
            </div>
        ))}
            
        </StarsWrapper>
    )
}
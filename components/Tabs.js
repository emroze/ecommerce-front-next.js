import { styled } from "styled-components"

const StyledTabs = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    cursor: pointer;
`;

const StyledTab = styled.span`
    font-size: 1.5rem;
    ${props => props.active ? `
        color:black;
        border-bottom: 2px solid black;
    `:`
        color:#999;
    `}
`;

export default function Tabs({tabs, active, onChange}){
    return(
        <StyledTabs>
            {tabs?.map(tabName => (
                    <StyledTab
                    key={tabName} 
                    onClick={()=> {onChange(tabName)}}
                    active={tabName===active ? 1 : undefined}>{tabName}</StyledTab>      
            ))}
        </StyledTabs>
    )
}
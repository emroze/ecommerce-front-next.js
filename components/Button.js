import { primary } from "@/lib/colors";
import { styled , css} from "styled-components"

export const ButtonStyle = css`
    border: 0;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    font-family: inherit;
    font-weight: 400;
    font-size: 14px;
    svg{
        height: 20px;
        margin-right: 5px;
    }

    ${props => props.block && css`
        display: block;
        width: 100%;
    `}

    ${props => props.white && !props.outline && css`
        background-color: #fff;
        color: #000;
    `}

    ${props => props.white && props.outline && css`
        background-color: transparent;
        color: #fff;
        border: 2px solid #fff;

    `}

    ${props => props.black && !props.outline && css`
        background-color: #000;
        color: #fff;
    `}

    ${props => props.black && props.outline && css`
        background-color: transparent;
        color: #000;
        border: 2px solid #000;

    `}

    ${props => props.primary && !props.outline && css`
        background-color: ${primary};
        border: 2px solid ${primary};
        color: #fff;
    `}

    ${props => props.primary && props.outline && css`
        background-color: transparent;
        border: 2px solid ${primary};
        color: ${primary};
    `}

    ${props => props.size==='l' && css`
        font-size: 1.2rem;
        padding: 10px 20px;
    `}
`;

const StyledButton = styled.button`
    ${ButtonStyle}
`;
export default function Button({children,...rest}){
    return(
        <StyledButton {...rest}>
            {children}
        </StyledButton>
    )
}
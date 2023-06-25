import { useEffect, useState } from "react";
import { styled,css } from "styled-components"

const Image = styled.img`
    max-height: 100%;
    max-width: 100%;
`;

const BigImage = styled.img`
    max-width: 100%;
    max-height: 200px;
`;

const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
    flex-grow: 0;
    margin-top: 10px;
    align-items: center;
    justify-content: center;
`;

const ImageButton = styled.div`
    border: 2px solid #ccc;
    ${props => 
        !props.active &&  css`
            border-color: transparent;
            opacity: .7;
            `}
    height: 40px;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
`;

const BigImageWrapper = styled.div`
    text-align: center;
    height: 200px;
`;

export default function ProductImages({images}){
    const [activeImage,setActiveImage] = useState(images?.[0]);
    useEffect(()=>{
        setActiveImage(images?.[0]);
    },[images])
    return(
        <>
            <BigImageWrapper>
                <BigImage src={activeImage}></BigImage>
            </BigImageWrapper>
            <ImageButtons>
                {images?.map(image => (
                    <ImageButton 
                        key={image}
                        active={image===activeImage ? 1: undefined}
                        onClick={() => setActiveImage(image)}>
                            <Image src={image} alt=""/>
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    )
}
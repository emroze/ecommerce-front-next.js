"use client"

import { createGlobalStyle } from "styled-components"


export const GlobalStyle = createGlobalStyle`
  body{
    background-color: #eee;
    padding: 0;
    margin: 0;
    ${'' /* font-family: ${CustomFont.className}, sans-serif; */}
  }
  hr{
    display: block;
    border: 0;
    border-top: 1px solid #ccc;
  }
`;



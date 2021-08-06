import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle` 
html, body {
margin: 0;
padding: 0;
background: rgb(32, 35, 41);
}

*, *::after, *::before {
box-sizing: border-box;
}
`;

// GlobalStyle.jsx
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0; 
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1;
  }

  html {
  // 1rem을 10px로 설정
  font-size: 62.5%; 
  /* overflow-x: hidden; */
  }
`;

export default GlobalStyle;

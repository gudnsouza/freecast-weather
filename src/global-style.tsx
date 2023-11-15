import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Define color variables */
  :root {
    --color-black: #000;
    --color-white: #FFF;
    --color-purple: #BF5AF2;
    --color-yellow: #FFD60A;
    --color-blue: #0A84FF;
    --color-cyan: #64D2FF;
  }

  /* Global Styles */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', Helvetica,  sans-serif;
    background-color: var(--color-black);
    color: var(--color-white);
  }
`;

export default GlobalStyle;

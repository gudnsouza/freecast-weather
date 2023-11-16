import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Global Styles */
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body, input, button {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', Helvetica,  sans-serif;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
  }

  #root {
    width: 100%;
    height: 100vh;
    padding: 0.75rem 1rem;
    display: flex;
    flex-direction: column;
  }


  button {
    cursor: pointer;
    border: none;
    background: none;
  }

`;

export default GlobalStyle;

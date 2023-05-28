import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    max-width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;

    background: ${theme.colors.backgroundOne}
  }

  a {
    text-decoration-line: none !important;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  .stopAnimation * {
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -ms-transition: none !important;
    -o-transition: none !important;
  }
`;

export default GlobalStyle;

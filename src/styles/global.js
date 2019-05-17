import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
}

body {
  background: #9B65E6;
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialised !important;
  font-family: sans-serif;
}

`;

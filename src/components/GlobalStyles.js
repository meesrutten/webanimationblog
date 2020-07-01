import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  
  body {
    background: var(--color-background);
    color: var(--color-text);
  }

  h1, h2, h3, h4, h5, h6, p {
    -webkit-font-smoothing: antialiased;
    scroll-margin-top: 4rem;
  }
  button {
    transition: transform 150ms ease-out;
    -webkit-tap-highlight-color: transparent;
    &:focus, &:active {
      outline: none;
    }
    &:focus, &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.95);
    }
  }
`;

export default GlobalStyles;

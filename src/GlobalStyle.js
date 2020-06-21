import * as styled from 'styled-components';

import reset from 'styled-reset';

export default styled.createGlobalStyle`
  /* CSS Reset */
  ${reset}

  html {
    font-size: 16px;
    height: 100%;
  }

  body {
    font-family: 'Montserrat';
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.onBackground};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Headers */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Open Sans';
    font-weight: bold;
  }

  h1 {
    font-size: 2em;
    margin-top: 0.67em;
    margin-bottom: 0.67em;
  }

  h2 {
    font-size: 1.5em;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
  }

  h3 {
    font-size: 1.17em;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  h4 {
    margin-top: 1.33em;
    margin-bottom: 1.33em;
  }

  h5 {
    font-size: 0.83em;
    margin-top: 1.67em;
    margin-bottom: 1.67em;
  }

  h6 {
    font-size: 0.67em;
    margin-top: 2.33em;
    margin-bottom: 2.33em;
  }

  p {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  svg {
    height: 20px;
    width: 20px;
  }
`;

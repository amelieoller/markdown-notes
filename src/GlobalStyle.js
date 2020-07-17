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

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  blockquote {
    background: ${({ theme }) => theme.surfaceTwo};
    padding: 0.4em 12px;

    position: relative;
    border-left: 4px solid ${({ theme }) => theme.primaryFaded};
  }

  blockquote p {
    display: inline;
  }

  /* Fix this later */
  .ProseMirror.ProseMirror-focused {
    outline: none;
  }

  .ProseMirror {
    white-space: pre-wrap;
  }

  pre {
    display: block;
    overflow-x: auto;
    background: ${({ theme }) => theme.surfaceTwo};
    color: rgb(204, 204, 204);
    padding: 0.5em;
    margin-bottom: 1em;
  }

  & *:first-child {
    margin-top: 0 !important;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    font-family: 'Source Code Pro', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    tab-size: 2;
    hyphens: none;
  }

  pre[class*='language-'] {
    background-color: ${({ theme }) => theme.surfaceTwo};
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    background-position: 0 93%;
    background-repeat: repeat-x;
    background-size: 100% 0.15em;
  }

  hr {
    margin-top: 2em;
    margin-bottom: 2em;
    height: 1px;
    background: ${({ theme }) => theme.borderColor};
    border: none;

    + h2 {
      border: none;
      padding-top: 0;
    }
  }

  p {
    font-size: 1em;
    line-height: 1.2;
  }

  ol {
    list-style: none;
    counter-reset: b;
    margin-bottom: 2rem;

    li {
      padding-left: 27px;
      position: relative;
      margin-bottom: 10px;
      line-height: 1.1;

      > * {
        margin-bottom: 10px;
      }

      ol {
        margin: 7px 0 0;
      }

      ul {
        margin: 7px 0 0;
      }

      p:last-child {
        margin: 0;
      }
    }

    > li {
      &:before {
        content: counters(b, '.') ' ';
        counter-increment: b;
        left: -8px;
        color: ${({ theme }) => theme.onBackgroundLight};
        position: absolute;
        text-align: right;
        width: 29px;
      }

      ol {
        margin-left: 4px;
      }
    }
  }

  ul {
    list-style: none;
    margin-bottom: 2rem;

    li {
      padding-left: 27px;
      position: relative;
      margin-bottom: 2px;
      line-height: 1.1;

      > * {
        margin-bottom: 10px;
      }

      ol {
        margin: 7px 0 0;
      }

      ul {
        margin: 7px 0 0;
      }

      p:last-child {
        margin: 0;
      }
    }

    > li:before {
      content: '';
      background-color: ${({ theme }) => theme.onBackgroundLight};
      border-radius: 9999px;
      width: 6px;
      height: 6px;
      left: 12px;
      top: 5px;
      position: absolute;
    }
  }

  code {
    font-size: 85%;
    background: ${({ theme }) => theme.codeBackground};
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-weight: 300;
    font-size: 85%;
    font-weight: normal;
    /* background-color: rgba(9, 30, 66, 0.08); */
    font-family: SFMono-Medium, 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo,
      Consolas, Courier, monospace;
    white-space: pre-wrap;
    box-shadow: rgba(9, 30, 66, 0.08) -4px 0px 0px 0px, rgba(9, 30, 66, 0.08) 4px 0px 0px 0px;
    padding: 2px 0px;
    border-style: none;
    margin: 0px 4px;
  }

  pre code {
    background: transparent;
    padding: 0;
    line-height: 1.15em;
    box-shadow: none;
    margin: 0;
  }

  em {
    font-style: italic;
  }

  img {
    max-width: 100%;
  }

  table {
    margin-bottom: 2em;
    font-size: 1.1em;
    border-collapse: collapse;
    width: 100%;
    overflow-y: auto;
    _overflow: auto;

    th {
      font-weight: 700;
      padding: 10px;
      border-bottom: 1px solid ${({ theme }) => theme.borderColor};

      &:not([align]) {
        text-align: left;
      }
    }

    td {
      padding: 10px;
      border-bottom: 1px solid ${({ theme }) => theme.borderColor};
      color: inherit;
    }
  }

  /* :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  } */
`;

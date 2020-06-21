import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Markdown from 'react-markdown';

import CodeBlock from './CodeBlock';

const MarkdownFormattedText = ({ content }) => (
  <StyledMarkdown>
    <Markdown source={content} renderers={{ code: CodeBlock }} />
  </StyledMarkdown>
);

const StyledMarkdown = styled.div`
  /* @extend-elements */
  %extend_1 {
    font-family: 'Source Code Pro', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 2;
    hyphens: none;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    @extend %extend_1;
  }

  pre {
    background-color: ${({ theme }) => theme.codeBackground};
    margin-bottom: 1em;
  }

  pre[class*='language-'] {
    overflow: auto;
    font-size: 1.4em;

    code {
      white-space: pre;
    }
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    background-image: linear-gradient(180deg, transparent 50%, ${({ theme }) => theme.primary} 0);
    background-position: 0 93%;
    background-repeat: repeat-x;
    background-size: 100% 0.15em;
  }

  hr {
    margin-top: 2em;
    margin-bottom: 2em;
    height: 1px;
    background: ${({ theme }) => theme.onBackgroundLight};
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
    list-style: inside;
    counter-reset: b;
    margin-bottom: 2em;

    li {
      position: relative;
      margin-bottom: 10px;

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
    list-style: inside;
    margin-bottom: 2em;

    li {
      position: relative;
      margin-bottom: 2px;
      line-height: 1.2;

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
      border-radius: 9999px;
      width: 6px;
      height: 6px;
      left: 12px;
      top: 10px;
      position: absolute;
    }
  }

  code {
    font-size: 85%;
    background: ${({ theme }) => theme.codeBackground};
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-weight: 300;
  }

  pre code {
    background: transparent;
    font-size: 1em;
    padding: 0;
    line-height: 1em;
  }

  blockquote {
    padding-left: 20px;
    position: relative;
    border-left: 4px solid ${({ theme }) => theme.primary};
    margin-bottom: 4em;
    margin-top: 4em;
  }

  img {
    margin-bottom: 2em;
    max-width: 100%;
  }

  table {
    margin-bottom: 2em;
    font-size: 1.6em;
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

  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }
`;

MarkdownFormattedText.propTypes = {
  content: PropTypes.string.isRequired,
};

export default MarkdownFormattedText;

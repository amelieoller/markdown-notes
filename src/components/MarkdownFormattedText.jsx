import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Markdown from 'react-markdown';

import CodeBlock from './CodeBlock';
import { ReactComponent as ChevronsDown } from '../assets/icons/chevrons-down.svg';
import { ReactComponent as ChevronsUp } from '../assets/icons/chevrons-up.svg';
import IconButton from '../atoms/IconButton/IconButton';

const MarkdownFormattedText = ({ content }) => {
  const [endPoint, setEndPoint] = useState(1);
  const noteSections = content.split('---');

  return (
    <StyledMarkdown>
      <Markdown
        source={noteSections.slice(0, endPoint).join('---')}
        renderers={{ code: CodeBlock }}
      />

      {noteSections.length > 1 && (
        <MoreLess>
          {endPoint !== noteSections.length && (
            <IconButton
              onClick={() => {
                setEndPoint(endPoint + 1);
              }}
              color="onBackgroundLight"
              hoverColor="primary"
            >
              <ChevronsDown />
            </IconButton>
          )}

          {endPoint !== 1 && (
            <IconButton
              onClick={() => {
                setEndPoint(endPoint - 1);
              }}
              color="onBackgroundLight"
              hoverColor="primary"
            >
              <ChevronsUp />
            </IconButton>
          )}
        </MoreLess>
      )}
    </StyledMarkdown>
  );
};

const MoreLess = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing};

  & > *:first-child {
    margin-right: ${({ theme }) => theme.spacing};
  }
`;

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

  & *:first-child {
    margin-top: 0;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    @extend %extend_1;
  }

  pre {
    background-color: ${({ theme }) => theme.surfaceTwo};
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
    list-style: none;
    counter-reset: b;
    margin-bottom: 2rem;

    li {
      padding-left: 27px;
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
    font-size: 90%;
    background: ${({ theme }) => theme.surfaceTwo};
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-weight: 300;
  }

  pre code {
    background: transparent;
    padding: 0;
    line-height: 1.15em;
  }

  blockquote {
    padding-left: 20px;
    position: relative;
    border-left: 4px solid ${({ theme }) => theme.primary};
    margin-bottom: 3em;
    margin-top: 3em;
  }

  em {
    font-style: italic;
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

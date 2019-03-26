import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import PropTypes from 'prop-types';

const CodeBlock = ({ children }) => (
  <SyntaxHighlighter
    className="code-block"
    language="javascript"
    style={tomorrowNightEighties}
    showLineNumbers
  >
    {children}
  </SyntaxHighlighter>
);

CodeBlock.propTypes = {
  children: PropTypes.string.isRequired,
};

export default CodeBlock;

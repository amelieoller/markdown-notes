import React from 'react';
import PropTypes from 'prop-types';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';

const CodeBlock = ({ language, value }) => (
  <SyntaxHighlighter
    language={language}
    style={tomorrowNightEighties}
    showLineNumbers="true"
    codeTagProps={{ style: { fontFamily: 'Source Code Pro' } }}
  >
    {value}
  </SyntaxHighlighter>
);

CodeBlock.defaultProps = {
  language: '',
  value: '',
};

CodeBlock.propTypes = {
  value: PropTypes.string,
  language: PropTypes.string,
};

export default CodeBlock;

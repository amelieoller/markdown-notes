import React from 'react';
import PropTypes from 'prop-types';
import eighties from 'react-syntax-highlighter/dist/styles/hljs/tomorrow-night-eighties';
import SyntaxHighlighter from 'react-syntax-highlighter';

const CodeBlock = ({ language, value }) => (
  <SyntaxHighlighter
    language={language}
    style={eighties}
    showLineNumbers="true"
    codeTagProps={{ style: { fontFamily: 'DankMono' } }}
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

import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import CodeBlock from './CodeBlock';

const MarkdownField = ({ content, htmlMode }) => (
  <Markdown
    className="result"
    source={content}
    skipHtml={htmlMode === 'skip'}
    escapeHtml={htmlMode === 'escape'}
    renderers={{ code: CodeBlock }}
  />
);

MarkdownField.propTypes = {
  content: PropTypes.string.isRequired,
  htmlMode: PropTypes.string,
};

MarkdownField.defaultProps = {
  htmlMode: 'skip',
};

export default MarkdownField;

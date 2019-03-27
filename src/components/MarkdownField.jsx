import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import CodeBlock from './CodeBlock';

const MarkdownField = ({ content }) => (
  <Markdown
    options={{
      forceBlock: true,
      overrides: {
        em: {
          props: {
            className: 'italic',
          },
        },
        code: {
          component: CodeBlock,
        },
      },
    }}
  >
    {content}
  </Markdown>
);

MarkdownField.propTypes = {
  content: PropTypes.string.isRequired,
};

export default MarkdownField;

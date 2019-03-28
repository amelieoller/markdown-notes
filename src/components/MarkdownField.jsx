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
        img: {
          props: {
            className: 'max-image-width',
          },
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

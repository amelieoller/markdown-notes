import React from 'react';
import PropTypes from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/mode/markdown/markdown');
require('codemirror/addon/edit/closetag');
require('codemirror/addon/edit/continuelist');
require('codemirror/addon/edit/closebrackets');
require('codemirror/mode/xml/xml');
require('codemirror/theme/material.css');
require('codemirror/addon/comment/comment');
require('codemirror/mode/javascript/javascript');

const CodeMirrorArea = ({ handleOnChange, defaultValue, style }) => (
  <CodeMirror
    value={defaultValue}
    options={{
      style: style,
      mode: 'markdown',
      viewportMargin: Infinity,
      autoScroll: true,
      autoCursor: true,
      lineWrapping: true,
      autoCloseTags: true,
      tabSize: 2,
      autofocus: true,
      autoCloseBrackets: true,
      toggleComment: true,
      extraKeys: {
        Enter: 'newlineAndIndentContinueMarkdownList',
        'Cmd-/': 'toggleComment',
      },
    }}
    onBeforeChange={(editor, data, value) => {
      handleOnChange(value);
    }}
    className="code-mirror"
  />
);

CodeMirrorArea.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.shape({}),
};

CodeMirrorArea.defaultProps = {
  defaultValue: '',
};

export default CodeMirrorArea;

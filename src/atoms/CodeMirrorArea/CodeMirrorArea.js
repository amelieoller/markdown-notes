import React from 'react';
import PropTypes from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/mode/markdown/markdown');
require('codemirror/addon/edit/closetag');
require('codemirror/addon/edit/continuelist');
require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/comment/comment');
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/theme/material.css');
require('codemirror/mode/jsx/jsx');

const CodeMirrorArea = ({ note, handleNoteChange }) => (
  <CodeMirror
    value={note.content}
    options={{
      mode: 'markdown',
      theme: 'material',
      viewportMargin: Infinity,
      lineNumbers: true,
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
      handleNoteChange({ content: value });
    }}
  />
);

CodeMirrorArea.propTypes = {
  handleNoteChange: PropTypes.func.isRequired,
  note: PropTypes.shape({
    content: PropTypes.string,
  }),
};

CodeMirrorArea.defaultProps = {
  defaultValue: '',
};

export default CodeMirrorArea;

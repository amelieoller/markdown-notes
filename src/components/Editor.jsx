import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';

require('codemirror/mode/markdown/markdown');

function Editor({ value, onChange }) {
  return (
    <form className="editor pure-form">
      <CodeMirror
        mode="markdown"
        theme="monokai"
        value={value}
        onChange={onChange}
      />
    </form>
  );
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

Editor.defaultProps = {
  value: '',
};

export default Editor;

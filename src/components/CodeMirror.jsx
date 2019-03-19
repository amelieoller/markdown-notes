import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';

const IS_MOBILE = typeof navigator === 'undefined'
  || (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i));

class CodeMirrorEditor extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = { isControlled: Boolean(value) };
    this.handleChange = this.handleChange.bind(this);
    this.editorRef = React.createRef();
  }

  componentDidMount() {
    const { forceTextArea } = this.props;

    const isTextArea = forceTextArea || IS_MOBILE;
    if (!isTextArea) {
      this.editor = CodeMirror.fromTextArea(this.editorRef.current, this.props);
      this.editor.on('change', this.handleChange);
    }
  }

  componentDidUpdate() {
    const { value } = this.props;

    if (!this.editor) {
      return;
    }

    if (value) {
      if (this.editor.getValue() !== value) {
        this.editor.setValue(value);
      }
    }
  }

  handleChange() {
    const { value, onChange } = this.props;
    const { isControlled } = this.state;

    if (!this.editor) {
      return;
    }

    const newValue = this.editor.getValue();
    if (value === newValue) {
      return;
    }

    if (onChange) {
      onChange({ target: { value } });
    }

    if (this.editor.getValue() !== value) {
      if (isControlled) {
        this.editor.setValue(value);
      } else {
        this.prop.value = value;
      }
    }
  }

  render() {
    const {
      value, readOnly, defaultValue, onChange, textAreaClassName,
    } = this.props;

    const editor = React.createElement('textarea', {
      ref: this.editorRef,
      value,
      readOnly,
      defaultValue,
      onChange,
      className: textAreaClassName,
    });

    return React.createElement('div', null, editor);
  }
}

CodeMirrorEditor.propTypes = {
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.string,
  textAreaClassName: PropTypes.string,
  onChange: PropTypes.func,
  forceTextArea: PropTypes.bool,
  value: PropTypes.string,
};

export default CodeMirrorEditor;

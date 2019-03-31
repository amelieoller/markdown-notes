import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledMarkdownControls = styled.div`
  position: relative;
  z-index: 5;
  text-align: right;
  color: #fff;
  float: right;

  form {
    background-color: rgba(39, 40, 34, 0.5);
    margin-right: 20px;
  }

  legend {
    border-bottom: 0;
    color: #fff;
    font-size: 1.25em;
    margin: 0;
    padding: 10px 0 0 0;
  }
`;

class MarkdownControls extends React.PureComponent {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.props.onChange(evt.target.value);
  }

  render() {
    const rawChecked = this.props.mode === 'raw';
    const skipChecked = this.props.mode === 'skip';
    const escapeChecked = this.props.mode === 'escape';

    return (
      <StyledMarkdownControls>
        <form className="pure-form pure-form-inline">
          <fieldset>
            <legend>HTML mode:</legend>

            <label htmlFor="raw-html" className="pure-checkbox">
              Raw&nbsp;
              <input
                id="raw-html"
                name="html-mode"
                type="radio"
                value="raw"
                checked={rawChecked}
                onChange={this.handleChange}
              />
            </label>

            <label htmlFor="escape-html" className="pure-checkbox">
              Escape&nbsp;
              <input
                id="escape-html"
                name="html-mode"
                type="radio"
                value="escape"
                checked={escapeChecked}
                onChange={this.handleChange}
              />
            </label>

            <label htmlFor="skip-html" className="pure-checkbox">
              Skip&nbsp;
              <input
                id="skip-html"
                name="html-mode"
                type="radio"
                value="skip"
                checked={skipChecked}
                onChange={this.handleChange}
              />
            </label>
          </fieldset>
        </form>
      </StyledMarkdownControls>
    );
  }
}

MarkdownControls.defaultProps = {
  mode: 'raw',
};

MarkdownControls.propTypes = {
  mode: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default MarkdownControls;

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  padding-right: 1.5rem;
  font-weight: 300;
  margin-top: -10px;

  label {
    position: absolute;
    left: 0;
    top: 17px;
    color: #999;
    z-index: 10;
    transition: transform 0.2s ease-out, font-size 0.2s ease-out;
    line-height: 1;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    font-size: ${props => (props.value || props.focused ? '0.75em' : 'inherit')};
    transform: ${props => (props.value || props.focused ? 'translateY(-125%)' : '')};
    cursor: auto;
  }

  input {
    position: relative;
    padding: 16px 0px 3px 0;
    width: 100%;
    outline: 0;
    border: 0;
    box-shadow: 0 1px 0 0 #e5e5e5;
    transition: box-shadow 0.2s ease-out;
    font-size: 16px;
    background: none;
    color: white;
    padding-right: 25px;

    &:focus,
    &.filled {
      box-shadow: 0 1px 0 0 ${props => props.theme.lightPrimaryHighlight};
    }
  }

  .search-icon {
    cursor: pointer;
    z-index: 3;
    margin-left: -17px;
  }
`;

class FLoatingLabelInput extends Component {
  constructor() {
    super();

    this.state = {
      focused: false,
    };
  }

  render() {
    const {
      placeholderLabel, value, onChange, type, onSubmit, id, children,
    } = this.props;

    return (
      <StyledInput {...this.props} {...this.state}>
        <input
          id={id}
          className={value ? 'filled' : ''}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => this.setState({ focused: true })}
          onBlur={() => this.setState({ focused: false })}
          onKeyPress={e => e.key === 'Enter' && onSubmit(e)}
          ref={(input) => {
            this.textInput = input;
          }}
        />
        <label htmlFor={id} onClick={() => this.textInput.focus()}>
          {placeholderLabel}
        </label>
        {children}
      </StyledInput>
    );
  }
}

FLoatingLabelInput.propTypes = {
  placeholderLabel: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  onSubmit: PropTypes.func,
  id: PropTypes.string.isRequired,
  children: PropTypes.shape({}).isRequired,
};

FLoatingLabelInput.defaultProps = {
  placeholderLabel: 'Input',
  value: '',
  type: 'text',
};

export default FLoatingLabelInput;

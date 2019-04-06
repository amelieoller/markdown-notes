import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from './Icon';
import { ICONS } from '../constants';

const StyledInput = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  padding-bottom: 0.9rem;
  padding-right: 1.5rem;
  font-weight: 300;

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
      placeholderLabel,
      value,
      onChange,
      type,
      onKeyPress,
      entered,
      clearSearch,
      handleSearch,
    } = this.props;

    return (
      <StyledInput {...this.props} {...this.state}>
        <input
          id="floating-label-input"
          className={value ? 'filled' : ''}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => this.setState({ focused: true })}
          onBlur={() => this.setState({ focused: false })}
          onKeyPress={onKeyPress}
        />
        <label htmlFor="floating-label-input">{placeholderLabel}</label>
        {entered ? (
          <span
            className="search-icon"
            onClick={clearSearch}
            role="button"
            onKeyPress={clearSearch}
            tabIndex="0"
          >
            <Icon icon={ICONS.CLEAR} color="white" size={14} />
          </span>
        ) : (
          <span
            className="search-icon"
            onClick={handleSearch}
            role="button"
            onKeyPress={handleSearch}
            tabIndex="0"
          >
            <Icon icon={ICONS.SEARCH} color="white" size={14} />
          </span>
        )}
      </StyledInput>
    );
  }
}

FLoatingLabelInput.propTypes = {
  placeholderLabel: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  onKeyPress: PropTypes.func,
  entered: PropTypes.bool,
  clearSearch: PropTypes.func,
  handleSearch: PropTypes.func,
};

FLoatingLabelInput.defaultProps = {
  placeholderLabel: 'Input',
  value: '',
  type: 'text',
};

export default FLoatingLabelInput;

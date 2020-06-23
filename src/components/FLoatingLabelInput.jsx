import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const FloatingLabelInput = ({
  placeholderLabel,
  value,
  onChange,
  type,
  onSubmit,
  id,
  children,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef(null);

  return (
    <StyledInput value={value} isFocused={isFocused}>
      <input
        id={id}
        className={value ? 'filled' : ''}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyPress={(e) => e.key === 'Enter' && onSubmit(e)}
        ref={ref}
      />
      <label htmlFor={id} onClick={() => ref.current.focus()}>
        {placeholderLabel}
      </label>
      {children}
    </StyledInput>
  );
};

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
    font-size: ${({ isFocused, value }) => (value || isFocused ? '0.75em' : 'inherit')};
    transform: ${({ isFocused, value }) => (value || isFocused ? 'translateY(-125%)' : '')};
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
      box-shadow: 0 1px 0 0 ${({ theme }) => theme.primary};
    }
  }

  .search-icon {
    cursor: pointer;
    z-index: 3;
    margin-left: -17px;
  }
`;

FloatingLabelInput.propTypes = {
  placeholderLabel: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  onSubmit: PropTypes.func,
  id: PropTypes.string.isRequired,
  children: PropTypes.shape({}).isRequired,
};

FloatingLabelInput.defaultProps = {
  placeholderLabel: 'Input',
  value: '',
  type: 'text',
};

export default FloatingLabelInput;

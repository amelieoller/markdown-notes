import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { ReactComponent as X } from '../../assets/icons/x.svg';

const Input = ({
  label,
  placeholder = label,
  required,
  type,
  handleOnBlur,
  onKeyDown,
  defaultValue,
  helpText,
  clearInput,
  showX,
  border,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const renderRequiredLabel = () => <span className="input-required">*</span>;

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleBlur = (e) => {
    let { value } = e.target;

    if (type === 'number' && value === '') {
      handleOnBlur(0);
    } else if (!value) {
      handleOnBlur(defaultValue);
    } else if (value !== defaultValue) {
      handleOnBlur(value);
    }
  };

  const handleKeydown = (e) => {
    let { value } = e.target;

    if (type === 'number' && value === '') {
      onKeyDown(0);
    } else if (!value) {
      onKeyDown(defaultValue);
    } else if (value !== defaultValue) {
      onKeyDown(value);
    }
  };

  const onClear = () => {
    clearInput();
    setInputValue('');
  };

  const renderInputNode = () => {
    const inputID = label.toLowerCase();

    return (
      <InputWrapper>
        <StyledInput
          id={inputID}
          type={type}
          name={inputID}
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleKeydown(e);
          }}
          required={required}
          value={inputValue}
          border={border}
        />
        {(showX || inputValue !== '') && (
          <ClearButton onClick={onClear} border={border}>
            <X />
          </ClearButton>
        )}

        {helpText && <HelpText>{helpText}</HelpText>}
      </InputWrapper>
    );
  };

  return <>{label ? renderInputNode() : null}</>;
};

const ClearButton = styled.button`
  position: absolute;
  right: ${({ border }) => (border ? '8px' : '24px')};
  top: ${({ border }) => (border ? '4px' : '8px')};
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.onBackgroundLight};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  svg {
    height: 17px;
    width: 17px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing};
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: ${({ border }) => (border ? '.9rem' : '1rem')};
  padding: ${({ theme, border }) => (border ? '0.15em 0.5em' : `6px ${theme.spacingLarge}`)};
  margin-top: 2px;
  font-weight: 300;
  border: ${({ border, theme }) => (border ? `2px solid ${theme.onBackgroundLight}` : 'none')};
  border-radius: ${({ border, theme }) => border && theme.borderRadius};
`;

const HelpText = styled.div`
  font-style: italic;
  font-size: 1em;
  margin-top: 2px;
`;

Input.propTypes = {
  handleOnBlur: PropTypes.func,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['email', 'money', 'number', 'password', 'phone', 'text', 'zip', 'date']),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  helpText: PropTypes.string,
  border: PropTypes.bool,
};

Input.defaultProps = {
  defaultValue: '',
  required: false,
  type: 'text',
  handleOnBlur: () => {},
  clearInput: () => {},

  border: false,
};

export default Input;

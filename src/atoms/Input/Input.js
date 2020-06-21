import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = ({
  label,
  placeholder = label,
  required,
  type,
  handleOnBlur,
  defaultValue,
  helpText,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const renderRequiredLabel = () => <span className="input-required">*</span>;

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    let { value } = e.target;

    if (type === 'number' && value === '') {
      handleOnBlur(0);
    } else if (!value) {
      handleOnBlur(defaultValue);
    } else if (value !== defaultValue) {
      handleOnBlur(value);
    }
  };

  const renderInputNode = () => {
    const inputID = label.toLowerCase();

    return (
      <InputWrapper>
        <StyledLabel htmlFor={inputID}>
          {label} {required ? renderRequiredLabel() : null}
        </StyledLabel>

        <StyledInput
          id={inputID}
          type={type}
          name={inputID}
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit(e);
          }}
          required={required}
          value={inputValue}
        />

        {helpText && <HelpText>{helpText}</HelpText>}
      </InputWrapper>
    );
  };

  return <>{label ? renderInputNode() : null}</>;
};

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing};
`;

const StyledLabel = styled.label`
  text-transform: uppercase;
  color: ${({ theme }) => theme.textLight};
  font-size: 0.75em;
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 0.9em;
  padding: 3px 5px;
  margin-top: 2px;
  font-weight: 300;
`;

const HelpText = styled.div`
  font-style: italic;
  font-size: 1em;
  margin-top: 2px;
`;

Input.propTypes = {
  handleOnBlur: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['email', 'money', 'number', 'password', 'phone', 'text', 'zip', 'date']),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  helpText: PropTypes.string,
};

Input.defaultProps = {
  defaultValue: '',
  required: false,
  type: 'text',
};

export default Input;

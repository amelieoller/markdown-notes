import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import Textarea from 'react-textarea-autosize';

const TextAreaComponent = ({ label, placeholder = label, handleOnBlur, defaultValue, style }) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const renderInputNode = () => {
    const inputID = label.toLowerCase();

    return (
      <InputWrapper style={style}>
        <Textarea
          onBlur={(e) => handleOnBlur(e.target.value)}
          onChange={handleInputChange}
          style={{ width: '100%' }}
          value={inputValue}
          id={inputID}
          name={inputID}
          placeholder={placeholder}
        />
      </InputWrapper>
    );
  };

  return <>{label ? renderInputNode() : null}</>;
};

const InputWrapper = styled.div`
  position: relative;
  width: 100%;

  textarea {
    width: 100%;
    padding: 5px;
    border: 1px solid ${({ theme }) => theme.colors.surfaceVariant};
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    font-size: 1.2rem;
    resize: none;
  }
`;

TextAreaComponent.propTypes = {
  handleOnBlur: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.shape({}),
};

TextAreaComponent.defaultProps = {
  defaultValue: '',
};

export default TextAreaComponent;

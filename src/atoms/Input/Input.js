import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/macro';

import { ReactComponent as X } from '../../assets/icons/x.svg';

const Input = ({ clearInput, showClearButton, border, value, label, ...inputProps }) => {
  const renderInputNode = () => {
    const inputID = label.toLowerCase();

    return (
      <InputWrapper>
        <StyledInput
          id={inputID}
          name={inputID}
          value={value}
          border={border}
          placeholder={inputProps.placeholder || label}
          aria-label={label}
          {...inputProps}
        />
        {showClearButton && value !== '' && (
          <ClearButton onClick={clearInput} border={border}>
            <X />
          </ClearButton>
        )}
      </InputWrapper>
    );
  };

  return label && renderInputNode();
};

const propsCSS = {
  small: css`
    padding: ${({ theme, border }) => (border ? '0.2em 0.5em' : `6px ${theme.spacingLarge}`)};
    font-size: 0.85rem;
  `,

  border: css`
    padding: 0.2em 0.5em;
    font-size: 0.85rem;
    border: ${({ theme }) => `1px solid ${theme.primaryFaded}`};
    font-size: 1rem;
  `,
};

const ClearButton = styled.button`
  position: absolute;
  right: ${({ border }) => (border ? '8px' : '19px')};
  top: ${({ border }) => (border ? '4px' : '7px')};
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
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: ${({ theme }) => `6px ${theme.spacingLarge}`};
  margin-top: 2px;
  font-weight: 300;
  border: none;
  border-radius: 0;
  -webkit-appearance: none;
  font-family: 'Montserrat';

  &::placeholder {
    color: ${({ theme }) => theme.onBackgroundLight};
  }

  &:focus {
    outline: none;
  }

  ${(props) => props.border && propsCSS.border};
  ${(props) => props.small && propsCSS.small};
`;

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['email', 'money', 'number', 'password', 'phone', 'text', 'zip', 'date']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  helpText: PropTypes.string,
  border: PropTypes.bool,
  small: PropTypes.bool,
  showClearButton: PropTypes.bool,
  clearInput: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  clearInput: () => {},
  border: false,
  small: false,
  showClearButton: false,
};

export default Input;

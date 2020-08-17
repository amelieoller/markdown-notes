import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/macro';

const propsCSS = {
  small: css`
    font-size: 0.85rem;
    padding: 0.15em 0.5em;
    grid-gap: 5px;

    svg {
      height: 13px;
    }
  `,

  danger: css`
    color: ${({ theme }) => theme.danger};
    border-color: ${({ theme }) => theme.danger};

    &:hover {
      background: ${({ theme }) => theme.danger};
      color: ${({ theme }) => theme.onDanger};
    }
  `,

  faded: css`
    color: ${({ theme }) => theme.primaryFaded};
    border-color: ${({ theme }) => theme.primaryFaded};

    &:hover {
      background: ${({ theme }) => theme.primaryFaded};
      color: ${({ theme }) => theme.onprimaryFaded};
    }
  `,

  disabled: css`
    border-color: ${({ theme }) => theme.borderColor};
    color: ${({ theme }) => theme.borderColor};
    pointer-events: none;
  `,

  iconOnly: css`
    padding: 0.2rem;

    svg {
      margin-right: 0;
    }
  `,

  isActive: css`
    background: ${({ theme }) => theme.primary};
    color: white;
  `,

  noFill: css`
    &:hover {
      background: ${({ theme }) => theme.primary};
      color: white;
    }
  `,
};

const StyledButton = styled.button`
  padding: 0.3em 0.65em;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.primary};
  align-items: center;
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 5px;
  }

  &:hover,
  &:focus {
    transition: all 0.3s ease;
    background: ${({ theme }) => theme.primary};
    color: white;
    outline: none;
  }

  ${(props) => props.small && propsCSS.small};
  ${(props) => props.faded && propsCSS.faded};
  ${(props) => props.isActive && propsCSS.isActive};
  ${(props) => props.disabled && propsCSS.disabled};
  ${(props) => props.iconOnly && propsCSS.iconOnly};
  ${(props) => props.danger && propsCSS.danger};
  ${(props) => props.noFill && propsCSS.noFill};
`;

const Button = ({ children, ...buttonProps }) => {
  const inputID = buttonProps.label.toLowerCase();

  return (
    <StyledButton
      {...buttonProps}
      aria-label={buttonProps.label}
      id={inputID}
      name={inputID}
      placeholder={buttonProps.placeholder || buttonProps.label}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  danger: PropTypes.bool,
  small: PropTypes.bool,
  isActive: PropTypes.bool,
  faded: PropTypes.bool,
  disabled: PropTypes.bool,
  iconOnly: PropTypes.bool,
  type: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
};

export default Button;

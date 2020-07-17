import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/macro';

const propsCSS = {
  small: css`
    font-size: 0.9rem;
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

  isActive: css`
    background: ${({ theme }) => theme.primary};
    color: white;
  `,

  disabled: css`
    border-color: ${({ theme }) => theme.borderColor};
    color: ${({ theme }) => theme.borderColor};
    pointer-events: none;
  `,

  iconOnly: css`
    padding: 0.2em;

    svg {
      margin-right: 0;
    }
  `,
};

const StyledButton = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0.2em 0.65em;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  font-size: 1.1rem;
  border: 2px solid ${({ theme }) => theme.primary};
  align-items: center;
  display: flex;
  white-space: nowrap;
  align-items: center;

  svg {
    height: 18px;
    margin-right: 5px;
  }

  &:hover {
    transition: all 0.3s ease;
    background: ${({ theme }) => theme.primary};
    color: white;
  }

  ${(props) => props.danger && propsCSS.danger};
  ${(props) => props.small && propsCSS.small};
  ${(props) => props.faded && propsCSS.faded};
  ${(props) => props.isActive && propsCSS.isActive};
  ${(props) => props.disabled && propsCSS.disabled};
  ${(props) => props.iconOnly && propsCSS.iconOnly};
`;

const Button = ({ children, ...buttonProps }) => (
  <StyledButton type="button" {...buttonProps}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  danger: PropTypes.bool,
  small: PropTypes.bool,
  isActive: PropTypes.bool,
  faded: PropTypes.bool,
  disabled: PropTypes.bool,
  iconOnly: PropTypes.bool,
};

Button.defaultProps = {
  type: 'info',
};

export default Button;

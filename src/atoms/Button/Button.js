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

  isActive: css`
    background: ${({ theme }) => theme.primary};
    color: white;
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
  display: grid;
  grid-auto-flow: column;
  grid-gap: 8px;

  svg {
    height: 18px;
  }

  &:hover {
    transition: all 0.3s ease;
    background: ${({ theme }) => theme.primary};
    color: white;
  }

  ${(props) => props.danger && propsCSS.danger};
  ${(props) => props.small && propsCSS.small};
  ${(props) => props.isActive && propsCSS.isActive};
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
};

Button.defaultProps = {
  type: 'info',
};

export default Button;

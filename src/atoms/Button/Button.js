import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/macro';

const withOnText = (string) => `on${string.charAt(0).toUpperCase() + string.slice(1)}`;

const propsCSS = {
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.onSurface};
    border: 2px solid
      ${({ theme, buttonType }) => (buttonType ? theme.colors[buttonType] : theme.colors.secondary)};

    &:hover {
      background-color: ${({ theme, buttonType }) =>
        buttonType ? theme.colors[buttonType] : theme.colors.secondary};
      color: ${({ theme, buttonType }) =>
        buttonType ? theme.colors[withOnText(buttonType)] : theme.colors.onSecondary};
    }
  `,

  small: css`
    font-size: 1.1rem;
    padding: 4px 9px;

    svg {
      height: 15px;
    }
  `,

  large: css`
    font-size: 1.5rem;
    padding: 8px 13px;
  `,

  buttonType: css`
    background: ${({ theme, buttonType }) => theme.colors[buttonType]};
    color: ${({ theme, buttonType }) => theme.colors[withOnText(buttonType)]};

    &:hover {
      background: ${({ theme, buttonType }) => theme.colors.darker(1, buttonType)};
    }
  `,
};

const StyledButton = styled.button`
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  padding: ${({ theme }) => theme.sizes.spacingInput};
  background: ${({ theme }) => theme.colors.secondary};
  border: none;
  color: ${({ theme }) => theme.colors.onSecondary};
  cursor: pointer;
  font-size: 1.3rem;
  border: 2px solid
    ${({ theme, buttonType }) => (buttonType ? theme.colors[buttonType] : theme.colors.secondary)};
  display: flex;
  align-items: center;
  display: inline-block;

  &:hover {
    background: ${({ theme }) => theme.colors.darker(1, 'secondary')};
    border: 2px solid
      ${({ theme, buttonType }) =>
        buttonType ? theme.colors.darker(1, buttonType) : theme.colors.darker(1, 'secondary')};
  }

  /* svg {
    height: 17px;
  } */

  & > *:not(:last-child) {
    margin-right: 6px;
  }

  ${(props) => props.buttonType && propsCSS.buttonType};
  ${(props) => props.size === 'small' && propsCSS.small};
  ${(props) => props.size === 'large' && propsCSS.large};
  ${(props) => props.outline && propsCSS.outline};
`;

const Button = ({ children, ...buttonProps }) => (
  <StyledButton type="button" {...buttonProps}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonType: PropTypes.oneOf(['error', 'success', 'warning', 'info']),
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  outline: PropTypes.bool,
};

Button.defaultProps = {
  type: 'info',
  size: 'normal',
  outline: false,
};

export default Button;

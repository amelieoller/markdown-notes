import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: white;
  color: ${props => props.theme.primaryHighlight};
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid ${props => props.theme.primaryHighlight};
  border-radius: 3px;
  cursor: pointer;

  &:hover,
  &:active {
    background: ${props => props.theme.primaryHighlight};
    color: white;
  }
`;

const Button = ({ text, onClick, primary }) => (
  <StyledButton type="submit" onClick={() => onClick()}>
    {text}
  </StyledButton>
);

export default Button;

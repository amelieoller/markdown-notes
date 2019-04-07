import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  background: white;
  color: ${props => props.theme.primaryHighlight};
  font-size: ${props => (props.small ? '.8em' : '1em')};
  padding: ${props => (props.small ? '0.1em .4em' : '0.25em 1em')};
  border: 2px solid ${props => props.theme.primaryHighlight};
  border-radius: 3px;
  cursor: pointer;

  &:hover,
  &:active {
    transition: all 0.3s ease;
    background-color: ${props => props.theme.primaryHighlight};
    color: white;
  }
`;

const Button = (props) => {
  const { text, onClick } = props;
  return (
    <StyledButton type="submit" onClick={() => onClick()} {...props}>
      {text}
    </StyledButton>
  );
};

Button.defaultProps = {
  text: 'Submit',
};

Button.propTypes = {
  text: PropTypes.string,
};

export default Button;

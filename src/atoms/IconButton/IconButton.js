import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const StyledIconButton = styled.button`
  flex: 0 0 auto;
  color: ${({ theme, color }) => theme[color] || color};
  overflow: visible;
  font-size: ${({ fontSize }) => `${fontSize}rem`};
  text-align: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border: 0;
  margin: 0;
  cursor: pointer;
  display: inline-flex;
  position: relative;
  align-items: center;
  user-select: none;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
  background-color: ${({ theme, background }) => theme[background] || background};
  border-radius: 50%;
  padding: 5px;

  &:hover,
  &:focus {
    color: ${({ theme, hoverColor }) => theme[hoverColor] || hoverColor};
  }
`;

const IconButton = (props) => {
  const { children, onClick, onKeyDown } = props;

  return (
    <StyledIconButton role="button" tabIndex={0} onClick={onClick} onKeyDown={onKeyDown} {...props}>
      {children}
    </StyledIconButton>
  );
};

IconButton.defaultProps = {
  fontSize: 1,
  color: 'onBackground',
  className: '',
  round: false,
  background: 'transparent',
  hoverColor: 'primary',
};

IconButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),
  onClick: PropTypes.func.isRequired,
  fontSize: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  round: PropTypes.bool,
  background: PropTypes.string,
  onKeyDown: PropTypes.func,
};

export default IconButton;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Tag = ({ onClick, text, onDelete, isActive }) => {
  return (
    <StyledTag onClick={onClick} isActive={isActive}>
      {text}
      <DeleteButton id="delete" onClick={onDelete}>
        x
      </DeleteButton>
    </StyledTag>
  );
};

const StyledTag = styled.span`
  background: ${({ isActive, theme }) => (isActive ? theme.primary : 'transparent')};
  font-size: 0.8em;
  font-weight: 300;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.primary};
  padding: 6px 12px;
  border-radius: 15px;
  border-color: ${(props) => props.theme.primary};

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.primary};
    transition: background-color 0.1s ease;
  }
`;

const DeleteButton = styled.span`
  color: ${({ theme }) => theme.primary};
  margin-left: 8px;

  &:hover {
    transition: color 0.1s ease;
    color: white;
  }
`;

Tag.propTypes = {
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Tag;

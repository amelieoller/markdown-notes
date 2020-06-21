import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ReactComponent as Minus } from '../../assets/icons/minus.svg';
import IconButton from '../../atoms/IconButton/IconButton';

const SidebarItem = ({ item, handleItemClick, isActive, handleDeleteItem, dark }) => {
  return (
    <StyledSidebarItem
      onClick={(e) => e.target.id !== 'delete' && handleItemClick(item)}
      isActive={isActive}
      dark={dark}
    >
      {item.title}
      <IconButton
        onClick={() => {
          const result = window.confirm(`Are you sure you want to delete '${item.title}...'?`);
          result && handleDeleteItem(item.id);
        }}
        id="delete"
        color={dark ? 'onSurface' : 'onSurfaceTwo'}
        hoverColor={dark ? 'onSurfacePrimary' : 'onSurfaceTwoPrimary'}
      >
        <Minus />
      </IconButton>
    </StyledSidebarItem>
  );
};

const StyledSidebarItem = styled.div`
  cursor: pointer;
  padding: 6px 30px;
  padding-left: ${({ isActive }) => (isActive ? '27px' : '30px')};
  background: ${({ isActive, dark, theme }) =>
    isActive && dark ? theme.onSurfaceLight : isActive && theme.onSurfaceTwoLight};
  border-left: ${({ isActive, theme }) => isActive && `3px solid ${theme.onSurfacePrimary}`};
  color: ${({ isActive, dark, theme }) =>
    isActive && dark ? theme.onSurfacePrimary : isActive && theme.onSurfaceTwoPrimary};
  display: flex;
  justify-content: space-between;

  svg {
    height: 14px;
    width: 14px;
  }

  &:hover {
    background: ${({ theme }) => theme.textLight};
  }
`;

SidebarItem.propTypes = {
  item: PropTypes.shape({ title: PropTypes.string }),
  handleItemClick: PropTypes.func,
  handleDeleteItem: PropTypes.func,
  isActive: PropTypes.bool,
};

export default SidebarItem;

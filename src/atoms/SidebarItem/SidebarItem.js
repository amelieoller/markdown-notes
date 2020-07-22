import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { ReactComponent as Minus } from '../../assets/icons/minus.svg';
import Button from '../Button';

const SidebarItem = ({ item, handleItemClick, isActive, dark, deleteIcon, handleDeleteItem }) => {
  return (
    <StyledSidebarItem
      onClick={(e) => e.target.id !== 'delete' && handleItemClick(item)}
      onKeyDown={(e) => e.key === 'Enter' && handleItemClick(item)}
      isActive={isActive}
      dark={dark}
      role="button"
      tabIndex={0}
    >
      <Title>{item.title}</Title>

      {deleteIcon && (
        <Button
          onClick={() => {
            const result = window.confirm(`Are you sure you want to delete '${item.title}...'?`);
            result && handleDeleteItem(item.id);
          }}
          id="delete"
          color={dark ? 'onSurface' : 'onSurfaceTwo'}
          hoverColor={dark ? 'onSurfacePrimary' : 'onSurfaceTwoPrimary'}
          label={`Delete ${item.title}`}
          iconOnly
        >
          <Minus />
        </Button>
      )}
    </StyledSidebarItem>
  );
};

const StyledSidebarItem = styled.div`
  cursor: pointer;
  padding: 7px ${({ theme }) => theme.spacingLarge};
  padding-left: ${({ isActive, theme }) => (isActive ? '17px' : theme.spacingLarge)};
  background: ${({ isActive, dark, theme }) =>
    isActive && dark ? theme.onSurfaceLight : isActive && theme.onSurfaceTwoLight};
  border-left: ${({ isActive, theme }) => isActive && `3px solid ${theme.onSurfacePrimary}`};
  color: ${({ isActive, dark, theme }) =>
    isActive && dark ? theme.onSurfacePrimary : isActive && theme.onSurfaceTwoPrimary};
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    height: 10px;
    width: 14px;
  }

  button {
    padding: 0;
  }

  &:hover,
  &:focus {
    background: ${({ dark, theme }) => (dark ? theme.onSurfaceLight : theme.onSurfaceTwoLight)};
    color: ${({ dark, theme }) => (dark ? theme.onSurfacePrimary : theme.onSurfaceTwoPrimary)};
    outline: none;

    .title-with-icon svg {
      fill: ${({ dark, theme }) => (dark ? theme.onSurfacePrimary : theme.onSurfaceTwoPrimary)};
    }

    .title-with-icon svg.color {
      color: ${({ dark, theme }) => (dark ? theme.onSurfacePrimary : theme.onSurfaceTwoPrimary)};
      fill: none;
    }
  }
`;

const Title = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

SidebarItem.propTypes = {
  item: PropTypes.shape({ title: PropTypes.string }),
  handleItemClick: PropTypes.func,
  isActive: PropTypes.bool,
  id: PropTypes.string,
  language: PropTypes.string,
};

export default SidebarItem;

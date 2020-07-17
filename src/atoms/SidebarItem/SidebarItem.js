import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { ReactComponent as Minus } from '../../assets/icons/minus.svg';
import { ReactComponent as JavaScript } from '../../assets/icons/javascript.svg';
import { ReactComponent as Ruby } from '../../assets/icons/ruby.svg';
import { ReactComponent as ReactIcon } from '../../assets/icons/react.svg';
import { ReactComponent as Css } from '../../assets/icons/css3.svg';
import { ReactComponent as Html } from '../../assets/icons/html5.svg';
import { ReactComponent as Python } from '../../assets/icons/python.svg';
import { ReactComponent as Code } from '../../assets/icons/code.svg';
import { ReactComponent as Git } from '../../assets/icons/git.svg';
import { ReactComponent as Sass } from '../../assets/icons/sass.svg';
import { ReactComponent as Yarn } from '../../assets/icons/yarn.svg';
import { ReactComponent as Terminal } from '../../assets/icons/terminal.svg';
import Button from '../Button';

const SidebarItem = ({ item, handleItemClick, isActive, dark, deleteIcon, handleDeleteItem }) => {
  const getIcon = (language) => {
    switch (language) {
      case 'javascript':
        return <JavaScript />;
      case 'css':
        return <Css />;
      case 'html':
        return <Html />;
      case 'react':
        return <ReactIcon />;
      case 'python':
        return <Python />;
      case 'git':
        return <Git />;
      case 'sass':
        return <Sass />;
      case 'yarn':
        return <Yarn />;
      case 'ruby':
        return <Ruby />;
      case 'terminal':
        return <Terminal />;
      default:
        return <Code />;
    }
  };

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

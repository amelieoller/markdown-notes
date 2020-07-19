import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import SidebarItem from '../../atoms/SidebarItem/SidebarItem';

import { ReactComponent as ChevronsLeft } from '../../assets/icons/chevrons-left.svg';
import { ReactComponent as ChevronsRight } from '../../assets/icons/chevrons-right.svg';
import IconButton from '../../atoms/IconButton/IconButton';

const LectureSidebar = ({
  items,
  handleItemClick,
  handleDeleteItem,
  dark,
  children,
  currentActiveItem,
  isOpen,
  deleteIcon,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    setActiveItem(currentActiveItem);
  }, [currentActiveItem]);

  const handleClick = (item) => {
    handleItemClick(item);
    setActiveItem(item);
  };

  const handleDeleteButtonClick = (itemId) => {
    handleDeleteItem(itemId);
    setActiveItem(null);
  };

  return (
    <StyledLectureSidebar dark={dark} isSidebarOpen={isSidebarOpen}>
      <SidebarHeader isSidebarOpen={isSidebarOpen}>{children}</SidebarHeader>

      <ScrollArea>
        {items &&
          items
            .filter((i) => !!i)
            .map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                handleItemClick={handleClick}
                handleDeleteItem={handleDeleteButtonClick}
                isActive={activeItem && activeItem.id === item.id}
                dark={dark}
                deleteIcon={deleteIcon}
              />
            ))}
      </ScrollArea>

      <CollapseButton>
        <IconButton
          onClick={() => setIsSidebarOpen((prevOpen) => !prevOpen)}
          color={dark ? 'onSurfacePrimary' : 'onSurfacePrimary'}
          hoverColor="primaryDark"
          background={dark ? 'onSurfaceTwoPrimary' : 'primary'}
        >
          {isSidebarOpen ? <ChevronsLeft /> : <ChevronsRight />}
        </IconButton>
      </CollapseButton>
    </StyledLectureSidebar>
  );
};

const StyledLectureSidebar = styled.div`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? '255px' : '55px')};
  transition: 1s ease;
  background: ${({ theme, dark }) => (dark ? theme.surface : theme.surfaceTwo)};
  color: ${({ theme, dark }) => (dark ? theme.onSurface : theme.onSurfaceTwo)};
  height: 100%;
  padding: ${({ theme }) => theme.spacingLarge} 0;
  position: relative;
`;

const SidebarHeader = styled.div`
  & > *:first-child {
    font-size: 19px;
    font-weight: bold;
    margin: 0 ${({ theme }) => theme.spacingLarge};
    margin-bottom: ${({ theme }) => theme.spacingLarge};
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > button {
      padding: 0;
    }

    svg {
      height: 15px;
      width: 15px;
    }

    & > *:first-child {
      display: flex;
      align-items: center;

      & > h4 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
      }

      & > :first-child {
        margin-right: ${({ isSidebarOpen }) => (isSidebarOpen ? '10px' : '20px')};
        transition: all 0.6s ease;
      }
    }

    & > :last-child {
      margin-left: 10px;
    }
  }

  & > *:last-child {
    margin-bottom: ${({ theme }) => theme.spacing};
  }
`;

const ScrollArea = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 150px;
`;

const CollapseButton = styled.span`
  position: absolute;
  left: 12.5px;
  bottom: 12.5px;
`;

LectureSidebar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  handleItemClick: PropTypes.func,
};

LectureSidebar.defaultProps = {
  showButton: true,
};

export default LectureSidebar;

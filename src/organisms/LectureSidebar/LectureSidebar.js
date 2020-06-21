import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SidebarItem from '../../atoms/SidebarItem/SidebarItem';

import { ReactComponent as ChevronsLeft } from '../../assets/icons/chevrons-left.svg';
import { ReactComponent as ChevronsRight } from '../../assets/icons/chevrons-right.svg';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import IconButton from '../../atoms/IconButton/IconButton';

const LectureSidebar = ({
  sidebarTitle,
  items,
  handleAddClick,
  handleItemClick,
  handleDeleteItem,
  buttonText,
  showButton,
  dark,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    handleItemClick(item);
    setActiveItem(item);
  };

  const handleAddButtonClick = () => {
    handleAddClick();
    setActiveItem(null);
  };

  const handleDeleteButtonClick = (itemId) => {
    handleDeleteItem(itemId);
    setActiveItem(null);
  };

  return (
    <StyledLectureSidebar dark={dark} isSidebarOpen={isSidebarOpen}>
      <CollapseButton>
        <IconButton
          onClick={() => setIsSidebarOpen((prevOpen) => !prevOpen)}
          color={dark ? 'onSurface' : 'onSurfaceTwo'}
          hoverColor={dark ? 'onSurfacePrimary' : 'onSurfaceTwoPrimary'}
        >
          {isSidebarOpen ? <ChevronsLeft /> : <ChevronsRight />}
        </IconButton>
      </CollapseButton>
      <TitleArea>
        {sidebarTitle}

        <IconButton
          onClick={handleAddButtonClick}
          color={dark ? 'onSurface' : 'onSurfaceTwo'}
          hoverColor={dark ? 'onSurfacePrimary' : 'onSurfaceTwoPrimary'}
        >
          <Plus />
        </IconButton>
      </TitleArea>

      {items &&
        items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            handleItemClick={handleClick}
            handleDeleteItem={handleDeleteButtonClick}
            isActive={activeItem && activeItem.id === item.id}
            dark={dark}
          />
        ))}
    </StyledLectureSidebar>
  );
};

const StyledLectureSidebar = styled.div`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? '255px' : '50px')};
  transition: 1s ease;
  background: ${({ theme, dark }) => (dark ? theme.surface : theme.surfaceTwo)};
  color: ${({ theme, dark }) => (dark ? theme.onSurface : theme.onSurfaceTwo)};
  height: 100%;
  padding: ${({ theme }) => theme.spacingLarge} 0;
`;

const TitleArea = styled.h4`
  font-size: 19px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 ${({ theme }) => theme.spacingLarge};
  margin-bottom: 25px;

  svg {
    height: 14px;
    width: 14px;
  }
`;

const CollapseButton = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacingLarge};
  bottom: ${({ theme }) => theme.spacingLarge};
`;

LectureSidebar.propTypes = {
  sidebarTitle: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  handleAddClick: PropTypes.func,
  handleItemClick: PropTypes.func,
};

LectureSidebar.defaultProps = {
  sidebarTitle: 'Lectures',
  showButton: true,
};

export default LectureSidebar;

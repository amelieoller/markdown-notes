import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import SidebarItem from '../../atoms/SidebarItem/SidebarItem';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { ReactComponent as ChevronsLeft } from '../../assets/icons/chevrons-left.svg';
import { ReactComponent as ChevronsRight } from '../../assets/icons/chevrons-right.svg';
import IconButton from '../../atoms/IconButton/IconButton';
import Search from '../../components/Search';

const SortableItem = SortableElement(
  ({ item, handleClick, handleDeleteButtonClick, dark, activeItem }) => (
    <SidebarItem
      key={item}
      item={item}
      handleItemClick={handleClick}
      handleDeleteItem={handleDeleteButtonClick}
      isActive={activeItem && activeItem.id === item.id}
      dark={dark}
    />
  ),
);

const SortableList = SortableContainer(
  ({ items, handleClick, handleDeleteButtonClick, dark, activeItem }) => {
    return (
      <div>
        {items.map((item, index) => (
          <SortableItem
            key={item.id}
            item={item}
            index={index}
            handleClick={handleClick}
            handleDeleteButtonClick={handleDeleteButtonClick}
            dark={dark}
            activeItem={activeItem}
          />
        ))}
      </div>
    );
  },
);

const LectureSidebarDraggable = ({
  items,
  handleItemClick,
  handleDeleteItem,
  dark,
  children,
  handleNoteReorder,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    if (items) {
      setSortedItems(items);
    }
  }, [items]);

  const handleClick = (item) => {
    console.log('clicked');
    // handleItemClick(item);
    // setActiveItem(item);
  };

  const handleDeleteButtonClick = (itemId) => {
    handleDeleteItem(itemId);
    setActiveItem(null);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newOrderedNotes = arrayMove(sortedItems, oldIndex, newIndex);

    handleNoteReorder(newOrderedNotes);
    setSortedItems(newOrderedNotes);
  };

  return (
    <StyledLectureSidebarDraggable dark={dark} isSidebarOpen={isSidebarOpen}>
      <SidebarHeader>
        <CollapseButton>
          <IconButton
            onClick={() => setIsSidebarOpen((prevOpen) => !prevOpen)}
            color={dark ? 'onSurface' : 'onSurfaceTwo'}
            hoverColor={dark ? 'onSurfacePrimary' : 'onSurfaceTwoPrimary'}
            background={dark ? 'onSurfaceLight' : 'onSurfaceTwoLight'}
          >
            {isSidebarOpen ? <ChevronsLeft /> : <ChevronsRight />}
          </IconButton>
        </CollapseButton>

        <TitleArea>{children.length ? children[0] : children}</TitleArea>
        {children.length && <SearchArea>{children[1]}</SearchArea>}
      </SidebarHeader>

      <ScrollArea>
        <SortableList
          onSortEnd={onSortEnd}
          items={sortedItems}
          handleClick={handleClick}
          handleDeleteButtonClick={handleDeleteButtonClick}
          dark={dark}
          activeItem={activeItem}
          pressDelay={100}
        />
      </ScrollArea>
    </StyledLectureSidebarDraggable>
  );
};

const StyledLectureSidebarDraggable = styled.div`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? '255px' : '55px')};
  transition: 1s ease;
  background: ${({ theme, dark }) => (dark ? theme.surface : theme.surfaceTwo)};
  color: ${({ theme, dark }) => (dark ? theme.onSurface : theme.onSurfaceTwo)};
  height: 100%;
  padding: ${({ theme }) => theme.spacingLarge} 0;
`;

const SidebarHeader = styled.div``;

const ScrollArea = styled.div``;

const TitleArea = styled.h4`
  font-size: 19px;
  font-weight: bold;
  margin: 0 ${({ theme }) => theme.spacingLarge};
  margin-bottom: ${({ theme }) => theme.spacingLarge};
  display: grid;
  grid-template-columns: 27px auto 30px;
  align-items: center;

  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > *:first-child svg {
    margin-right: 15px;
  }

  svg {
    height: 15px;
    width: 15px;
  }
`;

const SearchArea = styled.div``;

const CollapseButton = styled.span`
  position: absolute;
  left: 12.5px;
  bottom: 12.5px;
`;

LectureSidebarDraggable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  handleAddClick: PropTypes.func,
  handleItemClick: PropTypes.func,
};

LectureSidebarDraggable.defaultProps = {
  showButton: true,
};

export default LectureSidebarDraggable;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import SidebarItem from '../../atoms/SidebarItem/SidebarItem';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { ReactComponent as ChevronsLeft } from '../../assets/icons/chevrons-left.svg';
import { ReactComponent as ChevronsRight } from '../../assets/icons/chevrons-right.svg';
import IconButton from '../../atoms/IconButton/IconButton';

const SortableItem = SortableElement(
  ({ item, handleClick, handleDeleteItem, dark, activeItem, deleteIcon }) => (
    <SidebarItem
      key={item}
      item={item}
      handleItemClick={handleClick}
      handleDeleteItem={handleDeleteItem}
      isActive={activeItem && activeItem.id === item.id}
      dark={dark}
      deleteIcon={deleteIcon}
    />
  ),
);

const SortableList = SortableContainer(
  ({ items, handleClick, handleDeleteItem, dark, activeItem, deleteIcon }) => {
    return (
      <div>
        {items.map((item, index) => (
          <SortableItem
            key={item.id}
            item={item}
            index={index}
            handleClick={handleClick}
            handleDeleteItem={handleDeleteItem}
            dark={dark}
            activeItem={activeItem}
            deleteIcon={deleteIcon}
          />
        ))}
      </div>
    );
  },
);

const LectureSidebarDraggable = ({
  items,
  handleItemClick,
  dark,
  children,
  handleNoteReorder,
  isOpen,
  deleteIcon,
  handleDeleteItem,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const [activeItem, setActiveItem] = useState(null);
  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    if (items) {
      setSortedItems(items.filter((i) => i));
    }
  }, [items]);

  const handleClick = (item) => {
    document.getElementById(item.id).scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newOrderedNotes = arrayMove(sortedItems, oldIndex, newIndex);

    handleNoteReorder(newOrderedNotes);
    setSortedItems(newOrderedNotes);
  };

  return (
    <StyledLectureSidebarDraggable dark={dark} isSidebarOpen={isSidebarOpen}>
      <SidebarHeader>{children}</SidebarHeader>

      <ScrollArea>
        <SortableList
          onSortEnd={onSortEnd}
          items={sortedItems}
          handleClick={handleClick}
          dark={dark}
          activeItem={activeItem}
          pressDelay={100}
          deleteIcon={deleteIcon}
          handleDeleteItem={handleDeleteItem}
        />
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
  padding-bottom: 120px;
`;

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

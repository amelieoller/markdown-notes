import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Filter = ({ filterTags }) => {
  const tags = useSelector((state) => state.firestore.ordered.tags);

  const handleFilterChange = (e) => {
    const tagId = e.target.value;
    filterTags(tagId);
  };

  return (
    <TagFilter name="" id="" defaultValue="filter" onChange={handleFilterChange}>
      <option value="filter">Filter</option>
      {tags &&
        tags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
    </TagFilter>
  );
};

const TagFilter = styled.select`
  width: 100%;
  height: 30px;
  padding: 0 ${({ theme }) => theme.spacingLarge};
  color: ${({ theme }) => theme.background};
  font-size: 1rem;
  border: none;
  background: #5f616b;
  border-radius: 0;

  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: linear-gradient(45deg, transparent 50%, #363740 50%),
    linear-gradient(135deg, #363740 50%, transparent 50%);
  background-position: calc(100% - 28px) calc(1em + -3px), calc(100% - 23px) calc(1em + -3px);
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
`;

Filter.propTypes = {};

export default Filter;

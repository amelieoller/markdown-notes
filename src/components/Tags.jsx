import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import CreateTag from './CreateTag';
import { deleteTag } from '../actions/tagActions';
import Tag from '../atoms/Tag';

const Tags = ({ updateFilteredTagIds, filteredTagIds }) => {
  const tags = useSelector((state) => state.firestore.ordered.tags);
  const dispatch = useDispatch();

  return (
    <>
      {tags &&
        tags.map((tag) => (
          <Tag
            key={tag.id}
            onClick={(e) => e.target.id !== 'delete' && updateFilteredTagIds(tag.id)}
            text={tag.name}
            onDelete={() => {
              const result = window.confirm(`Are you sure you want to delete '${tag.name}'?`);
              result && dispatch(deleteTag(tag.id));
            }}
            isActive={filteredTagIds.includes(tag.id)}
          />
        ))}
      <CreateTag />
    </>
  );
};

Tags.propTypes = {
  updateFilteredTagIds: PropTypes.func.isRequired,
  filteredTagIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Tags.defaultProps = { tags: [] };

export default Tags;

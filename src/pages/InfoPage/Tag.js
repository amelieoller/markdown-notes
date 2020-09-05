import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import Button from '../../atoms/Button';
import { deleteTag, updateTag } from '../../actions/tagActions';
import { ReactComponent as X } from '../../assets/icons/x.svg';

const Tag = ({ tag }) => {
  const dispatch = useDispatch();

  const [tagName, setTagName] = useState(tag.name);

  const onDeleteTag = (tagId) => dispatch(deleteTag(tagId));

  const onUpdateTag = () => {
    if (tagName === tag.name) return;

    if (tagName) {
      dispatch(updateTag({ ...tag, name: tagName }));
    } else {
      setTagName(tag.name);
    }
  };

  return (
    <tr>
      <td>
        <StyledInput
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          onBlur={onUpdateTag}
        />
      </td>
      <td className="right">
        <Button
          onClick={() => {
            const result = window.confirm(`Are you sure you want to delete '${tag.name}...'?`);
            result && onDeleteTag(tag.id);
          }}
          label={`Delete tag "${tag.name}"`}
          small
          iconOnly
        >
          <X />
        </Button>
      </td>
    </tr>
  );
};

const StyledInput = styled.input`
  background: transparent;
  border: none;
  font-size: 100%;
  font-weight: 100;
  width: 100%;
`;

Tag.propTypes = {
  tag: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default Tag;

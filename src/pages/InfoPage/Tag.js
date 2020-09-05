import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Button from '../../atoms/Button';
import { deleteTag } from '../../actions/tagActions';
import { ReactComponent as X } from '../../assets/icons/x.svg';

const Tag = ({ tag }) => {
  const dispatch = useDispatch();

  const onDeleteTag = (tagId) => dispatch(deleteTag(tagId));

  return (
    <tr>
      <td>{tag.name}</td>
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

Tag.propTypes = {
  tag: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default Tag;

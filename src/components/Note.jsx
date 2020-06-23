import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { deleteNote } from '../actions/noteActions';
import MarkdownFormattedText from './MarkdownFormattedText';
import Button from './Button';
import Icon from './Icon';
import { ICONS } from '../constants';

const Note = ({ note }) => {
  const tags = useSelector((state) => state.firestore.ordered.tags);
  const dispatch = useDispatch();

  return (
    <StyledNote>
      <MarkdownFormattedText content={note.content} />

      <Icon
        className="clear-button"
        onClick={() => {
          const result = window.confirm(
            `Are you sure you want to delete '${note.content.substr(0, 25)}...'?`,
          );
          result && dispatch(deleteNote(note.id));
        }}
        icon={ICONS.TRASH}
        color="#909598"
        size={16}
      />
      <div className="footer">
        <div className="left">
          <Button
            text="Edit"
            onClick={() => {
              dispatch({ type: 'SET_CURRENT_NOTE', note });
            }}
          />
        </div>
        <div className="right tags">
          {tags &&
            note.tagIds &&
            tags
              .filter((t) => note.tagIds.includes(t.id))
              .map((tag) => (
                <div key={tag.id} className="tag">
                  {tag.name}
                </div>
              ))}
        </div>
      </div>
    </StyledNote>
  );
};

const StyledNote = styled.div`
  display: inline-block;
  width: 100%;
  background: #fff;
  margin-bottom: 1em;
  position: relative;
  border: 1px solid #adadad;

  .clear-button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.5rem;
    cursor: pointer;
    filter: drop-shadow(2px 2px 1.4px rgba(0, 0, 0, 0.3));

    &:hover path {
      transition: fill 0.3s ease;
      fill: ${(props) => props.theme.primary} !important;
    }
  }

  .footer {
    border-top: 1px solid rgba(0, 0, 0, 0.125);
    background-color: rgba(0, 0, 0, 0.03);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4em 0.8em;
  }

  .footer .left button {
    margin-right: 0.25em;
  }

  .tags.right {
    display: flex;
    font-weight: 300;
    flex-wrap: wrap;

    .tag {
      margin-left: 7px;
    }
  }
`;

Note.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string,
    created: PropTypes.object,
    id: PropTypes.string,
    tagIds: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Note;

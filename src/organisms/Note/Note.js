import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { deleteNote } from '../../actions/noteActions';
import MarkdownFormattedText from '../../components/MarkdownFormattedText';
import Button from '../../components/Button';
import { ReactComponent as ChevronsDown } from '../../assets/icons/chevrons-down.svg';
import { ReactComponent as ChevronsUp } from '../../assets/icons/chevrons-up.svg';
import IconButton from '../../atoms/IconButton/IconButton';

const Note = ({ note, setShowAddLecture }) => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.firestore.ordered.tags);

  const noteSections = note.content.split('---');

  const [endPoint, setEndPoint] = useState(1);

  const filterTags = () => {
    return tags
      .filter((t) => note.tagIds.includes(t.id))
      .map((tag) => (
        <div key={tag.id} className="tag">
          {tag.name}
        </div>
      ));
  };

  return (
    <StyledNote>
      <MarkdownFormattedText key={note.id} content={noteSections.slice(0, endPoint).join('---')} />

      <Footer>
        {noteSections.length > 1 && (
          <MoreLess>
            {endPoint !== noteSections.length && (
              <IconButton
                onClick={() => {
                  setEndPoint(endPoint + 1);
                }}
                color="onBackgroundLight"
                hoverColor="primary"
              >
                <ChevronsDown />
              </IconButton>
            )}

            {endPoint !== 1 && (
              <IconButton
                onClick={() => {
                  setEndPoint(endPoint - 1);
                }}
                color="onBackgroundLight"
                hoverColor="primary"
              >
                <ChevronsUp />
              </IconButton>
            )}
          </MoreLess>
        )}

        {tags && !!note.tagIds.length && (
          <Tags>
            <span className="tag-label">Tags:</span>
            {filterTags()}
          </Tags>
        )}

        <Button
          text="Edit"
          onClick={() => {
            setShowAddLecture(true);
            dispatch({ type: 'SET_CURRENT_NOTE', note });
          }}
        />
      </Footer>
    </StyledNote>
  );
};

const StyledNote = styled.div``;

const Footer = styled.div`
  & > * {
    margin-bottom: 20px;
  }
`;

const MoreLess = styled.div`
  & > *:first-child {
    margin-right: ${({ theme }) => theme.spacing};
  }
`;

const Tags = styled.span`
  font-size: 85%;
  display: flex;
  font-style: italic;
  color: ${({ theme }) => theme.onBackgroundLight};

  & > * {
    margin-right: 4px;
  }

  & > *:not(:first-child):not(:last-child)::after {
    content: ' · ';
  }

  .tag-label {
    font-weight: bold;
  }
`;

Note.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    content: PropTypes.string,
    tagIds: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default Note;

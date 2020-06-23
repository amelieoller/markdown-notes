import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';

import MarkdownFormattedText from '../../components/MarkdownFormattedText';
import Button from '../../components/Button';

const Note = ({ note }) => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.firestore.ordered.tags);

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
      <MarkdownFormattedText key={note.id} content={note.content} />

      <Footer>
        {tags && !!note.tagIds.length && (
          <Tags>
            <span className="tag-label">Tags:</span>
            {filterTags()}
          </Tags>
        )}

        <Button
          text="Edit"
          onClick={() => {
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

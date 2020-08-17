import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import Search from './Search';
import Button from '../atoms/Button';

const LinkNotes = ({ addNoteIdLink, linkIds }) => {
  const [foundNotes, setFoundNotes] = useState([]);

  const getNoteIds = (notes) => {
    const newFilteredNotes = notes.filter((note) => !linkIds.includes(note.id));
    const prevFilteredNotes = foundNotes.filter((note) => linkIds.includes(note.id));
    setFoundNotes([...prevFilteredNotes, ...newFilteredNotes]);
  };

  const addLink = (noteId) => {
    addNoteIdLink(noteId);
  };

  const clearSearch = () => {
    setFoundNotes([]);
  };

  return (
    <StyledLinkNotes>
      <Search
        setSearchResultNotes={getNoteIds}
        placeholderText="Link Notes"
        clearSearch={clearSearch}
      />
      {!!foundNotes.length && (
        <FoundNotes>
          {foundNotes.map((note) => (
            <Button
              key={note.id}
              onClick={() => addLink(note.id)}
              isActive={linkIds && linkIds.includes(note.id)}
              label={note.title}
              small
              faded
            >
              {note.title}
            </Button>
          ))}
        </FoundNotes>
      )}
    </StyledLinkNotes>
  );
};

const StyledLinkNotes = styled.div``;

const FoundNotes = styled.div`
  padding: ${({ theme }) => theme.spacingLarge};
  padding-bottom: 0;
  display: grid;
  grid-gap: 3px;

  button {
    width: 100%;
    justify-content: left;
    overflow: hidden;
  }
`;

LinkNotes.propTypes = {
  addNoteIdLink: PropTypes.func,
  linkIds: PropTypes.arrayOf(PropTypes.string),
};

export default LinkNotes;

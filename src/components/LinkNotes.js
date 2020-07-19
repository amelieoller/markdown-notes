import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import Search from './Search';
import Button from '../atoms/Button';

const LinkNotes = ({ addNoteIdLink, linkIds, previousLinkedNotes }) => {
  const [foundNotes, setFoundNotes] = useState([]);

  useEffect(() => {
    setFoundNotes(previousLinkedNotes);
  }, [previousLinkedNotes]);

  const getNoteIds = (notes) => {
    const newFilteredNotes = notes.filter((note) => !linkIds.includes(note.id));
    const prevFilteredNotes = foundNotes.filter((note) => linkIds.includes(note.id));
    setFoundNotes([...prevFilteredNotes, ...newFilteredNotes]);
  };

  const addLink = (noteId) => {
    addNoteIdLink(noteId);
  };

  const clearSearch = () => {
    setFoundNotes((prevNotes) => prevNotes.filter((note) => linkIds.includes(note.id)));
  };

  return (
    <StyledLinkNotes>
      <Search
        setSearchResultNotes={getNoteIds}
        border
        placeholderText="Link Notes"
        clearSearch={clearSearch}
        small
      />
      {foundNotes &&
        foundNotes.map((note) => (
          <Button
            key={note.id}
            onClick={() => addLink(note.id)}
            isActive={linkIds && linkIds.includes(note.id)}
            small
            faded
          >
            {note.title}
          </Button>
        ))}
    </StyledLinkNotes>
  );
};

const StyledLinkNotes = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > *:first-child {
    max-width: 200px;
  }

  & > *:not(:last-child) {
    margin-right: 5px;
  }

  & > * {
    margin-bottom: 5px;
  }

  input {
    color: black;
  }
`;

LinkNotes.propTypes = {
  addNoteIdLink: PropTypes.func,
  linkIds: PropTypes.arrayOf(PropTypes.string),
  previousLinkedNotes: PropTypes.arrayOf(PropTypes.string),
};

export default LinkNotes;

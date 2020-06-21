import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Search from './Search';
import MarkdownFormattedText from './MarkdownFormattedText';
import Button from './Button';

const LinkNotes = ({ addNoteIdLink }) => {
  const [foundNotes, setFoundNotes] = useState([]);

  const getNoteIds = (notes) => {
    setFoundNotes(notes);
  };

  const addLink = (noteId) => {
    addNoteIdLink(noteId);
  };

  return (
    <StyledLinkNotes>
      <Search setSearchResultNotes={getNoteIds} placeholderText="Link Notes" />
      {foundNotes &&
        foundNotes.map((note) => (
          <Button key={note.id} onClick={() => addLink(note.id)} text={note.title} />
        ))}
    </StyledLinkNotes>
  );
};

const StyledLinkNotes = styled.div`
  background: white;
  min-height: 60px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  & > * {
    margin-right: 5px;
  }

  input {
    color: black;
  }
`;

const Results = styled.div``;

LinkNotes.propTypes = {};

export default LinkNotes;

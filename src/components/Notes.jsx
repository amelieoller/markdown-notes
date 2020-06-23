import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import Note from './Note';

const StyledNotes = styled.div`
  column-width: 30em;
  column-gap: 1em;
  margin: 1em auto;
  max-width: 120em;
  width: 95%;
`;

const filterBy = (notes, filterArr) =>
  filterArr.length !== 0 ? notes.filter((note) => filterArr.includes(note.id)) : notes;

const Notes = ({ filteredTagIds, filteredNoteIds }) => {
  const notes = useSelector((state) => state.firestore.ordered.notes);

  return (
    <StyledNotes>
      {notes &&
        filterBy(notes, filteredNoteIds)
          .filter((note) => filteredTagIds.every((tagId) => note.tagIds.includes(tagId)))
          .sort(
            (a, b) =>
              (b.updated ? b.updated.toDate() : new Date()) -
              (a.updated ? a.updated.toDate() : new Date()),
          )
          .map((note) => <Note key={note.id} note={note} />)}
    </StyledNotes>
  );
};

Notes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  filteredTagIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  filteredNoteIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Notes;

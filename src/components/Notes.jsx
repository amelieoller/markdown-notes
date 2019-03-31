import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Note from './Note';

const StyledNotes = styled.div`
  column-width: 30em;
  column-gap: 1em;
  margin: 1em auto;
  max-width: 120em;
  width: 95%;
`;

const filterBy = (notes, filterArr) => (filterArr.length !== 0 ? notes.filter(note => filterArr.includes(note.id)) : notes);

const Notes = ({
  notes, setEditNote, tagFilter, searchFilter,
}) => (
  <StyledNotes>
    {notes
      && filterBy(notes, searchFilter)
        .filter(note => tagFilter.every(tagId => note.tagIds.includes(tagId)))
        .sort(
          (a, b) => (b.updated ? b.updated.toDate() : new Date())
            - (a.updated ? a.updated.toDate() : new Date()),
        )
        .map(note => <Note key={note.id} note={note} setEditNote={setEditNote} />)}
  </StyledNotes>
);

Notes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  setEditNote: PropTypes.func.isRequired,
  tagFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  notes: state.firestore.ordered.notes,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'notes' }]),
)(Notes);

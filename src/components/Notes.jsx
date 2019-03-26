import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import Note from './Note';

const Notes = ({ notes, setEditNote, tagFilter }) => (
  <div className="notes">
    {notes
      && notes
        .filter(note => tagFilter.every(tagId => note.tagIds.includes(tagId)))
        .sort(
          (a, b) => (b.updated ? b.updated.toDate() : new Date())
            - (a.updated ? a.updated.toDate() : new Date()),
        )
        .map(note => <Note key={note.id} note={note} setEditNote={setEditNote} />)}
  </div>
);

Notes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  setEditNote: PropTypes.func.isRequired,
  tagFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  notes: state.firestore.ordered.notes,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'notes' }]),
)(Notes);

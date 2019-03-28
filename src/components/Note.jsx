import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { deleteNote } from '../actions/noteActions';
import MarkdownField from './MarkdownField';

const Note = ({
  note, deleteNote, setEditNote, tags,
}) => (
  <div className="note">
    <MarkdownField content={note.content} />
    <div className="footer">
      <div className="left">
        <button
          type="submit"
          onClick={() => {
            setEditNote(note);
          }}
          className="edit-button main-button btn"
        >
          Edit
        </button>
        <button
          type="submit"
          onClick={() => {
            const result = window.confirm('Want to delete?');
            result && deleteNote(note.id);
          }}
          className="delete-button btn"
        >
          Delete
        </button>
      </div>
      <div className="right tags">
        {note.tagIds
          && tags
            .filter(t => note.tagIds.includes(t.id))
            .map(tag => (
              <div key={tag.id} className="tag">
                {tag.name}
              </div>
            ))}
      </div>
    </div>
  </div>
);

Note.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string,
    created: PropTypes.object,
  }).isRequired,
  setEditNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = dispatch => ({
  deleteNote: key => dispatch(deleteNote(key)),
});

const mapStateToProps = state => ({
  tags: state.firestore.ordered.tags,
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([{ collection: 'tags' }]),
)(Note);

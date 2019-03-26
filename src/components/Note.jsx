import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import CodeBlock from './CodeBlock';
import { deleteNote } from '../actions/noteActions';

const Note = ({
  note, deleteNote, setEditNote, tags,
}) => (
  <div className="note">
    <Markdown
      options={{
        forceBlock: true,
        overrides: {
          code: {
            component: CodeBlock,
          },
        },
      }}
    >
      {note.content}
    </Markdown>
    <div className="footer">
      <div className="left">
        <button
          type="submit"
          onClick={() => {
            setEditNote(note);
          }}
          className="edit-button"
        >
          Edit
        </button>
        <button
          type="submit"
          onClick={() => {
            const result = window.confirm('Want to delete?');
            result && deleteNote(note.id);
          }}
          className="delete-button"
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

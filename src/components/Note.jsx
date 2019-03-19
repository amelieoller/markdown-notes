import React from 'react';
import Markdown from 'react-markdown/with-html';
import PropTypes from 'prop-types';
import CodeBlock from './CodeBlock';
import db from '../Firestore';

const handleDeleteNote = (key) => {
  db.collection('notes')
    .doc(key)
    .delete();
};

const Note = ({ note }) => (
  <div className="note">
    <Markdown
      className="result"
      source={note.content}
      renderers={{ code: CodeBlock }}
    />
    <div>
      <button
        type="submit"
        onClick={() => {
          handleDeleteNote(note.id);
        }}
        className="delete-button"
      >
            Delete
      </button>
    </div>
  </div>
);

Note.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string,
    created: PropTypes.instanceOf(Date),
  }).isRequired,
};

export default Note;

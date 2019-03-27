import React from 'react';
import PropTypes from 'prop-types';
import ResizableTextarea from './ResizableTextarea';
import MarkdownField from './MarkdownField';

const CreateNote = ({
  tags,
  addTag,
  handleNoteChange,
  handleNoteSubmit,
  handleNoteClear,
  editNote: { content, tagIds },
}) => (
  <div className="new-note-wrapper">
    <div className="note-input">
      <ResizableTextarea value={content} mdChange={handleNoteChange} />
      <div className="new-note-footer">
        <div className="left">
          <button className="main-button" type="submit" onClick={() => handleNoteSubmit()}>
            Save Note
          </button>
          <button type="submit" onClick={() => handleNoteClear()}>
            Clear
          </button>
        </div>
        <div className="right tags">
          {tags
            && tags.map(tag => (
              <div
                key={tag.id}
                className={tagIds.includes(tag.id) ? 'tag' : 'greyTag'}
                onClick={() => addTag(tag.id)}
              >
                {tag.name}
              </div>
            ))}
        </div>
      </div>
    </div>

    {content !== '' && (
      <div className="note-result">
        <MarkdownField content={content} />
      </div>
    )}
  </div>
);

CreateNote.propTypes = {
  addTag: PropTypes.func.isRequired,
  handleNoteChange: PropTypes.func.isRequired,
  handleNoteSubmit: PropTypes.func.isRequired,
  handleNoteClear: PropTypes.func.isRequired,
  editNote: PropTypes.shape({
    content: PropTypes.string.isRequired,
    tagIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object),
};

export default CreateNote;

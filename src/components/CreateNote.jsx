import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import ResizableTextarea from './ResizableTextarea';
import MarkdownField from './MarkdownField';

const slideInKeyframes = keyframes`
  0% {
    height: 0px;
  }
  99.9% {
    height: 48.78px;
  }
  100% {
    height: 100%;
  }
`;

const StyledCreateNote = styled.div`
  background: rgb(45, 45, 45);
  padding: 0.5em;
  display: grid;
  grid-template-columns: 1fr 1fr;

  .note-input {
    background: #f7f6f7;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 700px) {
      grid-column: span 2;
    }
  }

  .note-input textarea {
    resize: none;
  }

  .note-result {
    padding: 0.3em;
    white-space: pre-line;
    background: #f7f6f7;
    
    @media (max-width: 700px) {
      grid-column: span 2;
    }
    
    display: inline-block;
    animation-name: ${slideInKeyframes};
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
    
    @media (max-width: 700px) {
      border-top: 1px solid rgba(0, 0, 0, 0.125);
    }

    @media (min-width: 700px) {
      border-left: 1px solid rgba(0, 0, 0, 0.125);
    }
  }

  .new-note-footer {
    grid-column: span 2;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: flex-end;
    padding: 1em 0 0.5em 0;
  }

  .left button {
    margin-right: 1em;
  }

  .tags.right {
    display: flex;
    color: white;
  }
`;

const CreateNote = ({
  tags,
  addTag,
  handleNoteChange,
  handleNoteSubmit,
  handleNoteClear,
  editNote: { content, tagIds },
}) => (
  <StyledCreateNote>
    <div className="note-input">
      <ResizableTextarea value={content} mdChange={handleNoteChange} />
    </div>
    {content !== '' && (
      <div className="note-result">
        <MarkdownField content={content} />
      </div>
    )}
    <div className="new-note-footer">
      <div className="left">
        <button className="main-button btn" type="submit" onClick={() => handleNoteSubmit()}>
          Save Note
        </button>
        <button className="btn" type="submit" onClick={() => handleNoteClear()}>
          Clear
        </button>
      </div>
      <div className="right tags">
        {tags
          && tags.map(tag => (
            <span
              key={tag.id}
              className={tagIds.includes(tag.id) ? 'tag' : 'greyTag'}
              onClick={() => addTag(tag.id)}
            >
              {tag.name}
            </span>
          ))}
      </div>
    </div>
  </StyledCreateNote>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Controlled as CodeMirror } from 'react-codemirror2';
import MarkdownField from './MarkdownField';

require('codemirror/mode/markdown/markdown');

const slideInKeyframes = keyframes`
  0% {
    height: 0px;
  }
  99.9% {
    height: 62px;
  }
  100% {
    height: 100%;
  }
`;

const StyledCreateNote = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: 0px 1px 15px 1px rgba(0, 0, 0, 0.3);

  .editor-pane {
    position: relative;
    overflow: auto;
    min-height: 30px;
    @media (max-width: 700px) {
      grid-column: span 2;
    }
  }

  .result-pane {
    background: white;
    @media (max-width: 700px) {
      grid-column: span 2;
    }
  }

  .result-pane > div {
    position: relative;
    background: white;
    overflow: auto;
    padding: 10px;
    padding-left: 20px;

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
      grid-column: span 2;
    }
  }

  .editor textarea {
    padding: 20px;
  }

  .editor-pane textarea {
    min-height: 500px;
  }

  .new-note-footer {
    grid-column: span 2;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: flex-end;
    padding: 0.3em;
    background: white;

    .left button {
      margin-right: 1em;
    }

    .tags {
      color: #263238;
    }

    .tags.right {
      display: flex;
    }
  }
`;

class CreateNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      htmlMode: 'raw',
    };
  }

  handleControlsChange = (mode) => {
    this.setState({ htmlMode: mode });
  };

  render() {
    const { htmlMode } = this.state;
    const {
      tags,
      addTag,
      handleNoteChange,
      handleNoteSubmit,
      handleNoteClear,
      editNote: { content, tagIds },
    } = this.props;

    return (
      <StyledCreateNote>
        <div className="editor-pane">
          <CodeMirror
            value={content}
            options={{
              mode: 'markdown',
              theme: 'material',
              lineNumbers: true,
              autoScroll: true,
            }}
            onBeforeChange={(editor, data, value) => {
              handleNoteChange(value);
            }}
          />
        </div>

        <div className="result-pane">
          {content !== '' && <MarkdownField content={content} htmlMode={htmlMode} />}
        </div>
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
  }
}

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

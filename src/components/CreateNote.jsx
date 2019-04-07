import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Controlled as CodeMirror } from 'react-codemirror2';
import MarkdownField from './MarkdownField';
import Button from './Button';
import Icon from './Icon';
import { ICONS } from '../constants';

require('codemirror/mode/markdown/markdown');
require('codemirror/addon/edit/closetag');
require('codemirror/addon/edit/continuelist');
require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/comment/comment');
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/theme/material.css');

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

  .CodeMirror {
    height: auto;
    font-size: 16px;
  }

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
    position: relative;
    @media (max-width: 700px) {
      grid-column: span 2;
    }
  }

  .result-pane > div {
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

  .result {
    width: 100%;
  }

  .clear-button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
    cursor: pointer;

    &:hover path {
      transition: fill 0.3s ease;
      fill: ${props => props.theme.primaryHighlight} !important;
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

      button {
        position: relative;
        color: #263238;
        text-decoration: none;
        border: none;
        margin: 0.2em 0.3em;
        font-size: 0.9em;
        font-weight: 300;
        cursor: pointer;
      }

      button:hover {
        color: #263238;
      }

      button:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0;
        left: 0;
        background-color: #263238;
        visibility: hidden;
        transform: scaleX(0);
        transition: all 0.3s ease-in-out 0s;
      }

      button:hover:before,
      button.highlighted:before {
        visibility: visible;
        transform: scaleX(1);
      }
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
              viewportMargin: Infinity,
              lineNumbers: true,
              autoScroll: true,
              autoCursor: true,
              lineWrapping: true,
              autoCloseTags: true,
              tabSize: 2,
              autofocus: true,
              autoCloseBrackets: true,
              toggleComment: true,
              extraKeys: {
                Enter: 'newlineAndIndentContinueMarkdownList',
                'Cmd-/': 'toggleComment',
              },
            }}
            onBeforeChange={(editor, data, value) => {
              handleNoteChange(value);
            }}
          />
        </div>

        <div className="result-pane">
          {content !== '' && (
            <>
              <MarkdownField content={content} htmlMode={htmlMode} />
              <Icon
                className="clear-button"
                onClick={handleNoteClear}
                icon={ICONS.TRASH}
                color="#d8d8d8"
                size={14}
              />
            </>
          )}
        </div>
        <div className="new-note-footer">
          <div className="left">
            <Button onClick={handleNoteSubmit} text="Save Note" />
            {/* <Button onClick={handleNoteClear} text="Clear" small /> */}
          </div>
          <div className="right tags">
            {tags
              && tags.map(tag => (
                <button
                  key={tag.id}
                  className={tagIds.includes(tag.id) ? 'tag highlighted' : 'tag'}
                  onClick={() => addTag(tag.id)}
                  type="button"
                >
                  {tag.name}
                </button>
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

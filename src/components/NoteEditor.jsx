import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useFirestore } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';

import { createNote, updateNote } from '../actions/noteActions';
import MarkdownFormattedText from './MarkdownFormattedText';
import Button from './Button';
import LinkNotes from './LinkNotes';
import { addOrRemoveFromArr, getTitle } from './utils';
import Languages from '../molecules/Languages';

require('codemirror/mode/markdown/markdown');
require('codemirror/addon/edit/closetag');
require('codemirror/addon/edit/continuelist');
require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/comment/comment');
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/theme/material.css');

const NoteEditor = () => {
  const { currentNote } = useSelector((state) => state);
  const tags = useSelector((state) => state.firestore.ordered.tags);
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const [note, setNote] = useState(currentNote);

  useEffect(() => {
    setNote({ tagIds: [], noteLinkIds: [], language: 'Code', ...currentNote });
  }, [currentNote]);

  const handleNoteChange = (attribute) => {
    setNote({ ...note, ...attribute });
  };

  const handleNoteSubmit = () => {
    if (note.content === '') return;
    const today = firestore.Timestamp.now();

    const title = getTitle(note.content);

    if (note.id) {
      dispatch(updateNote({ ...note, updated: today, title }));
    } else {
      dispatch(createNote({ ...note, updated: today, created: today, title }));
    }

    handleNoteClear();
  };

  const handleNoteClear = () => {
    dispatch({ type: 'CLEAR_CURRENT_NOTE' });
  };

  const addTag = (id) => {
    const newTagIds = addOrRemoveFromArr(note.tagIds, id);

    handleNoteChange({ tagIds: newTagIds });
  };

  const addNoteIdLink = (noteId) => {
    const newNoteLinkIds = addOrRemoveFromArr(note.noteLinkIds, noteId);

    handleNoteChange({ noteLinkIds: newNoteLinkIds });
  };

  return (
    <div>
      <StyledNoteEditor>
        <div className="editor-pane">
          <CodeMirror
            value={note.content}
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
              handleNoteChange({ content: value });
            }}
          />
        </div>

        <PreviewTag>-------- Preview --------</PreviewTag>

        {note.content !== '' && <MarkdownFormattedText content={note.content} />}
      </StyledNoteEditor>

      <Tags>
        {tags && (
          <div className="tags">
            {tags.map((tag) => (
              <button
                key={tag.id}
                className={
                  note.tagIds && note.tagIds.includes(tag.id) ? 'highlighted' : 'not-highlighted'
                }
                onClick={() => addTag(tag.id)}
                type="button"
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}
      </Tags>

      <Languages handleChange={handleNoteChange} language={note.language} />

      <Buttons>
        <Button onClick={handleNoteSubmit} text="Save Note" />
        <Button onClick={handleNoteClear} text="Discard Changes" />
        <LinkNotes addNoteIdLink={addNoteIdLink} />
      </Buttons>
    </div>
  );
};

const PreviewTag = styled.div`
  font-size: 22px;
  font-style: italic;
  margin: 45px 0;
  color: ${({ theme }) => theme.onBackgroundLight};
  text-align: center;
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-gap: ${({ theme }) => theme.spacing};
  align-items: center;
`;

const StyledNoteEditor = styled.div`
  .CodeMirror-scroll {
    height: auto;
    overflow-y: hidden;
    overflow-x: auto;
  }

  .CodeMirror {
    height: auto;
  }

  .editor-pane {
    position: relative;
    overflow: auto;
    min-height: 30px;

    @media (max-width: 700px) {
      grid-column: span 2;
    }
  }

  .editor-pane textarea {
    min-height: 500px;
  }
`;

const Tags = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-end;

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
      background-color: transparent;
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
    button:active:before,
    button.highlighted:before {
      visibility: visible;
      transform: scaleX(1);
    }

    @media (pointer: coarse) {
      button.not-highlighted:before {
        visibility: hidden;
        transform: scaleX(0);
      }
    }
  }
`;

NoteEditor.propTypes = {};

export default NoteEditor;

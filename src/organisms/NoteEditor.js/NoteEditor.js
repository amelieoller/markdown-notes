import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { RemirrorProvider, useRemirror, createReactManager } from 'remirror/react';
import { ListPreset } from 'remirror/preset/list';
import { useFirestore } from 'react-redux-firebase';
import { createNote, updateNote } from '../../actions/noteActions';

import Button from '../../atoms/Button';
import LinkNotes from '../../components/LinkNotes';
import Languages from '../../molecules/Languages';

import { BoldExtension } from 'remirror/extension/bold';
import { ItalicExtension } from 'remirror/extension/italic';
import { CodeExtension } from 'remirror/extension/code';
import { HeadingExtension } from 'remirror/extension/heading';
import { BlockquoteExtension } from 'remirror/extension/blockquote';
import { PlaceholderExtension } from 'remirror/extension/placeholder';
import { UnderlineExtension } from 'remirror/extension/underline';
import { ImageExtension } from 'remirror/extension/image';
import { CodeBlockExtension } from 'remirror/extension/code-block';

import javascript from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';
import ruby from 'refractor/lang/ruby';
import { getTitle, addOrRemoveFromArr } from '../../components/utils';

const manager = createReactManager([
  new ListPreset(),
  new BoldExtension(),
  new ItalicExtension(),
  new HeadingExtension(),
  new BlockquoteExtension(),
  new CodeExtension(),
  new ImageExtension(),
  new UnderlineExtension(),
  new PlaceholderExtension({ placeholder: 'Start typing...' }),
  new CodeBlockExtension({
    supportedLanguages: [javascript, jsx, ruby],
    defaultLanguage: 'javascript',
    syntaxTheme: 'atomDark',
  }),
]);

const starterTextJson = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'New Note...',
        },
      ],
    },
  ],
};

const NoteEditor = ({ currentNoteToEdit }) => {
  const tags = useSelector((state) => state.firestore.ordered.tags);

  const dispatch = useDispatch();
  const firestore = useFirestore();

  const [note, setNote] = useState(currentNoteToEdit);
  const [hasBeenEdited, setHasBeenEdited] = useState(false);

  const initialValue = manager.createState({});

  const [value, setValue] = useState(initialValue);

  const handleNoteSubmit = () => {
    const contentArr = value.doc.toJSON();

    // If the note does not have content, return
    if (!contentArr.content.length) return;

    const today = firestore.Timestamp.now();
    const title = getTitle(contentArr.content[0].content[0].text);
    const finishedNote = { ...note, content: contentArr, updated: today, title };

    if (note.id) {
      // If the the note in state has an ID (that means it's being edited), check if the content has changed
      dispatch(updateNote(finishedNote));
    } else {
      // If the note does not have an id, save it as a new note
      dispatch(createNote({ ...finishedNote, created: today }));
    }

    setHasBeenEdited(false);
  };

  useEffect(() => {
    if (hasBeenEdited) {
      handleNoteSubmit();
    }

    const newValue = manager.createState({
      content: currentNoteToEdit.content || starterTextJson,
    });

    setNote(currentNoteToEdit);
    setValue(newValue);
    setHasBeenEdited(false);
  }, [currentNoteToEdit]);

  const addTag = (id) => {
    const newTagIds = addOrRemoveFromArr(note.tagIds, id);

    setNote((prevNote) => ({ ...prevNote, tagIds: newTagIds }));
  };

  const addNoteIdLink = (noteId) => {
    const newNoteLinkIds = addOrRemoveFromArr(note.noteLinkIds, noteId);

    setNote((prevNote) => ({ ...prevNote, noteLinkIds: newNoteLinkIds }));
  };

  return (
    <>
      <RemirrorProvider
        manager={manager}
        value={value}
        onChange={(parameter) => {
          const { state, tr } = parameter;

          setHasBeenEdited(!!state.doc.textContent);
          setValue(state);
        }}
      >
        <Editor />
      </RemirrorProvider>

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

      <Languages
        handleChange={(languageObj) => setNote((prevNote) => ({ ...prevNote, ...languageObj }))}
        language={note.language}
      />

      <Buttons>
        {hasBeenEdited && <Button text="Save Note" onClick={handleNoteSubmit} />}
        {/* <Button onClick={handleNoteSubmit}>Save Note</Button> */}
        {/* <Button onClick={handleNoteClear}>Discard Changes</Button> */}
        <LinkNotes addNoteIdLink={addNoteIdLink} />
      </Buttons>
    </>
  );
};

const Editor = () => {
  const { getRootProps } = useRemirror();

  return <div {...getRootProps()} />;
};

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-gap: ${({ theme }) => theme.spacing};
  align-items: center;
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

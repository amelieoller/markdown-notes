import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { createNote, updateNote } from '../../actions/noteActions';
import { ListPreset } from 'remirror/preset/list';
import { RemirrorProvider, useManager } from 'remirror/react';
import { BoldExtension } from 'remirror/extension/bold';
import { ItalicExtension } from 'remirror/extension/italic';
import { CodeBlockExtension } from 'remirror/extension/code-block';
import { useRemirror } from '@remirror/react';
import { CodeExtension } from 'remirror/extension/code';
import { HeadingExtension } from 'remirror/extension/heading';
import { BlockquoteExtension } from 'remirror/extension/blockquote';
import { UnderlineExtension } from 'remirror/extension/underline';
import { ImageExtension } from 'remirror/extension/image';
import { HorizontalRuleExtension } from 'remirror/extension/horizontal-rule';
import { LinkExtension } from 'remirror/extension/link';

import LinkNotes from '../../components/LinkNotes';
import Languages from '../../molecules/Languages';

import javascript from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';
import ruby from 'refractor/lang/ruby';

import { getTitle, addOrRemoveFromArr } from '../../components/utils';
import Button from '../../atoms/Button';
import { ReactComponent as Save } from '../../assets/icons/save.svg';
import { ReactComponent as Trash } from '../../assets/icons/trash-2.svg';

const NoteEditor = ({ currentNoteToEdit, linkedNotes, showEdit }) => {
  const prevNoteRef = useRef();
  const prevValueRef = useRef();
  const prevHasBeenEditedRef = useRef();

  const NoteWrapper = () => {
    const tags = useSelector((state) => state.firestore.ordered.tags);
    const dispatch = useDispatch();
    const firestore = useFirestore();

    const manager = useManager([
      new ListPreset(),
      new HeadingExtension(),
      new BlockquoteExtension(),
      new CodeExtension(),
      new ImageExtension(),
      new HorizontalRuleExtension(),
      new LinkExtension(),
      new BoldExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
      new CodeBlockExtension({
        supportedLanguages: [javascript, jsx, ruby],
      }),
    ]);

    const [note, setNote] = useState(currentNoteToEdit);
    const [hasBeenEdited, setHasBeenEdited] = useState(0);

    const initialValue = manager.createState({});

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      prevNoteRef.current = note;
    });
    const prevNote = prevNoteRef.current;

    useEffect(() => {
      prevValueRef.current = value;
    });
    const prevValue = prevValueRef.current;

    useEffect(() => {
      prevHasBeenEditedRef.current = hasBeenEdited;
    });
    const prevHasBeenEdited = prevHasBeenEditedRef.current;

    useEffect(() => {
      if (note && prevNote && note.id !== prevNote.id && prevHasBeenEdited) {
        handleNoteSubmit(prevNote, prevValue, true);
      }
    }, [currentNoteToEdit]);

    const handleNoteSubmit = (note, value, noSwitch) => {
      const contentArr = value.doc.toJSON();
      // If the note does not have content, return

      const today = firestore.Timestamp.now();
      const noteHadBeenEdited = !!contentArr.content[0].content;
      let finishedNote;

      if (note.id) {
        // If the the note in state has an ID (that means it's being edited), check if the content has changed
        if (noteHadBeenEdited) {
          const title = getTitle(contentArr.content[0].content[0].text);

          finishedNote = { ...note, content: contentArr, updated: today, title };
        } else {
          finishedNote = { ...note, updated: today };
        }

        if (!noSwitch) {
          dispatch({ type: 'SET_CURRENT_NOTE', note: finishedNote });
        }

        dispatch(updateNote(finishedNote));
      } else {
        if (noteHadBeenEdited) {
          // If the note does not have an id, save it as a new note
          const title = getTitle(contentArr.content[0].content[0].text);
          finishedNote = { ...note, content: contentArr, updated: today, title };

          if (!noSwitch) {
            dispatch({ type: 'SET_CURRENT_NOTE', note: finishedNote });
          }
          dispatch(createNote({ ...finishedNote, created: today }));
        }
      }

      setHasBeenEdited(false);
    };

    const resetValueState = () => {
      const newValue = manager.createState({});

      setNote(currentNoteToEdit);
      setValue(newValue);
      // setHasBeenEdited(false);
    };

    const handleNoteDiscard = () => {
      resetValueState();
    };

    const addTag = (id) => {
      const newTagIds = addOrRemoveFromArr(note.tagIds, id);

      setNote((prevNote) => ({ ...prevNote, tagIds: newTagIds }));
      setHasBeenEdited(true);
    };

    const addNoteIdLink = (noteId) => {
      const newNoteLinkIds = addOrRemoveFromArr(note.noteLinkIds, noteId);

      setNote((prevNote) => ({ ...prevNote, noteLinkIds: newNoteLinkIds }));
      setHasBeenEdited(true);
    };

    const handleLanguageChange = (languageObj) => {
      setNote((prevNote) => ({ ...prevNote, ...languageObj }));
      setHasBeenEdited(true);
    };

    const initialContent = {
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
              text: 'Create a new note...',
            },
          ],
        },
      ],
    };

    return (
      <div>
        <RemirrorProvider
          manager={manager}
          initialContent={note.content || initialContent}
          onChange={(parameter) => {
            const { state, tr } = parameter;

            if (tr?.docChanged) {
              setHasBeenEdited(true);
              setValue(state);
            }
          }}
        >
          <Editor />
        </RemirrorProvider>

        {showEdit && (
          <>
            <SubHeader>Tags</SubHeader>
            <Tags>
              {tags &&
                tags.map((tag) => (
                  <Button
                    key={tag.id}
                    onClick={() => addTag(tag.id)}
                    type="button"
                    isActive={note.tagIds && note.tagIds.includes(tag.id)}
                    small
                    faded
                  >
                    {tag.name}
                  </Button>
                ))}
            </Tags>

            <SubHeader>Categories/Languages</SubHeader>
            <Languages handleChange={handleLanguageChange} language={note.language} />

            <SubHeader>Linked Notes</SubHeader>
            <LinkNotes
              addNoteIdLink={addNoteIdLink}
              linkIds={note.noteLinkIds}
              previousLinkedNotes={linkedNotes}
            />
          </>
        )}

        <Buttons>
          {!!hasBeenEdited && (
            <>
              <Button onClick={() => handleNoteSubmit(note, value)}>
                <Save /> Save Note
              </Button>

              <Button
                onClick={() =>
                  window.confirm(`Are you sure you want to discard the changes you have made?`) &&
                  handleNoteDiscard()
                }
                danger
              >
                <Trash /> Discard Changes
              </Button>
            </>
          )}
        </Buttons>
      </div>
    );
  };

  return <NoteWrapper />;
};

const Editor = () => {
  const { getRootProps } = useRemirror();

  return <div {...getRootProps()} />;
};

const Buttons = styled.div`
  display: flex;
  margin: 1rem 0;

  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const SubHeader = styled.h3`
  margin: 18px 0 10px 0;
  text-transform: uppercase;
  color: #838590c2;
  font-weight: 600;
  border-bottom: 2px solid #8385906e;
  padding: 0 2px 2px 2px;
  width: fit-content;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > *:not(:last-child) {
    margin-right: 5px;
  }

  & > * {
    margin-bottom: 5px;
  }
`;

NoteEditor.propTypes = {
  currentNoteToEdit: PropTypes.shape({
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
  linkedNotes: PropTypes.arrayOf(PropTypes.shape({})),
  showEdit: PropTypes.bool,
};

NoteEditor.defaultProps = {
  showEdit: true,
};

export default NoteEditor;

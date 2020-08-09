import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { useRemirror } from '@remirror/react';
import { RemirrorProvider, useManager } from 'remirror/react';

// Remirror extension imports
import { ListPreset } from 'remirror/preset/list';
import { BoldExtension } from 'remirror/extension/bold';
import { ItalicExtension } from 'remirror/extension/italic';
import { CodeBlockExtension } from 'remirror/extension/code-block';
import { CodeExtension } from 'remirror/extension/code';
import { HeadingExtension } from 'remirror/extension/heading';
import { BlockquoteExtension } from 'remirror/extension/blockquote';
import { UnderlineExtension } from 'remirror/extension/underline';
import { ImageExtension } from 'remirror/extension/image';
import { HorizontalRuleExtension } from 'remirror/extension/horizontal-rule';
import { LinkExtension } from 'remirror/extension/link';
import { EmojiExtension } from 'remirror/extension/emoji';

// Remirror language imports
import javascript from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';
import ruby from 'refractor/lang/ruby';
import json from 'refractor/lang/json';

// Internal imports
import LinkNotes from '../../components/LinkNotes';
import { createNote, updateNote } from '../../actions/noteActions';
import { getTitle, addOrRemoveFromArr } from '../../components/utils';
import Button from '../../atoms/Button';
import CreateTag from '../CreateTag';
import { ReactComponent as Save } from '../../assets/icons/save.svg';
import { ReactComponent as Trash } from '../../assets/icons/trash-2.svg';

const NoteEditor = ({
  currentNoteToEdit,
  linkedNotes,
  showEdit,
  addNoteLinkToLecture,
  handleDelete,
  noSwitch,
}) => {
  const currentUser = useSelector((state) => state.firebase.auth);

  const NoteWrapper = () => {
    const tags = useSelector((state) => state.firestore.ordered.tags);
    const dispatch = useDispatch();
    const firestore = useFirestore();

    const [hasBeenEdited, setHasBeenEdited] = useState(false);

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
      new EmojiExtension(),
      new CodeBlockExtension({
        supportedLanguages: [javascript, jsx, ruby, json],
      }),
    ]);

    const [note, setNote] = useState(currentNoteToEdit);

    const initialValue = manager.createState({});

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      if (value.doc.textContent && !hasBeenEdited) {
        setHasBeenEdited(true);
      }
    }, [value.doc.textContent]);

    const handleNoteSubmit = () => {
      const contentArr = value.doc.toJSON();
      const textContent = value.doc.textContent;
      // If the note does not have content, return

      const today = firestore.Timestamp.now();
      const noteHadBeenEdited = !!contentArr.content[0].content;
      let finishedNote;

      if (!textContent) return;

      if (note.id) {
        // If the the note in state has an ID (that means it's being edited), check if the content has changed
        if (noteHadBeenEdited) {
          const title = getTitle(contentArr.content[0].content[0].text);

          finishedNote = { ...note, content: contentArr, textContent, updated: today, title };
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
          finishedNote = {
            ...note,
            content: contentArr,
            textContent,
            updated: today,
            created: today,
            title,
            userId: currentUser.uid,
          };

          if (!noSwitch) {
            dispatch({ type: 'SET_CURRENT_NOTE', note: finishedNote });
          }

          dispatch(createNote(finishedNote)).then((noteId) => {
            if (currentNoteToEdit.lectureId) {
              addNoteLinkToLecture(noteId);
            }
          });
        }
      }
    };

    const addTag = (id) => {
      const newTagIds = addOrRemoveFromArr(note.tagIds, id);

      setHasBeenEdited(true);
      setNote((prevNote) => ({ ...prevNote, tagIds: newTagIds }));
    };

    const addNoteIdLink = (noteId) => {
      const newNoteLinkIds = addOrRemoveFromArr(note.noteLinkIds, noteId);

      setHasBeenEdited(true);
      setNote((prevNote) => ({ ...prevNote, noteLinkIds: newNoteLinkIds }));
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
      <StyledWrapper showEdit={showEdit} id={note.id}>
        <MainContent onBlur={() => handleNoteSubmit()}>
          <RemirrorProvider
            manager={manager}
            initialContent={note.content || initialContent}
            onChange={(parameter) => {
              const { state, tr } = parameter;

              if (tr?.docChanged) {
                setValue(state);
              }
            }}
            label="Note editor"
          >
            <Editor />
          </RemirrorProvider>

          {!showEdit && (
            <MinimalSave>
              <Button
                onClick={() => handleNoteSubmit()}
                disabled={!hasBeenEdited}
                label="Save note"
                iconOnly
              >
                <Save />
              </Button>
            </MinimalSave>
          )}
        </MainContent>

        {showEdit && (
          <FooterWrapper>
            <Footer>
              <SectionTitle>Tags</SectionTitle>
              <Tags>
                {tags &&
                  tags.map((tag) => (
                    <Button
                      key={tag.id}
                      onClick={() => addTag(tag.id)}
                      isActive={note.tagIds && note.tagIds.includes(tag.id)}
                      label={tag.name}
                      small
                      faded
                    >
                      {tag.name}
                    </Button>
                  ))}

                <CreateTag />
              </Tags>

              <SectionTitle>Linked Notes</SectionTitle>
              <LinkNotes
                addNoteIdLink={addNoteIdLink}
                linkIds={note.noteLinkIds}
                previousLinkedNotes={linkedNotes}
              />
              <Buttons>
                <Button
                  onClick={() => handleNoteSubmit()}
                  disabled={!hasBeenEdited}
                  label="Save note"
                >
                  <Save /> {hasBeenEdited ? 'Save Note' : 'Note Saved'}
                </Button>

                {currentNoteToEdit.id && (
                  <Button
                    onClick={() =>
                      window.confirm(`Are you sure you want to delete this note?`) &&
                      handleDelete(currentNoteToEdit.id)
                    }
                    label="Delete note"
                    danger
                  >
                    <Trash /> Delete Note
                  </Button>
                )}
              </Buttons>
            </Footer>
          </FooterWrapper>
        )}
      </StyledWrapper>
    );
  };

  return <NoteWrapper />;
};

const Editor = () => {
  const { getRootProps } = useRemirror();

  return <div {...getRootProps()} />;
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;

  & > *:first-child {
    padding: ${({ showEdit, theme }) =>
      showEdit ? '60px' : `${theme.spacingLarge} ${theme.spacingExtraLarge}`};

    @media ${({ theme }) => theme.tablet} {
      padding: ${({ showEdit, theme }) =>
        showEdit ? `40px ${theme.spacingLarge}` : theme.spacingLarge};
    }
  }
`;

const SectionTitle = styled.div`
  color: ${({ theme }) => theme.borderColor};
  text-transform: uppercase;
  font-size: 0.85rem;
  margin-bottom: 2px;
`;

const MinimalSave = styled.div`
  position: absolute;
  left: 15px;
  top: 20px;

  & > *:first-child {
    margin-bottom: 5px;
  }

  @media ${({ theme }) => theme.tablet} {
    left: 20px;
    top: -12px;
  }
`;

const MainContent = styled.div`
  padding: 60px;
  position: relative;

  & > *:first-child {
    max-width: 1000px;
    width: 100%;
  }
`;

const Buttons = styled.div`
  display: flex;
  margin: 0.5rem 0;
  flex-wrap: wrap;
  justify-content: space-between;

  & > * {
    margin-bottom: 10px;
    margin-right: 10px;
  }
`;

const FooterWrapper = styled.div`
  background: ${({ theme }) => theme.onSurfaceThree};
  padding: ${({ theme }) => theme.spacingLarge} ${({ theme }) => theme.spacingExtraLarge};

  @media ${({ theme }) => theme.tablet} {
    padding: ${({ theme }) => theme.spacingLarge};
  }
`;

const Footer = styled.div`
  max-width: 1000px;
  position: relative;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;

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
    lectureId: PropTypes.string,
    id: PropTypes.string,
  }),
  linkedNotes: PropTypes.arrayOf(PropTypes.shape({})),
  showEdit: PropTypes.bool,
  addNoteLinkToLecture: PropTypes.func,
  handleDelete: PropTypes.func,
  noSwitch: PropTypes.bool,
};

NoteEditor.defaultProps = {
  showEdit: true,
};

export default NoteEditor;

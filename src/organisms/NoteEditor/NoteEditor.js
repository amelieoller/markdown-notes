import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { useRemirror } from '@remirror/react';
import { RemirrorProvider, useManager } from 'remirror/react';

// Internal imports
import { EXTENSIONS } from './extensions';
import { createNote, updateNote } from '../../actions/noteActions';
import { addOrRemoveFromArr, sortTagsByAttribute } from '../../components/utils';
import Button from '../../atoms/Button';
import CreateTag from '../CreateTag';
import { ReactComponent as Save } from '../../assets/icons/save.svg';
import { ReactComponent as Trash } from '../../assets/icons/trash-2.svg';
import Input from '../../atoms/Input';

const Editor = ({ note, resetNote, showEdit }) => {
  const { getRootProps, setContent, commands } = useRemirror();
  const [link, setLink] = useState('');

  useEffect(() => {
    setContent(note.content);
  }, [note.id]);

  useEffect(() => {
    if (resetNote) {
      setContent(note.content);
    }
  }, [note]);

  const addLink = () => {
    if (!link) return;
    commands.updateLink({ href: link });
    setLink('');
  };

  return (
    <div>
      {showEdit && (
        <div style={{ position: 'fixed', right: '10px', zIndex: 1 }}>
          <Input
            type="text"
            label="Link URL"
            onChange={(e) => setLink(e.target.value)}
            value={link}
            border
          />
          <Button
            onClick={addLink}
            label="Link Button"
            style={{ float: 'right', marginTop: '5px' }}
          >
            Create Link
          </Button>
        </div>
      )}
      <div {...getRootProps()} />
    </div>
  );
};

const NoteEditor = ({
  currentNoteToEdit,
  showEdit,
  addNoteLinkToLecture,
  handleDelete,
  resetNote,
}) => {
  const manager = useManager(EXTENSIONS);
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.firebase.auth);
  const tags = useSelector((state) => state.firestore.ordered.tags);

  const [hasBeenEdited, setHasBeenEdited] = useState(false);
  const [note, setNote] = useState(currentNoteToEdit);

  useEffect(() => {
    if (hasBeenEdited) handleNoteSubmit();

    // setNote(noteWithoutMarks);
    setNote(currentNoteToEdit);
  }, [currentNoteToEdit]);

  const addTag = (id) => {
    const newTagIds = addOrRemoveFromArr(note.tagIds, id);

    setHasBeenEdited(true);
    setNote((prevNote) => ({ ...prevNote, tagIds: newTagIds }));
  };

  const handleOnBlur = ({ getRemirrorJSON, getText }) => {
    const content = getRemirrorJSON();
    const textContent = getText();

    setNote((prevNote) => ({ ...prevNote, content, textContent }));
    handleNoteSubmit(content, textContent);
  };

  const handleNoteSubmit = (content = note.content, textContent = note.textContent) => {
    // If the note has not been edited or does not have content, return
    if (!hasBeenEdited || !textContent) return;

    const today = firestore.Timestamp.now();

    let finishedNote = {
      ...note,
      content,
      textContent,
      updated: today,
      title: textContent.split('\n')[0],
    };

    if (note.id) {
      // If the the note in state has an ID (that means it's being edited), check if the content has changed
      dispatch(updateNote({ ...note, ...finishedNote }));
    } else {
      // If the note does not have an id, save it as a new note
      const userId = currentUser.uid;
      dispatch(createNote({ ...finishedNote, created: today, userId })).then((noteId) => {
        if (note.lectureId) {
          addNoteLinkToLecture(noteId);
        }
      });
    }

    setHasBeenEdited(false);
  };

  const handleOnChange = ({ tr }) => {
    if (tr?.docChanged) setHasBeenEdited(true);
  };

  return (
    <StyledWrapper showEdit={showEdit} id={note.id}>
      <MainContent>
        <RemirrorProvider manager={manager} onBlur={handleOnBlur} onChange={handleOnChange}>
          <Editor note={note} resetNote={resetNote} showEdit={showEdit} />
        </RemirrorProvider>

        {!showEdit && (
          <MinimalSave>
            <Button
              onClick={handleNoteSubmit}
              disabled={!hasBeenEdited}
              label="Save note"
              iconOnly
              noFill
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
                sortTagsByAttribute(tags, 'name').map((tag) => (
                  <Button
                    key={tag.id}
                    onClick={() => addTag(tag.id)}
                    isActive={note.tagIds.includes(tag.id)}
                    label={tag.name}
                    small
                    faded
                  >
                    {tag.name}
                  </Button>
                ))}

              <CreateTag />
            </Tags>

            <Buttons>
              <Button
                onClick={() => handleNoteSubmit()}
                disabled={!hasBeenEdited}
                label="Save note"
              >
                <Save /> {hasBeenEdited ? 'Save Note' : 'Note Saved'}
              </Button>

              {note.id && (
                <Button
                  onClick={() =>
                    window.confirm(`Are you sure you want to delete this note?`) &&
                    handleDelete(note.id)
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

  svg {
    height: 18px;
  }
`;

const MainContent = styled.div`
  padding: 60px;
  position: relative;

  & > *:first-child {
    max-width: 880px;
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
  max-width: 880px;
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

Editor.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    lectureId: PropTypes.string,
    id: PropTypes.string,
  }),
  resetNote: PropTypes.bool,
  showEdit: PropTypes.bool,
};

Editor.defaultProps = {
  resetNote: false,
};

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
  resetNote: PropTypes.bool,
};

NoteEditor.defaultProps = {
  showEdit: true,
  resetNote: false,
};

export default NoteEditor;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';

import { deleteLecture } from '../../actions/lectureActions';
import NoteEditor from '../NoteEditor.js';
import Button from '../../atoms/Button';
import { ReactComponent as Trash } from '../../assets/icons/trash-2.svg';
import { initialNote } from '../../initialNote';
import LinkNotes from '../../components/LinkNotes';
import { addOrRemoveFromArr } from '../../components/utils';

const Lecture = ({ currentLectureToEdit, notes, addNoteLinkToLecture, updateCurrentLecture }) => {
  const dispatch = useDispatch();

  const [newLectureNote, setNewLectureNote] = useState({
    ...initialNote,
  });

  const [lectureTitle, setLectureTitle] = useState(currentLectureToEdit.title);

  useEffect(() => {
    setLectureTitle(currentLectureToEdit.title);
  }, [currentLectureToEdit.title]);

  useEffect(() => {
    if (currentLectureToEdit.id) {
      setNewLectureNote({ ...initialNote, lectureId: currentLectureToEdit.id });
    }
  }, [currentLectureToEdit.id]);

  const handleDeleteLecture = (lectureId) => {
    dispatch(deleteLecture(lectureId));
    dispatch({ type: 'CLEAR_CURRENT_LECTURE' });
  };

  const addNote = (id) => {
    addNoteLinkToLecture(id);
    setNewLectureNote({ ...initialNote, lectureId: currentLectureToEdit.id });
  };

  const addLectureNoteIdLink = (noteId) => {
    const newNoteLinkIds = addOrRemoveFromArr(currentLectureToEdit.noteIds, noteId);

    updateCurrentLecture({ noteIds: newNoteLinkIds });
  };

  return (
    <StyledLecture>
      <MinimalDelete>
        <Button
          onClick={() =>
            window.confirm(`Are you sure you want to discard the changes you have made?`) &&
            handleDeleteLecture(currentLectureToEdit.id)
          }
          label={`Delete lecture "${lectureTitle}"`}
          danger
          iconOnly
        >
          <Trash />
        </Button>
      </MinimalDelete>

      <h1 className="lecture-title">
        <input
          type="text"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          onBlur={() => updateCurrentLecture({ title: lectureTitle })}
          onKeyDown={(e) => e.keyCode === 13 && updateCurrentLecture({ title: lectureTitle })}
        />
      </h1>

      {notes
        .filter((n) => n)
        .map((note) => (
          <NoteEditor key={note.id} currentNoteToEdit={note} showEdit={false} />
        ))}

      {currentLectureToEdit.id && (
        <NoteEditor
          currentNoteToEdit={newLectureNote}
          addNoteLinkToLecture={addNote}
          handleDelete={handleDeleteLecture}
          linkedNotes={[]}
          showEdit={false}
          resetNote
        />
      )}
    </StyledLecture>
  );
};

const MinimalDelete = styled.div`
  position: absolute;
  left: 15px;
  top: 42px;

  @media ${({ theme }) => theme.tablet} {
    left: 20px;
    top: 10px;
  }

  & > *:first-child {
    margin-bottom: 5px;
  }

  svg {
    height: 18px;
  }
`;

const StyledLecture = styled.div`
  position: relative;
  margin-bottom: 5rem;

  h1 {
    font-size: 1.5em;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
  }

  h2 {
    font-size: 1.17em;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  h3 {
    margin-top: 1.33em;
    margin-bottom: 1.33em;
  }

  h4 {
    font-size: 0.83em;
    margin-top: 1.67em;
    margin-bottom: 1.67em;
  }

  h5 {
    font-size: 0.67em;
    margin-top: 2.33em;
    margin-bottom: 2.33em;
  }

  h6 {
    font-size: 0.67em;
    margin-top: 2.33em;
    margin-bottom: 2.33em;
  }

  .link-notes {
    padding: ${({ theme }) => `${theme.spacingLarge} ${theme.spacingExtraLarge}`};
  }

  .lecture-title {
    font-size: 2em;
    margin-top: 0;
    margin-bottom: 0;
    padding: 33px 60px 20px 60px;

    input {
      border: none;
      background: transparent;
      font-size: inherit;
      font-weight: inherit;
      color: inherit;
      font-family: inherit;
      width: 100%;

      &:focus {
        outline: none;
      }
    }

    @media ${({ theme }) => theme.tablet} {
      padding: 40px 20px 20px 20px;
    }
  }
`;

Lecture.propTypes = {
  lecture: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
  }),
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      content: PropTypes.shape({}),
    }),
  ),
  addNoteLinkToLecture: PropTypes.func,
};

export default Lecture;

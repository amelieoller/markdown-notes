import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';

import { deleteLecture } from '../../actions/lectureActions';
import NoteEditor from '../NoteEditor.js';
import Button from '../../atoms/Button';
import { ReactComponent as Trash } from '../../assets/icons/trash-2.svg';

const Lecture = ({ lecture, notes, addNoteLinkToLecture }) => {
  const dispatch = useDispatch();

  const handleDeleteLecture = (lectureId) => {
    dispatch(deleteLecture(lectureId));
    dispatch({ type: 'CLEAR_CURRENT_LECTURE' });
  };

  return (
    <StyledLecture>
      <MinimalDelete>
        <Button
          onClick={() =>
            window.confirm(`Are you sure you want to discard the changes you have made?`) &&
            handleDeleteLecture(lecture.id)
          }
          danger
          iconOnly
        >
          <Trash />
        </Button>
      </MinimalDelete>

      <h1 className="lecture-title">{lecture.title}</h1>

      {notes
        .filter((n) => n)
        .map((note) => (
          <NoteEditor key={note.id} currentNoteToEdit={note} showEdit={false} />
        ))}

      <hr />
      <NoteEditor
        currentNoteToEdit={{
          title: '',
          content: '',
          tagIds: [],
          noteLinkIds: [],
          lectureId: lecture.id,
        }}
        addNoteLinkToLecture={addNoteLinkToLecture}
        handleDelete={handleDeleteLecture}
        linkedNotes={[]}
        showEdit={false}
      />
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
`;

const StyledLecture = styled.div`
  position: relative;

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

  .lecture-title {
    font-size: 2em;
    margin-top: 0;
    margin-bottom: 0;
    padding: 40px 60px 20px 60px;

    @media ${({ theme }) => theme.tablet} {
      padding: 40px 20px 20px 20px;
    }
  }
`;

Lecture.propTypes = {
  lecture: PropTypes.shape({
    title: PropTypes.string,
  }),
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      content: PropTypes.shape({}),
    }),
  ),
};

export default Lecture;

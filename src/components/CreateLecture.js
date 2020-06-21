import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import Search from './Search';
import { addOrRemoveFromArr } from './utils';
import Button from './Button';
import { createLecture, updateLecture } from '../actions/lectureActions';
import Input from '../atoms/Input/Input';

const CreateLecture = ({ lecture }) => {
  const [notesFound, setNotesFound] = useState([]);
  const [noteIds, setNoteIds] = useState([]);
  const [title, setTitle] = useState();

  useEffect(() => {
    if (lecture) {
      setTitle(lecture.title);
      setNoteIds(lecture.noteIds);
    }
  }, [lecture]);

  const dispatch = useDispatch();

  const setSearchResultNotes = (notes) => {
    setNotesFound(notes);
  };

  const handleNoteClick = (noteId) => {
    const newIds = addOrRemoveFromArr(noteIds, noteId);

    setNoteIds(newIds);
  };

  const handleCreateLecture = () => {
    if (title) {
      if (lecture && lecture.id) {
        dispatch(updateLecture({ title, noteIds, id: lecture.id }));
      } else {
        dispatch(createLecture({ title, noteIds }));
      }

      setTitle('');
      setNoteIds([]);
      setNotesFound([]);
    }
  };

  return (
    <StyledCreateLecture>
      <Input label="Lecture Title" handleOnBlur={setTitle} defaultValue={title} />
      <Search setSearchResultNotes={setSearchResultNotes} placeholderText="Add Note Sections" />

      {notesFound.map((note) => (
        <NoteSearchResult
          key={note.id}
          onClick={() => handleNoteClick(note.id)}
          isActive={noteIds.includes(note.id)}
        >
          {note.title}
        </NoteSearchResult>
      ))}
      <Button text={lecture ? 'Update Lecture' : 'Create Lecture'} onClick={handleCreateLecture} />
    </StyledCreateLecture>
  );
};

const StyledCreateLecture = styled.div``;

const NoteSearchResult = styled.div`
  cursor: pointer;
  background: ${({ isActive }) => isActive && 'blue'};
`;

CreateLecture.propTypes = {};

export default CreateLecture;

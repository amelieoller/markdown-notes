import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';

import Search from './Search';
import { addOrRemoveFromArr } from './utils';
import { createLecture, updateLecture } from '../actions/lectureActions';
import Input from '../atoms/Input/Input';
import Button from '../atoms/Button';

const CreateLecture = ({ selectedLecture, updateCurrentLecture }) => {
  const [notesFound, setNotesFound] = useState([]);
  const [lecture, setLecture] = useState({ title: '', noteIds: [], language: 'code' });
  const currentUser = useSelector((state) => state.firebase.auth);

  useEffect(() => {
    if (selectedLecture) {
      setLecture(selectedLecture);
    }
  }, [selectedLecture]);

  const dispatch = useDispatch();

  const setSearchResultNotes = (notes) => {
    setNotesFound(notes);
  };

  const handleNoteClick = (noteId) => {
    const newIds = addOrRemoveFromArr(lecture.noteIds, noteId);

    setLecture((prevLecture) => ({ ...prevLecture, noteIds: newIds }));
  };

  const handleLectureChange = (attributeObj) => {
    setLecture((prevLecture) => ({ ...prevLecture, ...attributeObj }));
  };

  const handleSaveLectureClick = () => {
    if (lecture.title) {
      if (selectedLecture && selectedLecture.id) {
        dispatch(updateLecture(lecture));
        updateCurrentLecture(lecture);
      } else {
        dispatch(createLecture({ ...lecture, userId: currentUser.uid }));
      }

      setNotesFound([]);
      setLecture({ title: '', noteIds: [], language: '' });
    }
  };

  return (
    <StyledCreateLecture>
      <h1>{lecture.id ? 'Update Lecture' : 'New Lecture'}</h1>

      <FormSection>
        <Input
          label="Lecture Title"
          onChange={(e) => handleLectureChange({ title: e.target.value })}
          value={lecture.title}
          border
        />
        <Search
          setSearchResultNotes={setSearchResultNotes}
          placeholderText="Find Notes To Link"
          border
        />

        {!!notesFound.length && (
          <NoteSearchResults>
            {notesFound.map((note) => (
              <NoteSearchResult
                key={note.id}
                onClick={() => handleNoteClick(note.id)}
                isActive={lecture.noteIds.includes(note.id)}
              >
                {note.title}
              </NoteSearchResult>
            ))}
          </NoteSearchResults>
        )}

        <Button onClick={handleSaveLectureClick}>
          {lecture.id ? 'Update Lecture' : 'Create Lecture'}
        </Button>
      </FormSection>
    </StyledCreateLecture>
  );
};

const StyledCreateLecture = styled.div`
  padding: 60px;

  @media ${({ theme }) => theme.tablet} {
    padding: ${({ theme }) => `40px ${theme.spacingLarge}`};
  }
`;

const FormSection = styled.div`
  & > * {
    margin-bottom: 15px;
  }
`;

const NoteSearchResults = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  grid-gap: 5px;
`;

const NoteSearchResult = styled.div`
  cursor: pointer;
  background: ${({ isActive, theme }) => isActive && theme.onSurfaceTwoPrimary};
  color: ${({ isActive, theme }) => (isActive ? 'white' : theme.onBackgroundLight)};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 2px solid ${({ theme }) => theme.onSurfaceTwoPrimary};
  padding: 5px;
`;

CreateLecture.propTypes = {
  selectedLecture: PropTypes.shape({}),
  updateCurrentLecture: PropTypes.func,
};

export default CreateLecture;

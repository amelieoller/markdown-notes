import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

import Search from './Search';
import { addOrRemoveFromArr } from './utils';
import { createLecture, updateLecture } from '../actions/lectureActions';
import Input from '../atoms/Input/Input';
import Button from '../atoms/Button';

const CreateLecture = ({ selectedLecture, updateCurrentLecture }) => {
  const [notesFound, setNotesFound] = useState([]);
  const [title, setTitle] = useState('');
  const [noteIds, setNoteIds] = useState([]);
  const currentUser = useSelector((state) => state.firebase.auth);

  const firestore = useFirestore();
  const today = firestore.Timestamp.now();

  useEffect(() => {
    if (selectedLecture) {
      setTitle(selectedLecture.title);
      setNoteIds(selectedLecture.noteIds);
    }
  }, [selectedLecture]);

  const dispatch = useDispatch();

  const setSearchResultNotes = (notes) => {
    setNotesFound(notes);
  };

  const handleNoteClick = (noteId) => {
    const newIds = addOrRemoveFromArr(noteIds, noteId);

    setNoteIds(newIds);
  };

  const handleSaveLectureClick = () => {
    if (title) {
      if (selectedLecture && selectedLecture.id) {
        const updatedLecture = { id: selectedLecture.id, title, noteIds, updated: today };

        dispatch(updateLecture(updatedLecture));
        updateCurrentLecture(updatedLecture);
      } else {
        dispatch(
          createLecture({
            ...{ title, noteIds },
            userId: currentUser.uid,
            created: today,
            updated: today,
          }),
        );
      }

      setNotesFound([]);
      setTitle('');
      setNoteIds([]);
    }
  };

  const clearSearch = () => {
    setNotesFound([]);
  };

  return (
    <StyledCreateLecture>
      <h1>{selectedLecture.id ? 'Update Lecture' : 'New Lecture'}</h1>

      <FormSection>
        <Input
          label="Lecture Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          border
        />
        <Search
          setSearchResultNotes={setSearchResultNotes}
          placeholderText="Find Notes To Link"
          clearSearch={clearSearch}
          border
        />

        {!!notesFound.length && (
          <NoteSearchResults>
            {notesFound.map((note) => (
              <NoteSearchResult
                key={note.id}
                onClick={() => handleNoteClick(note.id)}
                isActive={noteIds.includes(note.id)}
              >
                {note.title}
              </NoteSearchResult>
            ))}
          </NoteSearchResults>
        )}

        <Button
          onClick={handleSaveLectureClick}
          label={selectedLecture.id ? 'Update Lecture' : 'Create Lecture'}
        >
          {selectedLecture.id ? 'Update Lecture' : 'Create Lecture'}
        </Button>
      </FormSection>
    </StyledCreateLecture>
  );
};

const StyledCreateLecture = styled.div`
  padding: 60px;
  max-width: 880px;

  @media ${({ theme }) => theme.tablet} {
    padding: ${({ theme }) => `40px ${theme.spacingLarge}`};
  }
`;

const FormSection = styled.div`
  & > * {
    margin-bottom: 10px;
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
  border: 1px solid ${({ theme }) => theme.onSurfaceTwoPrimary};
  padding: 5px;
`;

CreateLecture.propTypes = {
  selectedLecture: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    noteIds: PropTypes.arrayOf(PropTypes.string),
  }),
  updateCurrentLecture: PropTypes.func,
};

export default CreateLecture;

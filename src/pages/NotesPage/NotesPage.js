import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import Search from '../../components/Search';
import NoteEditor from '../../organisms/NoteEditor.js';
import LectureSidebar from '../../organisms/LectureSidebar/LectureSidebar';
import { deleteNote, updateNote } from '../../actions/noteActions';
import SidebarsMainTemplate from '../../templates/SidebarsMainTemplate';
import { ReactComponent as Book } from '../../assets/icons/book.svg';
import { ReactComponent as Link } from '../../assets/icons/link.svg';
import IconButton from '../../atoms/IconButton/IconButton';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import chevronDown from '../../assets/icons/chevron-down.svg';

const filterBy = (notes, filterArr) =>
  filterArr.length !== 0 ? notes.filter((note) => filterArr.includes(note.id)) : notes;

const sortAndFilter = (notes, filteredNoteIds, filteredTagIds) => {
  return filterBy(notes, filteredNoteIds)
    .filter((note) => filteredTagIds.every((tagId) => note.tagIds.includes(tagId)))
    .sort(
      (a, b) =>
        (b.updated ? b.updated.toDate() : new Date()) -
        (a.updated ? a.updated.toDate() : new Date()),
    );
};

const NotesPage = () => {
  useFirestoreConnect(['notes']);

  const dispatch = useDispatch();

  const notes = useSelector((state) => state.firestore.ordered.notes);
  const { currentNoteToEdit } = useSelector((state) => state);

  const [selectedNote, setSelectedNote] = useState(null);
  const [linkedNotes, setLinkedNotes] = useState([]);

  const [filteredTagIds, setFilteredTagIds] = useState([]);
  const [filteredNoteIds, setFilteredNoteIds] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    if (notes) {
      setFilteredNotes(notes);
    }
  }, [notes]);

  const resetLecture = () => {
    setLinkedNotes([]);
    setSelectedNote(null);
  };

  useEffect(() => {
    if (currentNoteToEdit.title) {
      setSelectedNote({ ...currentNoteToEdit });
    }
  }, [currentNoteToEdit]);

  useEffect(() => {
    if (!currentNoteToEdit.id) {
      setLinkedNotes([]);

      return;
    }

    if (selectedNote && notes) {
      const connectedNotes = selectedNote.noteLinkIds
        .map((noteId) => notes.find((note) => note.id === noteId))
        .filter((note) => !!note);

      setLinkedNotes(connectedNotes);
    }
  }, [currentNoteToEdit, selectedNote]);

  const handleAddNoteClick = () => {
    dispatch({ type: 'CLEAR_CURRENT_NOTE' });
  };

  const handleEditLectureClick = () => {
    dispatch({ type: 'SET_CURRENT_NOTE', note: selectedNote });
  };

  const handleDeleteNoteLink = (noteId) => {
    const newNoteIds = selectedNote.noteLinkIds.filter((id) => id !== noteId);

    dispatch(updateNote({ id: selectedNote.id, noteLinkIds: newNoteIds }));
  };

  const handleTopicClick = (note) => {
    dispatch({ type: 'SET_CURRENT_NOTE', note });
  };

  const handleNoteClick = (note) => {
    dispatch({ type: 'SET_CURRENT_NOTE', note });
  };

  const getNotesIds = (foundItems) => {
    const newFiltered = foundItems.map((item) => notes.find((i) => i.id === item.id));

    setFilteredNotes(newFiltered);
  };

  const clearNoteSearch = () => {
    setFilteredNotes(notes);
  };

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNote(noteId));
    dispatch({ type: 'CLEAR_CURRENT_NOTE' });
  };

  return (
    <SidebarsMainTemplate>
      <LectureSidebar
        items={notes && sortAndFilter(filteredNotes, filteredNoteIds, filteredTagIds)}
        handleAddClick={handleAddNoteClick}
        handleItemClick={handleNoteClick}
        currentActiveItem={currentNoteToEdit}
        buttonText="Add Lecture"
        dark
        isOpen={true}
      >
        <div>
          <span>
            <Book />
            <h4>Notes</h4>
          </span>
          <IconButton onClick={handleAddNoteClick} color="onSurface" hoverColor="onSurfacePrimary">
            <Plus />
          </IconButton>
        </div>
        <Search
          setSearchResultNotes={getNotesIds}
          placeholderText="Search"
          clearSearch={clearNoteSearch}
        />
        <TagFilter name="" id="" defaultValue="filter">
          <option value="filter">Filter</option>
          <option value="">Value 1</option>
          <option value="">Value 2</option>
        </TagFilter>
      </LectureSidebar>

      <LectureSidebar
        items={linkedNotes}
        handleItemClick={handleTopicClick}
        handleDeleteItem={handleDeleteNoteLink}
        buttonText="Edit Lecture"
        showButton={selectedNote}
        isOpen={false}
        deleteIcon
      >
        <div>
          <span>
            <Link />
            <h4>Linked Notes</h4>
          </span>

          <IconButton
            onClick={handleEditLectureClick}
            color="onSurfaceTwo"
            hoverColor="onSurfaceTwoPrimary"
          >
            <Plus />
          </IconButton>
        </div>
      </LectureSidebar>

      <NoteEditor
        currentNoteToEdit={currentNoteToEdit}
        linkedNotes={linkedNotes}
        handleDelete={handleDeleteNote}
      />
    </SidebarsMainTemplate>
  );
};

const TagFilter = styled.select`
  width: 100%;
  height: 30px;
  padding: 0 ${({ theme }) => theme.spacingLarge};
  color: ${({ theme }) => theme.background};
  font-size: 1rem;
  border: none;
  background: #5f616b;
  border-radius: 0;

  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: linear-gradient(45deg, transparent 50%, #363740 50%),
    linear-gradient(135deg, #363740 50%, transparent 50%);
  background-position: calc(100% - 28px) calc(1em + -3px), calc(100% - 23px) calc(1em + -3px);
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
`;

NotesPage.propTypes = {};

export default NotesPage;
